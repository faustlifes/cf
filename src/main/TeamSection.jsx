import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TeamFactsApp from '../containers/teamFactsApp.jsx'
import TeamMember from '../components/teamMember.jsx'
import { fetchTeammates } from '../actions/teamActions'

const TeamSection = () => {
  const dispatch = useDispatch()
  const teamData = useSelector((state) => state.team.teamData) || []

  useEffect(() => {
    dispatch(fetchTeammates())
  }, [dispatch])

  const teamFacts = {
    currNumber: [4609, 3470, 2908, 1908],
    finished: false,
    initOptions: () => {},
    startCount: () => {},
    stopCount: () => {},
  }

  const team = teamData.map((item, index) => {
    return (
      <TeamMember
        key={index}
        name={item.name}
        position={item.position}
        src={item.src}
        social={item.social}
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

export default TeamSection
