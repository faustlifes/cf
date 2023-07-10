import PropTypes from 'prop-types'

const PortfolioItem = ({ src, title, category }) => {
  return (
    <li className='work-images-item'>
      <img src={src} alt='Portfolio' />
      <div className='image-mask'>
        <span className='image-mask-content'>
          <span>
            <a href='#'>
              <i className='fa fa-link' />
            </a>
            <a href='#'>
              <i className='fa fa-search' />
            </a>
          </span>
          <h1 className='image-mask-title'>{title}</h1>
          <p className='image-mask-category'>{category}</p>
        </span>
      </div>
    </li>
  )
}

PortfolioItem.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
}
export default PortfolioItem
