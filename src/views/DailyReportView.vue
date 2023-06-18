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
import { format } from "date-fns";
import jsPDF from 'jspdf'
import { utils } from '@/mixins'
import { BASE_URL, getTomorrow, formatDate } from "../utils";

export default {
  name: 'DailyReportView',
  mixins: [utils],
  data() {
    return {
      headers: [
          {
            text: 'No',
            align: 'start',
            value: 'index',
          },
          { text: 'Tipe', value: 'type' },
          { text: 'Nama', value: 'name' },
          { text: 'Mac Address', value: 'mac' },
          { text: 'Major/Minor', value: 'majorMinor' },
          { text: 'PIC', value: 'username' },
          { text: 'Tanggal', value: 'date' },
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
    const today = new Date()
    const tomorrow = getTomorrow()
    const todayStr = format(today, "dd/MM/yyyy")
    const tomorrowStr = format(tomorrow, "dd/MM/yyyy")

    await this.safeCallApi({
      apiCall: axios.get(`${BASE_URL}/private/logs`, {
        params: {
          start: todayStr,
          end: tomorrowStr
        }
      }),
      onSuccess: ({ content, error }) => {
          content.logs.forEach(log => {
          this.items.push({
            id: log.id,
            type: log.type,
            mac: log.bleDevice.mac,
            name: log.bleDevice.name,
            majorMinor: `${log.bleDevice.major}/${log.bleDevice.minor}`,
            username: log.user.name,
            date: formatDate(log.date)
          })
        })
      }
    })
  }
};
</script>

<style>

</style>