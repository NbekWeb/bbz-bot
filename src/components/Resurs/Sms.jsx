'use client'
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'
import Icon from '../icon/Icon'

const Sms = ({ onAdd }) => {
  const [email, setEmail] = useState('')

  const handleAdd = () => {
    if (onAdd) onAdd(email)
    setEmail('')
  }

  return (
    <div>
      <div className='flex items-center gap-2 my-8'>
        <span className='text-2xl font-medium'>Смс</span>
        <div className='flex items-center h-full gap-1 pt-1 text-main-500'>
          <Icon type='info' width='24' />
          <Icon type='youtube' width='24' />
        </div>
      </div>
      <Card>
        <CardContent>
          <div>
            <h3 className='text-sm font-medium uppercase'>Sms-Activate</h3>
            <div className='flex items-center gap-4 max-w-[600px] mt-3'>
              <CustomTextField
                fullWidth
                name='name'
                autoComplete='off'
                placeholder='Введите ваш API ключ'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Button variant='contained' color='primary' onClick={handleAdd}>
                <div className='flex items-center gap-1'>
                  <span className=''>
                    <Icon type='save' width='24' className='' />
                  </span>
                  <span>Сохранить</span>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Sms
