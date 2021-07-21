# Atlas Copco OpenProtocol Connector

## About

This project implements a connector for the Atlas Copco OpenProtocol.
To use it you will need to commission a service with this image and make use of VRPC generic protocol interface.

# Relevant configuration setttings

Before actually build the image of this agent, there are severals settings that should be configured. Please refer to config/default.yaml and configure them to proceed:

*mqtt.host*: Should be configured to use the hostname of the broker you are using.

*vrpc.domain*: This should match with the domain configured in the commossioning file used to deploy this agent.

*vrpc.agent*: This is an indentifier that uniquely identifies this agent.

All these options are also possible to configure them using environment variables (using the *-e* CLI option).

## How to build it

`docker build -t registry.cybus.io/connectors/open-protocol-connector:0.1 .`

## How to run it

`docker run -d --name openprotocol-connector --rm -e CYBUS_MQTT_USER=admin -e CYBUS_MQTT_PASSWORD=admin registry.cybus.io/connectors/open-protocol-connector:0.1`
