import React, { PureComponent, Fragment } from 'react';
import HomeSection from '../../main/HomeSection.jsx';
import ServiceSection from '../../main/ServiceSection.jsx';
import AboutSection from '../../main/AboutSection.jsx';
import WorkSection from '../../main/WorkSection.jsx';
import TeamSection from '../../main/TeamSection.jsx';
import NewsSection from '../../main/NewsSection.jsx';
import FeedbackSection from '../../main/FeedbackSection.jsx';
import ContactSection from '../../main/ContactSection.jsx';

class Home extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <HomeSection />
        <ServiceSection>
          {this.props.children}
        </ServiceSection>
        <AboutSection />
        <WorkSection />
        <TeamSection />
        <NewsSection />
        <FeedbackSection />
        <ContactSection />
      </Fragment>
    )
  }
}

export default Home;
