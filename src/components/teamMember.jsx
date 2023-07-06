import PropTypes from 'prop-types'

const TeamMember = ({ src, name, position }) => {
  return (
    <div className='col-xs-12 col-sm-6 col-md-3'>
      <div className='team-member clearfix'>
        <div className='team-member-photo'>
          <img src={src} alt='Team Member' />
          <div className='photo-mask'>
            <div className='circle'>
              <i className='fa fa-plus fa-2x' />
            </div>
          </div>
        </div>
        <div className='team-member-title'>
          <h2 className='team-member-name'>{name}</h2>
          <p className='team-member-position'>{position}</p>
        </div>
        <div className='team-member-links'>
          <a href='https://facebook.com'>
            <i className='fa fa-facebook fa-lg' />
          </a>
          <a href='https://twitter.com'>
            <i className='fa fa-twitter fa-lg' />
          </a>
          <a href='https://skype.com'>
            <i className='fa fa-skype fa-lg' />
          </a>
          <a href='https://vimeo.com'>
            <i className='fa fa-vimeo fa-lg' />
          </a>
        </div>
      </div>
    </div>
  )
}

TeamMember.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
}

export default TeamMember
