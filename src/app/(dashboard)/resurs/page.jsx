import Resurs from '@views/Resurs'

import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Ресурсы',
  description: 'Dashboard'
}

const ResursPage = () => {
  const mode = getServerMode()

  return <Resurs mode={mode} />
}

export default ResursPage
