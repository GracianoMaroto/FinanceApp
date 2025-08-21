<template>
  <div>
    <q-table
      class="q-mt-xl"
      no-data-label="Sem Despesas para mostrar"
      title="Despesas Diárias"
      :columns="columns"
      :rows="descricoes"
      selection="single" 
      v-model:selected="selected"
      row-key="id"
      style="background-color: white ; color: #04294e;"
    />
    <br>
    <q-btn
      icon="delete"
      style="background: white; color: #04294e;"
      @click="deleteRow"
      :disable="selected.length === 0"
    >
      Deletar Despesa
    </q-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  descricoes: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['delete-item'])

const selected = ref([])

const columns = [
  {
    name: 'date',
    label: 'Date',
    align: 'left',
    field: 'date',
    sortable: true
  },
  {
    name: 'descriçao',
    label: 'Descrição',
    align: 'left',
    field: 'descriçao',
    sortable: true
  },
  {
    name: 'valor',
    label: 'Valor',
    align: 'left',
    field: 'valor',
    sortable: true,
    format: val => Number(val).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  },
  {
    name: 'categoria',
    label: 'Categoria',
    align: 'left',
    field: 'categoria',
    sortable: true
  },
  {
    name: 'tipo',
    label: 'Pagamento',
    align: 'left',
    field: 'tipo',
    sortable: true
  }
]

function deleteRow() {
  if (selected.value.length === 0) return
  // Passa o item selecionado com id para o pai deletar
  emit('delete-item', selected.value[0])
  selected.value = []
}
</script>
