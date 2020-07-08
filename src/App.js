import React, { useState } from "react";
import {
  Row,
  Col,
  Tree,
  Typography,
  Divider,
  Table
} from 'antd';

const { DirectoryTree } = Tree;
const treeData = [
  {
    title: 'H-001',
    key: '0',
    children: [
      {
        title: 'Cold Water',
        key: '0-0',
        isLeaf: true,
        children: [
          {
            title: '20mm CLASS B HORIZ.',
            isLeaf: true,
            key: '0-0-0',
            style: {display: 'none'}
          }
        ]
      },
      {
        title: 'Hot Water',
        key: '0-1',
        isLeaf: true,
      },
      {
        title: 'Sewer',
        key: '0-2',
        isLeaf: true,
      },
    ],
  },
  {
    title: 'H-002',
    key: '1',
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

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};


function App() {

  const [selecteds, setSelecteds] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)

  const onSelect = (keys, event) => {
    console.log('Trigger Select', event.node.title);
    setSelecteds(event.node.children)

  };

  const onExpand = () => {
    console.log('Trigger Expand');
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

  ]

  return (

    <Row>
      <Col span={6}>
        <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={[{title: 'Estimating', key: '-', children: treeData}]}
      />
      </Col>
      <Col span={18}>
        <Table
          dataSource={selecteds}
          columns={columns}
          rowSelection={
            {
              //selectedRowKeys: [selectedRow],
              type: "checkbox",
              ...rowSelection,
            }
          }
          onRow={(record, rowIndex) => {
            return {
              onClick: event => console.log("onclick"), // click row
              onDoubleClick: event => setSelectedRow(record.key), // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}
          />
      </Col>
    </Row>

  );
}

export default App;

