import BuyoutAdd  from '@views/BuyoutAdd'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Добавить Выкупы',
  description: 'Dashboard'
}

const BuyoutPage = () => {
  // Vars
  const mode = getServerMode()

  return <BuyoutAdd mode={mode} />
}

export default BuyoutPage
