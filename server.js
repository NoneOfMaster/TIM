const StreamService = require('./services/StreamService')
const io = require('socket.io')()

io.on('connection', client => {
  client.on('subscribe', (url, playbackSpeed) => {
    StreamService.playDemo(url, playbackSpeed, play => {
      client.emit('play', play)
    })
  })
})

const port = 5000
io.listen(port)
console.log(`Listening on port ${port}`)
