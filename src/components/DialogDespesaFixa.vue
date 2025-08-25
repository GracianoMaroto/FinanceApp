<script setup>
import DialogBase from './DialogBase.vue';
import { ref , watch} from 'vue'
const model = defineModel({default: false})
const props = defineProps({
  despesaParaEditar: Object
})

import { useQuasar } from 'quasar'
import { adicionarDespesaFixa , editarDespesaFixa} from 'src/services/despesasService'

const $q = useQuasar()
const myForm = ref(null)


const isEditing = ref(false)

const dia = ref('')
const descriçao = ref(null)
const seleçao = ref(null)
const seleçaoCategoria = ref(null)
const valorNumerico = ref(0)
const valorFormatado = ref('')
const id = ref(null)

const opçoes = ["Pago","Pendente", "Atrasado"]
const categorias = ["Gerais", "Pessoal" , "Cartão" , "Transporte" , "Alimentação", "Faculdade"]


// Processa formulário e salva no Firebase
const processarFormulario = async () => {
  try {
    const dadosDespesa = {
      dia: dia.value,
      descriçao: descriçao.value,
      valor: valorNumerico.value,
      tipo: seleçao.value,
      categoria: seleçaoCategoria.value
    }
    if (isEditing.value && id.value) {
      await editarDespesaFixa(id.value, dadosDespesa)
      $q.notify({ color: 'blue', textColor: 'white', message: 'Despesa atualizada com sucesso' })
    } else {
      await adicionarDespesaFixa(dadosDespesa)
      $q.notify({ color: 'green-4', textColor: 'white', message: 'Despesa adicionada com sucesso' })
    }
    reset()
    myForm.value.resetValidation()
    model.value = false
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
  dia.value = null
  descriçao.value = null
  seleçao.value = null
  valorNumerico.value = 0
  valorFormatado.value = ''
  seleçaoCategoria.value = null
}


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
// Função watch para preencher os campos do dialog se receber uma despesa 
watch(() => props.despesaParaEditar, (novaDespesa) => {
  if (novaDespesa) {
    dia.value = novaDespesa.dia
    descriçao.value = novaDespesa.descriçao
    seleçao.value = novaDespesa.tipo
    seleçaoCategoria.value = novaDespesa.categoria
    valorNumerico.value = novaDespesa.valor
    valorFormatado.value = novaDespesa.valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    id.value = novaDespesa.id
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
    :title="'Adicionar Despesa Fixa'"
    >
                <div>
                    <q-form
                    class="q-col-gutter-md text-center" 
                    @submit.prevent="processarFormulario"
                    @reset="reset"
                    ref="myForm"
                    > 

              <div class="col-10 col-sm-4">
                  <q-input
                  label="Dia"
                  v-model="dia"
                  mask="##"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'Por favor, digite o dia da despesa.']"
                  />
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
                  label="Status"
                  v-model="seleçao"
                  :options="opçoes"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'Por favor, selecione uma opção.']"
                  />
              </div>

              <div class="col-12">
                  <q-btn label="Salvar Despesa Fixa" style="color: #04294e;" type="submit" />
                  <q-btn label="Limpar Campos" style="color: #04294e;" outline class="q-ml-sm" type="reset" />
              </div>    
              </q-form>
              </div>
  </dialog-base>            
  
</template>

