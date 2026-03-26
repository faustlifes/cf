import React from 'react'
import ModernEditor from '../common/ModernEditor.jsx'

class HistoryBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      htmlContent: '',
    }
  }
  receiveHtml = (content) => {
    console.log('recieved HTML content', content)
  }
  render() {
    return (
      <div className='about-content'>
        {/*<ModernEditor
          importContent={this.props.data || this.state.htmlContent}
          cbReceiver={this.receiveHtml}
        />*/}
        <div dangerouslySetInnerHTML={{ __html: this.props.data }} />
      </div>
    )
  }
}

export default HistoryBlock
