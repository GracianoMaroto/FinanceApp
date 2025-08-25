<script setup>
import { ref } from 'vue'
import CategoriasFin from 'src/components/CategoriasFin.vue'
import { deletarDespesa , buscarDespesas , deletarDespesaFixa, buscarDespesasFixas} from 'src/services/despesasService'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'src/firebase'

//Parte do dialog
import DialogAddDespesa from 'src/components/DialogAddDespesa.vue';
import DialogDespesaFixa from 'src/components/DialogDespesaFixa.vue'
import DespesasFixas from 'src/components/DespesasFixas.vue'
import { useQuasar } from 'quasar'

const showDialog = ref(false)
const showDespesa = ref(false)
const tab = ref('despesasDiarias')
const despesasFixas = ref([])
const descricoes = ref([])
const $q = useQuasar()
const despesaParaEditar = ref(null)
const editarDespesa = ref(null)



// Controle de autenticação
onAuthStateChanged(auth, (user) => {
  if (user) {
    carregarDespesas()
    carregarDespesasFixas()
  } else {
    descricoes.value = []
    despesasFixas.value = []
  }
})

// Carrega despesas ao iniciar
const carregarDespesas = async () => {
  try {
    descricoes.value = await buscarDespesas()
  } catch (error) {
    console.error('Erro ao carregar despesas:', error)
  }
}

// Carrega despesas fixas ao iniciar
const carregarDespesasFixas = async () => {
  try {
    despesasFixas.value = await buscarDespesasFixas()
  } catch (error) {
    console.error('Erro ao carregar despesas fixas:', error)
  }
}

// Função de deletar despesa
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

// Função de deletar despesa
const handleDeleteFixas = async (itemToDelete) => {
  try {
    await deletarDespesaFixa(itemToDelete.id)
    await carregarDespesasFixas()
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

// Função de editar despesa fixa
const handleEditFixas = (despesa) => {
  despesaParaEditar.value = despesa
  showDespesa.value = true
}

// Função de editar despesa diaria
const handleEditDiarias = (despesa) => {
  editarDespesa.value = despesa
  showDialog.value = true
}
</script>

<template>
        <q-page padding>

          <h4 class="text-center">Controle de Despesas</h4>
          
          <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-class="my-menu-link"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="despesasDiarias" label="Despesas Diárias" />
          <q-tab name="despesasFixas" label="Despesas Fixas" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="despesasDiarias">
          <div class="q-pa-sm">

            <div class="q-gutter-sm">
            <dialog-add-despesa
              v-model="showDialog"
              :editar-despesa="editarDespesa"
              />
              <q-btn 
              style="background-color: #04294e;  
              color: white" 
              @click="showDialog = true" 
              label="+ Despesa Diária"
              />   
            </div>

          <!-- Parte das despesas-->
          <CategoriasFin 
          :descricoes="descricoes" 
          @delete-item="handleDelete" 
          @editar-diaria="handleEditDiarias"
          />
          
          </div>
          </q-tab-panel>

          <q-tab-panel name="despesasFixas">
            <div class="q-pa-sm">
              <div class="q-gutter-sm">
                <dialog-despesa-fixa
                v-model="showDespesa"
                :despesa-para-editar="despesaParaEditar"
                />
                <q-btn 
                style="background-color: #04294e;  
                color: white;" 
                @click="showDespesa = true" 
                label= "+ Despesa Fixa"
                />
              </div>
              <DespesasFixas 
              :despesasFixas="despesasFixas" 
              @delete-item="handleDeleteFixas" 
              @editar-item="handleEditFixas"
              />
            </div>
          </q-tab-panel>
          </q-tab-panels>
        </q-page>
</template>

<style scoped>

h4{
  color: #04294e;
}

.my-menu-link{
  color: white;
  background: #04294e
}

</style>