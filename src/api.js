import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'

const socket = io('/', {path: '/socket.io'});

const api = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))

api.service('/users')
api.service('/messages')
api.service('/conversation')
api.service('/tree-view')
api.service('/tags')
api.service('/search')

export default api
