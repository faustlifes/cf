import { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PortfolioEditor from './portfolio/PortfolioEditor.jsx'
import ConfirmationModal from './common/ConfirmationModal.jsx'
import api from '../utils/api'
import '../styles/news-management.css'

const PortfolioItem = ({
  id,
  src,
  title,
  title2,
  category,
  isLoggedIn,
  dispatch,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState(null)

  const toggleMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsMenuOpen((prev) => !prev)
  }

  const handleEditClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsEditing(true)
    setIsMenuOpen(false)
  }

  const handleDeleteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDeleteConfirm(true)
    setIsMenuOpen(false)
  }

  const handleConfirmDelete = async () => {
    setIsDeleting(true)
    setDeleteError(null)
    try {
      await api.delete(`/api/portfolio/${id}`)
      dispatch({ type: 'DELETE_PORTFOLIO_SUCCESS', payload: id })
    } catch (err) {
      if (err.message !== 'Session expired.') {
        setDeleteError('Failed to delete item. Please try again.')
      }
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSaveSuccess = (updated) => {
    dispatch({ type: 'UPDATE_PORTFOLIO_SUCCESS', payload: updated })
    setIsEditing(false)
  }

  return (
    <li className='work-images-item'>
      <img src={src} alt='Portfolio' />

      {isLoggedIn && (
        <div className='news-item-actions'>
          <button className='three-dots-btn' onClick={toggleMenu}>
            &#8942;
          </button>
          {isMenuOpen && (
            <div className='actions-dropdown'>
              <button onClick={handleEditClick}>Edit</button>
              <button
                className='delete-btn'
                onClick={handleDeleteClick}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      )}

      <div className='image-mask'>
        <span className='image-mask-content'>
          <span>
            <a href='#'>
              <i className='fa fa-link' />
            </a>
            <a href='#'>
              <i className='fa fa-search' />
            </a>
          </span>
          <h1 className='image-mask-title'>{title}</h1>
          {title2 && <h2 className='image-mask-title2'>{title2}</h2>}
          <p className='image-mask-category'>{category}</p>
        </span>
      </div>

      {isEditing && (
        <div className='modal-overlay' onMouseDown={() => setIsEditing(false)}>
          <div
            className='modal-content'
            onMouseDown={(e) => e.stopPropagation()}
          >
            <PortfolioEditor
              title='Edit Portfolio Item'
              endpoint='/api/portfolio'
              initialData={{ id, src, title, title2, category }}
              onSaveSuccess={handleSaveSuccess}
              onClose={() => setIsEditing(false)}
            />
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        title='Confirm Delete'
        message='Are you sure you want to delete this portfolio item? This action cannot be undone.'
        errorMessage={deleteError}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteConfirm(false)
          setDeleteError(null)
        }}
      />
    </li>
  )
}

PortfolioItem.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  title2: PropTypes.string,
  category: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

export default connect(mapStateToProps)(PortfolioItem)
