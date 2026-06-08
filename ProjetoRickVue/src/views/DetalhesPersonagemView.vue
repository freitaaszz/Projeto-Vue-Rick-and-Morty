<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'DetalhesPersonagemView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const personagem = ref(null)

    // props.id busca só o persanagem do id
    const carregarDetalhes = () => {
      fetch(`https://rickandmortyapi.com/api/character/${props.id}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(function(json) {
          personagem.value = json
        })
        .catch(error => {
          console.log('Erro ao carregar os detalhes: ', error)
        })
    }

    onMounted(() => {
      carregarDetalhes()
    })

    return {
      personagem
    }
  }
}
</script>

<template>
  <div class="detalhes-container text-white py-5">
    <div class="container">
      <router-link to="/" class="btn btn-outline-info mb-4">← Voltar para a Listagem</router-link>

      <div v-if="personagem" class="row bg-dark border border-secondary rounded p-4 mx-auto" style="max-width: 700px;">
        <div class="col-md-4 text-center mb-3 mb-md-0">
          <img :src="personagem.image" :alt="personagem.name" class="img-fluid rounded border border-secondary">
        </div>
        <div class="col-md-8">
          <h2 class="text-info fw-bold mb-3">{{ personagem.name }}</h2>
          <p class="fs-5"><strong>Status:</strong> {{ personagem.status }}</p>
          <p class="fs-5"><strong>Espécie:</strong> {{ personagem.species }}</p>
          <p class="fs-5"><strong>Gênero:</strong> {{ personagem.gender }}</p>
          <p class="fs-5"><strong>Origem:</strong> {{ personagem.origin?.name }}</p>
          <p class="fs-5"><strong>Localização:</strong> {{ personagem.location?.name }}</p>
        </div>
      </div>

      <div v-else class="text-center mt-5 fs-4 text-muted">
        Carregando detalhes do personagem...
      </div>
    </div>
  </div>
</template>

<style scoped>
.detalhes-container {
  background-color: #0F0F0F;
  min-height: 100vh;
}
</style>