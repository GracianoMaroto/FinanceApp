<template>
  <div class="q-pt-md">
    <tabela-padrao :columns="columns" :rows="despesasFixas" title="Despesas Diarias" @editar-despesa="editFixa"
      @delete-item="deleteRow" />
  </div>
</template>

<script setup>
import TabelaPadrao from './tabelas/TabelaPadrao.vue'

defineProps({
  despesasFixas: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['delete-item', 'editar-despesa', 'editar-item'])


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

function deleteRow(despesaFixa) {
  if (despesaFixa.length === 0) return
  emit('delete-item', despesaFixa[0])
}

function editFixa(despesa) {
  emit('editar-item', despesa[0])
}

</script>
