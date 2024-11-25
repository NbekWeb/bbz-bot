'use client'
import { useState } from 'react'

import { api } from '@/utils/api'

import Icon from '../icon/Icon'

import CheckArtikul from './CheckArtikul'
import Article from './Article'

const DataCard = () => {
  const [adds, SetAdds] = useState({
    group_name: '',
    one_cart: false,
    articles: []
  })

  const handleSaveCount = (newCount, index) => {
    SetAdds(prev => {
      const updatedArticles = [...prev.articles]
      const currentItems = updatedArticles[index].items

      if (currentItems.length > newCount) {
        // Remove excess items
        updatedArticles[index].items = currentItems.slice(0, newCount)
      } else if (currentItems.length < newCount) {
        // Add missing items
        const itemsToAdd = newCount - currentItems.length

        const newItems = Array.from({ length: itemsToAdd }).map(() => ({
          price: 0,
          count: 0,
          size: '',
          account_gender: '',
          keyword: '',
          delivery_place: ''
        }))
        
        updatedArticles[index].items = [...currentItems, ...newItems]
      }

      return { ...prev, articles: updatedArticles }
    })
  }

  const handleAddArticles = newArticles => {
    SetAdds(prev => ({
      ...prev,
      articles: [...newArticles, ...prev.articles]
    }))
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
        <CheckArtikul onAddArticles={handleAddArticles} />

        {adds.articles.map((item, i) => (
          <Article key={i} item={item} onSaveCount={newCount => handleSaveCount(newCount, i)} />
        ))}
      </div>
    </div>
  )
}

export default DataCard
