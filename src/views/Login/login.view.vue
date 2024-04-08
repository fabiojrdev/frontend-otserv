<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Tibia-logo.png"
        alt="Logo"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Entre com sua conta
      </h2>
      <!-- <h2 v-if="loggedUser">Logado com sucesso</h2> -->
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="validateLogin">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
            E-mail ou Nome
          </label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="text"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @change="loadInput($event, 'login')"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
              Senha
            </label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">
                Esqueceu sua senha?
              </a>
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @change="loadInput($event, 'pass')"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Entrar
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Não tem conta?
        <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Crie aqui sua conta
        </a>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import Api from '@/api/Api'

export default {
  name: 'LoginView',

  data() {
    return {
      loginInput: '',
      passInput: '',
      loggedUser: false,
      stayLoggedin: 'false'
    }
  },

  methods: {
    testeFunction() {
      console.log('sinceridade')
      return 'sinceridade'
    },
    loadInput(event: any, type: any) {
      if (type === 'login') {
        this.loginInput = event.target.value
      } else if (type === 'pass') {
        this.passInput = event.target.value
      }
    },
    async validateLogin() {
      let AccountConfigs = { name: `${this.loginInput}`, password: `${this.passInput}` }
      try {
        const response = await Api.post('/auth/', {
          AccountLoginDto: AccountConfigs,
          stayLoggedinQuery: this.stayLoggedin
        })
        this.loggedUser = true
        console.log('Login success:', response.data)
      } catch (error) {
        this.loggedUser = false
        console.error('Login failed', error)
      }
    }
  }
}
</script>
