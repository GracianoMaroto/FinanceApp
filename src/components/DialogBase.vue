<template>
    <q-dialog v-model="model">
      <q-layout view="Lhh lpR fff" container class="bg-white text-dark">
        <q-header class="bg-black-9">
          <q-toolbar>
            <q-toolbar-title>{{ title }}</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-black-9">
          <q-toolbar></q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding>
            <slot></slot>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
</template>


<script setup>

const model = defineModel({ default: false })

defineProps({
    title: String
})

</script>
