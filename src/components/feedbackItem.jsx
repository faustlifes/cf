import PropTypes from 'prop-types'

const FeedbackItem = ({ title, message, id, remove }) => {
  return (
    <div className='feedback-item'>
      <h2 className='feedback-item-title'>{title}</h2>
      <p className='feedback-item-text'>{message}</p>
      <span className='feedback-item-remove'>
        <i className='fa fa-remove fa-1x' data-id={id} onClick={remove} />
      </span>
    </div>
  )
}

FeedbackItem.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
}

export default FeedbackItem
