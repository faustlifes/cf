import React, { PureComponent } from 'react'
import { Link as ScrollLink, scrollSpy } from 'react-scroll'
import LoginModal from '../components/auth/LoginModal.jsx'
import RegisterModal from '../components/auth/RegisterModal.jsx'

// 'react-scroll' have bugs with active class, todo: fix

class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      isLoggedIn: false, // Mock auth state
      isLoginModalOpen: false,
      isRegisterModalOpen: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.dropdownRef = React.createRef()
    this.openLoginModal = this.openLoginModal.bind(this)
    this.closeLoginModal = this.closeLoginModal.bind(this)
    this.openRegisterModal = this.openRegisterModal.bind(this)
    this.closeRegisterModal = this.closeRegisterModal.bind(this)
  }

  componentDidMount() {
    scrollSpy.update()
    document.addEventListener('mousedown', this.handleClickOutside)
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

  render() {
    const { isMenuOpen, isLoggedIn, isLoginModalOpen, isRegisterModalOpen } = this.state

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
                    className={`burger-icon ${isMenuOpen ? 'open' : ''}`}
                    onClick={this.toggleMenu}
                    aria-label='Toggle user menu'
                  >
                    <span className='burger-line'></span>
                    <span className='burger-line'></span>
                    <span className='burger-line'></span>
                  </button>
                  {isMenuOpen && (
                    <div className='burger-dropdown'>
                      <ul>
                        {isLoggedIn ? (
                          <>
                            <li><a href='#profile' onClick={this.closeMenu}>User Profile</a></li>
                            <li><a href='#logout' onClick={this.closeMenu}>Log Out</a></li>
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
        />
        
        <RegisterModal 
          isOpen={isRegisterModalOpen} 
          onClose={this.closeRegisterModal} 
        />
      </div>
    )
  }
}

export default Header
