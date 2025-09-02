<script setup>

import { ref, onMounted , computed} from 'vue';
import { auth } from 'src/firebase'
import { getFirestore, getDocs, collection } from 'firebase/firestore';
const totalDiarias = ref(0)
const totalFixas = ref(0)

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

const somaTotalDespesas = computed(() => totalDiarias.value + totalFixas.value)

// Buscar dados na montagem
onMounted(async () => {
  await somarDiarias()
  await somarFixas()
})

</script>


<template>
    
<div class="q-pa-md row justify-center q-gutter-md text-center">
    <q-card
    class="col-12 col-md-3"
    style="background: #04294e; color: white;"
    >
    <q-card-section>
        <div                           
        class= "text-h5" 
        style="background-color: white; 
        color: #04294e; border-radius: 3px;">
        Minha Carteira
        </div>
    </q-card-section>
    
    <q-card-section>
        <div class= "text-h6">Conta do Itaú</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
    <strong>R$ 1821.10</strong>
    </q-card-section>

    <q-card-section>
        <div class= "text-h6">Conta NuBank</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
    <strong>R$ 392.14</strong>
    </q-card-section>

    <q-card-section>
        <div class= "text-h6">Saldo em Dinheiro</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
    <strong>R$ 2284.00</strong>
    </q-card-section>

    <q-card-section>
        <div class= "text-h6">Saldo Total</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
    <strong>R$ 4497.24</strong>
    </q-card-section>

        <q-card-section>
            <div
            class="padding-bottom"
            >
            <q-btn 
            style="background-color: white; color: #04294e;"
            label="Editar Carteira"
            />
            </div>
        </q-card-section>

</q-card>

    <q-card
    class="col-12 col-md-3"
    style="background: #04294e; color: white;"
    >
    <q-card-section>
        <div                           
        class= "text-h5" 
        style="background-color: white; 
        color: #04294e; border-radius: 3px;">
        Meus Cartões
    </div>
    </q-card-section>
    
    <q-card-section>
        <div class= "text-h6">Cartão Caixa</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
    <strong>R$ 0.00</strong>
    </q-card-section>

    <q-card-section>
        <div class= "text-h6">Cartão Itaú</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
    <strong>R$ 150.00</strong>
    </q-card-section>

    <q-card-section>
        <div class= "text-h6">Cartão NuBank</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
    <strong>R$ 1974.89</strong>
    </q-card-section>


    <q-card-section>
        <div class= "text-h6">Total de Faturas</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
    <strong>R$ 2124.89</strong>
    </q-card-section>
    

        <q-card-section>
            <q-btn 
            style="background-color: white; color: #04294e;"
            label="Editar Cartões"
            />
        </q-card-section>

</q-card>

<q-card
    class="col-12 col-md-3"
    style="background: #04294e; color: white;"
    >
    <q-card-section>
        <div 
        class= "text-h5" 
        style="background-color: white; 
        color: #04294e; border-radius: 3px;"
        >
        Resumo Financeiro
    </div>
    </q-card-section>

    <q-card-section>
        <div class= "text-h6">Depesas Fixas + Diárias</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
    <strong>R$ {{ somaTotalDespesas.toFixed(2) }}</strong>
    </q-card-section>

    <q-card-section>
        <div class= "text-h6">Faturas de Cartões</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
    <strong>R$ 2124.89</strong>
    </q-card-section>

    <q-card-section>
        <div class= "text-h6">Despesas Totais</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
    <strong>R$ 3672.53</strong>
    </q-card-section>

    <q-card-section>
        <div class= "text-h6">Saldo Final</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
    <strong>R$ 824.71</strong>
    </q-card-section>

</q-card>
    </div>
</template>