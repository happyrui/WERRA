import * as React from 'react';
import { Modal, Tabs, Tag, message, Button } from 'antd';
import { Ellipsis } from 'ant-design-pro';
import './index.less';

const { TabPane } = Tabs;
const { CheckableTag } = Tag;

interface Props {
  // list: any[],
  data: [],
  visible: boolean,
  onOk: Function,
  length: number,
  handleChangeVisible: Function,
  multiple: boolean,
  value: any
}
interface State {
  disabled: boolean,
  selectedTag: any,
}

const abbrs = ['ABCD', 'EFGH', 'JKLM', 'NOPQRS', 'TUVWX', 'YZ'];

const CityRow = (props:any) => {
  const { title, value, list, onCheck } = props;
  return (
    <div style={{display: 'flex', alignItems: 'stretch'}}>
      { title && <span style={{ color: '#E87410', width: 20 }}>{title}</span> }
      <div style={{ width: 550 }}>
        {
          list.map((i:any) =>
            <CheckableTag
              className='tag'
              key={i.cityId}
              onChange={checked => onCheck(i.cityId, checked)}
              checked={value && (Array.isArray(value) ? value.includes(i.cityId) : value == i.cityId)}
            >
              <Ellipsis tooltip length={4} style={{ display: 'inline' }}>{i.cityName}</Ellipsis>
            </CheckableTag>
          )
        }        
      </div>
    </div>
  )
}

export default class CheckModal extends React.PureComponent<Props, State> {
    constructor(props:any) {
      super(props);
      this.state = {
        disabled: false,
        selectedTag: []
      }
    }

    componentWillReceiveProps = (props: Props) => {
      const { value } = props;
      this.setState({ selectedTag: value });
    }
    handleCancel = () => {
      this.props.handleChangeVisible();
      this.setState({ disabled: false });
    }

    handleOk = () => {
      const { onOk, multiple } = this.props;
      const { selectedTag } = this.state;
      if (multiple && selectedTag.length > 0 || !multiple) {
        onOk(selectedTag);
      } else {
        message.warning("未选择城市");
      }
    }

    handleChange = (key: number, checked: boolean) => {
      const { selectedTag } = this.state;
      const { length, multiple, onOk } = this.props;
      if (multiple) {
        const nextselectedTag:any = checked ? [...(selectedTag || []), key] : selectedTag.filter((t:any) => t !== key);
        const selects:Number[] = Array.from(new Set(nextselectedTag))
        this.setState({ selectedTag: selects });
        length == selects.length - 1 && message.warning(`最多选择${length}个`)
        if(length < selects.length ) {
          this.setState({ disabled: true })
        } else {
          this.setState({ disabled: false })
        }
      } else {
        this.setState({ selectedTag: key })
        onOk(key)
      }
    };

    // 顺序
    compare = (property: any) => {
      return (obj1: any, obj2: any) => {
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2;
      }
    }

    render() {
      const { visible, data, multiple, length } = this.props;
      const { disabled, selectedTag } = this.state;
      const modalProps = {
        width: 600,
        visible,
        onCancel: this.handleCancel,      
        destroyOnClose: true,
        footer: <div>
          {length && <div style={{ float: 'left', fontSize: 12 }}>最多选择{length}个</div>}
          <Button onClick={this.handleCancel}>取消</Button>
          <Button type="primary" onClick={this.handleOk} disabled={disabled || Boolean((data && data.length == 0))}>确认</Button>
        </div>
      }
      if (!multiple || !data.length) {
        modalProps.footer = null
      }
      const hotList = data.filter((i:any) => i.isPopular).sort(this.compare('sort'));
      return (
        <div>
          <Modal {...modalProps} >
            {data.length > 0 ? 
              <Tabs
                size="small" 
                tabBarGutter={0}
              >
                <TabPane tab="热门" key="hot" style={{ height: 340, overflowY: 'auto' }}>
                  <CityRow onCheck={this.handleChange} value={selectedTag} list={hotList} />
                </TabPane>
                {
                  abbrs.map(prefix => (
                    <TabPane tab={prefix} key={prefix} style={{ height: 340, overflowY: 'auto' }}>
                      {
                        prefix.split('').map(letter => {
                          const list = data.filter((i:any) => i.prefix == letter);
                          return list.length > 0 &&
                          <CityRow onCheck={this.handleChange} key={letter} title={letter} value={selectedTag} list={list} />
                        })
                      }
                    </TabPane>
                  ))
                }  
              </Tabs> :  <span style={{ textAlign:'center' }}>暂无数据</span> }
          </Modal>
        </div>
      )
    }

}