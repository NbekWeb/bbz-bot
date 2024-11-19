import { useState } from 'react'

import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@core/components/mui/TextField'
import AppReactApexCharts from './AppReactApexCharts'

const CommentCard = ({ seriesData, onStatusChange, period }) => {
  const { success, denied, total } = seriesData || { success: 0, denied: 0, total: 0 }
  const theme = useTheme()

  const textSecondary = 'var(--mui-palette-text-secondary)'
  const successColor = 'var(--mui-palette-success-main)'

  const options = {
    colors: [
      successColor,
      '#7367F0',
      'rgba(var(--mui-palette-success-mainChannel) / 0.5)',
      'var(--mui-palette-success-lightOpacity)'
    ],
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { enabled: true, theme: 'false' },
    dataLabels: { enabled: false },
    labels: ['Проверено', 'Не найдено', 'Decor', 'Fashion'],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    grid: { padding: { top: -22, bottom: -18 } },
    plotOptions: {
      pie: {
        customScale: 0.8,
        expandOnClick: false,
        donut: {
          size: '73%',
          labels: {
            show: true,
            name: {
              offsetY: 25,
              color: textSecondary,
              fontFamily: theme.typography.fontFamily
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              formatter: val => `${val}`,
              color: 'var(--mui-palette-text-primary)',
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.h3.fontSize
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Общий',
              color: '#999CA6',
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.body1.fontSize
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: { chart: { width: 200, height: 237 } }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: { chart: { width: 150, height: 199 } }
      }
    ]
  }

  const [status, setStatus] = useState(period)

  const handleStatusChange = e => {
    const newStatus = e.target.value

    setStatus(newStatus)

    onStatusChange(newStatus)
  }

  return (
    <Card>
      <CardContent className='h-full '>
        <div className='flex flex-col  h-full'>
          <div className='flex items-center justify-between gap-2'>
            <span>Прохождение отзывов</span>
            <CustomTextField
              select
              id='select-status'
              value={status}
              onChange={handleStatusChange}
              className=''
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem value='today'>Сегодня</MenuItem>
              <MenuItem value='yesterday'>Вчера</MenuItem>
              <MenuItem value='week'>7 дней</MenuItem>
              <MenuItem value='30_days'>30 дней</MenuItem>
              <MenuItem value='month'>Этот месяц</MenuItem>
              <MenuItem value='last_month'>Прошлый месяц</MenuItem>
            </CustomTextField>
          </div>
          {total === 0 ? (
            <div className='text-center text-gray-500 mt-4 h-full flex items-center justify-center flex-grow'>
              Ничего в этот период
            </div>
          ) : (
            <AppReactApexCharts type='donut' width={150} height={177} series={[success, denied]} options={options} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CommentCard
