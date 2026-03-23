import React from 'react'

class BiographyBlock extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='about-content'>
        <p>
          {this.props.data || "Loading biography..."}
        </p>
      </div>
    )
  }
}

export default BiographyBlock
