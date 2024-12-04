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

  const incrementCount = () => setCount(prevCount => Math.min(100, prevCount + 1))
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
    const isDateDuplicate = data.articles.some(article => article.date === formattedDate)

    if (isDateDuplicate) {
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
              <span className='px-2 hover:cursor-pointer' onClick={decrementCount}>
                -
              </span>
              <span className='flex px-3 font-semibold min-w-12'>{count}</span>
              <span className='flex px-2 hover:cursor-pointer' onClick={incrementCount}>
                +
              </span>
            </div>
          </div>

          <AppReactDatepicker
            selected={date}
            id='basic-input'
            onChange={handleDate}
            placeholderText='Click to select a date'
            customInput={<CustomTextField fullWidth />}
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
