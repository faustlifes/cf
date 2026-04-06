import React from 'react'

const RegisterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => e.stopPropagation()

  return (
    <div className='modal-overlay' onMouseDown={onClose}>
      <div className='modal-content' onMouseDown={handleModalClick}>
        <h2>Register</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-group'>
            <label htmlFor='register-name'>Name</label>
            <input 
              type='text' 
              id='register-name' 
              className='modal-input' 
              placeholder='Enter your name' 
              required 
            />
          </div>
          <div className='form-group'>
            <label htmlFor='register-email'>Email</label>
            <input 
              type='email' 
              id='register-email' 
              className='modal-input' 
              placeholder='Enter your email' 
              required 
            />
          </div>
          <div className='form-group'>
            <label htmlFor='register-password'>Password</label>
            <input 
              type='password' 
              id='register-password' 
              className='modal-input' 
              placeholder='Create a password' 
              required 
            />
          </div>
          <div className='form-group'>
            <label htmlFor='register-confirm-password'>Confirm Password</label>
            <input 
              type='password' 
              id='register-confirm-password' 
              className='modal-input' 
              placeholder='Confirm your password' 
              required 
            />
          </div>
          <div className='modal-actions'>
            <button type='submit' className='btn modal-btn'>
              Register
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

export default RegisterModal
