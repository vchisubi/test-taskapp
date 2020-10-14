import React from 'react'
import { todoItem } from '../css/visuals'

export default function TodoItem (props) {
  const completedStyle = {
    fontStyle: 'italic',
    color: '#cdcdcd',
    textDecoration: 'line-through'
  }

  return (
    <div className={todoItem.todoItem}>
      <input
        type='checkbox'
        onChange={() => props.handleChange(props.item.id)}
        checked={props.item.completed}
      />
      <label style={props.item.completed ? completedStyle : null}>{props.item.title}</label>
      <span
        onClick={() => props.handleClick(props.item.id)}
      > {'\u00D7'}
      </span>
    </div>
  )
}
