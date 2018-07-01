const fetch = require('node-fetch')
const cheerio = require('cheerio')
const Play = require('./Play')

class Game {

  // startLiveStream () {}

  static async startArchiveSteam (url, playbackSpeedSeconds, cb) {
    try {
      const data = await fetch(url)
      const dom = await data.text()
      const $ = cheerio.load(dom)
      this.homeTeam = $('.team.away h3').text().trim()
      this.awayTeam = $('.team.home h3').text().trim()
      this.description = $('#gamepackage-matchup-wrap .game-details').text()
      this.plays = []
      $('#gamepackage-qtrs-wrap table tbody tr').each((ri, r) => {
        this.plays.push(
          new Play(
            this.plays.length,
            $(r).find('.time-stamp').text(),
            $(r).find('.game-details').text(),
            $(r).find('.combined-score').text(),
          )
        )
      })
      let idx = 0
      const interval = setInterval(() => {
        if (idx === this.plays.length - 1) clearInterval(interval)
        cb(this.plays[idx])
        idx += 1
      }, playbackSpeedSeconds * 1000)
      return 1
    } catch (e) {
      console.log(e)
      return e
    }
  }

}

module.exports = Game
console.log('g')
