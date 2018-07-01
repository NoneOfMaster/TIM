import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:5000')

const subscribe = (url, playbackSpeed, cb) => {
  socket.on('play', play => cb(null, play))
  socket.emit('subscribe', url, playbackSpeed)
}

export { subscribe }
