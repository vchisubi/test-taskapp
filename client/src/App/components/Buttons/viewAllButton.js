import React from 'react'
import style from '../../css/buttons/viewAllButton.module.css'

export default function viewAllButton (props) {
  return (
    <button className={style.viewAllButton} onClick={props.handleShowAll} />
  )
}
