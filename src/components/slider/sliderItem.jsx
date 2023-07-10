import { Link as ScrollLink } from 'react-scroll'
import PropTypes from 'prop-types'

const SliderItem = ({ img, title1, title2, subTitle, text }) => {
  const scrollOptions = {
    duration: 1000,
    offset: -100,
    smooth: true,
    spy: true,
  }

  const sliderItemBg = {
    background: `linear-gradient(to bottom, rgba(30, 30, 30, .5) 0%, rgba(30, 30, 30, .5) 100%), url(${img}) no-repeat center`,
    backgroundSize: 'cover',
  }

  return (
    <li className='slider-item' style={sliderItemBg}>
      <div className='slider-content'>
        <div className='container slider-content-container'>
          <h1 className='slider-text1'>
            {title1} <span className='text-highlight'>{title2}</span>
          </h1>
          <h2 className='slider-text2'>{subTitle}</h2>
          <p className='slider-text3'>{text}</p>
          <div className='slider-btn-container'>
            <ScrollLink className='btn home-btn' to='work' {...scrollOptions}>
              Explore now
            </ScrollLink>
            <ScrollLink
              className='btn home-btn'
              to='contact'
              {...scrollOptions}
            >
              Purchase now
            </ScrollLink>
          </div>
        </div>
      </div>
    </li>
  )
}

SliderItem.propTypes = {
  img: PropTypes.string.isRequired,
  title1: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
export default SliderItem
