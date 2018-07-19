<template>
  <q-page :padding="true" class="row">
      <div class="col-9">
        <div class="row">
          
        <div class="col-12">
            <strong>Messages</strong>
            <div  id="msgList" style="width: 100%; height: 600px; overflow-y: auto; border: 1px solid green;">
              <q-chat-message v-for="message in messages" :key="message.id"
                :text="[message.text]"
                :stamp="messageDate(message)"
                :sent="isSent(message) ? true : false"
              />
              
            </div>
            <q-input
              class=""
              v-model="message"
              v-on:keyup.enter="send"
              type="textarea"
              float-label="Enter your message"
              :max-height="20"
              rows="3"
            />
      
        </div>
        </div>
      </div>
      
        <q-list highlight class="col-3">
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
        
        
      

  </q-page>
</template>

<script>
import moment from 'moment'
import api from 'src/api'
import _ from 'lodash';


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
    scrollToBottom () {
      const container = this.$el.querySelector("#msgList");
      container.scrollTop = container.scrollHeight + 100;
    },
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
    },
    refreshUsers() {
       const users = api.service('users')
       return users.find()
        .then((response) => {
          this.$data.users = response.data
        })
    },
    refreshMessages() {
      const messages = api.service('messages')
      // Get all users and messages
      return messages.find({
        query: {
          $sort: { createdAt: -1 },
          $limit: 25
        }
      })
      .then((response) => {
        this.scrollToBottom();
        // We want the latest messages but in the reversed order
        this.$data.messages = _.sortBy(response.data, 'createdAt');//.reverse()
      })
    }
  },
  mounted () {
    const vm = this;
    this.$store.commit('questView', false)
    this.refreshMessages();
    this.refreshUsers();
    
    // Add new messages to the message list
    api.service('messages').on('created', message => {
      vm.refreshMessages();
      console.log('message received')
      // this.$data.messages.unshift(message)
    })
    // Add new users to the user list
    api.service('users').on('created', user => {
      vm.refreshUsers();
      console.log('user received')
      // this.$data.users = this.$data.users.concat(user)
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
