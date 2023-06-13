<template>
   <div class="ma-4">
    <div class="d-flex">
      <div>
        <v-text-field
          v-model="search"
          outlined
          dense
          label="Search by name"
          append-icon="mdi-magnify"
        ></v-text-field>
      </div>
    </div>

    <v-data-table
      ref="itemTable"
      :headers="headers"
      :items="itemsForTable"
      :items-per-page="10"
      :search="search"
      class="elevation-1">
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../utils";


export default {
  name: "ManageUserView",
  data() {
    return {
      headers: [
          {
            text: 'No',
            align: 'start',
            value: 'index',
          },
          { text: 'Nama', value: 'name' },
          { text: 'NIP', value: 'nip' },
          { text: 'Email', value: 'email' },
          { text: 'Role', value: 'role' },
          { text: 'Terverifikasi', value: 'is_verified' }
      ],
      items: [],
      search: ""
    }
  },

  computed: {
    itemsForTable: ({ items }) => 
      items.map((data, index) => ({
        ...data,
        index: index + 1
      }))
  },

  async mounted() {
    const response = await axios.get(`${BASE_URL}/private/users`)
    response.data.content.users.forEach(user => {
      this.items.push({
        id: user.id,
        name: user.name,
        nip: user.nip,
        email: user.email,
        role: user.role,
        is_verified: user.is_verified
      })
    })
  }
}
</script>

<style>

</style>