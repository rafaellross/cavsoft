import React, { Component, useState } from "react";
import { FormatedMoney } from "./components/common";
import {
  Row,
  Col,
  Tree,
  Typography,
  Divider,
  Table,
  Button
} from 'antd';

import { ModalAddNewFolder } from "./components/ModalAddNewFolder";
import EstimateDetails from "./components/EstimateDetails";

const style = { background: '#0092ff', padding: '8px 0' };


const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(x);


const data = [
  {
    title: 'H-001',
    key: Math.floor(Math.random() * 100),
    quantity: 1,
    children: [
      {
        title: 'Cold Water',
        key: Math.floor(Math.random() * 100),
        isLeaf: false,
        quantity: 1,
        children: [
          {
            title: '20mm CLASS B HORIZ.',
            isLeaf: true,
            key: Math.floor(Math.random() * 100),
            style: {display: 'none'},
            quantity: 50,
            cost: <FormatedMoney value={30.83}/>,
            total: <FormatedMoney value={50 * 30.83}/>
          }
        ]
      },
      {
        title: 'Hot Water',
        key: Math.floor(Math.random() * 100),
        quantity: 1,
        isLeaf: false,
      },
      {
        title: 'Sewer',
        key: Math.floor(Math.random() * 100),
        quantity: 1,
        isLeaf: false,
      },
    ],
  },
  {
    title: 'H-002',
    key: Math.floor(Math.random() * 100),
    quantity: 1,
    children: [
      {
        title: 'Cold Water',
        key: Math.floor(Math.random() * 100),
        isLeaf: false,
        children: [
          {
            title: '20mm CLASS B HORIZ.',
            isLeaf: true,
            key: Math.floor(Math.random() * 100),
            style: {display: 'none'}
          }
        ]
      },
      {
        title: 'Hot Water',
        key: Math.floor(Math.random() * 100),
        isLeaf: false,
      },
    ],
  },
];








function App() {
  return (
    <EstimateDetails data={data}/>
  )
}

export default App;

