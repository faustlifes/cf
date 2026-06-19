import React from 'react'
import BaseEditor from '../common/BaseEditor.jsx'

class TeammateEditor extends BaseEditor {
  constructor(props) {
    super(props)
    // Ensure social object exists to avoid errors
    if (!this.state.formData.social) {
      this.state.formData.social = {}
    }
    this.handleSocialChange = this.handleSocialChange.bind(this)
  }

  handleSocialChange(e) {
    const { name, value } = e.target
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        social: {
          ...prevState.formData.social,
          [name]: value,
        },
      },
    }))
  }

  renderFormFields() {
    const { formData } = this.state
    const social = formData.social || {}

    return (
      <div className='teammate-editor-fields'>
        <div className='form-group'>
          <label htmlFor='teammate-name'>Name</label>
          <input
            type='text'
            id='teammate-name'
            name='name'
            className='modal-input'
            value={formData.name || ''}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='teammate-position'>Position</label>
          <input
            type='text'
            id='teammate-position'
            name='position'
            className='modal-input'
            value={formData.position || ''}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='teammate-src'>Image URL</label>
          <input
            type='text'
            id='teammate-src'
            name='src'
            className='modal-input'
            value={formData.src || ''}
            onChange={this.handleInputChange}
          />
          <small style={{ color: '#888' }}>Leave empty for default image</small>
        </div>

        <div className='social-fields'>
          <h4>Social Links</h4>
          <div className='form-group'>
            <label htmlFor='social-facebook'>Facebook</label>
            <input
              type='text'
              id='social-facebook'
              name='facebook'
              className='modal-input'
              value={social.facebook || ''}
              onChange={this.handleSocialChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='social-twitter'>Twitter / X</label>
            <input
              type='text'
              id='social-twitter'
              name='twitter'
              className='modal-input'
              value={social.twitter || ''}
              onChange={this.handleSocialChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='social-instagram'>Instagram</label>
            <input
              type='text'
              id='social-instagram'
              name='instagram'
              className='modal-input'
              value={social.instagram || ''}
              onChange={this.handleSocialChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='social-linkedin'>LinkedIn</label>
            <input
              type='text'
              id='social-linkedin'
              name='linkedin'
              className='modal-input'
              value={social.linkedin || ''}
              onChange={this.handleSocialChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TeammateEditor
