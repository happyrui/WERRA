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

const Component: React.SFC<Props> = (props) => {
  const { length, mode, value, onChange } = props;

  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState()

  const fetchData = () => {
    // const res = await request('/api/businesstrip/cities');
    setData(cities)
  };

  React.useEffect(fetchData, [])

  const openModal = () => {
    setVisible(true)
  }

  const handleChangeVisible = () => {
    setVisible(false)
  }

  const onOk = (v: any) => {
    const o:any = [];
    mode == 'multiple' && v && v.forEach((cityId:any) => {
      data.forEach((item:any) => {
        item.cityId == cityId && o.push(item)
      })
    })
    handleChangeVisible();
    onChange && onChange(v, o);
  }

  return (
    <div>
      <Select
        {...props}
        style={{ width: 300 }}
        open={false}
        onDropdownVisibleChange={openModal}
        getPopupContainer={ (triggerNode:any) => {return triggerNode.parentNode} }
      >
        {
          data && data.map((i:any) => <Option value={i.cityId} title={i.cityName}>{i.cityName}</Option>)
        }
      </Select>
      <CheckModal
        visible={visible}
        value={value}
        handleChangeVisible={handleChangeVisible}
        onOk={onOk}
        data={data}
        length={length}
        multiple={mode=='multiple'}
      />
    </div>
  )
}
export default Form.create<Props>()(Component);