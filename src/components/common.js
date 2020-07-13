import React from 'react'
import NumberFormat from 'react-number-format';

export function FormatedMoney(props) {
    return (
      <NumberFormat value={props.value} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
    )
  }
