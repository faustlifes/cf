import { useSelector } from 'react-redux'
import '../../styles/news-management.css'

const SessionExpiredBanner = () => {
  const sessionExpired = useSelector((state) => state.auth.sessionExpired)

  if (!sessionExpired) return null

  return (
    <div className='session-expired-banner'>
      Your session has expired. The page will reload shortly...
    </div>
  )
}

export default SessionExpiredBanner
