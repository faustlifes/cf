import { useEffect } from 'react'
import PropTypes from 'prop-types'
import TeamFactsItem from '../components/teamFactsItem.jsx'

const data = [
  {
    title: 'Works',
    number: 4609,
    favicon: <i className='fa fa-briefcase fa-2x' />,
  },
  {
    title: 'Customers',
    number: 3470,
    favicon: <i className='fa fa-user fa-2x' />,
  },
  {
    title: 'Purchase',
    number: 2908,
    favicon: <i className='fa fa-shopping-cart fa-2x' />,
  },
  {
    title: 'Office',
    number: 1908,
    favicon: <i className='fa fa-map-marker fa-2x' />,
  },
]

const TeamFactsApp = ({ finished, initOptions, startCount, stopCount }) => {
  useEffect(() => {
    initOptions(data.map((item) => item.number))
    document.addEventListener('scroll', scrollHandler)

    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = () => {
    if (!document.querySelector('.team-facts')) {
      return
    }

    const top = document
      .querySelector('.team-facts')
      .getBoundingClientRect().top
    const bottom = document
      .querySelector('.team-facts')
      .getBoundingClientRect().bottom
    const headerOffset = 100

    if (
      top <= document.documentElement.clientHeight &&
      bottom >= headerOffset
    ) {
      document.removeEventListener('scroll', scrollHandler)
      startCount(100)
    }
  }

  if (finished) {
    stopCount()
  }

  const items = data.map((item, index) => (
    <TeamFactsItem
      key={index}
      title={item.title}
      number={item.number}
      favicon={item.favicon}
    />
  ))

  return <ul className='team-facts clearfix'>{items}</ul>
}

TeamFactsApp.propTypes = {
  finished: PropTypes.bool,
  initOptions: PropTypes.func,
  startCount: PropTypes.func,
  stopCount: PropTypes.func,
}

export default TeamFactsApp
