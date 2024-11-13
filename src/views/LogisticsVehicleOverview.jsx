'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import styles from './styles.module.css'

// Define the component with props
const LogisticsVehicleOverview = ({ data = [], title = 'Vehicle ' }) => {
  return (
    <Card>
      <CardHeader title={title} action={<OptionMenu options={['Refresh', 'Update', 'Share']} />} />
      <CardContent>
        <div className='flex flex-col gap-6'>
          <div className='flex is-full'>
            {data.map((item, index) => (
              <div
                key={index}
                className={classnames(item.widthClass, styles.linearRound, 'flex flex-col gap-[34px] relative')}
              >
                <Typography className={classnames(styles.header, 'relative max-sm:hidden')}>{item.heading}</Typography>
                <LinearProgress
                  variant='determinate'
                  value={-1}
                  className={classnames('bs-[46px]')}
                  // eslint-disable-next-line lines-around-comment
                  // @ts-ignore
                  sx={{
                    backgroundColor: `var(--mui-palette-${item.progressColor}-${item.progressColorVariant})`,
                    borderRadius: 0
                  }}
                />
                <Typography
                  variant='body2'
                  className='absolute font-medium bottom-3 start-2'
                  sx={{
                    color: theme =>
                      index === 0
                        ? 'var(--mui-palette-text-primary)'
                        : item.progressColor === 'info'
                          ? 'var(--mui-palette-common-white)'
                          : // eslint-disable-next-line lines-around-comment
                            // @ts-ignore
                            theme.palette.getContrastText(theme.palette[item.progressColor][item.progressColorVariant])
                  }}
                >
                  {item.progressData}
                </Typography>
              </div>
            ))}
          </div>
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className='flex items-center gap-2 pis-0'>
                      <i className={classnames(item.icon, 'text-textPrimary text-[1.5rem]')} />
                      <Typography color='text.primary'>{item.heading}</Typography>
                    </td>
                    <td className='text-end'>
                      <Typography color='text.primary' className='font-medium'>
                        {item.time}
                      </Typography>
                    </td>
                    <td className='text-end pie-0'>
                      <Typography>{item.progressData}</Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LogisticsVehicleOverview
