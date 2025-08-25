<template>
<q-layout view="lHh Lpr lff">
      <q-header elevated style="background-color: #04294e;" >
        <q-toolbar>
          <q-toolbar-title>
            Finance App
          </q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="430"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd; background-color: #04294e;">
          <q-list padding style="color: white;">

            <q-item clickable v-ripple to="/autor" active-class="my-menu-link">
              <q-item-section avatar>
                <q-icon name="brush" />
              </q-item-section>

              <q-item-section>
                Autor
              </q-item-section>
            </q-item> 

            <q-item clickable v-ripple to="/about" active-class="my-menu-link">
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Sobre
              </q-item-section>
            </q-item>
            
            <q-item clickable v-ripple to="/finance" active-class="my-menu-link">
              <q-item-section avatar>
                <q-icon name="ti-money" />
              </q-item-section>

              <q-item-section>
                Finanças
              </q-item-section>
            </q-item> 

          </q-list>
            <q-btn
            style="color: white; border: solid 1px #FFF;"
            icon="logout"
            label="Sair"
            @click="handleLogout"
            class="q-mt-md absolute-bottom"
            />
        </q-scroll-area>
        
        <q-img class="absolute-top" src="icons/bgimg.png" style="height: 150px" alt="https://pt.lovepik.com/images/png-blue-pattern.html">
          <div class="absolute-bottom bg-transparent" style="text-align: center;">

            <q-avatar
              size="56px"
              class="q-mb-sm"
            >
              <template v-if="photoURL">
                <img :src="photoURL" alt="Foto do usuário"/>
              </template>
              <template v-else>
                <q-icon name="person" size="40px" color="grey-5"/>
              </template>
            </q-avatar>

            <div class="text-weight-bold text-white">{{ displayName }}</div>
            <div class="text-white" style="font-size: 0.9em">{{ email }}</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <router-view>
          
        </router-view>
      </q-page-container>

        <q-footer class="bg-grey-2 text-black" elevated>
        <div class="text-center q-pa-sm">
          © {{ new Date().getFullYear() }} Finance App — Todos os direitos reservados. Desenvolvido por Graciano Marôto
        </div>
      </q-footer>

    </q-layout>
</template>

<script setup>
import { ref , onMounted} from 'vue'
import { auth } from 'src/firebase'
import { useRouter } from 'vue-router'
import { logout } from 'src/services/authService'

const router = useRouter()
const drawer = ref(false)

async function handleLogout() {
  await logout()
  router.push('/auth') // Redireciona para a página de login
}

const photoURL = ref(null)
const displayName = ref('Usuário')
const email = ref('')

onMounted(() => {
  const user = auth.currentUser
  if(user) {
    displayName.value = user.displayName || user.email || 'Usuário'
    email.value = user.email || ''
  }
})

</script>


<style lang="scss">
.my-menu-link{
  color: #04294e;
  background: white;
}
  
</style>