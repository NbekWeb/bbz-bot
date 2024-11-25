'use client'
import { useState } from 'react'


import Link from 'next/link'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'


import CustomAvatar from '@core/components/mui/Avatar'
import Icon from '../icon/Icon'

const Top = () => {
  return (
    <div className='grid grid-cols-4 gap-6'>

    <Card>
      <CardContent>
<Link href='/addbuyout'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'>
          Добавить Выкупы
          </span>
          <CustomAvatar skin='light' variant='rounded' color='primary' size={36} className='text-main-500'>
            <Icon type='plus' width='24px' />
          </CustomAvatar>
        </div>
</Link>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'>
          Быстро
          </span>
          <CustomAvatar skin='light' variant='rounded' color='success' size={36} className='text-green-500'>
            <Icon type='123' width='24px' />
          </CustomAvatar>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'>
          Группы Выкупов
          </span>
          <CustomAvatar skin='light' variant='rounded' color='info' size={36} className='text-blue-500'>
            <Icon type='tabler' width='24px' />
          </CustomAvatar>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium'>
          Настройки
          </span>
          <CustomAvatar skin='light' variant='rounded' color='warning' size={36} className='text-warning-500'>
            <Icon type='setting' width='24px' />
          </CustomAvatar>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default Top
