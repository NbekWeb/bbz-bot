'use client'
import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'
import Icon from '../icon/Icon'

const DataCard = ({ onAdd, data }) => {
  const [formData, setFormData] = useState({
    telegram_bot_api: data?.telegram_bot_api || '',
    telegram_id: data?.telegram_id || '',
    telegram_channel_id: data?.telegram_channel_id || '',
    telegram_channel_receive_id: data?.telegram_channel_receive_id || '',
    telegram_channel_review_id: data?.telegram_channel_review_id || '',
    telegram_channel_buyout_id: data?.telegram_channel_buyout_id || '',
    telegram_channel_info_id: data?.telegram_channel_info_id || '',
    telegram_channel_monitor_id: data?.telegram_channel_monitor_id || ''
  })

  const fields = [
    { label: 'API Telegram Бота', key: 'telegram_bot_api', placeholder: 'Введите ваш API ключ' },
    { label: 'Ваш ID', key: 'telegram_id', placeholder: 'Введите ваш Telegram ID' },
    { label: 'ID канала Внимание', key: 'telegram_channel_id', placeholder: 'Введите ID канала Внимание' },
    { label: 'ID канала Получение', key: 'telegram_channel_receive_id', placeholder: 'Введите ID канала Получение' },
    { label: 'ID канала Отзывы', key: 'telegram_channel_review_id', placeholder: 'Введите ID канала Отзывы' },
    {
      label: 'ID канала Выкупы',
      key: 'telegram_channel_buyout_id',
      placeholder: 'Введите ID канала Выкупы (дублирование сообщений бота)'
    },
    { label: 'ID канала Отчёты', key: 'telegram_channel_info_id', placeholder: 'Введите ID канала Отчёты' },
    { label: 'ID канала Монитор', key: 'telegram_channel_monitor_id', placeholder: 'Введите ID канала Монитор' }
  ]

  const handleChange = (e, key) => {
    setFormData(prev => ({
      ...prev,
      [key]: e.target.value
    }))
  }

  const handleAdd = () => {
    const nonEmptyData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value
      }

      return acc
    }, {})

    if (onAdd) onAdd(nonEmptyData)
  }

  useEffect(() => {
    if (data) {
      setFormData(prev => ({
        ...prev,
        ...data // Merge incoming data with existing defaults
      }))
    }
  }, [data])

  return (
    <div>
      <div className='flex items-center gap-2 my-8'>
        <span className='text-2xl font-medium'>Телеграм</span>
        <div className='flex items-center h-full gap-1 pt-1 text-main-500'>
          <Icon type='info' width='24' />
          <Icon type='youtube' width='24' />
        </div>
      </div>
      <Card>
        <CardContent>
          <div className='flex flex-col gap-4'>
            {fields.map((field, index) => (
              <div key={field.key}>
                <div className='flex items-center gap-2 text-sm font-medium uppercase'>
                  {field.label}
                  <span>
                    <Icon type='info' width='20' />
                  </span>
                </div>
                <div className='flex items-center w-full gap-4 mt-3'>
                  <div className='max-w-[600px] w-[600px]'>
                    <CustomTextField
                      fullWidth
                      name={field.key}
                      autoComplete='off'
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={e => handleChange(e, field.key)}
                    />
                  </div>
                  {index !== 0 && (
                    <CustomAvatar skin='light' variant='rounded' size={36}>
                      <span className='pt-1 text-main-500'>
                        <Icon type='stat' width='24' />
                      </span>
                    </CustomAvatar>
                  )}
                </div>
              </div>
            ))}
            <div className='flex'>
              <Button variant='contained' color='primary' onClick={handleAdd}>
                <div className='flex items-center gap-1'>
                  <span className='flex items-center h-[18px]'>
                    <Icon type='save' width='18' className='' />
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

export default DataCard
