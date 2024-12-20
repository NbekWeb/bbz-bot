'use client'
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import dayjs from 'dayjs'

import CustomAvatar from '@core/components/mui/Avatar'
import AppReactDatepicker from './AppReactDatepicker'
import CustomTextField from '@core/components/mui/TextField'
import Icon from '../icon/Icon'

const DataCard = ({ data = {} }) => {
  const [date, setDate] = useState(new Date())

  return (
    <Card className='!h-full'>
      <CardContent>
        <div className='flex items-center gap-6'>
          <div className='flex flex-col items-center px-1.5 gap-1'>
            <CustomAvatar skin='light' variant='rounded' color='info' size={38} className='text-blue-500'>
              <Icon type='rubl' width='24px' />
            </CustomAvatar>
            <span className='text-lg'>Бюджет</span>
            <span className='text-xs'>Выкупов</span>
            <AppReactDatepicker
              dateFormat='dd.MM.YYYY'
              selected={date}
              id='basic-input'
              className='w-[105px]'
              onChange={date => setDate(date)}
              placeholderText='Click to select a date'
              customInput={
                <div className='flex items-center relative'>
                  <CustomTextField fullWidth value={dayjs(date).format('DD/MM/YYYY')} />
                  <span className='absolute right-2 transform -translate-y-1/2 top-1/2 pt-1'>
                    <Icon type='calendar' width={20} />
                  </span>
                </div>
              }
            />
          </div>
          <div className='flex flex-col flex-grow'>
            <span className='text-xs'>Всего</span>
            <div className='text-base border-b'>{data?.total}</div>
            <span className='text-xs'>Расход</span>
            <div className='text-base border-b'>{data?.success}</div>
            <span className='text-xs'>Осталось</span>
            <div className='text-2xl '>{data?.planned}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DataCard
