import React from 'react'
import Moment from 'moment'
import { rotated } from '../../css/visuals/'

function DateStamp () {
  const todayUnformatted = Moment(Date.now())

  const month = todayUnformatted.format('MMMM')
  const day = todayUnformatted.format('dddd')
  const dayNum = todayUnformatted.format('Do')

  return (
    <div>
      <div className={rotated.month}>{month}</div>
      <div className={rotated.rotated}>
        <div className={rotated.day}>{day}</div>
        <div className={rotated.dayNum}>{dayNum}</div>
      </div>
    </div>
  )
}

export default DateStamp
