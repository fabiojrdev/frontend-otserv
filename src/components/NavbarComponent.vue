<template>
  <div class="bg-[#2E2E2EAF] w-[250px] items-center justify-center flex-center">
    <div class="">
      <img class="mx-[45px] h-[90px]" src="/src/assets/logoot.png" alt="png" />
    </div>
    <div class="h-screen flex-center">
      <p class="mx-[10px] my-[16px] text-xl">Olá, {{ name }}</p>
      <p class="mx-[10px]">Email: {{ email }}</p>
      <p class="mx-[10px]">Coins: {{ coin }}</p>
      <div class="my-[40px] mx-[10px]">
        <div class="">
          <p class="text-2xl text-center">Home</p>
          <p class="text-2xl text-center py-[4px]">Players</p>
          <p class="text-2xl text-center py-[4px]">Raking</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface accountData {
  name: string
  email: string
  coin: number
}

export default defineComponent({
  name: 'NavbarComponent',
  props: {
    name: {
      type: String as PropType<string>,
      required: true
    },
    email: {
      type: String as PropType<string>,
      required: true
    },
    coin: {
      type: Number as PropType<number>,
      required: true
    }
  },
  data() {
    return {
      profileModal: false,
      isAdmin: false,
      accountData: {}
    }
  },
  methods: {},
  updateInfo(params: boolean) {
    this.$emit('updateInfo', params)
  }
})
</script>

<style></style>
