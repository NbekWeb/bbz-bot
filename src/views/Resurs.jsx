'use client'
import { useState, useEffect } from 'react'

import dayjs from 'dayjs'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { toast } from 'react-toastify'

import Icon from '@/components/icon/Icon'
import Proxy from '@/components/Resurs/Proxy'
import Sms from '@/components/Resurs/Sms'
import Capcha from '@/components/Resurs/Capcha'
import Telegram from '@/components/Resurs/Telegram'

import { api } from '@/utils/api'

const DataCard = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [proxyData, setProxyData] = useState({})
  const [page, setPage] = useState(1)
  const [resurs, setResurs] = useState({})
  const [pageSize, setPageSize] = useState(10)

  const handleSelect = index => {
    setSelectedIndex(index)
  }

  const fetchVehicleData = async (params = { page: 1, page_size: 10 }) => {
    try {
      const response = await api({
        url: 'proxy/',
        method: 'GET',
        params
      })

      setProxyData(response.data)
    } catch (error) {
      console.error('Error fetching proxy data:', error)
    }
  }

  const fetchResurs = async () => {
    try {
      const response = await api({
        url: '/account-settings/1/',
        method: 'GET'
      })

      setResurs(response.data)
    } catch (error) {
      console.error('Error fetching proxy data:', error)
    }
  }

  const createProxy = async data => {
    try {
      const response = await api({
        url: 'proxy/',
        method: 'POST',
        data
      })

      toast.success('Прокси создан!')

      fetchVehicleData()
    } catch (error) {
      toast.error('Что-то пошло не так!')
    }
  }

  const updateSms = async (params = {}) => {
    try {
      const response = await api({
        url: '/account-settings/1/',
        method: 'PATCH',
        data: params
      })

      if (params?.capcha_api_key) {
        toast.success(' Изменения сохранены!')
      } else if (params?.sms_api_key) {
        toast.success(' SMS API добавлен!')
      } else {
        toast.success(' Телеграм ресурс добавлен!')
      }

      fetchResurs()
    } catch (error) {
      toast.error('Что-то пошло не так!')
    }
  }

  const handleAddProxy = email => {
    if (email) {
      const newProxyData = {
        proxy: email
      }

      createProxy(newProxyData)
    }
  }

  const handleAddSms = email => {
    if (email) {
      const newSms = {
        sms_api_key: email
      }

      updateSms(newSms)
    }
  }

  const handleAddCapcha = email => {
    if (email) {
      const cap = {
        capcha_api_key: email
      }

      updateSms(cap)
    }
  }

  const handleAddTelegram = tg => {
    if (tg) {
      updateSms(tg)
    }
  }

  const handlePage = pagination => {
    fetchVehicleData({ ...pagination })
  }

  useEffect(() => {
    fetchVehicleData()
    fetchResurs()
  }, [])

  return (
    <div>
      <div className='flex items-center gap-2 mb-8'>
        <span className='text-2xl font-medium'>Ресурсы</span>
        <div className='flex items-center h-full gap-1 pt-1 text-main-500' onClick={() => handleSelect(0)}>
          <Icon type='info' width='24' />
          <Icon type='youtube' width='24' />
        </div>
      </div>
      <Card>
        <CardContent className='flex items-center py-3 '>
          <div className='grid w-full grid-cols-4 gap-4'>
            <div
              className={`flex hover:cursor-pointer items-center justify-center resurs-btn py-2 rounded-md ${
                selectedIndex === 0 ? 'bg-main-500 shadow' : ''
              }`}
              onClick={() => handleSelect(0)}
            >
              <Icon type='proxy' width='24' />
              <span>Прокси</span>
            </div>
            <div
              className={`flex hover:cursor-pointer items-center justify-center resurs-btn py-2 rounded-md ${
                selectedIndex === 1 ? 'bg-main-500 shadow' : ''
              }`}
              onClick={() => handleSelect(1)}
            >
              <Icon type='sms' width='24' />
              <span>Смс</span>
            </div>
            <div
              className={`flex hover:cursor-pointer items-center justify-center resurs-btn py-2 rounded-md ${
                selectedIndex === 2 ? 'bg-main-500 shadow' : ''
              }`}
              onClick={() => handleSelect(2)}
            >
              <Icon type='capcha' width='24' />
              <span>Капча</span>
            </div>
            <div
              className={`flex hover:cursor-pointer items-center justify-center resurs-btn py-2 rounded-md ${
                selectedIndex === 3 ? 'bg-main-500 shadow' : ''
              }`}
              onClick={() => handleSelect(3)}
            >
              <Icon type='tg' width='24' />
              <span>Телеграм</span>
            </div>
          </div>
        </CardContent>
      </Card>
      {selectedIndex === 0 && <Proxy data={proxyData} onAdd={handleAddProxy} pagination={handlePage} />}
      {selectedIndex === 1 && <Sms onAdd={handleAddSms} data={resurs} />}
      {selectedIndex === 2 && <Capcha onAdd={handleAddCapcha} data={resurs} />}
      {selectedIndex === 3 && <Telegram onAdd={handleAddTelegram} data={resurs} />}
    </div>
  )
}

export default DataCard
