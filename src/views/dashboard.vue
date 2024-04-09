<template>
  <NavbarComponent :name="name" :email="email" :coin="coin" />
</template>

<script lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import Api from '@/api/Api'

type id = string | null
type isAdmin = boolean
type profileModal = boolean

export default {
  name: 'Dashboard',

  components: {
    NavbarComponent
  },

  data() {
    return {
      profileModal: false,
      isAdmin: false,
      id: '',
      name: '',
      email: '',
      coin: 0,
    }
  },

  beforeMount() {
    this.id = localStorage.getItem('idAccount')
  },

  methods: {
    loadAccountDto() {
      const AccountDtoJSON = localStorage.getItem('idAccount')
      if (AccountDtoJSON) {
        const parsedAccountDto = JSON.parse(AccountDtoJSON)
        // Extrair os dados individualmente
        this.name = parsedAccountDto.name
        this.email = parsedAccountDto.email
        this.coin = parsedAccountDto.coin
      }
    }
  },
  updateInfo(params: boolean) {
    this.$emit('updateInfo', params)
  },

  async getAccount() {
    const response = await Api.get('/getAccount', this.id)
  }
}
</script>
<style></style>
