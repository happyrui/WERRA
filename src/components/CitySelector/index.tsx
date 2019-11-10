import * as React from 'react';
import { Select, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import CheckModal from './CheckModal';
import cities from './cities';
// import styles from './index.less';
interface Props extends FormComponentProps{
  length: number
  onChange: Function
  mode?: string
  value: any
}
interface State {
  visible: boolean,
  data: any
}

const { Option } = Select;
class Component extends React.PureComponent<Props, State> {
    constructor(props:any) {
      super(props);
      this.state = {
        visible: false,
        data: []
      }
    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData = () => {
      // const res = await request('/api/businesstrip/cities');
      this.setState({ data: cities || [] });
    };

    openModal = () => {
      this.setState({ visible: true  });
    }

    handleChangeVisible = () => {
      this.setState({ visible: false })
    }

    onOk = (v: any) => {
      const { onChange, mode } = this.props;
      const { data } = this.state;
      const o:any = [];
      mode == 'multiple' && v && v.forEach((cityId:any) => {
        data.forEach((item:any) => {
          item.cityId == cityId && o.push(item)
        })
      })
      this.handleChangeVisible();
      onChange && onChange(v, o);
    }

    render() {
      const { length, mode, value } = this.props;
      const { visible, data } = this.state;
      return (
        <div>
          <Select
            {...this.props}
            style={{ width: 300 }}
            open={false}
            onDropdownVisibleChange={this.openModal}
            getPopupContainer={ (triggerNode:any) => {return triggerNode.parentNode} }
          >
            {
              data.map((i:any) => <Option value={i.cityId} title={i.cityName}>{i.cityName}</Option>)
            }
          </Select>
          <CheckModal
            visible={visible}
            value={value}
            handleChangeVisible={this.handleChangeVisible}
            onOk={this.onOk}
            data={data}
            length={length}
            multiple={mode=='multiple'}
          />
        </div>
      )
    }

}

export default Form.create<Props>()(Component);