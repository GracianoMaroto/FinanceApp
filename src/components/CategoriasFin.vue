<template>
  <div class="q-pt-md">
    <tabela-padrao :columns="columns" :rows="descricoes" title="Despesas Diarias" @editar-despesa="editDespesa"
      @delete-item="deleteRow" />
  </div>
</template>

<script setup>
import TabelaPadrao from './tabelas/TabelaPadrao.vue'


defineProps({
  descricoes: {
    type: Array,
    required: true
  }
})

const columns = [
  {
    name: 'date',
    label: 'Data',
    align: 'center',
    field: 'date',
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
    label: 'Pagamento',
    align: 'center',
    field: 'tipo',
    sortable: true
  }
]

function deleteRow(despesa) {
  emit('delete-item', despesa[0])
}
const emit = defineEmits(['editar-diaria', 'delete-item'])

function editDespesa(despesa) {
  emit('editar-diaria', despesa[0])
}
</script>



<style scoped></style>