import { useDispatch, useSelector } from 'react-redux'
import PortfolioItem from '../components/portfolioItem.jsx'
import { changeLink, fetchPortfolio } from '../actions/portfolioActions'
import { useEffect } from 'react'

const PortfolioApp = () => {
  const dispatch = useDispatch()
  const currLink = useSelector((state) => state.portfolio.currLink)
  const portfolioData = useSelector((state) => state.portfolio.portfolioData) || []

  useEffect(() => {
    dispatch(fetchPortfolio())
  }, [dispatch])

  let categories = [
    'All',
    'Graphic Design',
    'Web Design',
    'Landing Pages',
    'Wordpress',
  ]

  let currCat = categories[currLink]
  let currImages = portfolioData

  if (currCat !== 'All') {
    currImages = portfolioData.filter((item) => currCat === item.category)
  }

  let items = currImages.map((item, index) => (
    <PortfolioItem
      key={index}
      title={item.title}
      category={item.category}
      src={item.src}
    />
  ))

  let links = categories.map((item, index) => {
    let classes = `work-nav-item ${currLink === index ? 'active' : ''}`
    return (
      <li
        key={index}
        className={classes}
        onClick={() => dispatch(changeLink(index))}
      >
        {item}
      </li>
    )
  })

  return (
    <div id='about-block'>
      <div className='work-nav-container'>
        <ul className='work-nav'>{links}</ul>
      </div>
      <ul className='work-images'>{items}</ul>
    </div>
  )
}

export default PortfolioApp
