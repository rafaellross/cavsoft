import React, { Component } from 'react'


export default class EstimateDetails extends Component {
    state = {
      gData: this.props.data,
      expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
      selecteds: [],
      tableTitle: null,
      openModalNewFolder: false,
      columns: [
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

      ],
      selectedRow: [],

    };

    onDragEnter = info => {
      console.log(info);
      // expandedKeys 需要受控时设置
      // this.setState({
      //   expandedKeys: info.expandedKeys,
      // });
    };
    onDrop = info => {
      console.log(info);
      const dropKey = info.node.props.eventKey;
      const dragKey = info.dragNode.props.eventKey;
      const dropPos = info.node.props.pos.split('-');
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

      const loop = (data, key, callback) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            return callback(data[i], i, data);
          }
          if (data[i].children) {
             loop(data[i].children, key, callback);
          }
        }
      };
      const data = [...this.state.gData];

      // Find dragObject
      let dragObj;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });

      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, item => {
          item.children = item.children || [];
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.push(dragObj);
        });
      } else if (
        (info.node.props.children || []).length > 0 && // Has children
        info.node.props.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, item => {
          item.children = item.children || [];
          // where to insert 示例添加到头部，可以是随意位置
          item.children.unshift(dragObj);
        });
      } else {
        let ar;
        let i;
        loop(data, dropKey, (item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj);
        } else {
          ar.splice(i + 1, 0, dragObj);
        }
      }

      this.setState({
        gData: data,
      });
    };


    onSelect = (keys, event) => {
      console.log('Trigger Select', event.node.title);
       this.setState({
         selecteds: event.node.children,
         tableTitle: event.node.title
       });

    };

    handleAddNewFolder = (parent, newItem) => {
      console.log("Added")
      console.log(`Parent: ${parent}, New Item: ${newItem}`)
    }

    handleCancelNewFolder = () => {
      console.log("close")
      this.setState({
        openModalNewFolder: false
      })

    }


    render() {
      return (
        <>
        <ModalAddNewFolder
          open={this.state.openModalNewFolder}
          handleAdd={this.handleAddNewFolder}
          handleCancel={this.handleCancelNewFolder.bind(this)}
          treeData={this.state.gData}
          />
        <Row>
          <Col span={6} style={{backgroundColor: 'grey', height: '100vh'}}>
          <Row>
            <Col className="gutter-row" span={24}>
              <DirectoryTree
                  style={{backgroundColor: 'grey', color: 'white'}}
                  onSelect={this.onSelect}
                  height={500}
                  draggable
                  defaultExpandAll
                  blockNode
                  onDrop={this.onDrop}
                  treeData={this.state.gData}
                  className="draggable-tree"
                  defaultExpandedKeys={this.state.expandedKeys}
                  onDragEnter={this.onDragEnter}
                  onDrop={this.onDrop}
                  treeData={this.state.gData}
                />


            </Col>
          </Row>
          <Divider/>
          <Row gutter={4} justify={'center'}>
            <Col className="gutter-row" span={6}>
              <Button type="primary" block onClick={() => this.setState({openModalNewFolder: true})}>Add</Button>
            </Col>
            <Col className="gutter-row" span={6}>
              <Button type="primary" danger block>Delete</Button>
            </Col>
          </Row>

          </Col>
          <Col span={18}>
            <Table
              dataSource={this.state.selecteds}
              columns={this.state.columns}
              title={

                () => { return (this.state.tableTitle !== null &&
                      <>
                        <Typography>{this.state.tableTitle}</Typography>
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

              onRow={(record, rowIndex) => {
                return {
                  onClick: event => this.setState({selectedRow: [record.key]}), // click row
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
      )
    }
  }
