import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import '../../styles/news-management.css'

const SessionExpiredBanner = () => {
  const sessionExpired = useSelector((state) => state.auth.sessionExpired)

  useEffect(() => {
    if (sessionExpired) {
      const timer = setTimeout(() => window.location.reload(), 3000)
      return () => clearTimeout(timer)
    }
  }, [sessionExpired])

  if (!sessionExpired) return null

  return (
    <div className='session-expired-banner'>
      Your session has expired. The page will reload shortly...
    </div>
  )
}

export default SessionExpiredBanner
