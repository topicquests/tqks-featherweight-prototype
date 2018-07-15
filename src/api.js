import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'

const { hostname, protocol } = window.document.location;
const apiServer = `${protocol}//${hostname}:8081`;
const socket = io(apiServer, {transports: ['websocket']})

const api = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))

api.service('/users')
api.service('/messages')
api.service('/conversation')
api.service('/tree-view')

export default api
