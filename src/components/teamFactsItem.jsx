import PropTypes from 'prop-types'

const TeamFactsItem = ({ favicon, number, title }) => {
  return (
    <li className='team-facts-item'>
      <div className='fact-circle'>{favicon}</div>
      <p className='fact-number'>{number}</p>
      <h2 className='fact-title'>{title}</h2>
    </li>
  )
}

TeamFactsItem.propTypes = {
  favicon: PropTypes.element.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

export default TeamFactsItem
