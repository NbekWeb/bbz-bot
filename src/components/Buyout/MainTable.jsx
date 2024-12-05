'use client'
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'

import { Spin } from 'antd'

import CustomTextField from '@core/components/mui/TextField'
import tableStyles from '@core/styles/table.module.css'
import CustomAvatar from '@core/components/mui/Avatar'
import Icon from '../icon/Icon'

const DataCard = ({ data = {}, pagination, loading = true }) => {
  const [count, setCount] = useState(10)
  const [page, setPage] = useState(1)

  const statuses = {
    not_start: 'Не начато',
    progress: ' В процессе',
    done: 'Выполнена',
    error: 'Ошибка',
    delayed: 'Отложена'
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

  return (
    <Card>
      <CardContent>
        <div>
          <div className='flex items-center justify-between pb-6'>
            <span>Задачи по Выкупам</span>
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
          <div className='relative min-h-44'>
            <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
              <Spin spinning={loading} />
            </div>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th className='text-left'>Товар</th>
                  <th className='text-left'>Шт</th>
                  <th className='text-left'>Размер</th>
                  <th className='text-left'>Поисковый Запрос</th>
                  <th className='text-left'>Пол</th>
                  <th className='text-left'>ПВЗ</th>
                  <th className='text-left'>Статус</th>
                  <th className='text-left'>Цена</th>
                </tr>
              </thead>
              <tbody>
                {data?.results?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Typography>
                        <span className='flex items-center gap-3'>
                          <img src={item.image ? item.image : '/images/net.jpg'} className='rounded-md w-9 h-9' />
                          <div className='max-w-44'>
                            <p className=' limit1'>{item?.name}</p>
                            <span className='flex items-center justify-between gap-5'>
                              <span className='text-main-500'>{item?.article}</span>
                              <span
                                className={`rounded-sm px-2 py-1 ${item?.status == 'progress' ? 'bg-main-100 text-main-500' : item?.status == 'not_start' ? 'text-warning-500 bg-warning-100' : item?.status == 'done' ? 'bg-green-100 text-green-500' : item?.status == 'delayed' ? 'text-red-500 text-red-100' : 'bg-grey-100 text-grey-800'}`}
                              >
                                {item?.price} ₽
                              </span>
                            </span>
                          </div>
                        </span>
                      </Typography>
                    </td>
                    <td>
                      <Typography>{item?.count}</Typography>
                    </td>
                    <td>
                      <Typography>{item?.size}</Typography>
                    </td>
                    <td>
                      <Typography>{item?.keyword}</Typography>
                    </td>
                    <td>
                      <Typography>{item?.buyout?.account_gender}</Typography>
                    </td>
                    <td>
                      <Typography>{item?.buyout?.delivery_place}</Typography>
                    </td>
                    <td>
                      <Typography>
                        <span
                          className={`rounded-sm px-2 py-1 ${item?.status == 'progress' ? 'bg-main-100 text-main-500' : item?.status == 'not_start' ? 'text-warning-500 bg-warning-100' : item?.status == 'done' ? 'bg-green-100 text-green-500' : item?.status == 'delayed' ? 'text-red-500 text-red-100' : 'bg-grey-100 text-grey-800'}`}
                        >
                          {statuses[item?.status]}
                        </span>
                      </Typography>
                    </td>
                    <td>
                      <Typography>{item?.price}</Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex justify-end pt-6 border-t'>
              <Pagination
                shape='rounded'
                color='primary'
                variant='tonal'
                count={Math.ceil(data?.count / count)}
                page={page}
                onChange={(_, page) => {
                  handleChangeDebounced('page', page)
                }}
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DataCard
