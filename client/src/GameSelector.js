import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import { subscribe } from './subscriptionService'
import Stream from './GameStream'

const styles = theme => ({
  form: {
    display: 'flex',
    'flex-direction': 'column',
    flexWrap: 'wrap',
    'align-items': 'center',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
})

class GameSelector extends Component {

  getPlayPauseText = streaming => (streaming ? 'Pause' : 'Start Stream')

  state = {
    archiveGames: [{
      url: 'http://www.espn.com/nba/playbyplay?gameId=401034614',
      name: 'NBA Finals 2018 Game 2 - Cavs v. Warriors',
      homeTeam: 'Cavs',
      awayTeam: 'Warriors',
    }],
    plays: [],
    gameType: '',
    selectedGame: {},
    selectedGameName: '',
    streaming: false,
    playBackSpeed: 0.5,
    playPauseText: this.getPlayPauseText(false),
    subscribedTo: '',
  }

  toggleStream = () => {
    const streaming = !this.state.streaming
    const playPauseText = this.getPlayPauseText(streaming)
    this.setState({
      streaming,
      playPauseText,
    })
    if (this.state.selectedGame.name !== this.state.subscribedTo) {
      subscribe(
        this.state.selectedGame.url,
        this.state.playBackSpeed,
        (err, play) => {
          if (this.state.streaming) this.setState({
            plays: this.state.plays.concat(play),
          })
        }
      )
      this.setState({
        subscribedTo: this.state.selectedGame.name,
      })
    }
  }

  setSelectedGame = (selectedGameName = '', selectedGame = {}) => this.setState({
    selectedGameName,
    selectedGame,
  })

  makeSelection = event => {
    const { value, name } = event.target

    switch (name) {
      case 'gameType':
        this.setState({ gameType: value })
        this.setSelectedGame()
        break
      case 'game':
        this.setSelectedGame(
          value,
          this.state.archiveGames.find(g => g.name === value)
        )
        break
      default:
        // no default
    }
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.app}>

        <form
          className={classes.form}
          autoComplete="off"
        >

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="game-type">Game Type</InputLabel>
            <Select
              value={this.state.gameType}
              onChange={this.makeSelection}
              inputProps={{
                name: 'gameType',
                id: 'game-type',
              }}
            >
              <MenuItem value="live">Live</MenuItem>
              <MenuItem value="archive">Archive</MenuItem>
            </Select>
          </FormControl>

          {this.state.gameType === 'live' &&
            <p>Live streaming coming soon. Please select Archive to continue.</p>
          }

          {this.state.gameType === 'archive' &&

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="game">Game</InputLabel>
              <Select
                value={this.state.selectedGameName}
                onChange={this.makeSelection}
                inputProps={{
                  name: 'game',
                  id: 'game',
                }}
              >
                {/* Select requires same value type as MenuItem, so only if a display value can be added, vals can be index and selectedGameName can be removed for selectedGame.name */}
                {this.state.archiveGames.map(game =>
                  (
                    <MenuItem
                      value={game.name}
                      key={game.url}
                    >
                      {game.name}
                    </MenuItem>
                  )
                  )}
                }
              </Select>
            </FormControl>

          }

          {this.state.selectedGameName.length > 0 &&

            <Button
              className={classes.submit}
              variant="outlined"
              color="primary"
              onClick={this.toggleStream}
            >
              {this.state.playPauseText}
            </Button>

          }

        </form>

        {this.state.selectedGame.name &&

          <Stream
            plays={this.state.plays}
            homeTeam={this.state.selectedGame.homeTeam}
            awayTeam={this.state.selectedGame.awayTeam}
          />

        }

      </div>
    )
  }
}

GameSelector.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GameSelector)
