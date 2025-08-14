<script setup>
import { ref } from 'vue'
import CategoriasFin from 'src/components/CategoriasFin.vue'
import { deletarDespesa , buscarDespesas} from 'src/services/despesasService'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'src/firebase'

//Parte do dialog
import DialogRegister from 'src/components/DialogRegister.vue';
import { useQuasar } from 'quasar'

const showDialog = ref(false)

//Parte do dialog


onAuthStateChanged(auth, (user) => {
  if (user) {
    carregarDespesas()
  } else {
    descricoes.value = []
  }
})
const descricoes = ref([])
const $q = useQuasar()

// Carrega despesas ao iniciar
const carregarDespesas = async () => {
  try {
    descricoes.value = await buscarDespesas()
  } catch (error) {
    console.error('Erro ao carregar despesas:', error)
  }
}
const handleDelete = async (itemToDelete) => {
  try {
    await deletarDespesa(itemToDelete.id)
    await carregarDespesas()
  } catch (error) {
    console.error('Erro ao deletar despesa:', error)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'error',
      message: 'Erro ao deletar despesa'
    })
  }
}

</script>

<template>
        <q-page padding>

          <h4>Controle de Despesas</h4>
          
          <!-- Parte do Dialog -->
          <div class="q-pa-sm">
            <q-btn style="color: #04294e;" @click="showDialog = true" label="+ Nova Despesa"/>   
            
            <dialog-register
            v-model="showDialog"
            />
          </div>
          <!-- Parte do Dialog -->
          <CategoriasFin :descricoes="descricoes" @delete-item="handleDelete" />
          
        </q-page>
</template>

<style scoped>

h4{
  color: #04294e;
}

</style>