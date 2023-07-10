import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const NewsItem = ({ id, src, date, title }) => {
  return (
    <div className='col-xs-12 col-sm-6 col-md-3 news-container'>
      <Link to={`/news/${id}`}>
        <div className='news-photo-container'>
          <img src={src} alt='News' />
          <span className='news-date'>{date}</span>
        </div>
        <h2 className='news-title'>{title}</h2>
      </Link>
    </div>
  )
}

NewsItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
export default NewsItem
