import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NewsEditor from './news/NewsEditor.jsx'
import ConfirmationModal from './common/ConfirmationModal.jsx'
import api from '../utils/api'
import '../styles/news-management.css'

const NewsItem = ({ id, src, date, title, text, isLoggedIn, dispatch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const toggleMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }

  const handleDeleteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDeleteConfirm(true)
    setIsMenuOpen(false)
  }

  const handleConfirmDelete = async () => {
    setIsDeleting(true)
    try {
      await api.delete(`/api/news/${id}`)
      dispatch({ type: 'DELETE_NEWS_SUCCESS', payload: id })
    } catch (err) {
      console.error('Failed to delete news:', err)
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }


  const handleEditClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsEditing(true)
    setIsMenuOpen(false)
  }

  const handleSaveSuccess = (updatedNews) => {
    dispatch({ type: 'UPDATE_NEWS_SUCCESS', payload: updatedNews })
    setIsEditing(false)
  }

  return (
    <div className='col-xs-12 col-sm-6 col-md-3 news-container'>
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

      <Link to={`/news/${id}`}>
        <div className='news-photo-container'>
          <img src={src} alt='News' />
          <span className='news-date'>{date}</span>
        </div>
        <h2 className='news-title'>{title}</h2>
      </Link>

      {isEditing && (
        <div className='modal-overlay' onMouseDown={() => setIsEditing(false)}>
          <div className='modal-content' onMouseDown={(e) => e.stopPropagation()}>
            <NewsEditor
              endpoint="/api/news"
              initialData={{ id, src, date, title, text }}
              onSaveSuccess={handleSaveSuccess}
              onClose={() => setIsEditing(false)}
              title="Edit News"
            />
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        title="Confirm Delete"
        message="Are you sure you want to delete this news item? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  )
}

NewsItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

export default connect(mapStateToProps)(NewsItem)
