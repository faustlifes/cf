import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link as ScrollLink } from 'react-scroll'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import SliderEditor from './SliderEditor.jsx'
import '../../styles/news-management.css'

const SliderItem = ({ id, img, title1, title2, subTitle, text }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)

  const scrollOptions = {
    duration: 1000,
    offset: -100,
    smooth: true,
    spy: true,
  }

  const sliderItemBg = {
    position: 'relative',
    backgroundImage: `linear-gradient(to bottom, rgba(30, 30, 30, .5) 0%, rgba(30, 30, 30, .5) 100%), url(${img})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }

  const handleSaveSuccess = (updated) => {
    dispatch({ type: 'UPDATE_SLIDER_SUCCESS', payload: updated })
    setIsEditing(false)
  }

  return (
    <li className='slider-item' style={sliderItemBg}>
      {isLoggedIn && id && (
        <div className='news-item-actions'>
          <button className='three-dots-btn' onClick={() => setIsEditing(true)}>
            &#8942;
          </button>
        </div>
      )}

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
            <ScrollLink className='btn home-btn' to='contact' {...scrollOptions}>
              Purchase now
            </ScrollLink>
          </div>
        </div>
      </div>

      {isEditing && createPortal(
        <div className='modal-overlay' onMouseDown={() => setIsEditing(false)}>
          <div className='modal-content' onMouseDown={(e) => e.stopPropagation()}>
            <SliderEditor
              endpoint='/api/sliders'
              initialData={{ id, img, title1, title2, subTitle, text }}
              onSaveSuccess={handleSaveSuccess}
              onClose={() => setIsEditing(false)}
              title='Edit Slide'
            />
          </div>
        </div>,
        document.body
      )}
    </li>
  )
}

SliderItem.propTypes = {
  id: PropTypes.number,
  img: PropTypes.string.isRequired,
  title1: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default SliderItem
