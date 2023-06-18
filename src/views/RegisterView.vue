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
          <p class="text-h3 font-weight-bold">Registrasi Akun</p>
          <p>Isi data di bawah untuk registrasi akunmu</p>
          <p>Sudah punya akun? <router-link to="/login" class="text--blue-darken-2">Login!</router-link></p>
          <form @submit.prevent="register">
            <v-text-field
              v-model="name"
              label="Nama Lengkap"
              outlined
              dense
              hide-details
              class="mb-3"
            />
            <v-text-field
              v-model="nip"
              label="NIP"
              outlined
              dense
              hide-details
              class="mb-3"
            />
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              dense
              type="email"
              hide-details
              class="mb-3"
            />
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              dense
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (showPassword = !showPassword)"
              :type="showPassword ? 'text' : 'password'"
            />
            <v-btn 
                type="submit"
                color="blue darken-2"
                elevation="2"
                class="white--text"
                :loading="isLoading"
            >
              Register
            </v-btn>
          </form>
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
name: 'RegisterView',
components: { Notification },
mixins: [utils],
data: () => ({
  name: "",
  nip: "",
  email: "",
  password: "",
  showPassword: false
}),
methods: {
  async register() {
    await this.safeCallApi({
      apiCall: axios.post(`${BASE_URL}/auth/register`, {
          email: this.email,
          password: this.password,
          name: this.name,
          nip: this.nip
        }),
      onSuccess: ({ content, error }) => {
        if (error) {
          throw Error(error.message)
        }

        const notif = {
          isShow: true,
          isError: false,
          message: "Berhasil mendaftarkan pengguna! Silahkan hubungi Admin untuk verifikasi akun"
        }
        this.$store.dispatch('notification/showNotification', notif)
      }
    })
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