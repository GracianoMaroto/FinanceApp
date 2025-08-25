
<script setup>
import DialogBase from './DialogBase.vue';

const model = defineModel({default: false})
const props = defineProps({
  editarDespesa: Object
})

import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { adicionarDespesa, buscarDespesas , editarDespesaDiaria} from 'src/services/despesasService'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'src/firebase'

onAuthStateChanged(auth, (user) => {
  if (user) {
    carregarDespesas()
  } else {
    descricoes.value = []
  }
})
const $q = useQuasar()
const myForm = ref(null)

const isEditing = ref(false)

const descriçao = ref(null)
const seleçao = ref(null)
const date = ref(null)
const seleçaoCategoria = ref(null)
const categorias = ["Alimentação" , "Saúde" , "Transporte" , "Pessoal" , "Gerais"]
const opçoes = ["Crédito", "Débito", "Dinheiro", "Pix"]
const descricoes = ref([])
const id = ref(null)

// Carrega despesas ao iniciar
const carregarDespesas = async () => {
  try {
    descricoes.value = await buscarDespesas()
  } catch (error) {
    console.error('Erro ao carregar despesas:', error)
  }
}

// Processa formulário e salva no Firebase
const processarFormulario = async () => {
  try {
    const novaDespesa = {
      date: date.value,
      descriçao: descriçao.value,
      tipo: seleçao.value,
      valor: valorNumerico.value,
      categoria: seleçaoCategoria.value

    }
    if (isEditing.value && id.value) {
      await editarDespesaDiaria(id.value, novaDespesa)
      $q.notify({ color: 'blue', textColor: 'white', message: 'Despesa atualizada com sucesso' })
    } else {
      await adicionarDespesa(novaDespesa)
      $q.notify({ color: 'green-4', textColor: 'white', message: 'Despesa salva com sucesso' })
    }
    await carregarDespesas()
    reset()
    myForm.value.resetValidation()
    location.reload()
  } catch (error) {
    console.error('Erro ao salvar despesa:', error)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'error',
      message: 'Erro ao salvar despesa'
    })

  }
}

const reset = () => {
  date.value = null
  descriçao.value = null
  seleçao.value = null
  valorNumerico.value = 0
  valorFormatado.value = ''
  seleçaoCategoria.value = null

}

const valorNumerico = ref(0)
const valorFormatado = ref('')

// Função para formatar como moeda brasileira
function formatarValor(val) {
  // Remove tudo que não é número
  const apenasNumeros = val.replace(/[^\d]/g, '')

  // Converte para número e divide por 100 (para ter duas casas decimais)
  const numero = Number(apenasNumeros) / 100

  // Atualiza o valor numérico interno
  valorNumerico.value = numero

  // Formata e atualiza o campo visível
  valorFormatado.value = numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

watch(() => props.editarDespesa, (despesaEditada) => {
  if (despesaEditada) {
    date.value = despesaEditada.date
    descriçao.value = despesaEditada.descriçao
    seleçao.value = despesaEditada.tipo
    seleçaoCategoria.value = despesaEditada.categoria
    valorNumerico.value = despesaEditada.valor
    valorFormatado.value = despesaEditada.valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    id.value = despesaEditada.id
    isEditing.value = true
  } else {
    reset()
    isEditing.value = false
  }
})

</script>

<template>
    <dialog-base
    v-model="model"    
    :title="'Adicionar Despesa'"
    >
                <div>
                    <q-form
                    class="q-col-gutter-md text-center" 
                    @submit.prevent="processarFormulario"
                    @reset="reset"
                    ref="myForm"
                    >
                    <div class="q-pa-md" style="max-width: 300px">
                        <q-input filled v-model="date">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-date v-model="date" mask="DD/MM/YYYY">
                                            <div class="row items-center justify-end">
                                                <q-btn v-close-popup label="Close" color="primary" flat />
                                            </div>    
                                        </q-date>    
                                    </q-popup-proxy>    
                                </q-icon>    
                            </template>        
                        </q-input>
                </div>        

              <div class="col-10 col-sm-4">
                  <q-input
                  label="Descrição"
                  v-model="descriçao"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'Por favor, digite algo.']"
                  />
              </div>    

              <div class="col-10 col-sm-2">
                  <q-input
                    label="Valor"
                    v-model="valorFormatado"
                    @update:model-value="formatarValor"
                    lazy-rules
                    :rules="[val => val && val.length > 0 || 'Por favor, digite um valor.']"
                    inputmode="numeric"
                  />  
              </div>    
              
              <div class="col-12 col-sm-2">
                  <q-select
                  label="Categoria"
                  v-model="seleçaoCategoria"
                  :options="categorias"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'Por favor, selecione uma opção.']"
                  />
              </div> 

              <div class="col-12 col-sm-2">
                  <q-select
                  label="Pagamento"
                  v-model="seleçao"
                  :options="opçoes"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'Por favor, selecione uma opção.']"
                  />
              </div>    

              <div class="col-12">
                  <q-btn label="Salvar Despesa" style="color: #04294e;" type="submit" />
                  <q-btn label="Limpar Campos" style="color: #04294e;" outline class="q-ml-sm" type="reset" />
              </div>    
              </q-form>
              </div>

  </dialog-base>            
  
</template>

