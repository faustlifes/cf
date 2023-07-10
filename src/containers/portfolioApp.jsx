import { useDispatch, useSelector } from 'react-redux'
import PortfolioItem from '../components/portfolioItem.jsx'
import { changeLink } from '../actions/portfolioActions'

const allImages = [
  {
    title: 'Image #1',
    category: 'Graphic Design',
    src: 'assets/img/work-img1.jpg',
  },
  {
    title: 'Image #2',
    category: 'Web Design',
    src: 'assets/img/work-img2.jpg',
  },
  {
    title: 'Image #3',
    category: 'Landing Pages',
    src: 'assets/img/work-img3.jpg',
  },
  { title: 'Image #4', category: 'Wordpress', src: 'assets/img/work-img4.jpg' },
  {
    title: 'Image #5',
    category: 'Graphic Design',
    src: 'assets/img/work-img5.jpg',
  },
  {
    title: 'Image #6',
    category: 'Web Design',
    src: 'assets/img/work-img6.jpg',
  },
]

const PortfolioApp = () => {
  const dispatch = useDispatch()
  const currLink = useSelector((state) => state.portfolio.currLink)

  let categories = [
    'All',
    'Graphic Design',
    'Web Design',
    'Landing Pages',
    'Wordpress',
  ]

  let currCat = categories[currLink]
  let currImages = allImages

  if (currCat !== 'All') {
    currImages = allImages.filter((item) => currCat === item.category)
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
