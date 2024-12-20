'use client'
import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { toast } from 'react-toastify'

import { api } from '@/utils/api'

import Icon from '../icon/Icon'

import CheckArtikul from './CheckArtikul'
import Article from './Article'
import ArticleCard from './ArticleCard'
import CustomTextField from '@core/components/mui/TextField' // Assuming this is where the TextField component is imported

const DataCard = () => {
  const router = useRouter()

  const [adds, setAdds] = useState({
    group_name: '',
    one_cart: false,
    articles: []
  })

  dayjs.extend(customParseFormat)

  const handleSaveCount = (newCount, index) => {
    setAdds(prev => {
      const updatedArticles = [...prev.articles]
      const currentItems = updatedArticles[index]?.items

      if (currentItems?.length > newCount) {
        // Remove excess items
        updatedArticles[index].items = currentItems.slice(0, newCount)
      } else if (currentItems?.length < newCount) {
        // Add missing items
        const itemsToAdd = newCount - currentItems.length

        const newItems = Array.from({ length: itemsToAdd }).map(() => ({
          price: prev.articles[index]?.price,
          count: 1,
          size: prev.articles[index]?.sizes?.[0],
          account_gender: 'нет',
          keyword: '',
          delivery_place: ''
        }))

        updatedArticles[index].items = [...currentItems, ...newItems]
      }

      return { ...prev, articles: updatedArticles }
    })
  }

  const handleAddArticles = newArticles => {
    setAdds(prev => {
      const updatedAdds = {
        ...prev,
        articles: [...prev.articles, ...newArticles]
      }

      handleSaveCount(1, updatedAdds.articles.length - 1)

      return updatedAdds
    })
  }

  const handleItemUpdate = (updatedItems, index) => {
    setAdds(prev => {
      const updatedArticles = [...prev.articles]

      updatedArticles[index] = updatedItems

      return { ...prev, articles: updatedArticles }
    })
  }

  const saveArticles = async data => {
    try {
      const isDuplicate = data.articles.some((article, index, articles) => {
        return articles.some((a, i) => i !== index && a.date === article.date && a.article === article.article)
      })

      if (isDuplicate) {
        toast.error('На одну дату не может быть несколько одинаковых артикулов!')

        return
      }

      const updatedData = {
        ...data,
        articles: data.articles.map(article => {
          const { sizes, image, date, ...rest } = article
          const formattedDate = dayjs(date, 'DD-MM-YYYY').format('YYYY-MM-DD')

          return { ...rest, date: formattedDate }
        })
      }

      const response = await api({
        url: '/buyout/create/',
        method: 'POST',
        data: updatedData
      })

      toast.success('Выкупы добавлены!')

      router.push('/buyout')
    } catch (error) {
      toast.error('Что-то пошло не так!')
      console.error('Error fetching receipt data:', error)
    }
  }

  const deleteArticle = index => () => {
    setAdds(prev => {
      const updatedArticles = prev.articles.filter((_, i) => i !== index)

      return { ...prev, articles: updatedArticles }
    })
  }

  return (
    <div>
      <div className='flex items-center gap-2 mb-8'>
        <span className='text-2xl font-medium'>Добавить Выкупы</span>
        <div className='flex items-center h-full gap-1 pt-1 text-main-500'>
          <Icon type='info' width='24' />
          <Icon type='youtube' width='24' />
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        <CheckArtikul onAddArticles={handleAddArticles} data={adds} />

        {adds.articles.map((item, i) => (
          <Article
            key={i}
            onDeleteArticle={deleteArticle(i)}
            article={item}
            onSaveCount={newCount => handleSaveCount(newCount, i)}
            onItemUpdate={updatedItems => handleItemUpdate(updatedItems, i)}
          />
        ))}

        {adds.articles.length > 0 && (
          <div className='mt-6'>
            <Card>
              <CardContent>
                <div className='grid grid-cols-4 gap-6 mb-10'>
                  {adds.articles.map((item, i) => (
                    <div key={i} className=''>
                      <ArticleCard full={true} article={item} type='row' className='' />
                    </div>
                  ))}
                </div>

                <div className='flex gap-5 mb-4'>
                  <div className='flex-grow'>
                    <CustomTextField
                      fullWidth
                      name='name'
                      autoComplete='off'
                      placeholder='Введите название группы'
                      value={adds.group_name}
                      onChange={e => setAdds(prev => ({ ...prev, group_name: e.target.value }))}
                    />
                  </div>

                  <div className='flex items-center'>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={adds.one_cart}
                          onChange={() => setAdds(prev => ({ ...prev, one_cart: !prev.one_cart }))}
                        />
                      }
                      label='Выкупить одной корзиной'
                    />
                  </div>
                </div>
                <Button
                  fullWidth
                  variant='contained'
                  onClick={() => {
                    saveArticles({ ...adds })
                  }}
                >
                  Добавить
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default DataCard
