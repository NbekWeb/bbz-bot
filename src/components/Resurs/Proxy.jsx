'use client'
import { useState } from 'react'

import dayjs from 'dayjs'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'

import { toast } from 'react-toastify'

import { api } from '@/utils/api'

import CustomTextField from '@core/components/mui/TextField'

import tableStyles from '@core/styles/table.module.css'

import Icon from '../icon/Icon'

const Proxy = ({ data = {}, onAdd, pagination }) => {
  const [email, setEmail] = useState('')
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(10)
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [selectedEmail, setSelectedEmail] = useState('')

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

  const handleClickOpen = i => {
    setOpen(true)
    setSelectedIndex(i)

    setSelectedEmail(data.results[i]?.proxy)
  }

  const handleDialogClose = () => {
    setOpen(false)
  }

  const updateProxy = async newdata => {
    try {
      const response = await api({
        url: `/proxy/${data.results[selectedIndex]?.id}/`,
        method: 'PATCH',
        data: newdata
      })

      toast.success('Proxy обновлён!')
      setOpen(false)
      pagination({ page: 1, page_size: count })
      setPage(1)
    } catch (error) {
      toast.error('Что-то пошло не так!')
    }
  }

  const deleteProxy = async id => {
    try {
      const response = await api({
        url: `/proxy/${id}/`,
        method: 'DELETE'
      })

      toast.success('Proxy удалён!')
      pagination({ page: 1, page_size: count })
      setPage(1)
    } catch (error) {
      toast.error('Не удалось удалить прокси!')
    }
  }

  const checkProxy = async id => {
    try {
      const response = await api({
        url: `/proxy/check/`,
        method: 'GET',
        params: { proxy_id: id }
      })

      console.log(response)

      toast.success('Proxy удалён!')
    } catch (error) {
      toast.error('Что-то пошло не так!')
    }
  }

  return (
    <div>
      <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={handleDialogClose}>
        <div className='p-6 min-w-[500px]'>
          <div className='flex items-center justify-between mb-6'>
            <h4 className=''>Редактировать прокси</h4>

            <span className='text-main-500 hover:cursor-pointer' onClick={handleDialogClose}>
              <Icon type='close' width='24px' />
            </span>
          </div>
          <CustomTextField
            fullWidth
            name='name'
            autoComplete='off'
            placeholder='login:password@ip:port'
            value={selectedEmail}
            onChange={e => setSelectedEmail(e.target.value)}
          />
          <div className='flex items-center justify-end gap-4 mt-4'>
            <Button variant='outlined' color='error' onClick={handleDialogClose}>
              Отменить
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                updateProxy({ proxy: selectedEmail })
              }}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </Dialog>
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
                <span className='flex items-center h-[18px]'>
                  <Icon type='add' width='18' className='' />
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
                          <span className='hover:text-main-500' onClick={() => handleClickOpen(i)}>
                            <Icon type='edit' width={20} />
                          </span>
                          <span className='hover:text-main-500' onClick={() => checkProxy(item.id)}>
                            <Icon type='speed' width={20} />
                          </span>
                          <span className='hover:text-red-500' onClick={() => deleteProxy(item.id)}>
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
            <div className='flex items-center justify-between mt-5'>
              <div className='flex items-center gap-3'>
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
