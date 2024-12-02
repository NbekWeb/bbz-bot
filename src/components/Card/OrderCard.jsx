'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import CustomAvatar from '@core/components/mui/Avatar'
import Icon from '../icon/Icon'

const DataCard = ({ data = {} }) => {
  return (
    <Card className='!h-full'>
      <CardContent>
        <div className='flex items-center gap-6'>
          <div className='flex flex-col items-center px-1.5 gap-1'>
            <CustomAvatar skin='light' variant='rounded' color='success' size={38} className='text-green-500'>
              <Icon type='order' width='24px' />
            </CustomAvatar>
            <span className='text-lg'>Заказы</span>
            <span className='text-xs'>Активные</span>
          </div>
          <div className='flex flex-col flex-grow'>
            <div className='flex items-center justify-between py-1 text-base border-b'>
              <span>В пути</span>
              <span>{data?.route}</span>
            </div>
            <div className='flex items-center justify-between py-1 text-base border-b'>
              <span>Доставлено</span>
              <span>{data?.delivered}</span>
            </div>
            <div className='flex items-center justify-between py-1 text-base border-b'>
              <span>Получено(вчера)</span>
              <span>{data?.received}</span>
            </div>
            <div className='flex items-center justify-between py-1 text-base border-b'>
              <span>Задерживается</span>
              <span>{data?.delayed}</span>
            </div>
            <div className='flex items-center justify-between py-1 text-base'>
              <span>Отмена</span>
              <span>{data?.canceled}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DataCard
