import { createRoot } from 'react-dom/client'
import { Routes, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
// import { default as thunk } from 'redux-thunk'
import { Route } from 'react-router'
//------------------------------------------------------
import Header from './main/Header.jsx'
import Footer from './main/Footer.jsx'

//------------------------------------------------------
import sliderReducer from './reducers/sliderReducer'
import teamFactsReducer from './reducers/teamFactsReducer'
import aboutReducer from './reducers/aboutReducer'
import portfolioReducer from './reducers/portfolioReducer'
import contactFormReducer from './reducers/contactFormReducer'
import feedbackReducer from './reducers/feedbackReducer'
import newsReducer from './reducers/newsReducer'
import Home from './components/Home/Home.jsx'
import NewsView from './main/NewsView.jsx'

const reducers = {
  slider: sliderReducer,
  teamFacts: teamFactsReducer,
  about: aboutReducer,
  portfolio: portfolioReducer,
  contactForm: contactFormReducer,
  feedback: feedbackReducer,
  news: newsReducer,
}

// const middleware = applyMiddleware(thunk)
const store = configureStore({ reducer: reducers })
const container = document.getElementById('main-app')
const root = createRoot(container)
//------------------------------------------------------

root.render(
  <Provider store={store}>
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />}></Route>
          <Route path='/news/:id' element={<NewsView />} />
          {/*<Route path='/' exact component={items.ServiceWeb} />*/}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
    {/*<Router history={hashHistory}>
            <Route component={App}>
                <Route path="/" component={Home} >
                    <IndexRoute component={ServiceWeb} />
                    <Route path="/service/web" component={ServiceWeb} />
                    <Route path="/service/graphic" component={ServiceGraphic} />
                    <Route path="/service/support" component={ServiceSupport} />
                    <Route path="/service/app" component={ServiceApp} />
                    <Route path="/service/marketing" component={ServiceMarketing} />
                    <Route path="/service/seo" component={ServiceSeo} />
                </Route>
                <Route path="/:id" component={NewsView} />
            </Route>
        </Router>*/}
  </Provider>
)
