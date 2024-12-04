'use client'
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import CustomAvatar from '@core/components/mui/Avatar'
import Icon from '../icon/Icon'

const DataCard = ({ buyout = {} }) => {
  return (
    <Card>
      <CardContent>
        <div className='grid w-full grid-cols-5 gap-4 pb-6 capitalize border-b'>
          <div
            className={`flex hover:cursor-pointer shadow bg-main-500 items-center justify-center text-white resurs-btn py-2 rounded-md hover:shadow hover:text-main-500  hover:bg-main-100`}
          >
            <span>Все</span>
          </div>
          <div className={`flex hover:cursor-pointer   items-center justify-center resurs-btn py-2 rounded-md  hover:shadow hover:text-main-500  hover:bg-main-100`}>
            <span>Активные</span>
          </div>
          <div
            className={`flex hover:cursor-pointer items-center justify-center resurs-btn py-2 rounded-md hover:shadow hover:text-main-500  hover:bg-main-100`}
          >
            <span>Успешные</span>
          </div>
          <div className={`flex hover:cursor-pointer items-center justify-center resurs-btn py-2 rounded-md hover:shadow hover:text-main-500  hover:bg-main-100`}>
            <span>С ошибками</span>
          </div>
          <div className={`flex hover:cursor-pointer items-center justify-center resurs-btn py-2 rounded-md hover:shadow hover:text-main-500  hover:bg-main-100`}>
            <span>к оплате</span>
          </div>
        </div>
        <div className='grid grid-cols-4 p-6 mt-6'>
          <div className='flex justify-between pr-6 border-r'>
            <div className='flex flex-col'>
              <span className='text-xl font-medium'> {buyout?.total} </span>
              <span className='text-sm'>Всего</span>
            </div>
            <CustomAvatar skin='light' variant='rounded' size={36}>
              <Icon type='circle' width='24px' />
            </CustomAvatar>
          </div>
          <div className='flex justify-between px-6 border-r'>
            <div className='flex flex-col'>
              <span className='text-xl font-medium'>{buyout?.succes}</span>
              <span className='text-sm'>Выполнено</span>
            </div>
            <CustomAvatar skin='light' variant='rounded' size={36}>
              <Icon type='checks' width='24px' />
            </CustomAvatar>
          </div>
          <div className='flex justify-between px-6 border-r'>
            <div className='flex flex-col'>
              <span className='text-xl font-medium'>{buyout?.progress}</span>
              <span className='text-sm'>Запланировано</span>
            </div>
            <CustomAvatar skin='light' variant='rounded' size={36}>
              <Icon type='calendar' width='24px' />
            </CustomAvatar>
          </div>
          <div className='flex justify-between px-6'>
            <div className='flex flex-col'>
              <span className='text-xl font-medium'>{buyout?.error}</span>
              <span className='text-sm'>С ошибками</span>
            </div>
            <CustomAvatar skin='light' variant='rounded' size={36}>
              <Icon type='alert' width='24px' />
            </CustomAvatar>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DataCard
