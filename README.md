# Atlas Copco OpenProtocol Connector

## About

This project implements a connector for the Atlas Copco OpenProtocol.
To use it you will need to commission a Cybus Connectware service with 
this docker image and make use of the [VRPC generic protocol interface](https://docs.cybus.io/latest/user/protocols/genericVrpc.html).

# Relevant configuration settings

Before actually building the image of this agent, several settings need to be tweaked. 
Please refer to config/default.yaml and configure them to proceed:

`mqtt.host`: Should be configured to use the hostname of the broker you are using.

`vrpc.domain`: This should match with the domain configured in the commissioning file used to deploy this agent.

`vrpc.agent`: This is an identifier that uniquely identifies this agent.

All these options can also be configured using environment variables (using the `-e` CLI option).

## How to build it

```
docker build -t registry.cybus.io/connectors/open-protocol-connector:0.1 .
```

## How to run it

```
docker run -d --name openprotocol-connector --rm \
    -e CYBUS_MQTT_USER=admin \
    -e CYBUS_MQTT_PASSWORD=admin \
    registry.cybus.io/connectors/open-protocol-connector:0.1
```
