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

      <div class="ml-auto">
        <v-btn
          color="primary"
          elevation="2"
          raised
          @click="generatePdf"
        >
          <v-icon left>mdi-file-download</v-icon>
          Export PDF
        </v-btn>
      </div>
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
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from 'jspdf'
import { utils } from '@/mixins'
import { BASE_URL } from "../utils";

export default {
  name: 'AllDataView',
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
          { text: 'Mac Address', value: 'mac' },
          { text: 'Major', value: 'major' },
          { text: 'Minor', value: 'minor' },
          { text: 'Nomor Rak', value: 'rackNo' }
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

  methods: {
    generatePdf() {
      const doc = new jsPDF({orientation: 'landscape', unit: 'px',format: [1250,1100],compress : true});
      
      doc.html(this.$refs.itemTable.$el, {

        margin: [10, 10, 10, 10],
        x: 1,
        y: 1,
        callback: (doc) => {
          doc.save('test.pdf');
        }
      });
    }
  },

  async mounted() {
    await this.safeCallApi({
      apiCall: axios.get(`${BASE_URL}/private/devices`),
      onSuccess: ({ content, error }) => {
          content.devices.forEach(device => {
          this.items.push({
            id: device.id,
            mac: device.mac,
            name: device.name,
            major: device.major,
            minor: device.minor,
            rackNo: device.rack_no,
          })
        })
      }
    })
  }
};
</script>

<style>

</style>