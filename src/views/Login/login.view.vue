<template>
  <div v-if="loggedUser">
    <NavbarDashboard :AccountData="accountData" />
  </div>
  <div v-if="!loggedUser" class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Tibia-logo.png"
        alt="Logo"
      />
      <!-- <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
        Entre com sua conta
      </h2> -->
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm card-login">
      <form class="space-y-6" @submit.prevent="validateLogin">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white-900">
            E-mail ou Nome
          </label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="text"
              required
              class="input-login"
              @change="loadInput($event, 'login')"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white-900">
              Senha
            </label>
            <div class="text-sm">
              <a href="#" class="text-white-900"> Esqueceu sua senha? </a>
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="input-login"
              @change="loadInput($event, 'pass')"
            />
          </div>
        </div>

        <div>
          <h2 v-if="loggedUser">Logado com sucesso</h2>
          <button type="submit" class="button-login">Entrar</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-white-500">
        Não tem conta?
        <a href="#" class="link"> Crie aqui sua conta </a>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import Api from '@/api/Api'
import NavbarDashboard from './NavbarDashboard.vue'

export default {
  name: 'LoginView',
  components: {
    NavbarDashboard
  },

  data() {
    return {
      loginInput: '',
      passInput: '',
      loggedUser: false,
      stayLoggedin: 'false',
      accountData: {}
    }
  },

  methods: {
    loadInput(event: any, type: any) {
      if (type === 'login') {
        this.loginInput = event.target.value
      } else if (type === 'pass') {
        this.passInput = event.target.value
      }
    },
    async validateLogin() {
      let AccountConfigs = { name: this.loginInput, password: this.passInput }
      try {
        const response = await Api.post('/auth/', AccountConfigs)
        this.loggedUser = true
        this.accountData = response.data
      } catch (error) {
        this.loggedUser = false
        console.error('Login failed', error)
      }
    }
  }
}
</script>

<style>
.card-login {
  border-radius: 10px;
  padding: 20px 20px 20px 20px;
  background-color: rgba(56, 56, 56, 0.8);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  color: white;
  border: 2px solid rgba(80, 80, 80, 0.7);
}
.input-login {
  width: 100%;
  height: 30px;
  border-radius: 5px;
  color: rgb(165, 165, 165);
  background: rgba(0, 0, 0, 1);
  padding: 5px;
}
.button-login {
  justify-content: center;
  align-content: center;
  font-size: 14px;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  color: rgb(0, 0, 0);
  background: rgb(255, 198, 42);
  padding: 5px;
}
.button-login:hover {
  background: rgb(251, 201, 61);
}
.link {
  font-size: 12px;
  color: rgb(255, 198, 42);
}
.link:hover {
  color: rgb(251, 201, 61);
}
</style>
