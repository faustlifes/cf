import PropTypes from 'prop-types'

const TeamMember = ({ src, name, position, social }) => {
  const hasSocials = social && (social.facebook || social.twitter || social.instagram || social.linkedin)

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
        {hasSocials && (
          <div className='team-member-links'>
            {social.facebook && (
              <a href={social.facebook}>
                <i className='fa fa-facebook fa-lg' />
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter}>
                <i className='fa fa-twitter fa-lg' />
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram}>
                <i className='fa fa-instagram fa-lg' />
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin}>
                <i className='fa fa-linkedin fa-lg' />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

TeamMember.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  social: PropTypes.shape({
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
    linkedin: PropTypes.string,
  }),
}

export default TeamMember
