import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { default as thunk } from 'redux-thunk';
import { Switch, Route } from 'react-router';
//------------------------------------------------------
import Header from './main/Header.jsx';
import Footer from './main/Footer.jsx';

//------------------------------------------------------
import sliderReducer from './reducers/sliderReducer';
import teamFactsReducer from './reducers/teamFactsReducer';
import aboutReducer from './reducers/aboutReducer';
import portfolioReducer from './reducers/portfolioReducer';
import contactFormReducer from './reducers/contactFormReducer';
import feedbackReducer from './reducers/feedbackReducer';
import newsReducer from './reducers/newsReducer';
import Home from './components/Home/Home.jsx';
import items from './components/serviceSection/ServiceItems.jsx';
import NewsView from './main/NewsView.jsx';

const reducers = combineReducers({
    slider: sliderReducer,
    teamFacts: teamFactsReducer,
    about: aboutReducer,
    portfolio: portfolioReducer,
    contactForm: contactFormReducer,
    feedback: feedbackReducer,
    news: newsReducer
});

const middleware = applyMiddleware(thunk);
const store = createStore(reducers, middleware);
const container = document.getElementById('main-app');
const root = createRoot(container);
//------------------------------------------------------

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

root.render(
    <Provider store={store}>
      <div>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route
              path='/'
              exact
              component={Home}>
            </Route>
            <Route path='/news/:id' component={NewsView}/>
            {/*<Route path='/' exact component={items.ServiceWeb} />*/}

          </Switch>
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
);
