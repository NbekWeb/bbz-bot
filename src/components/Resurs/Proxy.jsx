'use client'
import { useState } from 'react'

import dayjs from 'dayjs'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'

import CustomTextField from '@core/components/mui/TextField'

import tableStyles from '@core/styles/table.module.css'

import Icon from '../icon/Icon'

const Proxy = ({ data = {}, onAdd, pagination }) => {
  const [email, setEmail] = useState('')
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(10)
  const [open, setOpen] = useState(false)

  const handleAdd = () => {
    if (onAdd) onAdd(email)
    setEmail('')
  }

  const handleChangeDebounced = (field, value) => {
    if (field == 'page') {
      setPage(value)
      pagination({ page: value, page_size: count })
    }

    if (field == 'count') {
      setCount(value)
      pagination({ page, page_size: value })
    }
  }

  // const handleClickOpen = (i) => {
  //   setOpen(true)

  //   console.log('sa1',i)
  // }

  // const handleDialogClose = () => {
  //   setOpen(false)
  // }

  return (
    <div>
      {/* onClose={handleDialogClose} */}
      {/* <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={handleDialogClose}>

      </Dialog> */}
      <div className='flex items-center gap-2 my-8'>
        <span className='text-2xl font-medium'>Прокси</span>
        <div className='flex items-center h-full gap-1 pt-1 text-main-500'>
          <Icon type='info' width='24' />
          <Icon type='youtube' width='24' />
        </div>
      </div>
      <Card>
        <CardContent>
          <div className='flex items-center gap-4 max-w-[600px] mt-3'>
            <CustomTextField
              fullWidth
              name='name'
              autoComplete='off'
              placeholder='login:password@ip:port'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button variant='contained' color='primary' onClick={handleAdd}>
              <div className='flex items-center gap-1'>
                <span>
                  <Icon type='add' width='16' className='' />
                </span>
                <span>Добавить</span>
              </div>
            </Button>
          </div>
          <div className='mt-10 overflow-x-auto'>
            <table className={tableStyles.table}>
              <tbody>
                <tr>
                  <td className=' pis-0'>
                    <span>Прокси</span>
                  </td>
                  <td className=' pis-0'>
                    <span>Последнее использование</span>
                  </td>
                  <td className=' pis-0'>
                    <span>Действия </span>
                  </td>
                </tr>
                {data.results &&
                  data.results.map((item, i) => (
                    <tr key={i}>
                      <td className=' pis-0'>
                        <span>{item.proxy}</span>
                      </td>
                      <td className=' pis-0'>
                        <span>
                          {dayjs(item.datetime_last_use).isValid()
                            ? dayjs(item.datetime_last_use).format('HH:mm DD.MM.YYYY')
                            : 'Нет использование'}
                        </span>
                      </td>
                      <td className=' pis-0'>
                        <span className='flex items-center gap-3 '>
                          <span className='hover:text-main-500'>
                            <Icon type='edit' width={20} />
                          </span>
                          <span className='hover:text-main-500'>
                            <Icon type='speed' width={20} />
                          </span>
                          <span className='hover:text-red-500'>
                            <Icon type='delete' width={20} />
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {data?.results?.length > 0 && (
            <div className='flex justify-between items-center mt-5'>
              <div className='flex gap-3 items-center'>
                <div className='text-sm'>
                  {data.results.length} из {data?.count} аккаунтов
                </div>
                <CustomTextField
                  select
                  id='select-count'
                  value={count}
                  onChange={e => handleChangeDebounced('count', e.target.value)}
                  className='!min-w-24'
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </CustomTextField>
              </div>
              <Pagination
                shape='rounded'
                color='primary'
                variant='tonal'
                count={Math.ceil(data.count / count)}
                page={page}
                onChange={(_, page) => {
                  handleChangeDebounced('page', page)
                }}
                showFirstButton
                showLastButton
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Proxy
