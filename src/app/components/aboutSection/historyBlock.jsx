import React from 'react';
import LzEditor from 'react-lz-editor';

class HistoryBlock extends React.Component {
    constructor(props) {
        super(props);
      this.state = {
        htmlContent: '',
        responseList: []
      }

    }
    receiveHtml = (content) => {
      console.log("recieved HTML content", content);
      this.setState({responseList:[]});
    }
    render() {
      const uploadProps = {
        action: "http://v0.api.upyun.com/devopee",
        onChange: this.onChange,
        listType: 'picture',
        fileList: this.state.responseList,
        data: (file) => {

        },
        multiple: true,
        beforeUpload: this.beforeUpload,
        showUploadList: true
      }
        return (
            <div className="about-content">
              <LzEditor active={true} importContent={this.state.htmlContent} cbReceiver={this.receiveHtml} uploadProps={uploadProps}
                        lang="en"/>
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
        );
    }
}


export default HistoryBlock;