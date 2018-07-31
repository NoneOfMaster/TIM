import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GameSelector from './GameSelector'
import './App.css'
import bball from './bball.png'

const styles = () => ({
  app: {
    'text-align': 'center',
  },
  'app-logo': {
    animation: 'App-logo-spin infinite 20s linear',
    height: 80,
  },
  'app-header': {
    'background-color': '#222',
    height: 80,
    padding: 20,
    color: 'white',
  },
  'app-content': {
    display: 'flex',
    'flex-direction': 'column',
    flexWrap: 'wrap',
    'align-items': 'center',
    padding: 20,
  },
})

const App = props => {
  const { classes } = props

  return (
    <div className={classes.app}>

      <header className={classes['app-header']}>
        <img src={bball} className={classes['app-logo']} alt="logo" />
      </header>

      <content className={classes['app-content']}>

        <GameSelector />

      </content>

    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
