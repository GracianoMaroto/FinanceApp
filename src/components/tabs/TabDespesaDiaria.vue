<template>
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
</template>

<script setup>

import { ref } from 'vue'
import CategoriasFin from '../CategoriasFin.vue'
import { deletarDespesa, buscarDespesas } from 'src/services/despesasService'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'src/firebase'

//Parte do dialog
import DialogAddDespesa from 'src/components/dialogs/DialogAddDespesa.vue';

import { useQuasar } from 'quasar'

const showDialog = ref(false)
// const tab = ref('despesasDiarias')
const descricoes = ref([])
const $q = useQuasar()
const editarDespesa = ref(null)

// Controle de autenticação
onAuthStateChanged(auth, (user) => {
    if (user) {
        carregarDespesas()
    } else {
        descricoes.value = []
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

// Função de editar despesa diaria
const handleEditDiarias = (despesa) => {
    console.log('financas', despesa)
    editarDespesa.value = despesa
    showDialog.value = true
}
</script>