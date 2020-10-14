import React from 'react'
import style from '../../css/buttons/viewCompletedButton.module.css'

export default function viewCompletedButton (props) {
  return (
    <button className={style.viewCompletedButton} onClick={props.handleShowComplete} />
  )
}
