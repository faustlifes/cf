import { Fragment } from 'react'
import HomeSection from '../../main/HomeSection.jsx'
import ServiceSection from '../../main/ServiceSection.jsx'
import AboutSection from '../../main/AboutSection.jsx'
import WorkSection from '../../main/WorkSection.jsx'
import TeamSection from '../../main/TeamSection.jsx'
import NewsSection from '../../main/NewsSection.jsx'
import FeedbackSection from '../../main/FeedbackSection.jsx'
import ContactSection from '../../main/ContactSection.jsx'

const Home = () => {
  return (
    <Fragment>
      <HomeSection />
      <ServiceSection />
      <AboutSection />
      <WorkSection />
      <TeamSection />
      <NewsSection />
      <FeedbackSection />
      <ContactSection />
    </Fragment>
  )
}

export default Home
