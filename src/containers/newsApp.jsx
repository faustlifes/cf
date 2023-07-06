import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NewsItem from '../components/newsItem.jsx'
import { fetchUsers, showMore } from '../actions/newsActions'

const NewsApp = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.news.data)
  const showBlockVal = useSelector((state) => state.news.showBlockVal)

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchUsers('assets/data/data.json'))
    }
  }, [])

  let monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  let showCount = showBlockVal * 8

  let items = data.slice(0, showCount).map((item) => {
    let date = new Date(item.date)
    let dateStr = `${date.getDate()} ${monthNames[date.getMonth()]}`
    let props = {
      key: item.id,
      id: item.id,
      title: `Amazing Post #${item.id}`,
      date: dateStr,
      src: 'assets/img/news-img1.jpeg',
    }

    return (
      <React.Fragment key={item.id}>
        <NewsItem {...props}></NewsItem>
      </React.Fragment>
    )
  })

  return (
    <div>
      <div className='row'>{items}</div>
      <div className='news-btn-container'>
        <span
          className='btn news-load-btn'
          onClick={() => dispatch(showMore())}
        >
          <i className='fa fa-plus fa-1x' />
          Load more
        </span>
      </div>
    </div>
  )
}

export default NewsApp
