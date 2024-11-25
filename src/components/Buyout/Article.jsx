'use client'
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@core/components/mui/TextField'
import tableStyles from '@core/styles/table.module.css'

import AppReactDatepicker from '../Card/AppReactDatepicker'
import Icon from '../icon/Icon'

import CustomAvatar from '@core/components/mui/Avatar'

import ArticleTable from './ArticleTable'

const DataCard = ({ item = {},onSaveCount }) => {
  const [date, setDate] = useState(new Date())
  const [full, setFull] = useState(false)
  const [count, setCount] = useState(1)

  const handleDate = e => setDate(e)

  const incrementCount = () => setCount(prevCount => Math.min(100, prevCount + 1))
  const decrementCount = () => setCount(prevCount => Math.max(1, prevCount - 1))

  const handleSave = () => {
    if (onSaveCount) {
      onSaveCount(count)
    }
  }


  return (
    <Card>
      <CardContent>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 h-11'>
            <div className='flex flex-col items-center justify-center h-full'>
              <CustomAvatar skin='light' variant='rounded' size={20} className='text-main-500'>
                <Icon type='delete' width='16px' />
              </CustomAvatar>
            </div>
            <img src='/images/net.jpg' className='h-10 rounded-sm' />
            <div className='flex flex-col justify-between h-full'>
              <span className='text-sm'>{item?.name}</span>
              <div className='flex items-center gap-5'>
                <span className='text-xs text-main-500'>{item?.article}</span>
                <span className='px-2 py-0.5 text-xs rounded-sm bg-grey-100 text-grey-800'>{item?.price} ₽</span>
              </div>
            </div>
            <AppReactDatepicker
              selected={date}
              id='basic-input'
              onChange={handleDate}
              placeholderText='Click to select a date'
              customInput={<CustomTextField fullWidth />}
            />
            <div className='flex items-center h-10 gap-1 px-1 rounded-sm bg-grey-100 text-grey-800'>
              <div
                className='flex items-center justify-center w-5 h-5 bg-transparent rounded-sm hover:bg-grey-600 hover:text-main-500'
                onClick={decrementCount}
              >
                <Icon type='minus' width='12px' />
              </div>
              <span className='flex justify-center text-sm font-semibold text-center min-w-8'>{count}</span>
              <div
                className='flex items-center justify-center w-5 h-5 bg-transparent rounded-sm hover:bg-grey-600 hover:text-main-500'
                onClick={incrementCount}
              >
                <Icon type='add' width='12px' />
              </div>
              <div className='flex items-center p-1 text-main-500' onClick={handleSave}>
                <Icon type='save' width='22px' />
              </div>
            </div>
          </div>
          <div
            className={`${!full ? '' : 'rotate-180'} relative hover:cursor-pointer p-1flex items-center justify-center `}
            onClick={() => {
              setFull(!full)
            }}
          >
            <Icon type='chevron' width='22px' />
          </div>
        </div>
        {full && <ArticleTable item={item} />}
      </CardContent>
    </Card>
  )
}

export default DataCard
