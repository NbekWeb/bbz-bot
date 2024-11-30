// export default function Page() {
//   return <h1>Home page!</h1>
// }

// Component Imports
import Accaunts from '@views/Accaunts'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Аккаунты',
  description: 'Dashboard'
}

const AccauntsPage = () => {
  // Vars
  const mode = getServerMode()

  return <Accaunts mode={mode} />
}

export default AccauntsPage
