import React from 'react'
import BaseEditor from '../common/BaseEditor.jsx'
import ModernEditor from '../common/ModernEditor.jsx'

class NewsEditor extends BaseEditor {
  renderFormFields() {
    const { formData } = this.state
    
    return (
      <div className='news-editor-fields'>
        <div className='form-group'>
          <label htmlFor='news-title'>Title</label>
          <input 
            type='text' 
            id='news-title' 
            name='title'
            className='modal-input' 
            value={formData.title || ''}
            onChange={this.handleInputChange}
            required 
          />
        </div>
        
        <div className='form-group'>
          <label htmlFor='news-date'>Date</label>
          <input 
            type='date' 
            id='news-date' 
            name='date'
            className='modal-input' 
            value={formData.date || ''}
            onChange={this.handleInputChange}
            required 
          />
        </div>

        <div className='form-group'>
          <label htmlFor='news-src'>Image URL</label>
          <input 
            type='text' 
            id='news-src' 
            name='src'
            className='modal-input' 
            value={formData.src || ''}
            onChange={this.handleInputChange}
            required 
          />
        </div>

        <div className='form-group'>
          <label>News Content</label>
          <ModernEditor 
            importContent={formData.text || ''}
            cbReceiver={(html) => this.handleRichTextChange('text', html)}
          />
        </div>
      </div>
    )
  }
}

export default NewsEditor
