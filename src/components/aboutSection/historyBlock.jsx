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
        <ModernEditor
          importContent={this.props.data || this.state.htmlContent}
          cbReceiver={this.receiveHtml}
        />
        {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis mauris interdum, blandit nulla at, bibendum velit. Donec tristique, tortor cursus posuere aliquam</p>
                <ul className="about-content-list">
                    <li className="about-content-list-item"><span className="about-content-done-text">Vestibulum quis mauris</span></li>
                    <li className="about-content-list-item"><span className="about-content-done-text">Vestibulum quis mauris</span></li>
                    <li className="about-content-list-item"><span className="about-content-done-text">Vestibulum quis mauris</span></li>
                    <li className="about-content-list-item"><span className="about-content-done-text">Vestibulum quis mauris</span></li>
                    <li className="about-content-list-item"><span className="about-content-done-text">Vestibulum quis mauris</span></li>
                    <li className="about-content-list-item"><span className="about-content-done-text">Vestibulum quis mauris</span></li>
                    <li className="about-content-list-item"><span className="about-content-done-text">Vestibulum quis mauris</span></li>
                    <li className="about-content-list-item"><span className="about-content-done-text">Vestibulum quis mauris</span></li>
                </ul>*/}
      </div>
    )
  }
}

export default HistoryBlock
