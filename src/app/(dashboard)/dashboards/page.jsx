// export default function Page() {
//   return <h1>Home page!</h1>
// }

// Component Imports
import Dashboard from '@views/Dashboard'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Дэшборд',
  description: 'Dashboard'
}

const DashboardPage = () => {
  // Vars
  const mode = getServerMode()

  return <Dashboard mode={mode} />
}

export default DashboardPage
