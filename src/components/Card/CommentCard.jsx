import { useState, useEffect, useRef } from 'react'

import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Pagination from '@mui/material/Pagination'

import CustomTextField from '@core/components/mui/TextField'
import tableStyles from '@core/styles/table.module.css'

import { api } from '@/utils/api'

import AppReactApexCharts from './AppReactApexCharts'

const CommentCard = ({ seriesData, onStatusChange, period }) => {
  let { success, denied, total } = seriesData || { success: 0, denied: 0, total: 0 }

  if (total === 0) {
    total = 121
    denied = 30
    success = 91
  }

  const theme = useTheme()

  const textSecondary = 'var(--mui-palette-text-secondary)'
  const successColor = 'var(--mui-palette-success-main)'

  const options = {
    stroke: { width: 0 },
    labels: ['Проверено', 'Не найдено'],
    colors: [
      successColor,
      '#7367F0',
      'rgba(var(--mui-palette-success-mainChannel) / 0.5)',
      'var(--mui-palette-success-lightOpacity)'
    ],
    dataLabels: {
      enabled: true,
      formatter: val => `${Math.round(val)}%`,
      fontSize: '1rem'
    },
    legend: {
      show: false
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1rem'
            },
            value: {
              fontSize: '1rem',
              color: textSecondary,
              formatter: val => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '1rem',
              label: 'Всего',

              color: 'var(--mui-palette-text-primary)'
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 184
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 184
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  const [status, setStatus] = useState(period)
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [article, setArticle] = useState([])
  const debounceTimer = useRef(null)

  const handleStatusChange = e => {
    const newStatus = e.target.value

    setStatus(newStatus)

    onStatusChange(newStatus)
  }

  const handleSearch = value => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      fetchBuyoutData(value, page)
    }, 300) // Adjust debounce delay (in ms) as needed
  }

  const onSearchInputChange = event => {
    const value = event.target.value

    setSearchQuery(value)
    handleSearch(value) // Trigger the debounced function
  }

  const fetchBuyoutData = async (article = '', page = 1, page_size = 5) => {
    try {
      const response = await api({
        url: '/review/free_review/',
        method: 'GET',
        params: { article, page, page_size }
      })

      // console.log(response.data.results,'s')

      setArticle(response.data.results)
    } catch (error) {
      console.error('Error fetching buyout data:', error)
    } finally {
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      fetchBuyoutData()
    }

    fetchData()
  }, [])

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  return (
    <div className='h-full '>
      <Card className='h-full'>
        <CardContent className='h-full '>
          <div className='flex gap-0'>
            <div className='flex-grow pr-2 border-r'>
              <div className='flex items-center justify-between gap-10'>
                <span>Доступно отзывов</span>
                <CustomTextField
                  id='input-with-icon-adornment'
                  className='min-w-[200px] w-1/3 p-2'
                  type='search'
                  value={searchQuery}
                  onChange={onSearchInputChange}
                  placeholder='Поиск'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='tabler-search' />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div className='mt-1'>
                <table className={tableStyles.table}>
                  <thead>
                    <tr className='border-b'>
                      <th className='text-left'>Артикул</th>
                      <th className='text-left'>Всего</th>
                      <th className='text-left'>ж\м</th>
                      <th className='text-left'>Тексты</th>
                    </tr>
                  </thead>
                  <tbody>
                    {article?.data?.map((item, i) => (
                      <tr className='border-b' key={i}>
                        <td>
                          <div className='flex items-center gap-2'>
                            <img src={item.image || '/images/net.jpg'} className='rounded-md h-9 w-9' />
                            <div className='flex flex-col justify-between text-sm max-w-32'>
                              <span className='limit1 '>{item.name || 'Без имени'}</span>
                              <a
                                href={`https://www.wildberries.ru/catalog/${item.article}/detail.aspx`}
                                target='_blank'
                                className='text-xs text-main-500 hover:underline hover:underline-offset-2'
                              >
                                {item.article}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>{item?.total}</td>
                        <td>{item?.gender_info}</td>
                        <td>{item?.text_free}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='flex flex-wrap items-center justify-between gap-6 mt-6'>
                  <div>
                    {article?.data?.length} из {article?.total} артикулов
                  </div>
                  <Pagination
                    shape='rounded'
                    color='primary'
                    variant='tonal'
                    count={Math.ceil(article?.total / 5)}
                    page={page}
                    onChange={(_, page) => {
                      setPage(page)
                      fetchBuyoutData(searchQuery, page)
                    }}
                    showFirstButton
                    showLastButton
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-between pl-2 '>
              <div className='flex items-center justify-between gap-10'>
                <span>Прохождение отзывов</span>
                <div className='flex justify-end max-w-44 min-w-44'>
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
              </div>

              <div className=''>
                <AppReactApexCharts type='donut' height={220} options={options} series={[success, denied]} />
              </div>

              <div className='mt-6 overflow-x-auto'>
                <table className={tableStyles.table}>
                  <tbody>
                    <tr>
                      <td className='flex items-center gap-2 pis-0'>
                        <Typography color='text.primary'>
                          <span className='flex items-center gap-1'>
                            <span className='flex w-3 h-3 rounded-full bg-grey-500'></span>
                            Проверено
                          </span>
                        </Typography>
                      </td>

                      <td className='text-end pie-0'>
                        <Typography>{total}</Typography>
                      </td>
                    </tr>
                    <tr>
                      <td className='flex items-center gap-2 pis-0'>
                        <Typography color='text.primary'>
                          <span className='flex items-center gap-1'>
                            <span className='flex w-3 h-3 bg-green-500 rounded-full'></span>
                            Прошло
                          </span>
                        </Typography>
                      </td>

                      <td className='text-end pie-0'>
                        <Typography>{success}</Typography>
                      </td>
                    </tr>

                    <tr>
                      <td className='flex items-center gap-2 pis-0'>
                        <Typography color='text.primary'>
                          <span className='flex items-center gap-1'>
                            <span className='flex w-3 h-3 rounded-full bg-main-500'></span>Не найдено
                          </span>
                        </Typography>
                      </td>

                      <td className='text-end pie-0'>
                        <Typography>{denied}</Typography>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CommentCard
