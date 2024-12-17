'use client'
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'

import dayjs from 'dayjs'

import { toast } from 'react-toastify'

import { api } from '@/utils/api'

import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'
import Icon from '../icon/Icon'

import AppReactDatepicker from '../Card/AppReactDatepicker'

const DataCard = ({ onAddArticles, data }) => {
  const [artikul, setArtikul] = useState('')
  const [date, setDate] = useState(new Date())
  const [count, setCount] = useState(1)

  const theme = useTheme()

  const handleDate = e => setDate(e)

  const incrementCount = () => setCount(prevCount => Math.min(10000, prevCount + 1))
  const decrementCount = () => setCount(prevCount => Math.max(1, prevCount - 1))

  const checkArticle = async (data, callback) => {
    try {
      const response = await api({
        url: '/parser/info/',
        method: 'POST',
        data
      })

      if (response.data.article) {
        const newArticle = {
          article: response.data.article,
          image: response.data.image,
          name: response.data.name,
          price: response.data.price,
          sizes: response.data.sizes,
          date: dayjs(date).format('DD-MM-YYYY'),
          items: []
        }

        const articlesToAdd = Array(count).fill(newArticle)

        if (onAddArticles) {
          onAddArticles(articlesToAdd)
        }

        toast.success('Артикул добавлен!')
      } else {
        toast.error('Артикул не найден!')
      }

      if (callback) callback()
    } catch (error) {
      toast.error('Что-то пошло не так!')
    }
  }

  const checkAdding = () => {
    const formattedDate = dayjs(date).format('DD-MM-YYYY')

    const isDuplicate = data.articles.some(article => article.date == formattedDate && article.article == artikul)

    if (isDuplicate) {
      toast.warning('Эти данные уже существуют!')

      return
    } else {
      checkArticle({ article: artikul }, () => {
        setArtikul('')
        setCount(1)
      })
    }
  }

  return (
    <Card>
      <CardContent>
        <div className='flex items-center gap-5'>
          <div className='flex items-center gap-0 adding'>
            <div className='w-52'>
              <CustomTextField
                fullWidth
                name='name'
                autoComplete='off'
                placeholder='Артикул или ссылка'
                value={artikul}
                onChange={e => setArtikul(e.target.value)}
              />
            </div>
            <div
              className={`flex items-center px-2 border rounded-r-lg h-9 shadow-c ${
                theme.palette.mode === 'light' ? 'border-grey-400' : 'border-grey-700'
              }`}
            >
              <span
                className='flex items-center w-6 h-6 p-1 px-2 rounded-md hover:cursor-pointer hover:bg-grey-600 hover:text-main-500'
                onClick={decrementCount}
              >
                -
              </span>
              <input
                type='number'
                min='1'
                value={count}
                onChange={e => {
                  const value = e.target.value

                  if (/^\d+$/.test(value) && Number(value) >= 1) {
                    setCount(Number(value))
                  } else if (value === '') {
                    setCount('')
                  }
                }}
                onBlur={() => {
                  if (count === '' || count < 1) setCount(1)
                }}
                onKeyDown={e => {
                  if (
                    ['e', 'E', '+', '-', '.', ','].includes(e.key) ||
                    (e.key === 'ArrowUp' && count >= 100) ||
                    (e.key === 'ArrowDown' && count <= 1)
                  ) {
                    e.preventDefault()
                  }
                }}
                className='min-w-12 bg-transparent text-main-500 max-w-12 px-3 flex border-none outline-none text-center'
              />
              <span
                className='flex items-center w-6 h-6 p-1 px-2 rounded-md hover:cursor-pointer hover:bg-grey-600 hover:text-main-500'
                onClick={incrementCount}
              >
                +
              </span>
            </div>
          </div>

          <AppReactDatepicker
            dateFormat='dd/MM/YYYY'
            selected={date}
            id='basic-input'
            onChange={handleDate}
            placeholderText='Click to select a date'
            customInput={
              <div className='flex items-center relative'>
                <CustomTextField fullWidth value={dayjs(date).format('DD/MM/YYYY')} />
                <span className='absolute right-2 transform -translate-y-1/2 top-1/2 pt-1'>
                  <Icon type='calendar' width={20} />
                </span>
              </div>
            }
          />
          <div className='w-24'>
            <Button
              fullWidth
              variant='contained'
              onClick={() => {
                checkAdding()
              }}
            >
              Добавить
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DataCard
