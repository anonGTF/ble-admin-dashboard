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

      <template v-slot:item.action="{ item }">
            <v-item-group>
              <v-btn color="primary" class="mr-1 text-none" :disabled="item.is_verified" @click.stop="verify(item)">
                Verifikasi
              </v-btn>

              <v-btn color="success" class="mr-1 text-none" :disabled="item.role == 'ADMIN'" @click.stop="makeAdmin(item)">
                Jadikan Admin
              </v-btn>
  
              <v-btn color="error" class="text-none" @click.stop="openDeleteDialog(item)">
                Hapus
              </v-btn>
            </v-item-group>
          </template>
    </v-data-table>

    <v-dialog
      v-model="deleteDialog"
      persistent
      max-width="360"
    >
      <v-card>
        <v-card-title class="text-h5">
          Anda yakin ingin menghapus user ini?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            text
            @click="closeDeteleDialog()"
          >
            Batalkan
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleteUser"
          >
            Iya
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          { text: 'Terverifikasi', value: 'is_verified' },
          { text: 'Action', value: 'action' }
      ],
      items: [],
      search: "",
      selectedItem: {},
      deleteDialog: false
    }
  },

  computed: {
    itemsForTable: ({ items }) => 
      items.map((data, index) => ({
        ...data,
        index: index + 1
      }))
  },

  methods: {
    async verify(item) {
      console.log(item);
      await axios.post(`${BASE_URL}/private/users/verify`, {
        id: item.id
      })
      await this.setup()
    },
    async makeAdmin(item) {
      await axios.post(`${BASE_URL}/private/users/update`, {
        id: item.id,
        name: item.name,
        role: "ADMIN",
        nip: item.nip
      })
      await this.setup()
    },
    async deleteUser() {
      await axios.post(`${BASE_URL}/private/users/remove`, {
        id: this.selectedItem.id
      })
      this.closeDeteleDialog()
      await this.setup()
    },
    openDeleteDialog(item) {
      this.selectedItem = item
      this.deleteDialog = true
    },
    closeDeteleDialog() {
      this.selectedItem = {}
      this.deleteDialog = false
    },
    async setup() {
      this.items = []
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
  },

  async mounted() {
    await this.setup()
  }
}
</script>

<style>

</style>