import React, { PureComponent } from 'react';

import { Link } from 'react-router-dom';

class ServiceSection extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      itemIndex: 0,
  }
    this.linkClick = this.linkClick.bind(this);
  }

  linkClick (num) {
    let activeLink = document.querySelector('.service-nav-item.active');
    if (activeLink) {
      activeLink.classList.remove('active');
      this.setState({ itemIndex: num });
    }

    document.querySelectorAll('.service-nav-item')[ num ].classList.add('active');
  }

  render () {
    const { itemIndex } = this.state;
    return (
      <section id="service">
        <div className="light-bg section-offset-bottom">
          <div className="container">
            <div className="title-content">
              <h1>Our Services</h1>
              <hr/>
              <hr/>
            </div>
            <div className="service-nav-container">
              <ul className="service-nav">
                <li className="service-nav-item active" onClick={() => this.linkClick(0)}>
                  <span>Web Design</span>
                  {/*<Link to="/service/web"><span>Web Design</span></Link>*/}
                </li>
                <li className="service-nav-item" onClick={() => this.linkClick(1)}>
                  <span>Graphic Design</span>
                  {/*<Link to="/service/graphic"><span>Graphic Design</span></Link>*/}
                </li>
                <li className="service-nav-item" onClick={() => this.linkClick(2)}>
                  <span>Online Support</span>
                  {/*<Link to="/service/support"><span>Online Support</span></Link>*/}
                </li>
                <li className="service-nav-item" onClick={() => this.linkClick(3)}>
                  <span>App Design</span>
                  {/*<Link to="/service/app"><span>App Design</span></Link>*/}
                </li>
                <li className="service-nav-item" onClick={() => this.linkClick(4)}>
                  <span>Online Marketing</span>
                  {/*<Link to="/service/marketing"><span>Online Marketing</span></Link>*/}
                </li>
                <li className="service-nav-item" onClick={() => this.linkClick(5)}>
                  <span>Seo Service</span>
                  {/*<Link to="/service/seo"><span>Seo Service</span></Link>*/}
                </li>
              </ul>
            </div>
            <span>{itemIndex}</span>
            {this.props.children}
          </div>
        </div>
      </section>
    )
  }
}

export default ServiceSection;