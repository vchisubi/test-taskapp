import React from 'react'
import style from '../../css/buttons/viewActiveButton.module.css'

export default function viewActiveButton (props) {
  return (
    <button className={style.viewActiveButton} onClick={props.handleShowActive} />
  )
}
