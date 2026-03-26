import PropTypes from 'prop-types'

const SkillsBlock = ({ show = true, data = [] }) => {
  const items = (data || []).map((item, index) => (
    <div key={index} className='skills-diagram-container'>
      <div
        className='skills-diagram'
        style={{
          width: show ? item.width : 0,
          backgroundColor: item.backgroundColor,
        }}
      >
        {item.text}
      </div>
    </div>
  ))

  return <div className='about-content'>{items}</div>
}

SkillsBlock.propTypes = {
  show: PropTypes.bool,
}
export default SkillsBlock
