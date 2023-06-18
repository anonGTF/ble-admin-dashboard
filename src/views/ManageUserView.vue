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
      <v-progress-circular
        v-show="isLoading"
        indeterminate
        color="primary"
        class="ml-2"
      ></v-progress-circular>
    </div>

    <v-data-table
      ref="itemTable"
      :headers="headers"
      :items="itemsForTable"
      :items-per-page="10"
      :search="search"
      :loading="isLoading"
      loading-text="Memuat data..."
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
import { utils } from "../mixins";

export default {
  name: "ManageUserView",
  mixins: [utils],
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
      this.safeCallApi({
        apiCall: axios.post(`${BASE_URL}/private/users/verify`, {
          id: item.id
        }),
        onSuccess: async (data) => {
          await this.setup()
        }
      })
    },
    async makeAdmin(item) {
      this.safeCallApi({
        apiCall: axios.post(`${BASE_URL}/private/users/update`, {
        id: item.id,
        name: item.name,
        role: "ADMIN",
        nip: item.nip
      }),
        onSuccess: async (data) => {
          await this.setup()
        }
      })
    },
    async deleteUser() {
      this.safeCallApi({
        apiCall: axios.post(`${BASE_URL}/private/users/remove`, {
          id: this.selectedItem.id
        }),
        onSuccess: async (data) => {
          await this.setup()
          this.closeDeteleDialog()
        }
      })
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
      this.safeCallApi({
        apiCall: axios.get(`${BASE_URL}/private/users`),
        onSuccess: ({ content, error }) => {
            this.items = []
            content.users.forEach(user => {
            this.items.push({
              id: user.id,
              name: user.name,
              nip: user.nip,
              email: user.email,
              role: user.role,
              is_verified: (user.is_verified) ? "Sudah" : "Belum"
            })
          })
        }
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