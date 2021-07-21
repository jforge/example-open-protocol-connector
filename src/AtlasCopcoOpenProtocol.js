const { EventEmitter } = require('events')
const openProtocol = require('node-open-protocol')

class AtlasCopcoOpenProtocol extends EventEmitter {
  constructor (params) {
    super()

    const defaultOptions = {
      linkLayerActivate: undefined,
      genericMode: undefined,
      keepAlive: 10000,
      rawData: false,
      timeOut: 3000,
      retryTimes: 3,
      disableMidParsing: {}
    }

    this._connection = {
      host: params.host,
      port: params.port || 4545
    }

    this._options = { ...defaultOptions, ...params.options }

    this._subscriptions = new Map()

    this._connected = false
  }

  async connect () {
    try {
      this._client = openProtocol.createClient(
        this._connection.host,
        this._connection.port,
        this._options,
        this._onConnect.bind(this)) // We use bind here so that _onConnect is run on the context of 'this'

      this._client.on('close', this._onClose.bind(this))
      this._client.on('error', this._onError.bind(this))
    } catch (err) {
      this.emit('error', err)
    }
  }

  _onConnect (data) {
    this._connected = true
    this.emit('connected')
  }

  _onClose () {
    this._connected = false
    this.emit('connectLost')
  }

  _onError (err) {
    this.emit('error', err)
  }

  async disconnect () {
    if (this._client) {
      this._client.removeAllListeners('close')
      this._client.removeAllListeners('error')
      this._client.close()
      this._client = undefined
    }
    this._connected = false
    this.emit('disconnected')
  }

  async isConnected () {
    return this._connected
  }

  async subscribe ({ name }, id) {
    if (this._subscriptions.has(id)) return
    if (!name) throw new Error('The endpoint address should contain a name.')

    const callback = (data) => this.emit(id, data)

    this._subscriptions.set(id, {
      name,
      callback
    })

    this._client.on(name, callback)

    return this._client.subscribe(name)
  }

  async unsubscribe (id) {
    if (!this._subscriptions.has(id)) return

    const { name, callback } = this._subscriptions.get(id)
    this._subscriptions.delete(id)

    this._client.removeListener(name, callback)
    return this._client.unsubscribe(name)
  }

  async read (address) {
    throw new Error('read() not implemented here so far')
  }

  async write (address, data) {
    throw new Error('write() not implemented here so far')
  }
}

module.exports = AtlasCopcoOpenProtocol