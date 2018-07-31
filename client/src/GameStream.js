import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  scoreboard: {
    display: 'flex',
    'flex-direction': 'column',
    flexWrap: 'wrap',
    'align-items': 'center',
  },
})

const GameStream = props => {
  const highlightPlay = props.plays.length ? props.plays[props.plays.length - 1] : {}
  return (
    <div>
      <h1>{highlightPlay.description}</h1>
      <div className={props.classes.scoreboard}>
        <table>
          <thead>
            <tr>
              <th><h2>{props.homeTeam}</h2></th>
              <th><h2>{props.awayTeam}</h2></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><h2>{highlightPlay.home || 0}</h2></td>
              <td><h2>{highlightPlay.away || 0}</h2></td>
            </tr>
          </tbody>
        </table>
      </div>
      {props.plays.map(play =>
        (
          <p key={play.id}>
            {play.description}
          </p>
        )
      )}
    </div>
  )
}

GameStream.propTypes = {
  classes: PropTypes.object.isRequired,
  plays: PropTypes.array.isRequired,
  homeTeam: PropTypes.string.isRequired,
  awayTeam: PropTypes.string.isRequired,
}

export default withStyles(styles)(GameStream)
