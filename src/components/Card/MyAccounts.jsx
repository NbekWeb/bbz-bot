'use client'
import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'

import dayjs from 'dayjs'

import CustomTextField from '@core/components/mui/TextField'
import tableStyles from '@core/styles/table.module.css'

const MyAccounts = ({ data = { results: [] }, onFilterChange }) => {
  const [count, setCount] = useState(10)
  const [gender, setGender] = useState('NA')
  const [status, setStatus] = useState('')
  const [pageIndex, setPageIndex] = useState(1)
  const [deliveryPlace, setDeliveryPlace] = useState('')

  const statuses = {
    A: 'Активен',
    AA: 'Чужая активность',
    LA: 'Потеря сессии',
    BA: 'Зарезервирован',
    CA: 'Чистый'
  }

  const statusColor = {
    A: 'green',
    AA: 'warning',
    LA: 'red',
    BA: 'main',
    CA: 'blue'
  }

  // Debounced version of handleChange to send updates to the parent
  const handleChangeDebounced = (field, value) => {
    if (field === 'count') {
      setCount(value)

      onFilterChange({
        page_size: value,
        gender: gender == 'NA' ? '' : gender,
        status,
        page: pageIndex,
        delivery_place: deliveryPlace
      })
    }

    if (field === 'gender') {
      setGender(value)
      onFilterChange({
        page_size: count,
        gender: value == 'NA' ? '' : value,
        status,
        page: pageIndex,
        delivery_place: deliveryPlace
      })
    }

    if (field === 'status') {
      setStatus(value)
      onFilterChange({
        page_size: value,
        gender: gender == 'NA' ? '' : gender,
        status: value,
        page: pageIndex,
        delivery_place: deliveryPlace
      })
    }

    if (field === 'pageIndex') {
      setPageIndex(value)
      onFilterChange({
        page_size: value,
        gender: gender == 'NA' ? '' : gender,
        status,
        page: value,
        delivery_place: deliveryPlace
      })
    }

    if (field === 'deliveryPlace') {
      setDeliveryPlace(value)

      onFilterChange({
        page_size: value,
        gender: gender == 'NA' ? '' : gender,
        status,
        page: pageIndex,
        delivery_place: value
      })
    }
  } // Adjust the debounce delay (in ms)

  useEffect(() => {
    onFilterChange({ page_size: count, gender, status, page: pageIndex })
  }, [])

  return (
    <Card>
      <CardContent>
        <div className='flex items-center justify-between'>
          <span className='text-lg'>Ваши аккаунты</span>
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
        <div className='grid grid-cols-3 gap-6 my-6'>
          <CustomTextField
            id='delivery-place'
            label='Фильтр по ПВЗ'
            placeholder='Введите ПВЗ'
            fullWidth
            value={deliveryPlace} // Bind value to deliveryPlace state
            onChange={e => handleChangeDebounced('deliveryPlace', e.target.value)} // Use debounced function
          />

          <CustomTextField
            select
            id='select-status'
            label='Фильтр по Статусу'
            value={status}
            onChange={e => handleChangeDebounced('status', e.target.value)}
            fullWidth
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Не указан</MenuItem>
            <MenuItem value='A'>Активен</MenuItem>
            <MenuItem value='AA'>Чужая активность</MenuItem>
            <MenuItem value='LA'>Потеря сессии</MenuItem>
            <MenuItem value='BA'>Зарезервирован</MenuItem>
            <MenuItem value='CA'>Чистый</MenuItem>
          </CustomTextField>

          <CustomTextField
            select
            id='select-gender'
            label='Фильтр по Полу'
            value={gender}
            onChange={e => handleChangeDebounced('gender', e.target.value)}
            fullWidth
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value='M'>Мужской</MenuItem>
            <MenuItem value='F'>Женский</MenuItem>
            <MenuItem value='NA'>Не указан</MenuItem>
          </CustomTextField>
        </div>
        <div className='pt-6 overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>ПВЗ </th>
                <th>Телефон</th>
                <th>Пол</th>
                <th>Статус</th>
                <th>Дата обновления</th>
                <th>Дата регистрации</th>
              </tr>
            </thead>
            <tbody>
              {data?.results.length > 0 ? (
                data.results.map((account, index) => (
                  <tr key={index} className='!border-b'>
                    <td>{account.delivery_place || 'нет'}</td>
                    <td>{account.phone_number || 'нет'}</td>
                    <td>
                      <span className={`text-${statusColor[account.status]}-500`}>
                        {account.gender === 'M' ? 'муж' : account.gender === 'F' ? 'жен' : 'нет'}
                      </span>
                    </td>
                    <td className='flex items-center'>
                      <span
                        className={`flex h-6 items-center justify-center rounded-md px-2.5 text-xs text-${statusColor[account.status]}-500 bg-${statusColor[account.status]}-100 `}
                      >
                        {statuses[account.status] || 'нет'}
                      </span>
                    </td>
                    <td>{dayjs(account.update).format('DD.MM.YYYY') || 'нет'}</td>
                    <td>{dayjs(account.date_created).format('DD.MM.YYYY') || 'нет'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='5' className='text-center'>
                    Нет данных
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {data?.results?.length > 0 && (
            <div className='flex items-center justify-between mt-5'>
              <div className='text-sm'>
                {data.results.length} из {data?.count} аккаунтов
              </div>
              <Pagination
                shape='rounded'
                color='primary'
                variant='tonal'
                count={data.count}
                page={1}
                onChange={(_, page) => {
                  handleChangeDebounced('pageIndex', page)
                }}
                showFirstButton
                showLastButton
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default MyAccounts
