<template>
  <div v-if="loggedUser">
    <NavbarDashboard @updateInfo="handleUpdateInfo" :AccountData="accountData" />
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

    <div v-if="typeForm === 'login'" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm card-login">
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
        <a href="#" class="link" @click="typeForm = 'register'"> Crie aqui sua conta </a>
      </p>
    </div>
    <div v-if="typeForm === 'register'" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm card-login">
      <form class="space-y-6" @submit.prevent="registerAccount">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-white-900">
            Nome
          </label>
          <div class="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              required
              class="input-login"
              @change="loadInput($event, 'rename')"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white-900">
            E-mail
          </label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="text"
              required
              class="input-login"
              @change="loadInput($event, 'reemail')"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white-900">
              Senha
            </label>
          </div>
          <div class="mt-2">
            <input
              id="registerpassword"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="input-login"
              @change="loadInput($event, 'repass')"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white-900">
              Confirmar senha
            </label>
          </div>
          <div class="mt-2">
            <input
              id="repasswordregister"
              name="repassword"
              type="password"
              autocomplete="current-password"
              required
              class="input-login"
              @change="loadInput($event, 'reconfirmpass')"
            />
          </div>
        </div>

        <div>
          <button type="submit" class="button-login">Criar conta</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-white-500">
        <a href="#" class="link" @click="typeForm = 'login'"> Voltar para login </a>
      </p>
    </div>
  </div>
  <div v-if="accountCreated" class="notification-sucess">
    <button class="close-notify" @click="accountCreated = false">x</button>
    Párabens {{ nameRegister }} sua conta foi criada com sucesso!
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
      nameRegister: '',
      emailRegister: '',
      passRegister: '',
      repassRegister: '',
      loggedUser: false,
      accountCreated: false,
      stayLoggedin: 'false',
      accountData: {},
      typeForm: 'login'
    }
  },

  methods: {
    loadInput(event: any, type: string) {
      if (type === 'login') {
        this.loginInput = event.target.value
      } else if (type === 'pass') {
        this.passInput = event.target.value
      } else if (type === 'rename') {
        this.nameRegister = event.target.value
      } else if (type === 'reemail') {
        this.emailRegister = event.target.value
      } else if (type === 'repass') {
        this.passRegister = event.target.value
      } else if (type === 'reconfirmpass') {
        this.repassRegister = event.target.value
      }
    },

    async registerAccount() {
      let AccountConfigs = {
        name: this.nameRegister,
        email: this.emailRegister,
        password: this.passRegister
      }
      if (this.accountCreated) {
        return
      }
      if (!this.nameRegister) {
        console.error('Register failed')
        return
      } else if (!this.emailRegister) {
        console.error('Register failed')
        return
      } else if (!this.passRegister) {
        console.error('Register failed')
        return
      } else if (!this.repassRegister) {
        console.error('Register failed')
        return
      }

      if (this.passRegister != this.repassRegister) {
        console.log('As senhas não são iguais!')
        return
      }

      try {
        const response = await Api.post('/register/', AccountConfigs)
        this.accountData = response.data
        this.accountCreated = true
      } catch (error) {
        this.loggedUser = false
        console.error('Register failed', error)
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
    },
    handleUpdateInfo(newValue: boolean) {
      this.loggedUser = newValue
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
.notification-sucess {
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  justify-content: center;
  align-items: center;
  padding: 8px;
  font-size: 12px;
  color: white;
  width: 300px;
  height: auto;
  min-height: 70px;
  border-radius: 10px;
  background: rgba(204, 255, 204, 0.8);
  -webkit-animation: scale-in-center 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: scale-in-center 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.close-notify {
  display: flex;
  position: absolute;
  top: 5px;
  left: 10px;
  font-size: 14px;
  color: rgb(148, 189, 148);
}

@-webkit-keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
