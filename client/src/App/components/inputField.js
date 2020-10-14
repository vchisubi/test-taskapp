import React from 'react'
import { inputFieldContainer } from '../css/containers'
import { basic } from '../css/buttons/'

export default function InputField (props) {
  return (
    <div className={inputFieldContainer.inputFieldContainer}>
      <form onSubmit={props.handleSubmit}>
        <input
          onChange={props.handleInput}
          type='text'
          value={props.data}
          name='userInput'
          placeholder='Enter Task'
          width='100%'
          autoFocus
        />
        <button className={basic.basicButton}>Submit</button>
      </form>
    </div>
  )
}
