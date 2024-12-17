'use client'
import { useState } from 'react'

import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'

import CustomTextField from '@core/components/mui/TextField'
import tableStyles from '@core/styles/table.module.css'

import CustomAvatar from '@core/components/mui/Avatar'
import Icon from '../icon/Icon'

import Adress from './Adress'

const DataCard = ({ article, onItemUpdate }) => {
  const [count, setCount] = useState(1)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const [open, setOpen] = useState(false)

  const handleDialogClose = () => {
    setOpen(false)
  }

  const openMap = index => {
    setOpen(true)

    setSelectedIndex(index)
  }

  const handleItemChange = (key, value, index) => {
    const updatedItems = [...article.items]

    updatedItems[index][key] = value

    onItemUpdate({ ...article, items: updatedItems })
  }

  const handleCountChange = (e, index) => {
    const value = e.target.value

    if (/^\d+$/.test(value) && parseInt(value) > 0) {
      handleItemChange('count', parseInt(value), index)
    }
  }

  const handleDelete = index => {
    const updatedItems = article.items.filter((_, i) => i !== index)

    onItemUpdate({ ...article, items: updatedItems })
  }

  const genders = ['нет', 'муж', 'жен']

  const handleLocationSelect = address => {
    setOpen(false)
    const updatedItems = [...article.items]

    updatedItems[selectedIndex].delivery_place = address.name
    console.log(updatedItems[selectedIndex].delivery_place)
    onItemUpdate({ ...article, items: updatedItems })
  }

  return (
    <div className='mt-6 '>
      <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={handleDialogClose}>
        <div className='map-w'>
          <Adress onSelectLocation={handleLocationSelect} onClose={handleDialogClose} />
        </div>
      </Dialog>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th className='text-center'>
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
          {article?.items?.map((product, i) => (
            <tr key={i}>
              <td className='text-center'>
                <span
                  className='flex items-center justify-center w-5 border-r border-dashed text-main-500 hover:cursor-pointer opacity-70 hover:opacity-100'
                  onClick={() => handleDelete(i)}
                >
                  <Icon type='delete' width='15px' />
                </span>
              </td>
              <td className='flex justify-center'>
                <div className='flex items-center gap-1 px-1 rounded-sm h-7 bg-grey-100 text-grey-800 max-w-max'>
                  <div
                    className='flex items-center justify-center w-5 h-5 bg-transparent rounded-sm hover:bg-grey-600 hover:text-main-500'
                    onClick={() => handleItemChange('count', Math.max(1, product.count - 1), i)}
                  >
                    <Icon type='minus' width='12px' />
                  </div>
                  <input
                    type='text'
                    value={product.count}
                    onChange={e => handleCountChange(e, i)}
                    className='w-12 text-sm font-medium text-center bg-transparent border border-none rounded-sm outline-none text-main-500'
                  />
                  <div
                    className='flex items-center justify-center w-5 h-5 bg-transparent rounded-sm hover:bg-grey-600 hover:text-main-500'
                    onClick={() => handleItemChange('count', Math.min(100, product.count + 1), i)}
                  >
                    <Icon type='add' width='12px' />
                  </div>
                </div>
              </td>
              <td className='text-center'>
                <CustomTextField
                  select
                  id='select-size'
                  value={product.size}
                  className='!min-w-24'
                  SelectProps={{ displayEmpty: true }}
                  onChange={e => handleItemChange('size', e.target.value, i)}
                >
                  {article?.sizes?.map((size, j) => (
                    <MenuItem value={size} key={j}>
                      {size}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </td>
              <td>
                <CustomTextField
                  select
                  id='select-gender'
                  value={product.account_gender}
                  className='!min-w-full'
                  SelectProps={{ displayEmpty: true }}
                  onChange={e => handleItemChange('account_gender', e.target.value, i)}
                >
                  {genders.map((gender, j) => (
                    <MenuItem value={gender} key={j}>
                      {gender}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </td>
              <td>
                <CustomTextField
                  id={`keyword-${i}`}
                  placeholder='Поисковый Запрос'
                  value={product.keyword || ''}
                  className='!min-w-full'
                  onChange={e => handleItemChange('keyword', e.target.value, i)}
                />
              </td>
              <td>
                {product.delivery_place ? (
                  <span>{product.delivery_place}</span>
                ) : (
                  <Button fullWidth variant='outlined' onClick={() => openMap(i)}>
                    Выбрать
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataCard
