import React from 'react'

import TeamFactsApp from '../containers/teamFactsApp.jsx'
import TeamMember from '../components/teamMember.jsx'

class TeamSection extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let teamData = [
      {
        name: 'John Doe #1',
        position: 'Designer',
        src: 'assets/img/team_member1.jpg',
      },
      {
        name: 'John Doe #2',
        position: 'Developer',
        src: 'assets/img/team_member1.jpg',
      },
      {
        name: 'John Doe #3',
        position: 'Designer',
        src: 'assets/img/team_member1.jpg',
      },
      {
        name: 'John Doe #4',
        position: 'Developer',
        src: 'assets/img/team_member1.jpg',
      },
    ]

    const teamFacts = {
      currNumber: [4609, 3470, 2908, 1908],
      finished: false,
      initOptions: () => {},
      startCount: () => {},
      stopCount: () => {},
    }

    let team = teamData.map((item, index) => {
      return (
        <TeamMember
          key={index}
          name={item.name}
          position={item.position}
          src={item.src}
        />
      )
    })

    return (
      <section id='team'>
        <div className='light-bg'>
          <div className='container clearfix section-offset-bottom'>
            <div className='title-content'>
              <h1>Meet Our Team</h1>
              <hr />
              <hr />
            </div>
            <div className='row'>{team}</div>
          </div>
          <TeamFactsApp {...teamFacts} />
        </div>
      </section>
    )
  }
}

export default TeamSection
