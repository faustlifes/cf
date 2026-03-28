import React, { PureComponent } from 'react'
import { Link as ScrollLink, scrollSpy } from 'react-scroll'
import LoginModal from '../components/auth/LoginModal.jsx'
import RegisterModal from '../components/auth/RegisterModal.jsx'
import UserProfileModal from '../components/auth/UserProfileModal.jsx'

// 'react-scroll' have bugs with active class, todo: fix

class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      isLoggedIn: false, // Mock auth state
      isLoginModalOpen: false,
      isRegisterModalOpen: false,
      isUserProfileModalOpen: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.dropdownRef = React.createRef()
    this.openLoginModal = this.openLoginModal.bind(this)
    this.closeLoginModal = this.closeLoginModal.bind(this)
    this.openRegisterModal = this.openRegisterModal.bind(this)
    this.closeRegisterModal = this.closeRegisterModal.bind(this)
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.openUserProfileModal = this.openUserProfileModal.bind(this)
    this.closeUserProfileModal = this.closeUserProfileModal.bind(this)
  }

  componentDidMount() {
    scrollSpy.update()
    document.addEventListener('mousedown', this.handleClickOutside)
    if (sessionStorage.getItem('access_token')) {
      this.setState({ isLoggedIn: true })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside(event) {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
      if (this.state.isMenuOpen) {
        this.closeMenu()
      }
    }
  }

  toggleMenu() {
    this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }))
  }

  closeMenu() {
    this.setState({ isMenuOpen: false })
  }

  handleLoginSuccess() {
    this.setState({ isLoggedIn: true, isLoginModalOpen: false })
  }

  handleLogout(e) {
    if (e) e.preventDefault()
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('user')
    this.setState({ isLoggedIn: false })
    this.closeMenu()
  }

  openLoginModal(e) {
    e.preventDefault()
    this.setState({ isLoginModalOpen: true })
    this.closeMenu()
  }

  closeLoginModal() {
    this.setState({ isLoginModalOpen: false })
  }

  openRegisterModal(e) {
    e.preventDefault()
    this.setState({ isRegisterModalOpen: true })
    this.closeMenu()
  }

  closeRegisterModal() {
    this.setState({ isRegisterModalOpen: false })
  }

  openUserProfileModal(e) {
    if (e) e.preventDefault()
    this.setState({ isUserProfileModalOpen: true })
    this.closeMenu()
  }

  closeUserProfileModal() {
    this.setState({ isUserProfileModalOpen: false })
  }

  render() {
    const { isMenuOpen, isLoggedIn, isLoginModalOpen, isRegisterModalOpen, isUserProfileModalOpen } = this.state

    let options = {
      duration: 1000,
      offset: -100,
      smooth: true,
      spy: true,
      activeClass: 'nav-active',
    }
    return (
      <div>
        <header id='header'>
          <div className='container'>
            <div className='logo-container'>
              <ScrollLink
                style={{ cursor: 'pointer' }}
                to='home'
                {...options}
                activeClass=''
              >
                {/*<span className="logo-img" />*/}
                <img src='assets/img/logo-cf.png' className='logo-img' alt='logo' />
                <span className='logo-text logo-text-part1'>CF</span>
                <span className='logo-text logo-text-part2'>UA</span>
              </ScrollLink>
            </div>
            <nav className='nav-main'>
              <ul>
                <li>
                  <ScrollLink to='home' {...options}>
                    Home
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to='service' {...options}>
                    Service
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to='about' {...options}>
                    About
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to='work' {...options}>
                    Work
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to='team' {...options}>
                    Team
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to='news' {...options}>
                    News
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to='feedback' {...options}>
                    Feedback
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to='contact' {...options}>
                    Contact
                  </ScrollLink>
                </li>
                <li className='burger-menu-container' ref={this.dropdownRef}>
                  <button
                    className={`${isLoggedIn ? 'profile-icon' : 'burger-icon'} ${isMenuOpen ? 'open' : ''}`}
                    onClick={this.toggleMenu}
                    aria-label={isLoggedIn ? 'User menu' : 'Toggle navigation'}
                  >
                    {isLoggedIn ? (
                      <div className="profile-image-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                        </svg>
                      </div>
                    ) : (
                      <>
                        <span className='burger-line'></span>
                        <span className='burger-line'></span>
                        <span className='burger-line'></span>
                      </>
                    )}
                  </button>
                  {isMenuOpen && (
                    <div className='burger-dropdown'>
                      <ul>
                        {isLoggedIn ? (
                          <>
                            <li><a href='#profile' onClick={this.openUserProfileModal}>User Profile</a></li>
                            <li><a href='#logout' onClick={this.handleLogout}>Log Out</a></li>
                          </>
                        ) : (
                          <>
                            <li><a href='#login' onClick={this.openLoginModal}>Log In</a></li>
                            <li><a href='#register' onClick={this.openRegisterModal}>Register</a></li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={this.closeLoginModal} 
          onLoginSuccess={this.handleLoginSuccess}
        />
        
        <RegisterModal 
          isOpen={isRegisterModalOpen} 
          onClose={this.closeRegisterModal} 
        />
        
        <UserProfileModal
          isOpen={isUserProfileModalOpen}
          onClose={this.closeUserProfileModal}
        />
      </div>
    )
  }
}

export default Header
