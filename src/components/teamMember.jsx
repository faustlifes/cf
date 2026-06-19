import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TeammateEditor from './team/TeammateEditor.jsx'
import ConfirmationModal from './common/ConfirmationModal.jsx'
import api from '../utils/api'
import '../styles/news-management.css' // Reusing management styles

const TeamMember = ({ id, src, name, position, social, isLoggedIn, dispatch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const hasSocials = social && (social.facebook || social.twitter || social.instagram || social.linkedin)

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
      await api.delete(`/api/teammates/${id}`)
      dispatch({ type: 'DELETE_TEAMMATE_SUCCESS', payload: id })
    } catch (err) {
      console.error('Failed to delete teammate:', err)
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

  const handleSaveSuccess = (updatedTeammate) => {
    dispatch({ type: 'UPDATE_TEAMMATE_SUCCESS', payload: updatedTeammate })
    setIsEditing(false)
  }

  return (
    <div className='col-xs-12 col-sm-6 col-md-3 news-container' style={{ position: 'relative' }}>
      <div className='team-member clearfix'>
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

        <div className='team-member-photo'>
          <img 
            src={src || 'assets/img/teammember.jpg'} 
            alt='Team Member' 
            onError={(e) => { e.target.onerror = null; e.target.src = 'assets/img/teammember.jpg'; }} 
          />
          <div className='photo-mask'>
            <div className='circle'>
              <i className='fa fa-plus fa-2x' />
            </div>
          </div>
        </div>
        <div className='team-member-title'>
          <h2 className='team-member-name'>{name}</h2>
          <p className='team-member-position'>{position}</p>
        </div>
        {hasSocials && (
          <div className='team-member-links'>
            {social.facebook && (
              <a href={social.facebook}>
                <i className='fa fa-facebook fa-lg' />
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter}>
                <i className='fa fa-twitter fa-lg' />
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram}>
                <i className='fa fa-instagram fa-lg' />
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin}>
                <i className='fa fa-linkedin fa-lg' />
              </a>
            )}
          </div>
        )}
      </div>

      {isEditing && (
        <div className='modal-overlay' onMouseDown={() => setIsEditing(false)}>
          <div className='modal-content' onMouseDown={(e) => e.stopPropagation()}>
            <TeammateEditor
              endpoint="/api/teammates"
              initialData={{ id, src, name, position, social }}
              onSaveSuccess={handleSaveSuccess}
              onClose={() => setIsEditing(false)}
              title="Edit Team Member"
            />
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${name}? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  )
}

TeamMember.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  src: PropTypes.string,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  social: PropTypes.shape({
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
    linkedin: PropTypes.string,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

export default connect(mapStateToProps)(TeamMember)

