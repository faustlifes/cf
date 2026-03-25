import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchNews } from '../actions/newsActions'

const NewsView = () => {
  const { id } = useParams()
  const data = useSelector((state) =>
    state.news.data.find((item) => String(item.id) === String(id))
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (!data) {
      dispatch(fetchNews('/api/news'))
    }
  }, [])

  return (
    <section>
      <div
        className='light-bg'
        style={{ paddingTop: '100px', height: '100vh' }}
      >
        <div className='container'>
          <div className='title-content'>
            <h1>{data?.title}</h1>
            <hr />
            <hr />
          </div>
          <h3>Date: {data?.date}</h3>
          <p>{data?.text}</p>
          <div className='news-btn-container'>
            <Link to='/#news'>
               <span className='btn news-load-btn'>Back</span>
             </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsView
