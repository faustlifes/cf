import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from '../../utils/api'

class BaseEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: props.initialData || {},
      isSaving: false,
      error: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleInputChange(e) {
    const { name, value } = e.target
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }))
  }

  // Common method for rich text editors (like TipTap)
  handleRichTextChange(name, value) {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }))
  }

  async handleSave(e) {
    if (e) e.preventDefault()
    const { endpoint, onSaveSuccess } = this.props
    const { formData } = this.state

    this.setState({ isSaving: true, error: null })
    try {
      const response = await api.put(`${endpoint}/${formData.id}`, formData)
      if (onSaveSuccess) {
        onSaveSuccess(response.data)
      }
    } catch (err) {
      this.setState({ error: err.response?.data?.message || 'Failed to save changes.' })
    } finally {
      this.setState({ isSaving: false })
    }
  }

  renderFormFields() {
    // To be implemented by subclass
    return null
  }

  render() {
    const { title, onClose } = this.props
    const { isSaving, error } = this.state

    return (
      <div className='base-editor'>
        <h3>{title || 'Edit Item'}</h3>
        {error && <div className='error-message' style={{ color: '#ff6b6b', marginBottom: '15px' }}>{error}</div>}
        
        <form onSubmit={this.handleSave}>
          {this.renderFormFields()}
          
          <div className='modal-actions'>
            <button type='submit' className='btn modal-btn' disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type='button' className='btn modal-btn-cancel' onClick={onClose} disabled={isSaving}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }
}

BaseEditor.propTypes = {
  endpoint: PropTypes.string.isRequired,
  initialData: PropTypes.object.isRequired,
  onSaveSuccess: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
}

export default BaseEditor
