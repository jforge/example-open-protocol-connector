'use strict'
const { VrpcAdapter, VrpcAgent } = require('vrpc')
const config = require('config')

VrpcAdapter.register(require('./src/AtlasCopcoOpenProtocol'))

const agent = new VrpcAgent({
  domain: config.get('vrpc.domain'),
  agent: config.get('vrpc.agent'),
  username: config.get('mqtt.username'),
  password: config.get('mqtt.password'),
  broker: `${config.get('mqtt.scheme')}://${config.get(
    'mqtt.host')}:${config.get('mqtt.port')}`
})

agent.serve()