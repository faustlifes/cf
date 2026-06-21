import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PortfolioItem from '../components/portfolioItem.jsx'
import PortfolioEditor from '../components/portfolio/PortfolioEditor.jsx'
import { changeLink, fetchPortfolio } from '../actions/portfolioActions'

const CATEGORIES = ['All', 'Graphic Design', 'Web Design', 'Landing Pages', 'Wordpress']

const PortfolioApp = () => {
  const dispatch = useDispatch()
  const currLink = useSelector((state) => state.portfolio.currLink)
  const portfolioData = useSelector((state) => state.portfolio.portfolioData) || []
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    dispatch(fetchPortfolio())
  }, [dispatch])

  const currCat = CATEGORIES[currLink]
  const currImages = currCat === 'All'
    ? portfolioData
    : portfolioData.filter((item) => currCat === item.category)

  const items = currImages.map((item) => (
    <PortfolioItem
      key={item.id}
      id={item.id}
      src={item.src}
      title={item.title}
      title2={item.title2}
      category={item.category}
    />
  ))

  const links = CATEGORIES.map((item, index) => {
    const classes = `work-nav-item ${currLink === index ? 'active' : ''}`
    return (
      <li key={index} className={classes} onClick={() => dispatch(changeLink(index))}>
        {item}
      </li>
    )
  })

  return (
    <div id='about-block'>
      <div className='work-nav-container'>
        <ul className='work-nav'>{links}</ul>
        {isLoggedIn && (
          <button className='btn feedback-add-btn' onClick={() => setShowCreateModal(true)}>
            <i className='fa fa-plus' /> Add New
          </button>
        )}
      </div>
      <ul className='work-images'>{items}</ul>

      {showCreateModal && (
        <div className='modal-overlay' onMouseDown={() => setShowCreateModal(false)}>
          <div className='modal-content' onMouseDown={(e) => e.stopPropagation()}>
            <PortfolioEditor
              title='Add Portfolio Item'
              endpoint='/api/portfolio'
              initialData={{}}
              onSaveSuccess={(item) => {
              dispatch({ type: 'CREATE_PORTFOLIO_SUCCESS', payload: item })
              setShowCreateModal(false)
            }}
              onClose={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PortfolioApp
