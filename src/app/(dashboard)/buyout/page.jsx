import Buyout from '@views/Buyout'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Выкупы',
  description: 'Dashboard'
}

const BuyoutPage = () => {
  // Vars
  const mode = getServerMode()

  return <Buyout mode={mode} />
}

export default BuyoutPage
