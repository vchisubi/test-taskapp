import React from 'react'
import style from '../../css/buttons/clearAllButton.module.css'

export default function clearAllButton (props) {
  return (
    <button className={style.clearAllButton} onClick={props.handleClearAll} />
  )
}
