<template>
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
        <DespesasFixas :despesasFixas="despesasFixas" @delete-item="handleDeleteFixas" @editar-item="handleEditFixas" />
    </div>
</template>

<script setup>

import { deletarDespesaFixa, buscarDespesasFixas } from 'src/services/despesasService'
import { ref } from 'vue'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'src/firebase'
import { useQuasar } from 'quasar'

import DialogDespesaFixa from 'src/components/dialogs/DialogDespesaFixa.vue'
import DespesasFixas from '../DespesasFixas.vue'

const showDespesa = ref(false)
const despesasFixas = ref([])
const $q = useQuasar()
const despesaParaEditar = ref(null)


// Controle de autenticação
onAuthStateChanged(auth, (user) => {
    if (user) {
        carregarDespesasFixas()
    } else {
        despesasFixas.value = []
    }
})

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

</script>