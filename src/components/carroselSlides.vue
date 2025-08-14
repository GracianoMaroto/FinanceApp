<script setup>
import { ref } from 'vue';
const slide = ref('style')
</script>


<template>
    <div class="q-pa-md">
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
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="style" size="56px" />
          <div class="q-mt-md text-center">
        💰 Registrar suas despesas e receitas com valores formatados automaticamente como moeda (R$), garantindo clareza e rapidez na hora de preencher os dados.
        </div>

        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            📅 Selecionar a data das transações com poucos cliques, sempre com a opção da data atual já preenchida para facilitar seu dia a dia.
          </div>
        </q-carousel-slide>

        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" size="56px" />
          <div class="q-mt-md text-center">
            🧾 Visualizar e organizar seus lançamentos financeiros por data e categoria, tornando mais fácil identificar onde está gastando mais e onde pode economizar.
          </div>
        </q-carousel-slide>

        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            👤 Criar sua conta com email e senha, garantindo total segurança dos seus dados e acesso exclusivo ao seu histórico de movimentações.
          </div>
        </q-carousel-slide>

        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            🖼️ Adicionar sua foto de perfil e nome, deixando sua experiência mais personalizada. E se preferir, pode usar o app sem foto — sem problemas!
          </div>
        </q-carousel-slide>

        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            🔐 Tudo isso com a confiança do Firebase, garantindo segurança no login e armazenamento em nuvem.
          </div>
        </q-carousel-slide>

      </q-carousel>
    </div>
</template>
