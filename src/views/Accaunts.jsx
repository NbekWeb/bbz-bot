'use client'
import { useState, useEffect } from 'react'

import dayjs from 'dayjs'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { toast } from 'react-toastify'

import AccountCard from '@/components/Card/AccountCard'
import RegisCard from '@/components/Card/RegisCard'
import SettingsCard from '@/components/Card/SettingsCard'
import MyAccounts from '@/components/Card/MyAccounts'

import Icon from '../components/icon/Icon'

import './styles.css'

import { api } from '@/utils/api'

const DataCard = () => {
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [loading, setLoading] = useState(0)
  const [account, setAccount] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [accountAll, setAccountAll] = useState(null)
  const [accountCount, setAccountCount] = useState(null)

  const changeLoading = value => {
    setLoading(prevLoading => prevLoading + value)
  }

  const parseTime = timeString => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number)
    const date = new Date()

    date.setHours(hours, minutes, seconds, 0)

    return date
  }

  const fetchAccountData = async () => {
    changeLoading(1)

    try {
      const response = await api({
        url: '/config-create-account/1/',
        method: 'GET'
      })

      setAccount(response.data)

      console.log(response.data)

      setStartTime(parseTime(response.data.from_time))

      setEndTime(parseTime(response.data.to_time))

      console.log(startTime)
    } catch (error) {
      console.error('Error fetching account data:', error)
    } finally {
      changeLoading(-1)
    }
  }

  const fetchAccountCount = async () => {
    changeLoading(1)

    try {
      const response = await api({
        url: '/account/count/',
        method: 'GET'
      })

      setAccountCount(response.data)

      console.log(response.data)
    } catch (error) {
      console.error('Error fetching account data:', error)
    } finally {
      changeLoading(-1)
    }
  }

  const fetchAccountAll = async () => {
    changeLoading(1)

    try {
      const response = await api({
        url: '/account-task-api/count/',
        method: 'GET'
      })

      setAccountAll(response.data)
    } catch (error) {
      console.error('Error fetching account data:', error)
    } finally {
      changeLoading(-1)
    }
  }

  const fetchAccounts = async (params = { page_size: 10, page: 1 }) => {
    changeLoading(1)

    try {
      const response = await api({
        url: '/account/',
        method: 'GET',
        params
      })

      setAccounts(response.data)
    } catch (error) {
      console.error('Error fetching account data:', error)
    } finally {
      changeLoading(-1)
    }
  }

  const handleSave = async (startTime, endTime, number) => {
    console.log('Saved data:', { startTime, endTime, number })

    changeLoading(1)

    try {
      const response = await api({
        url: '/config-create-account/1/',
        method: 'PUT',
        data: {
          accounts_count: number,
          from_time: dayjs(startTime).format('HH:mm:ss'), // Adjusted format to HH:mm:ss
          to_time: dayjs(endTime).format('HH:mm:ss'),
          user: 1
        }
      })

      toast.success('Изменения сохранены!')
      fetchAccountData()
    } catch (error) {
      toast.error('Что-то пошло не так!')
    } finally {
      changeLoading(-1)
    }
  }

  const handleChange = filters => {
    fetchAccounts({ ...filters })
  }

  useEffect(() => {
    fetchAccountData()
    fetchAccountCount()
    fetchAccountAll()
    fetchAccounts()
  }, [])

  useEffect(() => {
    if (startTime) {
      console.log('Updated startTime:', startTime)
    }
  }, [startTime])

  return (
    <div className=''>
      <div className='flex items-center gap-2 mb-8'>
        <span className='text-2xl font-medium'>Аккаунты</span>
        <div className='flex items-center h-full gap-1 pt-1 text-main-500'>
          <Icon type='info' width='24' />
          <Icon type='youtube' width='24' />
        </div>
      </div>
      <div className='grid grid-cols-4 gap-6'>
        <AccountCard data={accountCount} />
        <RegisCard data={accountAll} />
        <div className='col-span-2'>
          <SettingsCard
            startTimeProp={startTime}
            endTimeProp={endTime}
            count={account?.accounts_count}
            saveNew={handleSave}
          />
        </div>
      </div>
      <div className='pt-6'>
        <MyAccounts data={accounts} onFilterChange={handleChange} />
      </div>
    </div>
  )
}

export default DataCard
