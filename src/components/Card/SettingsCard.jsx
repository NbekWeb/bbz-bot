'use client'
import { useState, forwardRef, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { format } from 'date-fns'

import { useTheme } from '@mui/material/styles'

import AppReactDatepicker from './AppReactDatepicker'
import CustomTextField from '@core/components/mui/TextField'

import Icon from '../icon/Icon'
import CustomAvatar from '@core/components/mui/Avatar'

const Progress = ({ startTimeProp, endTimeProp, saveNew, count }) => {
  const theme = useTheme()

  const [startTime, setStartTime] = useState(startTimeProp)
  const [endTime, setEndTime] = useState(endTimeProp)
  const [number, setNumber] = useState(count)

  useEffect(() => {
    setStartTime(startTimeProp)
  }, [startTimeProp])

  useEffect(() => {
    setEndTime(endTimeProp)
  }, [endTimeProp])

  useEffect(() => {
    setNumber(count)
  }, [count])

  const save = () => {
    saveNew(startTime, endTime, number)
  }

  const clear=()=>{
    setStartTime(startTimeProp)
    setEndTime(endTimeProp)
    setNumber(count)
  }

  const CustomInput = forwardRef((props, ref) => {
    const { label, time, customBorderRadius, ...rest } = props
    const formattedTime = time ? format(time, 'HH:mm') : ''

    return (
      <CustomTextField
        fullWidth
        inputRef={ref}
        customBorderRadius={customBorderRadius}
        {...rest}
        label={label}
        value={formattedTime}
        InputProps={{
          endAdornment: (
            <InputAdornment position='start'>
              <i className='tabler-chart-pie-2' />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleNumberChange = e => {
    const value = e.target.value

    const sanitizedValue = value.replace(/[^0-9]/g, '')

    if (sanitizedValue === '' || parseInt(sanitizedValue, 10) < 1) {
      setNumber(1) // Default to 1 if value is empty or less than 1
    } else {
      setNumber(parseInt(sanitizedValue, 10))
    }
  }

  return (
    <Card className='h-full'>
      <CardContent>
        <div className='flex items-center gap-2 mb-4'>
          <CustomAvatar skin='light' variant='rounded' color='warning' size={36} className='text-warning-500'>
            <Icon type='setting' width='24px' />
          </CustomAvatar>
          <span>Настройки</span>
        </div>

        <div>
          <span>В какой временной промежуток регистрировать аккакунты:</span>
          <div className='flex gap-0 items-center h-9 mt-2'>
            <div
              className={`border-t border-l border-b  h-full flex items-center p-2 capitalize rounded-l-md ${theme.palette.mode == 'light' ? 'border-grey-400' : 'border-grey-700'}`}
            >
              от
            </div>
            <AppReactDatepicker
              selected={startTime}
              onChange={date => {
                setStartTime(date)
              }}
              showTimeSelect
              showTimeSelectOnly
              timeFormat='HH:mm'
              dateFormat='HH:mm'
              timeIntervals={1}
              customInput={<CustomInput time={startTime} customBorderRadius='0' />}
            />
            <div
              className={`h-full flex items-center p-2 border-t border-b  ${theme.palette.mode == 'light' ? 'border-grey-400' : 'border-grey-700'}`}
            >
              До
            </div>
            <AppReactDatepicker
              selected={endTime}
              onChange={date => {
                setEndTime(date)
              }}
              className='h-full'
              showTimeSelect
              timeIntervals={1}
              showTimeSelectOnly
              timeFormat='HH:mm'
              dateFormat='HH:mm'
              customInput={<CustomInput time={endTime} customBorderRadius='0 10px 10px 0' />}
            />
          </div>
        </div>

        <div className='mt-6'>
          <span className='text-sm'>Сколько аккаунтов регистрировать в день:</span>
          <div className='max-w-40 max-h-9 mt-2'>
            <TextField
              type='number'
              fullWidth
              value={number}
              className=''
              onChange={handleNumberChange}
              inputProps={{
                min: 1,
                inputMode: 'numeric'
              }}
            />
          </div>
        </div>
        <div className='mt-4 flex items-center gap-4'>
          <Button variant='contained' color='primary' onClick={save}>
            <div className='flex items-center gap-1'>
              <span>Сохранить</span>
            </div>
          </Button>
          <Button variant='contained' color='info' onClick={clear}>
            <div className='flex items-center gap-1'>
              <span>Пересоздать</span>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Progress
