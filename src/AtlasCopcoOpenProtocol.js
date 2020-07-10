const { EventEmitter } = require('events')

class AtlasCopcoOpenProtocol extends EventEmitter {
  constructor (params) {
    super()
  }

  async connect () {
  }

  async disconnect () {
  }

  async subscribe (address, callback, interval) {
  }

  async unsubscribe (address) {
  }

  async read (address) {
    throw new Error('read() not implemented here so far')
  }

  async write (address, data) {
    throw new Error('write() not implemented here so far')
  }
}

module.exports = AtlasCopcoOpenProtocol