'use client'
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import classnames from 'classnames'

import AppReactDatepicker from './AppReactDatepicker'
import CustomTextField from '@core/components/mui/TextField'

import Icon from '../icon/Icon'

import styles from './styles.module.css'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

import CustomAvatar from '@core/components/mui/Avatar'

// Define the component with props
const Progress = ({ data = {}, title = 'Vehicle ', icon = 'bxs-truck', onDateChange }) => {
  const [date, setDate] = useState(new Date())

  const handleDate = e => {
    setDate(e)

    onDateChange(e)
  }

  // Ensure data properties are numbers
  const total = Number(data?.total) || 0
  const success = Number(data?.success) || 0
  const error = Number(data?.error) || 0
  const progress = Number(data?.progress) || 0

  // Calculate widths dynamically
  const successWidth = total === 0 ? '33%' : `${(success * 100) / total}%`
  const errorWidth = total === 0 ? '33%' : `${(error * 100) / total}%`
  const progressWidth = total === 0 ? '33%' : `${(progress * 100) / total}%`

  return (
    <Card>
      <CardContent>
        <div className='flex items-center justify-between gap-4 mb-4'>
          <div className='flex items-center gap-2'>
            <CustomAvatar skin='light' variant='rounded' color='primary' size={36} className='text-main-500'>
              <Icon type={icon} width='24px' />
            </CustomAvatar>
            <span>{title}</span>
          </div>
          <AppReactDatepicker
            selected={date}
            id='basic-input'
            onChange={handleDate}
            placeholderText='Click to select a date'
            customInput={<CustomTextField fullWidth />}
          />
        </div>
        <div className='flex flex-col gap-6'>
          <div className='flex w-full'>
            <div
              style={{ width: successWidth }}
              className={classnames(styles.linearRound, 'flex flex-col gap-[34px] relative')}
            >
              <LinearProgress
                variant='determinate'
                value={-1}
                className={classnames('bs-[46px] bg-green-500')}
                sx={{
                  borderRadius: 0
                }}
              />
              <Typography variant='body2' className='absolute font-medium text-white bottom-3 start-2'>
                {successWidth}
              </Typography>
            </div>
            <div
              style={{ width: errorWidth }}
              className={classnames(styles.linearRound, 'flex flex-col gap-[34px] relative')}
            >
              <LinearProgress
                variant='determinate'
                value={-1}
                className={classnames('bs-[46px] bg-red-500')}
                sx={{
                  borderRadius: 0
                }}
              />
              <Typography variant='body2' className='absolute font-medium text-white bottom-3 start-2'>
                {errorWidth}
              </Typography>
            </div>
            <div
              style={{ width: progressWidth }}
              className={classnames(styles.linearRound, 'flex flex-col gap-[34px] relative')}
            >
              <LinearProgress
                variant='determinate'
                value={-1}
                className={classnames('bs-[46px] bg-main-500')}
                sx={{
                  borderRadius: 0
                }}
              />
              <Typography variant='body2' className='absolute font-medium text-white bottom-3 start-2'>
                {progressWidth}
              </Typography>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <tbody>
                <tr>
                  <td className='flex items-center gap-2 pis-0'>
                    <Typography color='text.primary'>
                      <span className='flex items-center gap-1'>
                        <span className='flex w-3 h-3 rounded-full bg-grey-500'></span>
                        Всего
                      </span>
                    </Typography>
                  </td>

                  <td className='text-end pie-0'>
                    <Typography>{total}</Typography>
                  </td>
                </tr>
                <tr>
                  <td className='flex items-center gap-2 pis-0'>
                    <Typography color='text.primary'>
                      <span className='flex items-center gap-1'>
                        <span className='flex w-3 h-3 bg-green-500 rounded-full'></span>
                        Выполнено
                      </span>
                    </Typography>
                  </td>

                  <td className='text-end pie-0'>
                    <Typography>{success}</Typography>
                  </td>
                </tr>
                <tr>
                  <td className='flex items-center gap-2 pis-0'>
                    <Typography color='text.primary'>
                      <span className='flex items-center gap-1'>
                        <span className='flex w-3 h-3 rounded-full bg-main-500'></span>В очереди
                      </span>
                    </Typography>
                  </td>

                  <td className='text-end pie-0'>
                    <Typography>{progress}</Typography>
                  </td>
                </tr>
                <tr>
                  <td className='flex items-center gap-2 pis-0'>
                    <Typography color='text.primary'>
                      <span className='flex items-center gap-1'>
                        <span className='flex w-3 h-3 bg-red-500 rounded-full'></span>С ошибками
                      </span>
                    </Typography>
                  </td>

                  <td className='text-end pie-0'>
                    <Typography>{error}</Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Progress
