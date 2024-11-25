'use client'
import { useState } from 'react'

import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@core/components/mui/TextField'
import tableStyles from '@core/styles/table.module.css'

import CustomAvatar from '@core/components/mui/Avatar'
import Icon from '../icon/Icon'

const DataCard = ({ item }) => {
  const [count, setCount] = useState(1)
  const [date, setDate] = useState(new Date())

  const handleDate = e => setDate(e)

  const incrementCount = () => setCount(prevCount => Math.min(100, prevCount + 1))
  const decrementCount = () => setCount(prevCount => Math.max(1, prevCount - 1))

  return (
    <div className='mt-6'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th className='text-left'>
              <Typography>
                <span className='opacity-0'>n</span>
              </Typography>
            </th>
            <th className='text-center'>
              <Typography>Шт</Typography>
            </th>
            <th className='text-center'>Размеры</th>
            <th className='text-center'>Пол</th>
            <th className='text-center'>Поисковый Запрос</th>
            <th className='text-center'>ПВЗ</th>
          </tr>
        </thead>
        <tbody>
          {item?.items?.map((product, i) => (
            <tr key={i}>
              <td className='text-center'>
                <span className='flex items-center justify-center w-5 border-r border-dashed text-main-500'>
                  <Icon type='delete' width='15px' />
                </span>
              </td>
              <td className='flex justify-center'>
                <div className='flex items-center gap-1 px-1 rounded-sm h-7 bg-grey-100 text-grey-800 max-w-max'>
                  <div
                    className='flex items-center justify-center w-5 h-5 bg-transparent rounded-sm hover:bg-grey-600 hover:text-main-500'
                    onClick={decrementCount}
                  >
                    <Icon type='minus' width='12px' />
                  </div>
                  <span className='flex justify-center text-sm font-semibold text-center min-w-8'>{count}</span>
                  <div
                    className='flex items-center justify-center w-5 h-5 bg-transparent rounded-sm hover:bg-grey-600 hover:text-main-500'
                    onClick={incrementCount}
                  >
                    <Icon type='add' width='12px' />
                  </div>
                </div>
              </td>
              <td className='text-center'>
                <CustomTextField
                  select
                  id='select-count'
                  value={item.sizes?.[0]}
                  className='!min-w-24'
                  SelectProps={{ displayEmpty: true }}
                >
                  {item.sizes.map((size, i) => (
                    <MenuItem value={i} key={i}>
                      {size}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </td>
              <td>
                <CustomTextField
                  select
                  id='select-count'
                  value={1}
                  className='!min-w-24'
                  SelectProps={{ displayEmpty: true }}
                >
                  <MenuItem value={10}>10</MenuItem>
                </CustomTextField>
              </td>
              <td>
                <span className='flex items-center justify-center w-5 border-r border-dashed text-main-500'>
                  <Icon type='delete' width='15px' />
                </span>
              </td>
              <td>
                <div>vibrat</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataCard
