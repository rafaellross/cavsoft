import React, { useState } from "react";
import NumberFormat from 'react-number-format';
import {
  Row,
  Col,
  Tree,
  Typography,
  Divider,
  Table,
  Button,
  Modal,
  Input
} from 'antd';

const style = { background: '#0092ff', padding: '8px 0' };

function FormatedMoney(props) {
  return (
    <NumberFormat value={props.value} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
  )
}

const { DirectoryTree } = Tree;
const treeData = [
  {
    title: 'H-001',
    key: '0',
    quantity: 1,

    children: [
      {
        title: 'Cold Water',
        key: '0-0',
        isLeaf: true,
        quantity: 1,
        children: [
          {
            title: '20mm CLASS B HORIZ.',
            isLeaf: true,
            key: '0-0-0',
            style: {display: 'none'},
            quantity: 50,
            cost: <FormatedMoney value={30.83}/>,
            total: <FormatedMoney value={50 * 30.83}/>
          }
        ]
      },
      {
        title: 'Hot Water',
        key: '0-1',
        quantity: 1,
        isLeaf: true,
      },
      {
        title: 'Sewer',
        key: '0-2',
        quantity: 1,
        isLeaf: true,
      },
    ],
  },
  {
    title: 'H-002',
    key: '1',
    quantity: 1,
    children: [
      {
        title: 'Cold Water',
        key: '1-0',
        isLeaf: true,
        children: [
          {
            title: '20mm CLASS B HORIZ.',
            isLeaf: true,
            key: '1-0-0',
            style: {display: 'none'}
          }
        ]
      },
      {
        title: 'Hot Water',
        key: '1-1',
        isLeaf: true,
      },
    ],
  },
];

function ModalAddNewFolder(props) {
  const [inputValue, setInputValue] = useState("")

  const handleChange = (e) => {
    console.log(e.target.value)
    setInputValue(e.target.value)
  }

  return (
    <Modal
    title="Add New Folder"
    visible={props.open}
    onOk={props.handleAdd}
    onCancel={props.handleCancel}
    footer={[
      <Button key="cancel" onClick={props.handleCancel}>
        Cancel
      </Button>,
      <Button key="add" type="primary" onClick={props.handleAdd} disabled={inputValue.trim().length >= 3 ? false : true}>
        Add
      </Button>,
    ]}
  >
    <Input placeholder="Description" value={inputValue} onChange={(e) => handleChange(e)}/>
    <Typography>Parent</Typography>
    <DirectoryTree
              multiple
              defaultExpandAll
              onSelect={props.onSelect}
              onExpand={props.onExpand}
              treeData={[{title: 'Estimating', key: '-', children: treeData}]}
            />

  </Modal>
  )
}



function App() {

  const [selecteds, setSelecteds] = useState([])
  const [selectedRow, setSelectedRow] = useState([])
  const [tableTitle, setTableTile] = useState(null)
  const [openModalNewFolder, setOpenModalNewFolder] = useState(false)
  const onSelect = (keys, event) => {
    console.log('Trigger Select', event.node.title);
    setSelecteds(event.node.children)
    setTableTile(event.node.title)
  };

  const handleAddNewFolder = () => {
    setOpenModalNewFolder(false)
  }

  const handleCancelNewFolder = () => {
    setOpenModalNewFolder(false)
  }

  const onExpand = () => {
    console.log('Trigger Expand');
  };


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRow([...selectedRows, selectedRowKeys])
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };


  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },

  ]

  return (
    <>
    <ModalAddNewFolder
      open={openModalNewFolder}
      handleAdd={handleAddNewFolder}
      handleCancel={handleCancelNewFolder}
      />
    <Row>
      <Col span={6} style={{backgroundColor: 'grey', height: '100vh'}}>
      <Row>
        <Col className="gutter-row" span={24}>
          <DirectoryTree
              multiple
              style={{backgroundColor: 'grey', color: 'white', borderBottom: 1, height: '70vh', overflowY: 'scroll'}}
              defaultExpandAll
              onSelect={onSelect}
              onExpand={onExpand}
              treeData={[{title: 'Estimating', key: '-', children: treeData}]}
            />
        </Col>
      </Row>
      <Divider/>
      <Row gutter={4} justify={'center'}>
        <Col className="gutter-row" span={6}>
          <Button type="primary" block onClick={() => setOpenModalNewFolder(true)}>Add</Button>
        </Col>
        <Col className="gutter-row" span={6}>
          <Button type="primary" danger block>Delete</Button>
        </Col>
      </Row>

      </Col>
      <Col span={18}>
        <Table
          dataSource={selecteds}
          columns={columns}
          title={

            () => { return (tableTitle !== null &&
                  <>
                    <Typography>{tableTitle}</Typography>
                    <Divider />
                    <Row gutter={4}>
                      <Col className="gutter-row" span={2}>
                        <Button type="primary" block>Add</Button>
                      </Col>
                      <Col className="gutter-row" span={2}>
                        <Button type="primary" danger block>Delete</Button>
                      </Col>
                    </Row>


                  </>)
                }
          }
          rowSelection={
            {
              selectedRowKeys: selectedRow,
              type: "checkbox",
              ...rowSelection,
            }
          }
          onRow={(record, rowIndex) => {
            return {
              onClick: event => setSelectedRow([record.key]), // click row
              onDoubleClick: event => console.log("onDoubleClick"), // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}
          />
      </Col>
    </Row>
    </>

  );
}

export default App;

