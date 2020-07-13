import React, { useState } from 'react'
import {
    Typography,
    Button,
    Modal,
    Input,
    Tree
  } from 'antd';

export function ModalAddNewFolder(props) {
    const [inputValue, setInputValue] = useState("")
    const [selectedItem, setSelectedItem] = useState(null)

    const handleChange = (e) => {
      console.log(e.target.value)
      setInputValue(e.target.value)
    }

    const handleSelect = (key) => {

      setSelectedItem(key)
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
        <Button key="add" type="primary" onClick={() => props.handleAdd(selectedItem, inputValue)} disabled={inputValue.trim().length >= 3 && selectedItem !== null? false : true}>
          Add
        </Button>,
      ]}>
      <Input placeholder="Description" value={inputValue} onChange={(e) => handleChange(e)}/>
      <Typography>Parent</Typography>
      <Tree
          defaultExpandAll
          height={300}
          onSelect={(e) => handleSelect(e)}
          treeData={props.treeData}/>
    </Modal>
    )
  }