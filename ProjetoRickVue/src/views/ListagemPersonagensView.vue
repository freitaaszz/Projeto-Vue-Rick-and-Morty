<script>
import { ref, onMounted, watch } from 'vue'
import CardPersonagem from '../components/CardPersonagem.vue'

export default {
  name: 'ListagemPersonagensView',
  components: {
    CardPersonagem
  },
  setup() {
    const personagens = ref([])
    const textoBusca = ref('') 
    const paginaAtual = ref(1) 

    // puxa os dados da api filtrando por página e por nome ao mesmo tempo
    const listarPersonagens = () => {
      let url = `https://rickandmortyapi.com/api/character?page=${paginaAtual.value}`
      
      if (textoBusca.value.trim() !== '') {
        url += `&name=${textoBusca.value}`
      }

      fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(function(json) {
          personagens.value = json.results || []
        })
        .catch(error => {
          console.log('Nenhum personagem encontrado ou deu erro: ', error)
          personagens.value = [] 
        })
    }

    // monitora o input de busca pra resetar pra página 1 e caçar na api toda
    watch(textoBusca, () => {
      paginaAtual.value = 1
      listarPersonagens()
    })

    const proximaPagina = () => {
      if (personagens.length != 0) {
        paginaAtual.value++
        listarPersonagens()
      }
    }

    const paginaAnterior = () => {
      if (paginaAtual.value > 1) {
        paginaAtual.value--
        listarPersonagens()
      }
    }

    onMounted(() => {
      listarPersonagens()
    })

    return {
      personagens,
      textoBusca,
      paginaAtual,
      proximaPagina,
      paginaAnterior
    }
  }
}
</script>

<template>
  <div class="pagina-container">
    <div class="container-fluid p-0 position-relative">
      <div class="blur" style="position: absolute; width: 100%; height: 70px; padding: 5px 40px; 
                  background: rgba(0, 0, 0, 0.2); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); display: flex; align-items: center; z-index: 3;">
        <a href="/" style="text-decoration: none; color: white; font-weight: 600; font-size: 1.6rem;" class="name">
          <span style="color: #00AEEF;">RG</span>Universe
        </a>
      </div>
      
      <img src="/images/rickmorty.jpg" class="poster img-fluid w-100 m-0 p-0" alt="Poster">
      
      <div class="position-absolute bottom-0 start-0 w-100" style="height: 100%; background: linear-gradient(to bottom, transparent 0%, #0F0F0F 90%, #0F0F0F 100%); z-index: 1;"></div>
      
      <img src="/images/logo_rick_and_morty.png" class="logo bottom-0 start-0 m-4 mb-5 img-fluid" style="width: 600px; z-index: 2;" alt="Logo">
    </div>

    <div class="container-fluid py-5 p-0">
      <h2 class="mb-5 text-center text-white fw-bold target-titulo">Personagens</h2>

      <div class="input-group mb-5 mx-auto" style="max-width: 600px; padding: 0 15px;">
        <input 
          v-model="textoBusca" 
          type="text" 
          class="form-control bg-dark text-white border-secondary" 
          placeholder="Pesquisar por nome..." 
          aria-label="Pesquisa"
        >
      </div>
      
      <div class="d-flex flex-wrap gap-5 justify-content-center px-4">
        <div v-for="personagem in personagens" :key="personagem.id">
          <CardPersonagem :personagem="personagem" />
        </div>

        <div v-if="personagens.length === 0" class="text-center text-white w-100 fs-5 mt-4">
          Nenhum personagem encontrado com o nome "{{ textoBusca }}".
        </div>
      </div>

      <div class="d-flex justify-content-center align-items-center gap-3 mt-5 pb-5">
        <button 
          @click="paginaAnterior" 
          :disabled="paginaAtual === 1" 
          class="btn btn-outline-light px-4"
        >
          Anterior
        </button>
        <span class="text-white fw-bold fs-5">Página {{ paginaAtual }}</span>
        <button 
          @click="proximaPagina" 
          :disabled="personagens.length === 0"
          class="btn btn-outline-light px-4"
        >
          Próxima
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.pagina-container {
  background-color: #0F0F0F;
  min-height: 100vh;
}

.logo {
  position: absolute;
}

.target-titulo {
  font-size: 2rem;
  font-family: sans-serif;
}

.form-control::placeholder {
  color: #6c757d;
}
.form-control:focus {
  background-color: #1a1a1a;
  color: white;
  border-color: #00AEEF;
  box-shadow: 0 0 0 0.25rem rgba(0, 174, 239, 0.25);
}

@media (max-width: 900px) {
  .logo {
    position: relative !important;
    width: 90% !important;
    padding-top: 60px !important;
  }
  .poster {
    display: none !important;
  }
  .blur {
    justify-content: center;
  }
}
</style>