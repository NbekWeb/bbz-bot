'use client'
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'


import CustomAvatar from '@core/components/mui/Avatar'
import Icon from '../icon/Icon'

const DataCard = () => {
  return (
    <Card>
      <CardContent>
        <div>sasa</div>
      </CardContent>
          {/* <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={() => setOpen(false)}>
            <div className=''>
              <Card>
                <CardContent>
                  <div className='flex items-center justify-between gap-6 mb-6 min-w-96'>
                    <h4 className='text-lg'>Пункт выдачи Wildberries</h4>
                    <span className='text-main-500 ' onClick={() => setOpen(false)}>
                      <Icon type='close' width='24' />
                    </span>
                  </div>
                  <p className='mb-2 text-base'>Ежедневно: 10:00-22:00</p>
                  <p className='text-base'>г Химки, Юбилейный Проезд 7к1</p>
                  <div className='grid grid-cols-2 gap-4 mt-6'>
                    <Button variant='contained' color='secondary'>
                      Закрыть
                    </Button>
                    <Button variant='contained'>Выбрать</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Dialog> */}
    </Card>
  )
}

export default DataCard
