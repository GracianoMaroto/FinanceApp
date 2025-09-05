<template>
    <div class="q-pt-md">
        <q-table flat bordered no-data-label="Sem Despesas para mostrar" title="Despesas Diárias" :columns="columns"
            :rows="rows" selection="single" v-model:selected="selected" row-key="id"
            style="background-color: white ; color: #04294e;" :grid="$q.screen.lt.md">
            <template v-slot:item="props">
                <div :class="$q.screen.lt.md ? 'q-pa-xs col-sm-12 grid-style-transition' : ''">
                    <q-card @click="props.selected = !props.selected" :class="{ 'bg-blue-2': props.selected }">
                        <q-card-section>

                            <div class="text-caption text-grey">Data:</div>
                            <div>{{ props.row.date || props.row.dia }}</div>

                            <div class="text-caption text-grey">Descrição:</div>
                            <div>{{ props.row.descriçao }}</div>

                            <div class="text-caption text-grey">Valor:</div>
                            <div>R$ {{ props.row.valor.toFixed(2) }}</div>

                            <div class="text-caption text-grey">Categoria:</div>
                            <div>{{ props.row.categoria }}</div>

                            <div class="text-caption text-grey">Pagamento:</div>
                            <div>{{ props.row.tipo }}</div>

                        </q-card-section>
                    </q-card>
                </div>
            </template>
        </q-table>
        <br>
        <div class="q-gutter-sm">
            <q-btn icon="delete" style="background: white; color: #04294e;" @click="deleteRow"
                :disable="selected.length === 0">
                Deletar Despesa
            </q-btn>
            <q-btn icon="create" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%); 
        color: white;" :disable="selected.length === 0" @click="editRow(selected)">
                Editar Despesa
            </q-btn>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import { useQuasar } from 'quasar'
const $q = useQuasar()

defineProps({
    title: {
        type: String,
        default: 'Titulo Padrão',
        required: true,
    },
    columns: {
        type: Array,
        required: true,
    },
    rows: {
        type: Array,
        required: true,
    }
})

const emit = defineEmits(['delete-item', 'editar-despesa'])

const selected = ref([])


function deleteRow() {
    if (selected.value.length === 0) return
    emit('delete-item', selected.value)
    selected.value = []
}

function editRow(testeData) {
    emit('editar-despesa', testeData)
    selected.value = []
}

</script>



<style scoped></style>