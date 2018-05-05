import React, { PureComponent } from 'react';
import { Route } from 'react-router';
import NewsApp from './../containers/newsApp.jsx';
import NewsView from './NewsView.jsx';
class NewsSection extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {

    return (
      <div>
        <section id="news">
          <div className="light-bg section-offset-bottom">
            <div className="container">
              <div className="title-content">
                <h1>Breaking News</h1>
                <hr/>
                <hr/>
              </div>
              <NewsApp/>
            </div>
          </div>
        </section>
        <Route path="/:id" component={NewsView}/>
      </div>
    )
  }
}

export default NewsSection;