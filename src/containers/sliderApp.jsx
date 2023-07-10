import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SliderItem from '../components/slider/sliderItem.jsx'
import {
  switchToSlide,
  switchTimeoutHidden,
  switchAuto,
  switchAutoEnable,
} from '../actions/sliderActions'

const slidersInfo = [
  {
    img: 'assets//img/home-bg1.jpg',
    title1: '#1 The ham is',
    title2: 'a psd template',
    subTitle: 'We are creative',
    text: 'Nam varius accumsan elementum aliquam',
  },
  {
    img: 'assets//img/home-bg.jpg',
    title1: '#2 The ham is',
    title2: 'a psd template',
    subTitle: 'We are fast',
    text: 'Lorem ipsum dolor sit amet, his ea.',
  },
  {
    img: 'assets//img/home-bg2.jpg',
    title1: '#3 The ham is',
    title2: 'a psd template',
    subTitle: 'We are fast',
    text: '2Lorem ipsum dolor sit amet, his ea.',
  },
  {
    img: 'assets//img/home-bg3.jpg',
    title1: '#4 The ham is',
    title2: 'a psd template',
    subTitle: 'We are professionals',
    text: '2Zril mandamus eos ne, sed audire facilisis ex',
  },
  {
    img: 'assets//img/home-bg1.jpg',
    title1: '#5 The ham is',
    title2: 'a psd template',
    subTitle: 'We are professionals',
    text: 'Zril mandamus eos ne, sed audire facilisis ex',
  },
]
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
  const items = slidersInfo.map((item, index) => (
    <SliderItem
      key={index}
      title1={item.title1}
      title2={item.title2}
      subTitle={item.subTitle}
      text={item.text}
      img={item.img}
    />
  ))

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
        {items}
      </ul>
    </div>
  )
}

export default SliderApp
