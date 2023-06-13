<template>
  <v-container 
    class='pa-0'
    fill-height
    fluid
  >
    <v-row 
        no-gutters
        align="center"
    >
      <v-col>
        <v-container fluid :class="{'mw-90': $vuetify.breakpoint.smAndDown, 'mw-50': $vuetify.breakpoint.mdAndUp}">
          <p class="text-h3 font-weight-bold">Login</p>
          <p>Isi email dan password di bawah untuk login ke akunmu</p>
          <v-text-field
            v-model="email"
            label="Email"
            outlined
            type="email"
          />
          <v-text-field
            v-model="password"
            label="Password"
            outlined
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (showPassword = !showPassword)"
            :type="showPassword ? 'text' : 'password'"
          />
          <v-btn 
              color="blue darken-2"
              elevation="2"
              class="white--text"
              :loading="isLoading"
              @click="login"
          >
            Login
          </v-btn>
        </v-container>
      </v-col>
      <v-col class='banner blue darken-2 white--text pl-16 pt-16 d-none d-md-block'>
        <div class="my-auto banner-element">
          <p class="text-h3 font-weight-bold">Admin Dashboard Panel</p>
          <p class="white black--text d-inline-flex text-h2 font-weight-medium pa-3">Smart Warehouse System</p>
          <p class="white black--text d-inline-flex text-h2 font-weight-medium pa-3 mt-3">Berbasis BLE</p>
        </div>
      </v-col>
  </v-row>
  <Notification 
    :show="showNotif" 
    :message="notifMessage" 
    :isError="notifError" />
</v-container>
</template>

<script>
import axios from "axios";
import { utils } from '@/mixins'
import Notification from '@/components/Notification';
import { BASE_URL } from '../utils';

export default {
  name: 'LoginView',
  components: { Notification },
  mixins: [utils],
  data: () => ({
    email: "",
    password: "",
    showPassword: false
  }),
  methods: {
    async login() {
      try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
          email: this.email,
          password: this.password
        })

        const error = response.data.error
        const user = response.data.content.user

        if (error != null) {
          throw Error(error.message)
        }

        const accessToken = response.data.content.tokens.accessToken.token
        const refreshToken = response.data.content.tokens.refreshToken.token
        const token = { accessToken, refreshToken }
        const expiredMillis = response.data.content.tokens.accessToken.expirationDateValue

        this.$store.dispatch('user/saveToken', { token })
        this.$store.dispatch('user/saveUser', { user })
        this.$store.dispatch('user/saveExpirationMillis', { expiredMillis })

        this.$router.replace({ path: '/' })
      } catch (error) {
        const dataError = {
          isShow: true,
          isError: true,
          message: error.response.data.error.message
        }
        this.$store.dispatch('notification/showNotification', dataError)
      }
    }
  }
}
</script>

<style scoped>
.banner {
height: 85vh;
position: relative;
}

.banner-element {
position: absolute; 
top: 50%; 
transform: translateY(-50%);
}

.mw-90 {
max-width: 90%
}

.mw-50 {
max-width: 50%
}
</style>