import BaseEditor from '../common/BaseEditor.jsx'
import api from '../../utils/api'

const CATEGORIES = ['Graphic Design', 'Web Design', 'Landing Pages', 'Wordpress']

class PortfolioEditor extends BaseEditor {
  async handleSave(e) {
    if (e) e.preventDefault()
    const { endpoint, onSaveSuccess } = this.props
    const { formData } = this.state

    this.setState({ isSaving: true, error: null })
    try {
      let response
      if (formData.id) {
        response = await api.put(`${endpoint}/${formData.id}`, formData)
      } else {
        response = await api.post(endpoint, formData)
      }
      if (onSaveSuccess) onSaveSuccess(response.data)
    } catch (err) {
      if (err.message === 'Session expired.') return
      this.setState({ error: err.response?.data?.message || err.message || 'Failed to save.' })
    } finally {
      this.setState({ isSaving: false })
    }
  }

  renderFormFields() {
    const { formData } = this.state

    return (
      <div className='portfolio-editor-fields'>
        <div className='form-group'>
          <label htmlFor='portfolio-src'>Image URL</label>
          <input
            type='text'
            id='portfolio-src'
            name='src'
            className='modal-input'
            value={formData.src || ''}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='portfolio-title'>Title</label>
          <input
            type='text'
            id='portfolio-title'
            name='title'
            className='modal-input'
            value={formData.title || ''}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='portfolio-title2'>Subtitle</label>
          <input
            type='text'
            id='portfolio-title2'
            name='title2'
            className='modal-input'
            value={formData.title2 || ''}
            onChange={this.handleInputChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='portfolio-category'>Category</label>
          <select
            id='portfolio-category'
            name='category'
            className='modal-input'
            value={formData.category || ''}
            onChange={this.handleInputChange}
            required
          >
            <option value=''>Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}

export default PortfolioEditor
