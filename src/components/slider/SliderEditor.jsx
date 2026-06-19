import BaseEditor from '../common/BaseEditor.jsx'

class SliderEditor extends BaseEditor {
  renderFormFields() {
    const { formData } = this.state

    return (
      <div className='slider-editor-fields'>
        <div className='form-group'>
          <label htmlFor='slider-title1'>Title</label>
          <input
            type='text'
            id='slider-title1'
            name='title1'
            className='modal-input'
            value={formData.title1 || ''}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='slider-title2'>Title Highlight</label>
          <input
            type='text'
            id='slider-title2'
            name='title2'
            className='modal-input'
            value={formData.title2 || ''}
            onChange={this.handleInputChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='slider-subtitle'>Subtitle</label>
          <input
            type='text'
            id='slider-subtitle'
            name='subTitle'
            className='modal-input'
            value={formData.subTitle || ''}
            onChange={this.handleInputChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='slider-text'>Body Text</label>
          <textarea
            id='slider-text'
            name='text'
            className='modal-input'
            rows={3}
            value={formData.text || ''}
            onChange={this.handleInputChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='slider-img'>Background Image URL</label>
          <input
            type='text'
            id='slider-img'
            name='img'
            className='modal-input'
            value={formData.img || ''}
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    )
  }
}

export default SliderEditor
