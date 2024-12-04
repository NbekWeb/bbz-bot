'use client'
import { useState } from 'react'

import Icon from '../icon/Icon'

const DataCard = ({ full, article = {}, type = 'line' }) => {
  const totalItemCount = article?.items?.reduce((acc, item) => acc + (item?.count || 0), 0) || 0
  const genders = ['случайный', 'муж', 'жен']

  const genderTotals = genders.reduce((acc, gender) => {
    acc[gender] =
      article?.items?.reduce((total, item) => {
        return total + (item?.account_gender === gender ? item?.count || 0 : 0)
      }, 0) || 0

    return acc
  }, {})

  const keywordTotals = article?.items?.reduce((acc, item) => {
    if (item?.keyword) {
      acc[item.keyword] = (acc[item.keyword] || 0) + (item?.count || 0)
    }

    return acc
  }, {})

  const sizeTotals = article?.items?.reduce((acc, item) => {
    if (item?.size) {
      acc[item.size] = (acc[item.size] || 0) + (item?.count || 0)
    }

    return acc
  }, {})

  const hasSize = Object.keys(sizeTotals).length > 0

  const hasKeywords = Object.keys(keywordTotals).length > 0

  return
  ;<div
    className={`flex flex-col  pt-3 pb-6 mt-6 ${type == 'line' ? 'border-t border-dashed ' : 'border rounded-md p-2'}`}
  >
    <div className={`flex items-center gap-3 mb-6 h-11 ${!full && 'hidden'} `}>
      <img src={article.image || '/images/net.jpg'} className='h-10 rounded-sm' />
      <div className={`flex flex-col justify-between h-full ${type == 'line' ? '' : 'max-w-[calc(100%-52px)]'}`}>
        <p className={`text-sm limit1   ${type == 'line' ? '' : ' '}} `}> {article?.name}</p>
        <div className='flex items-center justify-between w-full gap-5'>
          <span className='text-xs text-main-500'> {article?.article} </span>
          <span className='px-2 py-0.5 text-xs rounded-sm bg-grey-100 text-grey-800'>{article?.price}₽</span>
        </div>
      </div>
    </div>
    <div className={`grid ${type == 'line' ? 'grid-cols-4' : 'grid-cols-1'} gap-6`}>
      <div className={`flex flex-col gap-1 ${type != 'line' && 'border-t pt-1'}`}>
        <span className='text-sm'>Выкупов: {article?.items?.length}</span>
        <span className='text-sm'>Количество: {totalItemCount}</span>
        <span className='text-sm'>Сумма: {article.price * totalItemCount} ₽</span>
      </div>
      <div className={`flex flex-col gap-1 ${type != 'line' && 'border-t pt-1'}`}>
        <span className='text-sm'>Пол</span>
        {genders.map((gender, i) => (
          <span className='text-sm' key={i}>
            {gender}: {genderTotals[gender]}
          </span>
        ))}
      </div>
      <div className={`flex flex-col gap-1 ${type != 'line' && 'border-t pt-1'}  ${!hasSize && 'hidden'}`}>
        <span className='text-sm'>Размеры</span>
        {Object.entries(sizeTotals).map(([size, count]) => (
          <span className='flex text-sm' key={size}>
            <span className='limit1'>{size}</span>
            <span className='min-w-10'> : {count}</span>
          </span>
        ))}
      </div>
      <div className={`flex flex-col gap-1 ${type != 'line' && 'border-t pt-1'} ${!hasKeywords && 'hidden'}`}>
        <span className='text-sm'>Поисковые запросы</span>
        {Object.entries(keywordTotals).map(([keyword, count]) => (
          <span className='flex text-sm ' key={keyword}>
            <span className='limit1'>{keyword.split(' ')[0]}</span>
            <span className='min-w-10'>: {count}</span>
          </span>
        ))}
      </div>
    </div>
  </div>
}

export default DataCard
