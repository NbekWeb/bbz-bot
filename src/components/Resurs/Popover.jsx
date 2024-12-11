'use client'
import { useState } from 'react'

import { Popover } from 'antd'

import Icon from '../icon/Icon'

const DataCard = ({ title = '', content = '' }) => {
  const [open, setOpen] = useState(false)

  const renderTitle = typeof title === 'string' ? title : JSON.stringify(title)

  const handleHoverChange = open => {
    setOpen(false)
  }
  

  return (
    <>
      <Popover
        placement='bottomLeft'
        content={content}
        title={title}
        trigger='hover'
        open={open}
        onOpenChange={handleHoverChange}
      >
        <span className='flex' onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          <Icon type='info' width='20' />
        </span>
      </Popover>
    </>
  )
}

export default DataCard
