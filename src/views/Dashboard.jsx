'use client'

import { useState, useEffect } from 'react'

import { api } from '@/utils/api'
import LogisticsVehicleOverview from './LogisticsVehicleOverview'

const Dashboard = () => {
  const [vehicleData, setVehicleData] = useState([])

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await api({
          url: 'buyout-task/',
          method: 'GET'
        })

        setVehicleData(response.data.results)
      } catch (error) {
        console.error('Error fetching vehicle data:', error)
      }
    }


    fetchVehicleData()
  }, [])


  return (
    <div className='flex'>
       {vehicleData.length > 0 && (
        <div>
          <h2>Vehicle Data</h2>
          <p>Count: {vehicleData[0].count}</p>
        </div>
      )}

      {vehicleData.map((vehicle, index) => (

        <LogisticsVehicleOverview
          key={index}
          title='Custom Vehicle Overview'
          data={[
            {
              icon: 'tabler-car',
              heading: 'On the way',
              time: '2hr 10min',
              progressColor: 'action',
              progressColorVariant: 'hover',
              progressData: '39.7%',
              widthClass: 'is-[39.7%]'
            }
          ]}
        />
      ))}

      <LogisticsVehicleOverview />
      <LogisticsVehicleOverview />
      <LogisticsVehicleOverview />
    </div>
  )
}

export default Dashboard
