'use client'
import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { api } from '@/utils/api'

import CustomAvatar from '@core/components/mui/Avatar'
import Icon from '../icon/Icon'
import Top from './Top'
import Statis from './Statis'
import MainTable from './MainTable'

const DataCard = () => {
  const [buyout, setBuyout] = useState(null)
  const [buyoutData, setBuyoutData] = useState(null)
  const [loading, setLoading] = useState(true)

  const handlePage = pagination => {
    fetchBuyoutData({ ...pagination })
  }

  const fetchBuyoutData = async (params = { page: 1, page_size: 10 }) => {
    try {
      const response = await api({
        url: '/buyout/',
        method: 'GET',
        params
      })

      setBuyout(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching receipt data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBuyout = async () => {
    try {
      const response = await api({
        url: '/buyout-task/count/',
        method: 'GET'
      })

      setBuyoutData(response.data)
    } catch (error) {
      console.error('Error fetching buyout data:', error)
    } finally {
    }
  }

  useEffect(() => {
    fetchBuyoutData()
    fetchBuyout()
  }, [])

  return (
    <div>
      <div className='flex items-center gap-2 mb-8'>
        <span className='text-2xl font-medium'>Выкупы</span>
        <div className='flex items-center h-full gap-1 pt-1 text-main-500'>
          <Icon type='info' width='24' />
          <Icon type='youtube' width='24' />
        </div>
      </div>
      <div className='flex flex-col gap-12'>
        <Top />
        <Statis buyout={buyoutData} />
        <MainTable data={buyout} pagination={handlePage} loading={loading} />
      </div>
    </div>
  )
}

export default DataCard
