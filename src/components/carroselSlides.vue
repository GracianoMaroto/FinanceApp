<script setup>
import { ref } from 'vue';
const slide = ref('style')
</script>


<template>
    <div class="q-pa-md">
      <div class="q-gutter-md">
        <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        arrows
        height="300px"
        class="text-white shadow-1 rounded-borders"
        style="background-color: rgb(4, 41, 78);"
      >
        <q-carousel-slide name="money" class="column no-wrap flex-center">
          <q-icon name="paid" size="56px" />
          <div class="q-mt-md text-center">
            Registrar suas despesas, garantindo controle de gastos diários que passam despercebidos.
        </div>
        </q-carousel-slide>

        <q-carousel-slide name="date" class="column no-wrap flex-center">
          <q-icon name="today" size="56px" />
          <div class="q-mt-md text-center">
            Selecionar as datas das transações com poucos cliques, para facilitar seu dia a dia.
          </div>
        </q-carousel-slide>

        <q-carousel-slide name="dashboard" class="column no-wrap flex-center">
          <q-icon name="dashboard" size="56px" />
          <div class="q-mt-md text-center">
            visualizar e organizar seus lançamentos financeiros por data, descrição, valor e forma de pagamento.
          </div>
        </q-carousel-slide>

        <q-carousel-slide name="account" class="column no-wrap flex-center">
          <q-icon name="fingerprint" size="56px" />
          <div class="q-mt-md text-center">
            Criar sua conta e ter total segurança dos seus dados e acesso exclusivo as suas movimentações.
          </div>
        </q-carousel-slide>

        <q-carousel-slide name="lock" class="column no-wrap flex-center">
          <q-icon name="lock" size="56px" />
          <div class="q-mt-md text-center">
            Tudo isso com a confiança do Firebase, garantindo segurança no login e armazenamento em nuvem.
          </div>
        </q-carousel-slide>

      </q-carousel>
      </div>
    </div>
</template>
