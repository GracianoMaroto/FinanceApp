<script setup>
import { ref } from 'vue'
import CategoriasFin from 'src/components/CategoriasFin.vue'
import { deletarDespesa , buscarDespesas} from 'src/services/despesasService'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'src/firebase'

//Parte do dialog
import DialogAddDespesa from 'src/components/DialogAddDespesa.vue';
import DialogDespesaFixa from 'src/components/DialogDespesaFixa.vue'
import { useQuasar } from 'quasar'

const showDialog = ref(false)
const showDespesa = ref(false)


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
            <div class="q-gutter-sm">

              
              <dialog-add-despesa
              v-model="showDialog"
              />
              <q-btn style="color: #04294e;" @click="showDialog = true" label="+ Nova Despesa"/>   
              
              <dialog-despesa-fixa
              v-model="showDespesa"
              />
              <q-btn style="background-color: #04294e;  color: white;" @click="showDespesa = true" label="Despesas fixas"/>
            </div>
          </div>

          <!-- Parte das despesas-->
          <CategoriasFin :descricoes="descricoes" @delete-item="handleDelete" />
          
        </q-page>
</template>

<style scoped>

h4{
  color: #04294e;
}

</style>