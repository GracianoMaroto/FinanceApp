<script setup>
import { ref, onMounted } from 'vue'
import CategoriasFin from 'src/components/CategoriasFin.vue'
import { deletarDespesa, buscarDespesas, deletarDespesaFixa, buscarDespesasFixas } from 'src/services/despesasService'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'src/firebase'

//Parte do dialog
import DialogAddDespesa from 'src/components/DialogAddDespesa.vue';
import DialogDespesaFixa from 'src/components/DialogDespesaFixa.vue'
import DespesasFixas from 'src/components/DespesasFixas.vue'
import FluxoCaixa from 'src/components/FluxoCaixa.vue'

import { useQuasar } from 'quasar'

const showDialog = ref(false)
const showDespesa = ref(false)
const tab = ref('despesasDiarias')
const despesasFixas = ref([])
const descricoes = ref([])
const $q = useQuasar()
const despesaParaEditar = ref(null)
const editarDespesa = ref(null)

const displayName = ref('Usuário')

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

onMounted(() => {
  const user = auth.currentUser
  if (user) {
    displayName.value = user.displayName || user.email || 'Usuário'
  }
})

const totalDiarias = ref(0)

const somarDiarias = async () => {
  const user = auth.currentUser
  if (!user) throw new Error('Usuário não autenticado')
  const db = getFirestore();
  const ref = collection(db, 'despesas', user.uid, 'lista');
  const snapshot = await getDocs(ref);

  let soma = 0;
  snapshot.forEach((doc) => {
    // Assumindo que os dados de cada documento têm um campo 'quantidade'
    const dados = doc.data();
    if (dados.valor) {
      soma += dados.valor;
    }
  });

  totalDiarias.value = soma // <--- atualiza a reatividade
}

const totalFixas = ref(0)

const somarFixas = async () => {
  const user = auth.currentUser
  if (!user) throw new Error('Usuário não autenticado')
  const db = getFirestore();
  const ref = collection(db, 'despesas fixas', user.uid, 'lista');
  const snapshot = await getDocs(ref);

  let somaFixas = 0;
  snapshot.forEach((doc) => {
    // Assumindo que os dados de cada documento têm um campo 'quantidade'
    const dados = doc.data();
    if (dados.valor) {
      somaFixas += dados.valor;
    }
  });

  totalFixas.value = somaFixas // <--- atualiza a reatividade
}

// Carrega despesas ao iniciar
const carregarDespesas = async () => {
  try {
    descricoes.value =
      await buscarDespesas()
    await somarDiarias()
  } catch (error) {
    console.error('Erro ao carregar despesas:', error)
  }
}

// Carrega despesas fixas ao iniciar
const carregarDespesasFixas = async () => {
  try {
    despesasFixas.value =
      await buscarDespesasFixas()
    await somarFixas()
  } catch (error) {
    console.error('Erro ao carregar despesas fixas:', error)
  }
}

// Função de deletar despesa
const handleDelete = async (itemToDelete) => {
  console.log('financas', itemToDelete)
  try {
    await deletarDespesa(itemToDelete.id)
    $q.notify({ color: 'red-4', textColor: 'white', message: 'Despesa deletada com sucesso' })
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
  console.log('financas handledeletefixas', itemToDelete)
  try {
    await deletarDespesaFixa(itemToDelete.id)
    $q.notify({ color: 'red-4', textColor: 'white', message: 'Despesa deletada com sucesso' })
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
  console.log('financas', despesa)
  editarDespesa.value = despesa
  showDialog.value = true
}
</script>

<template>
  <q-page padding>

    <h4 class="text-center">Controle de Despesas</h4>

    <q-tabs v-model="tab" dense class="text-grey" active-class="my-menu-link" indicator-color="primary" align="justify"
      narrow-indicator>
      <q-tab name="despesasDiarias" label="Despesas Diárias" />
      <q-tab name="despesasFixas" label="Despesas Fixas" />
      <q-tab name="fluxoCaixa" label="Fluxo de Caixa" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="despesasDiarias">

        <q-card class="my-card text-white" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
          <q-card-section>
            <div class="text-h6">Seus Gastos</div>
            <div class="text-subtitle2"> R$ {{ totalDiarias.toFixed(2) }}</div>
          </q-card-section>

        </q-card>

        <div class="q-pa-sm">
          <div class="q-gutter-sm">

            <dialog-add-despesa v-model="showDialog" :editar-despesa="editarDespesa"
              @atualizar-lista="carregarDespesas" />
            <q-btn style="background-color: #04294e;  
              color: white" @click="showDialog = true" label="+ Despesa Diária" />
          </div>

          <!-- Parte das despesas-->
          <CategoriasFin :descricoes="descricoes" @delete-item="handleDelete" @editar-diaria="handleEditDiarias" />

        </div>
      </q-tab-panel>

      <q-tab-panel name="despesasFixas">
        <div class="q-pa-sm">
          <div class="q-gutter-sm">

            <dialog-despesa-fixa v-model="showDespesa" :despesa-para-editar="despesaParaEditar"
              @atualizar-lista="carregarDespesasFixas" />

            <q-card class="my-card text-white" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
              <q-card-section>
                <div class="text-h6">Suas Despesas</div>
                <div class="text-subtitle2"> R$ {{ totalFixas.toFixed(2) }}</div>
              </q-card-section>

            </q-card>

            <q-btn style="background-color: #04294e;  
                color: white;" @click="showDespesa = true" label="+ Despesa Fixa" />
          </div>
          <DespesasFixas :despesasFixas="despesasFixas" @delete-item="handleDeleteFixas"
            @editar-item="handleEditFixas" />
        </div>
      </q-tab-panel>

      <q-tab-panel name="fluxoCaixa">
        <FluxoCaixa />
      </q-tab-panel>

    </q-tab-panels>
  </q-page>
</template>

<style scoped>
h4 {
  color: #04294e;
}

.my-menu-link {
  color: white;
  background: #04294e
}

.my-card {
  width: 50%;
}
</style>