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

const Progress = ({ data = {} }) => {

  return (
    <Card>
      <CardContent>
        <div className='flex items-center gap-2 mb-4'>
          {/* warning */}
          <CustomAvatar skin='light' variant='rounded' color='info' size={36} className='text-blue-500'>
            <Icon type='users' width='24px' />
          </CustomAvatar>
          <span>Аккаунтов</span>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <tbody>
                <tr>
                  <td className='flex items-center gap-2 pis-0'>
                    <Typography color='text.primary'>
                      <span className='flex items-center gap-1'>
                        <span className='flex w-3 h-3 bg-blue-500 rounded-full'></span>
                        Чистый
                      </span>
                    </Typography>
                  </td>

                  <td className='text-end pie-0'>
                    <Typography>{data?.clear}</Typography>
                  </td>
                </tr>
                <tr>
                  <td className='flex items-center gap-2 pis-0'>
                    <Typography color='text.primary'>
                      <span className='flex items-center gap-1'>
                        <span className='flex w-3 h-3 bg-green-500 rounded-full'></span>
                        Активный
                      </span>
                    </Typography>
                  </td>

                  <td className='text-end pie-0'>
                    <Typography>{data?.active}</Typography>
                  </td>
                </tr>

                <tr>
                  <td className='flex items-center gap-2 pis-0'>
                    <Typography color='text.primary'>
                      <span className='flex items-center gap-1'>
                        <span className='flex w-3 h-3 rounded-full bg-warning-500'></span>Чужой
                      </span>
                    </Typography>
                  </td>

                  <td className='text-end pie-0'>
                    <Typography>{data?.alien}</Typography>
                  </td>
                </tr>
                <tr>
                  <td className='flex items-center gap-2 pis-0'>
                    <Typography color='text.primary'>
                      <span className='flex items-center gap-1'>
                        <span className='flex w-3 h-3 bg-red-500 rounded-full'></span>Потеря
                      </span>
                    </Typography>
                  </td>

                  <td className='text-end pie-0'>
                    <Typography>{data?.lost}</Typography>
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
