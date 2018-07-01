const Game = require('./Game')

class StreamService {
  static async playDemo (url, playbackSpeed, cb) {
    try {
      return Game.startArchiveSteam(url, playbackSpeed, cb)
    } catch (e) {
      console.log(e)
      return e
    }
  }
}

module.exports = StreamService
