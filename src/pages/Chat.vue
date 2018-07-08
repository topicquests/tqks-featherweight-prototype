<template>
  <q-page class="flex flex-center">
    
      <div class="row full-width">
        
        <div class="layout-padding col-8" style="height: 400px; overflow-y: scroll;">
          <q-chat-message v-for="message in messages" :key="message.id"
            :text="[message.text]"
            
            :stamp="messageDate(message)"
            :sent="isSent(message) ? true : false"
          />
        </div>
        
        
        <q-list highlight class="col-auto" style="height: 400px; overflow-y: scroll;">
          <q-list-header>People</q-list-header>
          <q-item v-for="user in users" :key="user.id">
            <q-item-side :avatar="user.avatar" />
            <q-item-main>
              <q-item-tile label>{{user.handle}}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-item-tile icon="chat_bubble" color="green" />
            </q-item-side>
          </q-item>
        </q-list>
        
        
      </div>
      
      <div class="row full-width">
        <q-input
          class="row col-12 fixed-bottom chat-message"
          style="z-index: 1001; margin-top: 16px; margin-bottom: 80px; width: 600px"
          v-model="message"
          v-on:keyup.enter="send"
          type="textarea"
          float-label="Enter your message"
          :max-height="20"
          rows="3"
        />
      </div>
  </q-page>
</template>

<script>
import moment from 'moment'
import api from 'src/api'

export default {
  name: 'chat',
  props: ['user'],
  data () {
    return {
      message: '',
      messages: [],
      users: []
    }
  },
  computed: {
  },
  methods: {
    isSent (message) {
      return (message.userId === this.user._id)
    },
    messageDate (message) {
      return message.user.handle+" "+moment(message.createdAt).format('MMM Do, hh:mm:ss')
    },
    send () {
      if (this.$data.message) {
        api.service('messages').create({ text: this.$data.message }).then(() => {
          this.$data.message = ''
        })
      }
    }
  },
  mounted () {
    const messages = api.service('messages')
    const users = api.service('users')

    // Get all users and messages
    messages.find({
      query: {
        $sort: { createdAt: -1 },
        $limit: 25
      }
    })
      .then((response) => {
        // We want the latest messages but in the reversed order
        this.$data.messages = response.data.reverse()
      })
    users.find()
      .then((response) => {
        this.$data.users = response.data
      })

    // Add new messages to the message list
    messages.on('created', message => {
      console.log('message received')
      this.$data.messages.unshift(message)
    })
    // Add new users to the user list
    users.on('created', user => {
      console.log('user received')
      this.$data.users = this.$data.users.concat(user)
    })
  },
  beforeDestroy () {
  }
}
</script>

<style lang="styl">
  .chat-message .q-input-area {
    min-height: 19px !important;
    height: 19px !important;
  }
</style>
