'use client'
import { useState, useEffect } from 'react'

import Link from 'next/link'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import CustomTextField from '@core/components/mui/TextField'
import tableStyles from '@core/styles/table.module.css'

import AppReactDatepicker from '../Card/AppReactDatepicker'
import Icon from '../icon/Icon'

import CustomAvatar from '@core/components/mui/Avatar'

import ArticleTable from './ArticleTable'
import ArticleCard from './ArticleCard'

const DataCard = ({ article = {}, onSaveCount, onItemUpdate, onDeleteArticle }) => {
  const [date, setDate] = useState(new Date())
  const [full, setFull] = useState(false)
  const [count, setCount] = useState(1)

  dayjs.extend(customParseFormat)

  const incrementCount = () => setCount(prevCount => Math.min(100, prevCount + 1))
  const decrementCount = () => setCount(prevCount => Math.max(1, prevCount - 1))

  const handleSave = () => {
    if (onSaveCount) {
      onSaveCount(count)
    }
  }

  const handleItemUpdate = updatedItems => {
    if (onItemUpdate) {
      const updatedArticle = { ...article, items: updatedItems?.items }

      onItemUpdate(updatedArticle)
    }
  }

  const handleDate = e => {
    setDate(e)

    if (onItemUpdate) {
      const updatedArticle = {
        ...article,
        date: dayjs(e).format('DD-MM-YYYY')
      }

      onItemUpdate(updatedArticle)
    }
  }

  const handleDeleteArticle = () => {
    if (onDeleteArticle) {
      onDeleteArticle()
    }
  }

  useEffect(() => {
    if (article.date) {
      const parsedDate = dayjs(article.date, 'DD-MM-YYYY').toDate()

      setDate(parsedDate)
    }
  }, [article.date])

  return (
    <Card>
      <CardContent>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 h-11'>
            <div className='flex flex-col items-center justify-center h-full'>
              <CustomAvatar skin='light' variant='rounded' size={20} onClick={handleDeleteArticle}>
                <span className='pt-1 text-main-500 hover:cursor-pointer'>
                  <Icon type='delete' width='14' />
                </span>
              </CustomAvatar>
            </div>
            <img src={article?.image || '/images/net.jpg'} className='h-10 rounded-sm' />
            <div className='flex flex-col justify-between h-full'>
              <span className='text-sm limit1 max-w-32'>{article?.name}</span>
              <div className='flex items-center gap-5'>
                <a href={`https://www.wildberries.ru/catalog/${article?.article}/detail.aspx`} target="_blank" className='hover:underline hover:underline-offset-2 text-main-500'>
                  <span className='text-xs '>{article?.article} </span>
                </a>
                <span className='px-2 py-0.5 text-xs rounded-sm bg-grey-100 text-grey-800'>{article?.price} ₽</span>
              </div>
            </div>
            <AppReactDatepicker
              selected={date}
              id='basic-input'
              onChange={handleDate}
              placeholderText='Click to select a date'
              customInput={<CustomTextField fullWidth />}
            />
            <div className='flex items-center gap-1 px-1 rounded-sm h-9 bg-grey-100 text-grey-800'>
              <div
                className='flex items-center justify-center w-5 h-5 bg-transparent rounded-sm hover:bg-grey-600 hover:text-main-500'
                onClick={decrementCount}
              >-
              </div>
              <span className='flex justify-center text-sm font-semibold text-center min-w-8'>{count}</span>
              <div
                className='flex items-center justify-center w-5 h-5 bg-transparent rounded-sm hover:bg-grey-600 hover:text-main-500'
                onClick={incrementCount}
              >
                <Icon type='add' width='12px' />
              </div>
              <div className='flex items-center px-1 pt-1.5 text-main-500' onClick={handleSave}>
                <Icon type='save' width='22px' />
              </div>
            </div>
          </div>
          <div
            className={`${!full ? '' : 'rotate-180'} relative hover:cursor-pointer p-1flex items-center justify-center `}
            onClick={() => {
              setFull(!full)
            }}
          >
            <Icon type='chevron' width='22px' />
          </div>
        </div>
        {full && <ArticleTable article={article} onItemUpdate={handleItemUpdate} />}
        <ArticleCard full={full} article={article} />
      </CardContent>
    </Card>
  )
}

export default DataCard
