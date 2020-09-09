import React, { PureComponent } from 'react';
import { Card, Button, Divider, Form, Table, Icon, Row, Col, Slider, InputNumber, Progress, Select, Input, Descriptions, message} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import XLSX from 'xlsx';
import { ErrorBoundary, CssEx, ReactHooks, ConnectSon, CitySelector } from '../../components';
import { getTodoDetail } from './action';
import TodoDetailConnect from './TodoDetailConnect';
import TryTable from './TryTable';
import Counter from './couter';
import RenderProps from './RenderProps';

const Profile = ({ err }) => {
    return(
        <div>name: {err.name}</div>
    )
}

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
const InputGroup = Input.Group;

function fn1(arg) {
  console.log("fn1 arg = ", arg);
  return arg + '1';
}

function fn2(arg) {
  console.log("fn2 arg = ", arg);
  return arg + '2';
}

function fn3(arg) {
  console.log("fn3 arg = ", arg);
  return arg + '3';
}
// 执行顺序 3， 2， 1
console.log("组合", fn1(fn2(fn3("hello"))));

function compose(...funs) {
  return funs.reduce((first, second) => (...args) => first(second(...args)));
}
// 执行顺序 3， 2， 1
console.log(compose(fn1, fn2, fn3)("hello"));

@connect(
    state => state,{
        getTodoDetail
    }
)
class TodoDetail extends PureComponent {
    static propTypes = {
        getTodoDetail: PropTypes.func.isRequired,
        todoDetailReducer: PropTypes.shape({
            info: PropTypes.objectOf.isRequired
        }).isRequired
    };
    //1、 构造函数，初始化运行一次，指定this,初始状态值，绑定函数
    constructor(props){
        super(props)
        this.state = {
            err: {name: '错误'},
            newType: 1,
            expKeys: [],
        }
    }
    //2、 componentWillMount 组件挂载之前调用
    //4、 组件挂载结束后调用，查找DOM，请求数据
    componentDidMount(){
        this.props.getTodoDetail();
    }
    //3、 组件生成DOM，必须是JSX规则，第一次渲染。

    typeChange = (v,c) => {
        this.setState({
            newType: v
        })
        this.props.form.setFieldsValue({other: 1})
    }

    focusTextInput = () => {
      console.log(this.currentInput);
      // 获取了 input 的 DOM
      this.currentInput.focus();
    }

    // 子表格渲染
  expandedRowRender = record => {
    const columns = [
      {
        title: '子名称',
        dataIndex: 'bValue',
        width: 160,
      },
    ];
    return (
      <Table
        columns={columns}
        size="small"
        dataSource={record.exList || []}
        pagination={false}
        rowKey={record => record.id}
      />
    );
  };
  openOrCloseAll = (type, adata) => {
    this.setState({
        expKeys: type ? [] : adata && adata.map(i => i.id)
    })
  };

//导入excel
uploadFile = file => {
  // 获取上传的文件对象
  const { files } = file.target;
  // 通过FileReader对象读取文件
  const fileReader = new FileReader();
  console.log('fileReader', fileReader)
  fileReader.onload = event => {
      try {
          const { result } = event.target;
          // console.log('result', result)
          // 以二进制流方式读取得到整份excel表格对象
          const workbook = XLSX.read(result, { type: 'binary' });
          console.log('workbook', workbook)

          // 存储获取到的数据
          let data = [];
          // 遍历每张工作表进行读取（这里默认只读取第一张表）
          for (const sheet in workbook.Sheets) {
          // esline-disable-next-line
              if (workbook.Sheets.hasOwnProperty(sheet)) {
                  // 利用 sheet_to_json 方法将 excel 转成 json 数据
                  data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                  break; // 如果只取第一张表，就取消注释这行
              }
          }
          console.log('data', data);
      // 最终获取到并且格式化后的 json 数据
          const uploadData = data.map(item=> {
            return {
                // id : Number(item['人员ID']),
                feeContent: item['费用内容'],
                feeCategoryName: item['费用类别'],
                feeCategoryId: item['费用类别ID'],
                fee: item['金额'],
                remark: item['供应商/备注'],
                yearMonth: item['预算年月'],
                companyName: item['公司'],
                companyId: item['公司ID'],
                deptName: item['部门'],
                deptId: item['部门Id'],
                feeRemark: item['资金备注'],
            }
          })
          console.log('uploadData', uploadData)//这里得到了后端需要的json数据，调用接口传给后端就行了
          message.success('上传成功！') //这里用了antd中的message组件
      } catch (e) {
          // 这里可以抛出文件类型错误不正确的相关提示
          message.error('文件类型不正确！');
      }
  };
  // 以二进制方式打开文件
  fileReader.readAsBinaryString(files[0]);
}

check = () => {
  if(key.substr(0, key.length - 2) == 'student'){
    self.groupStudentList.push(t);
    console.log('self.group', self.group);
    console.log('indexOf', self.group.indexOf(t.studentID));
    if(self.group.indexOf(t.studentID) < 0) {
      self.group.push(t.studentID);
    }
  }
 }
 

    render() {
        const { form : { getFieldDecorator } } = this.props;
        const { info } = this.props.todoDetailReducer;
        const { err, newType } = this.state;
        const yearData = [];
        const endYear = moment().get('year') + 1;

        for (let i = 2013; i <= endYear; i++) {
          yearData.push(i);
        }

        const month = [
          { key: 1, value: '01月' },
          { key: 2, value: '02月' },
          { key: 3, value: '03月' },
          { key: 4, value: '04月' },
          { key: 5, value: '05月' },
          { key: 6, value: '06月' },
          { key: 7, value: '07月' },
          { key: 8, value: '08月' },
          { key: 9, value: '09月' },
          { key: 10, value: '10月' },
          { key: 11, value: '11月' },
          { key: 12, value: '12月' },
        ];
        const quarter = [
          { key: 1, value: '第一季度' },
          { key: 2, value: '第二季度' },
          { key: 3, value: '第三季度' },
          { key: 4, value: '第四季度' },
        ];
        const halfYear = [{ key: 1, value: '上半年' }, { key: 2, value: '下半年' }];

        const otherData = [month, quarter, halfYear, []][newType - 1];
        const typeData = [
          { key: 1, value: '按月' },
          { key: 2, value: '按季度' },
          { key: 3, value: '按半年' },
          { key: 4, value: '按年' },
        ]
        const adata = [
            {
              id: 75,
              name: "一个name",
              aValue: "处理中",
              exList: [
                {
                  bValue: "zz",
                  id: '241',
                },
                {
                  bValue: "alsldsad",
                  id: '242',
                },
                {
                  bValue: "qwqeqee",
                  id: '243',
                }
              ]
            },
            {
              id: 76,
              name: "另一个name",
              aValue: "已完成",
              exList: [
                {
                  bValue: "sasa",
                  id: '1241',
                },
                {
                  bValue: "plplpl",
                  id: '1242',
                },
                {
                  bValue: "asasasssssss",
                  id: '1243',
                }
              ]
            }
          ];
          const columns = [
            {
                title: '父名称',
                dataIndex: 'name',
                width: 160,
              },
              {
                title: '状态',
                dataIndex: 'aValue',
                width: 160,
              },
          ]
        return (
            <div>
                <Card>
                    {info?info.asd:''}
                </Card>
                <Card>我来显示个数据</Card>
                <Button onClick={()=> {this.props.history.push('./todoList')}}>那我跳回列表</Button>
                <Divider />
                {/* react16  错误处理 */}
                <div>
                    <ErrorBoundary>
                        {/* 组件接收属性为 null时，程序会抛出TypeError，这个错误会被ErrorBoundary捕获，并在界面上显示出错提示。 */}
                        <Profile err={err} />
                    </ErrorBoundary>
                    <Button onClick={() => this.setState({err: null})}>更新</Button>
                    <Divider />
                </div>
                {/* css学习 */}
                <div>
                    <CssEx />
                    <Divider />
                </div>  
                {/* React hooks学习 */}
                <div>
                    <ReactHooks />
                    <Divider />
                </div>
                {/* React Connect 学习 */}
                {/* Provider共享容器 接收值 */}
                <TodoDetailConnect.Provider value={{name: 'ze', age: 24}}>
                    <ConnectSon> props.child</ConnectSon>
                    <Divider />
                </TodoDetailConnect.Provider>
                {/* ts组件 + hooks 学习 */}
                <div>
                  <Form.Item>
                      {getFieldDecorator('detail', {
                          initialValue: ['121'],
                      })(
                          <CitySelector 
                              mode="multiple"
                              length={10}
                              placeholder='请选择'
                          />
                      )}
                  </Form.Item>
                  <Divider />
                </div>
                {/* 年季度月选择 */}
                <Form.Item {...formItemLayout}>
                  <InputGroup compact>
                    {getFieldDecorator('type', {
                        initialValue: 1
                      })(
                        <Select style={{ width: 100 }} placeholder='请选择' onChange={this.typeChange}>
                            {typeData.map(i => (
                            <Select.Option key={i.key} value={i.key}>
                                {i.value}
                            </Select.Option>
                            ))}
                        </Select>
                    )}
                    {getFieldDecorator('year', {
                        initialValue: moment().get('year')
                      })(
                        <Select style={{ width: 100 }} placeholder='请选择' >
                            {yearData.map(i => (
                            <Select.Option key={i} value={i}>
                                {`${i}年`}
                            </Select.Option>
                            ))}
                        </Select>
                    )}
                    {newType !== 4 &&
                      getFieldDecorator('other', {
                        initialValue: newType == 1 ? moment().get('month') + 1 : 1
                      })(
                        <Select style={{ width: 120 }} placeholder='请选择'>
                            {otherData.map(i => (
                            <Select.Option key={i.key} value={i.key}>
                                {i.value}
                            </Select.Option>
                            ))}
                        </Select>
                      )
                    }
                </InputGroup>
              </Form.Item>
              {/* ref 学习 */}
              {/* 通过ref回调函数指定组件类中的某个属性为DOM元素 */}
              {/* 当 ref 属性作用于 HTML 元素上时，ref的回调函数接收底层的DOM元素作为其参数 */}
              <div>
                <input ref={(input) => {this.currentInput = input}}/>
                <Button onClick={this.focusTextInput} >获取input焦点</Button>
              </div>

              <div style={{ position: 'relative' }}>
                {/* <div style={{ position: 'absolute', left: 30, top: 8, zIndex: 1 }}>
                    <div
                        onClick={() => this.openOrCloseAll(true, adata)}
                        style={{ display: this.state.expKeys.length ? 'inline-block' : 'none' }}
                        className="ant-table-row-expand-icon ant-table-row-expanded"
                    />
                    <div
                        onClick={() => this.openOrCloseAll(false, adata)}
                        style={{ display: this.state.expKeys.length ? 'none' : 'inline-block' }}
                        className="ant-table-row-expand-icon ant-table-row-collapsed"
                    />
                </div> */}
                {/* <Table
                    dataSource={adata}
                    size="small"
                    // 可控的展开与关闭数组
                    expandedRowKeys={this.state.expKeys}
                    // 单个展开或关闭，操作数组
                    onExpand={(b, r) => {
                        const { expKeys } = this.state;
                        const newExp = b ? [...expKeys, r.id] : expKeys.filter(i => i !== r.id);
                        this.setState({ expKeys: newExp  })
                    }}
                    expandedRowRender={record => this.expandedRowRender(record)}
                    pagination={false}
                    columns={columns}
                    rowKey={record => record.id}
                    scroll={{ x: true }}
                /> */}

                <div style={{ height: 'calc(100vh - 172px)' }} >
                  <TryTable />
                </div>
                {/* 上传Excel */}
                <input type='file' onChange={this.uploadFile} />

                {/* 测试Counter */}
                <Counter />
                {/* 学习 Render Props· */}
                <RenderProps render={({x, y}) => (<div>x: {x}, y: {y}</div>) } />
            </div>
            </div>
        )
    }
}

export default Form.create()(TodoDetail);
// 二次渲染
/**
 * 父组件的props发生更新
 * 调用this.forceUpdate,（调用 forceUpdate() 会导致组件跳 shouldComponentUpdate() ，直接调用 render()。 ）
 * 调用this.setState （并不是一次setState会触发一次render，React可能会合并操作，再一次性进行render）
 */

// 16 新特性，return 一个数组
// return [
//     <div className="inlineTable">
//         这是一个listItem模型
//     </div>,
//     <div className="box">
//         <p className="content">文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
//     </div>,
// ]

