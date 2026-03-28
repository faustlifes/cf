import React from 'react'

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => e.stopPropagation()

  return (
    <div className='modal-overlay' onMouseDown={onClose}>
      <div className='modal-content' onMouseDown={handleModalClick}>
        <h2>Log In</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-group'>
            <label htmlFor='login-email'>Email</label>
            <input 
              type='email' 
              id='login-email' 
              className='modal-input' 
              placeholder='Enter your email' 
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
              required 
            />
          </div>
          <div className='modal-actions'>
            <button type='submit' className='btn modal-btn'>
              Log In
            </button>
            <button type='button' className='btn modal-btn-cancel' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginModal
