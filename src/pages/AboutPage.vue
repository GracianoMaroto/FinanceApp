<script setup>

import carroselSlides from 'src/components/carroselSlides.vue';

</script>

<template>
    <q-page padding>
        <div class="text-center">
            <h4 class="text-weight-bold" style="color: #04294e;">
                Conheça o FinanceApp — o seu aliado no controle financeiro diário!
            </h4>

            <h6 style="font-family: 'Times New Roman', Times, serif; color: #04294e;">
                O FinanceApp foi criado para facilitar sua vida financeira, permitindo que você acompanhe seus gastos e
                receitas de forma prática,
                segura e intuitiva.
                <br>
                Ideal para quem deseja ter um controle mais eficiente do próprio dinheiro,
                ele oferece uma experiência simples, organizada e personalizada.
            </h6>

            <p class="text-weight-bold">
                <ins>
                    Com o FinanceApp, você poderá:
                </ins>

                <carrosel-slides />
            </p>

            <h6 class="highlight">
                |Por que escolher o FinanceApp?|
            </h6>

            <p class="text-weight-bold">
                Porque ele é simples, direto ao ponto e feito para quem quer entender e melhorar sua relação com o
                dinheiro.
                <br>
                Seja para uso pessoal, familiar ou até mesmo profissional, o FinanceApp te ajuda a visualizar sua vida
                financeira com clareza,
                controle e praticidade <br> — tudo na palma da sua mão.
            </p>
        </div>
    </q-page>
</template>


<style scoped>
h4,
h6,
p {
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: #04294e;
}

.highlight {
    background-color: #04294e;
    display: inline-block;
    color: #ffffff;
}
</style>