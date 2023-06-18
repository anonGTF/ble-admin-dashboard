<template>
  <v-container fluid class="d-flex align-center text-center" style="height: 100vh;">
    <v-row>
      <v-col>
        <p class="display-1">{{ name }}</p>
        <p class="display-1">{{ email }}</p>
        <p class="display-1">{{ nip }}</p>
        <v-btn 
          depressed
          color="error"
          @click="logout"
        >Logout</v-btn>
        <br>
        <v-progress-circular
          v-show="isLoading"
          indeterminate
          color="primary"
          class="mt-3"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '../utils'
import { utils } from '../mixins'

export default {
  name: 'ProfileView',
  mixins: [utils],
  data() {
    return {
      name: '',
      email: '',
      nip: ''
    }
  },
  methods: {
    async logout() {
      this.$store.dispatch('process/showProcess')
      try {
        this.$store.dispatch('user/reset')
        await axios.post(`${BASE_URL}/auth/logout`)
      } catch (error) {
        console.log(error)
      } finally {
        this.$store.dispatch('process/removeProcess')
        this.$router.replace({ path: '/login' })
      }
    }
  },
  async mounted() {
    const user = this.$store.getters['user/getUser']
    this.name = user.name
    this.nip = user.nip
    this.email = user.email
  }
}
</script>

<style>

</style>