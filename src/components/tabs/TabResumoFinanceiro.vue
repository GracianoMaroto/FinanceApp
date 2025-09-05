<script setup>

import { ref, onMounted } from 'vue';
import { auth } from 'src/firebase'
import CardsCaixa from '../CardsCaixa.vue';

onMounted(() => {
  const user = auth.currentUser
  if (user) {
    displayName.value = user.displayName || user.email || 'Usuário'
  }
})

const displayName = ref('Usuário')


</script>

<template>

  <div class="q-pa-md justify-center q-gutter-sm">

    <q-card style="background: radial-gradient(circle, #35a2ff 0%, #04294e 100%); color: white;">
      <q-card-section>
        <div class="text-subtitle2 text-grey-4">Bom dia,</div>
        <!--Criar função para pegar a hora do dia e mostrar de acordo com o período.-->
        <div class="text-h6">{{ displayName }}!</div>
      </q-card-section>

      <q-card-section class="q-pt-none">

        Veja abaixo o seu fluxo de caixa para um melhor controle das suas finanças.

      </q-card-section>
    </q-card>

    <div>
      <CardsCaixa />
    </div>
  </div>

</template>

<style scoped></style>