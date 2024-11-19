'use client'

import { useState, useEffect } from 'react'

import dayjs from 'dayjs'

import { api } from '@/utils/api'

import DataCard from '../components/Card/DataCard'
import BudjetCard from '../components/Card/BudjetCard'
import OrderCard from '../components/Card/OrderCard'
import CommentCard from '../components/Card/CommentCard'

import ProgressCard from '../components/Card/Progress'

const Dashboard = () => {
  const [buyoutData, setBuyoutData] = useState(null)
  const [budgetData, setBudgetData] = useState(null)
  const [orderData, setOrderData] = useState(null)
  const [reviewData, setReviewData] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [recieptData, setRecieptData] = useState(null)
  const [loading, setLoading] = useState(0)
  const [periodComment, setPeriodComment] = useState('today')
  const [periodReview, setPeriodReview] = useState('today')

  const changeLoading = value => {
    setLoading(prevLoading => prevLoading + value)
  }

  const handleStatusChange = async newStatus => {
    console.log('Selected Status:', newStatus)
    setPeriodComment(newStatus)
    await fetchReviews(newStatus)
  }

  const handleReviewdate = async newDate => {
    fetchReviewData(dayjs(newDate).format('YYYY-MM-DD'))
  }

  const fetchBuyoutData = async () => {
    changeLoading(1)

    try {
      const response = await api({
        url: '/buyout-task/count/',
        method: 'GET'
      })

      setBuyoutData(response.data)
    } catch (error) {
      console.error('Error fetching buyout data:', error)
    } finally {
      changeLoading(-1)
    }
  }

  const fetchReviewData = async (date = '') => {
    changeLoading(1)

    try {
      const response = await api({
        url: '/review/count/',
        method: 'GET',
        params: { date }
      })

      setReviewData(response.data)
    } catch (error) {
      console.error('Error fetching review data:', error)
    } finally {
      changeLoading(-1)
    }
  }

  const fetchRecieptData = async () => {
    changeLoading(1)

    try {
      const response = await api({
        url: '/receipt/count/',
        method: 'GET'
      })

      setRecieptData(response.data)
    } catch (error) {
      console.error('Error fetching receipt data:', error)
    } finally {
      changeLoading(-1)
    }
  }

  const fetchReviews = async (period = 'today') => {
    changeLoading(1)

    try {
      const response = await api({
        url: '/review/pass_review/',
        method: 'GET',
        params: { period }
      })

      setReviews(response.data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      changeLoading(-1)
    }
  }

  const fetchBudgetData = async () => {
    changeLoading(1)

    try {
      const response = await api({
        url: '/buyout-task/budget/',
        method: 'GET'
      })

      setBudgetData(response.data)
    } catch (error) {
      console.error('Error fetching budget data:', error)
    } finally {
      changeLoading(-1)
    }
  }

  const fetchOrderData = async () => {
    changeLoading(1)

    try {
      const response = await api({
        url: '/receipt/orders_info/',
        method: 'GET'
      })

      setOrderData(response.data)
    } catch (error) {
      console.error('Error fetching order data:', error)
    } finally {
      changeLoading(-1)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      fetchBuyoutData()
      fetchBudgetData()
      fetchOrderData()
      fetchReviewData()
      fetchRecieptData()
      fetchReviews()
    }

    fetchData()
  }, [])

  return (
    <div className='flex flex-col'>
      <div className='grid w-full grid-cols-3 gap-6'>
        <ProgressCard data={buyoutData} title='Выкупы' icon='buyout' onDateChange={handleReviewdate} />
        <ProgressCard data={reviewData} title='Отзывы' icon='comment' onDateChange={handleReviewdate} />
        <ProgressCard data={recieptData} title='Получение' icon='truck' onDateChange={handleReviewdate} />
      </div>
      <div className='grid w-full grid-cols-3 gap-6 mt-6 '>
        <BudjetCard data={budgetData} />
        <OrderCard data={orderData} />
        <CommentCard seriesData={reviews} period={periodComment} onStatusChange={handleStatusChange} />
      </div>
    </div>
  )
}

export default Dashboard
