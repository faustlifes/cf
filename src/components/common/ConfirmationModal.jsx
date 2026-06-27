import PropTypes from 'prop-types'

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  errorMessage,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null

  const handleModalClick = (e) => e.stopPropagation()

  return (
    <div className='modal-overlay' onMouseDown={onCancel}>
      <div
        className='modal-content confirmation-modal'
        onMouseDown={handleModalClick}
      >
        <h2>{title || 'Confirm Action'}</h2>
        <div className='confirmation-message'>
          {message || 'Are you sure you want to proceed?'}
        </div>
        {errorMessage && (
          <div
            className='error-message'
            style={{ color: '#ff6b6b', marginTop: '8px' }}
          >
            {errorMessage}
          </div>
        )}
        <div className='modal-actions'>
          <button
            type='button'
            className='btn modal-btn-danger'
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            type='button'
            className='btn modal-btn-cancel'
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  errorMessage: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default ConfirmationModal
