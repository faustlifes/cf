import { PureComponent } from 'react'
import NewsApp from '../containers/newsApp.jsx'
class NewsSection extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <section id='news'>
          <div className='light-bg section-offset-bottom'>
            <div className='container'>
              <div className='title-content'>
                <h1>Breaking News</h1>
                <hr />
                <hr />
              </div>
              <NewsApp />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default NewsSection
