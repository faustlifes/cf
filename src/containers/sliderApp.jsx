import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SliderItem1 from '../components/slider/sliderItem1.jsx'
import SliderItem2 from '../components/slider/sliderItem2.jsx'
import SliderItem3 from '../components/slider/sliderItem3.jsx'
import {
  switchToSlide,
  switchTimeoutHidden,
  switchAuto,
  switchAutoEnable,
} from '../actions/sliderActions'

const SliderApp = () => {
  const dispatch = useDispatch()
  const currSlide = useSelector((state) => state.slider.currSlide)
  const transitionDuration = useSelector(
    (state) => state.slider.transitionDuration
  )
  const sliderWidth = useSelector((state) => state.slider.sliderWidth)
  const hiddenChange = useSelector((state) => state.slider.hiddenChange)

  useEffect(() => {
    dispatch(switchAuto())
    return () => {
      dispatch(switchToSlide())
    }
  }, [dispatch])

  const switchNextSlide = () => {
    if (hiddenChange) return
    dispatch(switchToSlide('next'))
    dispatch(switchAutoEnable())
  }

  const switchPrevSlide = () => {
    if (hiddenChange) return
    dispatch(switchToSlide('prev'))
    dispatch(switchAutoEnable())
  }

  if (hiddenChange) {
    dispatch(switchTimeoutHidden(transitionDuration))
  }

  let sliderOffset = currSlide * sliderWidth
  let sliderOptions = {
    transform: `translate3d(${-sliderOffset}px, 0px, 0px)`,
    transitionDuration: `${transitionDuration}ms`,
  }

  return (
    <div className='slider-container'>
      <div className='container'>
        <div className='slider-nav-container'>
          <span className='slider-nav-left' onClick={switchPrevSlide}>
            <i className='fa fa-angle-left' style={{ fontSize: '40px' }} />
          </span>
          <span className='slider-nav-right' onClick={switchNextSlide}>
            <i className='fa fa-angle-right' style={{ fontSize: '40px' }} />
          </span>
        </div>
      </div>
      <ul style={sliderOptions} className='slider'>
        <SliderItem3 />
        <SliderItem1 />
        <SliderItem2 />
        <SliderItem3 />
        <SliderItem1 />
      </ul>
    </div>
  )
}

export default SliderApp
