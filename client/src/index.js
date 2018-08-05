import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
import rootReducer from './reducers'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const history = createBrowserHistory()

const defaultState = {
  stream: {
    theaterMode: false,
  },
}

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
/* eslint-enable */

const store = createStore(
  connectRouter(history)(rootReducer),
  defaultState,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
)

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <AppContainer>
                  <App />
                </AppContainer>)}
            />
            <Route render={() => (<div>default</div>)} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
}

registerServiceWorker()
render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
