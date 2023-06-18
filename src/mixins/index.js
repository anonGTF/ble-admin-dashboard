export const utils = {
  computed: {
      isMobile() {
          return this.$vuetify.breakpoint.xs;
      },
      isLoading() {
          return this.$store.getters['process/isProcessing'];
      },
      showNotif() {
          return this.$store.getters['notification/isNotifShow'];
      },
      notifError() {
          return this.$store.getters['notification/isNotifError'];
      },
      notifMessage() {
          return this.$store.getters['notification/getNotifMessage'];
      }
  },

  methods: {
    async safeCallApi({ apiCall, onSuccess, onError = () => {} }) {
        this.$store.dispatch('process/showProcess')
        try {
          const response = await apiCall
          onSuccess(response.data)  
        } catch (error) {
            onError(error)
            const dataError = {
                isShow: true,
                isError: true,
                message: error.response.data.error.message
            }
            this.$store.dispatch('notification/showNotification', dataError)
        } finally {
            this.$store.dispatch('process/removeProcess')
        }
    }
  }
}