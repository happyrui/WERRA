import React from "react";
// import { connet } from "dva";
import {
    Form,
    Select,
    Tag,
    Input,
    Progress,
    Tabs,
    Button,
    Menu,
    Radio,
    Dropdown,
    Row,
    Col,
    Spin,
    Timeline,
    message,
    Popover,
    Popconfirm,
    Icon,
    Divider,
    Modal,
    Table,
} from 'antd';
// import config from "config";
// import moment from "moment";

// import "styles/reimburse/reimburse.scss";
// import reimburseService from "containers/reimburse/my-reimburse/reimburse.service";
// import ApprotionInfo from "containers/reimburse/my-reimburse/approtion-info";
// import ShowRepeatDetail from "containers/reimburse/my-reimburse/ShowRepeatDetail";
// import ReimburseDetailCommon from "containers/reimburse/my-reimburse/reimburse-detail-common";
// import Tanle from "./table";

// const From = Form.Item;
// const { Option } = Select;
// const { CheckableTag } = Tag;
// const { TextArea } = Input;

class CostDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          expKeys: [],
          columns: []
        }
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
    console.log('69', this.state.expKeys);
    this.setState({
        expKeys: type ? [] : adata && adata.map(i => i.id)
    })
  };

    render() {
          const adata = [
            {
              id: 75,
              name: "一个name",
              aValue: "处理中",
              exList: [
                {
                  bValue: "zz",
                  id: 241,
                },
                {
                  bValue: "alsldsad",
                  id: 242,
                },
                {
                  bValue: "qwqeqee",
                  id: 243,
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
                  id: 1241,
                },
                {
                  bValue: "plplpl",
                  id: 1242,
                },
                {
                  bValue: "asasasssssss",
                  id: 1243,
                }
              ]
            }
          ];
          const { columns } = this.state;
          const newColumns = [
              {
                title: (
                  <div>
                    <span style={{ position: 'relative', left: -99, color: '#595959' }}>
                      <div
                        onClick={() => this.openOrCloseAll(true, adata)}
                        style={{ display: this.state.expKeys && this.state.expKeys.length ? 'inline-block' : 'none' }}
                        className="ant-table-row-expand-icon ant-table-row-expanded"
                      />
                      <div
                        onClick={() => this.openOrCloseAll(false, adata)}
                        style={{ display: this.state.expKeys && this.state.expKeys.length ? 'none' : 'inline-block' }}
                        className="ant-table-row-expand-icon ant-table-row-collapsed"
                      />
                    </span>
                    <span style={{ left: -17, position: 'relative' }}>父节点</span>
                  </div>
                ),
                dataIndex: 'name',
                width: 160,
              },
              ...columns
          ]
          console.log(this.state.expKeys)
        return (
            <div>
              {/* <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 30, top: 8, zIndex: 1 }}>
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
                <Table
                    dataSource={adata}
                    // onChange={() => {}}
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
                    columns={newColumns}
                    rowKey={record => record.id}
                    scroll={{ x: true }}
                />
            {/* </div> */}
          </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user.currentUser,
        company:  state.user.company,
    }
}

export default Form.create()(CostDetail);