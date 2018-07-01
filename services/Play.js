class Play {
  constructor (id, time, description, score) {
    this.id = id
    this.time = time
    this.description = description
    const splitScore = score.split(' - ')
    this.home = Number(splitScore[0])
    this.away = Number(splitScore[1])
  }
}

module.exports = Play
