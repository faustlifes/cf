import React, { useState } from 'react'
import api from '../../utils/api'

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => e.stopPropagation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      const response = await api.post('/api/auth/login', { email, pass: password })
      sessionStorage.setItem('access_token', response.data.access_token)
      const user = response.data.user || (response.data && typeof response.data === 'object' ? response.data : null)
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user))
      }
      
      if (onLoginSuccess) {
        onLoginSuccess()
      } else {
        onClose()
      }
      // Clear form on success
      setEmail('')
      setPassword('')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='modal-overlay' onMouseDown={onClose}>
      <div className='modal-content' onMouseDown={handleModalClick}>
        <h2>Log In</h2>
        {error && <div className='error-message' style={{ color: '#ff6b6b', marginBottom: '15px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='login-email'>Email</label>
            <input 
              type='email' 
              id='login-email' 
              className='modal-input' 
              placeholder='Enter your email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className='form-group'>
            <label htmlFor='login-password'>Password</label>
            <input 
              type='password' 
              id='login-password' 
              className='modal-input' 
              placeholder='Enter your password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className='modal-actions'>
            <button type='submit' className='btn modal-btn' disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
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

export default LoginModal
