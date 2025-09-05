<script setup>
import { ref, onMounted } from 'vue'
import { auth } from 'src/firebase'

//Parte dos tabs
import TabResumoFinanceiro from 'src/components/tabs/TabResumoFinanceiro.vue'
import TabDespesaFixa from 'src/components/tabs/TabDespesaFixa.vue'
import TabDespesaDiaria from 'src/components/tabs/TabDespesaDiaria.vue'
import TabCartoes from 'src/components/tabs/TabCartoes.vue'

const tab = ref('despesasDiarias')

const displayName = ref('Usuário')

onMounted(() => {
  const user = auth.currentUser
  if (user) {
    displayName.value = user.displayName || user.email || 'Usuário'
  }
})

</script>

<template>
  <q-page padding>

    <h4 class="text-center">Controle de Despesas</h4>

    <q-tabs v-model="tab" dense class="text-grey" active-class="my-menu-link" indicator-color="primary" align="justify"
      narrow-indicator>
      <q-tab name="despesasDiarias" label="Despesas Diárias" />
      <q-tab name="despesasFixas" label="Despesas Fixas" />
      <q-tab name="meusCartoes" label="Meus Cartões" />
      <q-tab name="resumoFinanceiro" label="Resumo Financeiro" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>

      <q-tab-panel name="despesasDiarias">
        <TabDespesaDiaria />
      </q-tab-panel>

      <q-tab-panel name="despesasFixas">
        <TabDespesaFixa />
      </q-tab-panel>

      <q-tab-panel name="meusCartoes">
        <TabCartoes />
      </q-tab-panel>

      <q-tab-panel name="resumoFinanceiro">
        <TabResumoFinanceiro />
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