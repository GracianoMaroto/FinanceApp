<template>
  <div>
    <q-table
      class="q-mt-xl"
      no-data-label="Sem Despesas Fixas para mostrar"
      title="Despesas Fixas Adicionadas"
      :columns="columns"
      :rows="despesasFixas"
      selection="single" 
      v-model:selected="selected"
      row-key="id"
      style="background-color: white ; color: #04294e;"
    />
    <br>
    <div class="q-gutter-sm">
      
      <q-btn
      icon="delete"
      style="background: white; color: #04294e;"
      @click="deleteRow"
      :disable="selected.length === 0"
      >
      Deletar Despesa Fixa
    </q-btn>

    <q-btn
      icon="create"
      style="background: #04294e; color: white;"
      :disable="selected.length === 0"
      @click="emit('editar-item', selected[0])"
      >
      Editar Despesa Fixa
    </q-btn>

</div>
</div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  despesasFixas: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['delete-item' , 'editar-item'])

const selected = ref([])

const columns = [
  {
    name: 'dia',
    label: 'Dia',
    align: 'center',
    field: 'dia',
    sortable: true
  },
  {
    name: 'descriçao',
    label: 'Descrição',
    align: 'center',
    field: 'descriçao',
    sortable: true
  },
  {
    name: 'valor',
    label: 'Valor',
    align: 'center',
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
    align: 'center',
    field: 'categoria',
    sortable: true
  },
  {
    name: 'tipo',
    label: 'Status',
    align: 'center',
    field: 'tipo',
    sortable: true
  },  
]

function deleteRow() {
  if (selected.value.length === 0) return
  // Passa o item selecionado com id para o pai deletar
  emit('delete-item', selected.value[0])
  selected.value = []
}


</script>
