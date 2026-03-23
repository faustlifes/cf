import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchTeamFacts } from '../actions/teamFactsActions'
import TeamFactsItem from '../components/teamFactsItem.jsx'

const TeamFactsApp = ({ finished, initOptions, startCount, stopCount }) => {
  const dispatch = useDispatch()
  const teamFactsData = useSelector((state) => state.teamFacts.teamFactsData) || []

  useEffect(() => {
    dispatch(fetchTeamFacts())
    document.addEventListener('scroll', scrollHandler)

    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [dispatch])

  useEffect(() => {
    if (teamFactsData && teamFactsData.length > 0) {
      initOptions(teamFactsData.map((item) => item.number))
    }
  }, [teamFactsData, initOptions])

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

  const defaultFavicons = [
    <i className='fa fa-briefcase fa-2x' />,
    <i className='fa fa-user fa-2x' />,
    <i className='fa fa-shopping-cart fa-2x' />,
    <i className='fa fa-map-marker fa-2x' />
  ];

  const items = teamFactsData.map((item, index) => (
    <TeamFactsItem
      key={index}
      title={item.title}
      number={item.number}
      favicon={item.favicon ? <i className={`fa ${item.favicon} fa-2x`} /> : defaultFavicons[index % defaultFavicons.length]}
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
