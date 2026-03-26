import { useDispatch, useSelector } from 'react-redux'
import SkillsBlock from '../components/aboutSection/skillsBlock.jsx'
import BiographyBlock from '../components/aboutSection/biographyBlock.jsx'
import HistoryBlock from '../components/aboutSection/historyBlock.jsx'
import { showView, showSkillsEnable, fetchAbouts } from '../actions/aboutActions'
import { useEffect } from 'react'

const AboutApp = () => {
  const dispatch = useDispatch()
  const currView = useSelector((state) => state.about.currView)
  const skillsShow = useSelector((state) => state.about.skillsShow)
  const aboutData = useSelector((state) => state.about.aboutData) || {}

  const scrollHandler = () => {
    let top = document.querySelector('#about-block').getBoundingClientRect().top
    let bottom = document
      .querySelector('#about-block')
      .getBoundingClientRect().bottom
    let headerOffset = 100

    if (
      top <= document.documentElement.clientHeight &&
      bottom >= headerOffset
    ) {
      document.removeEventListener('scroll', scrollHandler)
      dispatch(showSkillsEnable())
    }
  }

  useEffect(() => {
    dispatch(fetchAbouts())
    document.addEventListener('scroll', scrollHandler)

    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [dispatch])

  let viewBlock = <SkillsBlock data={aboutData.skills} />

  switch (currView) {
    case 0:
      viewBlock = <HistoryBlock data={aboutData.historyHtml} />
      break
    case 1:
      viewBlock = <BiographyBlock data={aboutData.biography} />
      break
    case 2:
      viewBlock = <SkillsBlock show={skillsShow} data={aboutData.skills} />
      break
  }

  const links = ['Out history', 'Our biography', 'Our skills'].map(
    (item, index) => {
      const classes = `about-nav-item ${currView === index ? 'active' : ''}`

      return (
        <li
          key={index}
          className={classes}
          onClick={() => dispatch(showView(index))}
        >
          {item}
        </li>
      )
    }
  )

  return (
    <div id='about-block'>
      <ul className='about-nav'>{links}</ul>
      {viewBlock}
    </div>
  )
}

export default AboutApp
