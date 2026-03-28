import React, { useState, useEffect } from 'react'
import api from '../../utils/api'

const UserProfileModal = ({ isOpen, onClose, onUpdateSuccess }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const userStr = sessionStorage.getItem('user')
      if (userStr) {
        const user = JSON.parse(userStr)
        setName(user.name || '')
        setEmail(user.email || '')
        setUserId(user.id || user._id)
      }
      // Reset sensitive fields
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setError(null)
      setSuccess(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleModalClick = (e) => e.stopPropagation()

  const validatePassword = (password) => {
    if (!password) return true // Allow empty for no change
    if (password.length < 10) return false
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    return hasUpperCase && hasNumber && hasSpecialChar
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!name || !email) {
      setError('Name and Email cannot be empty.')
      return
    }

    const isPasswordChange = oldPassword || newPassword || confirmPassword

    if (isPasswordChange) {
      if (!oldPassword) {
        setError('Please provide your old password to change it.')
        return
      }
      if (!newPassword) {
        setError('Please provide a new password.')
        return
      }
      if (newPassword !== confirmPassword) {
        setError('New passwords do not match.')
        return
      }
      if (!validatePassword(newPassword)) {
        setError('New password must be at least 10 characters long and include an uppercase letter, a number, and a special character.')
        return
      }
    }

    setLoading(true)

    try {
      const payload = { name, email }
      if (isPasswordChange) {
        payload.oldPassword = oldPassword
        payload.newPassword = newPassword
      }

      const response = await api.put(`/api/users/${userId}`, payload)

      const currentUserStr = sessionStorage.getItem('user')
      const currentUser = currentUserStr ? JSON.parse(currentUserStr) : {}
      const responseUser = response.data.user || (response.data && typeof response.data === 'object' ? response.data : {})
      
      // Merge current local state with server response to ensure session is fully updated
      const updatedUserData = {
        ...currentUser,
        name,
        email,
        ...responseUser
      }
      
      sessionStorage.setItem('user', JSON.stringify(updatedUserData))

      setSuccess(true)
      if (onUpdateSuccess) onUpdateSuccess(updatedUserData)

      // Close modal after success after a brief delay
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='modal-overlay' onMouseDown={onClose}>
      <div className='modal-content' onMouseDown={handleModalClick}>
        <h2>User Profile</h2>
        {error && <div className='error-message' style={{ color: '#ff6b6b', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}
        {success && <div className='success-message' style={{ color: '#18cfab', marginBottom: '15px', fontSize: '14px' }}>Profile updated successfully!</div>}

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='profile-name'>Name</label>
            <input
              type='text'
              id='profile-name'
              className='modal-input'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='profile-email'>Email</label>
            <input
              type='email'
              id='profile-email'
              className='modal-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid #787979', paddingTop: '15px' }}>
            <p style={{ fontSize: '12px', color: '#b8b8b8', marginBottom: '10px' }}>Leave password fields blank if you don't want to change it.</p>
            <div className='form-group'>
              <label htmlFor='old-password'>Old Password</label>
              <input
                type='password'
                id='old-password'
                className='modal-input'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='new-password'>New Password</label>
              <input
                type='password'
                id='new-password'
                className='modal-input'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='confirm-password'>Confirm New Password</label>
              <input
                type='password'
                id='confirm-password'
                className='modal-input'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className='modal-actions'>
            <button type='submit' className='btn modal-btn' disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type='button' className='btn modal-btn-cancel' onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserProfileModal
