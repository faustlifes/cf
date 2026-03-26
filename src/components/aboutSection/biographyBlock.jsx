import React from 'react'

class BiographyBlock extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='about-content'>
        <div dangerouslySetInnerHTML={{ __html: this.props.data || "Loading biography..." }} />
      </div>
    )
  }
}

export default BiographyBlock
