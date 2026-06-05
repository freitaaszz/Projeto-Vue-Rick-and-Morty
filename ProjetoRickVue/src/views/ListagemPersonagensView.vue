<script>
import { ref, onMounted } from 'vue'
import CardPersonagem from '../components/CardPersonagem.vue'

export default {
  name: 'ListagemPersonagensView',
  components: {
    CardPersonagem
  },
  setup() {
    //essa é a nossa lista que o vue fvai usar para mostrar os cards na tela
    const personagens = ref([])

    const listarPersonagens = () => {

      fetch('https://rickandmortyapi.com/api/character', {
        method: 'GET'
      })
        .then(response => response.json())
        .then(function(json){
          //em vez de dar innerHTML no container, a gente joga os resultados na lista
          json.results.map(function(results) {
            personagens.value.push(results)
          })
        })
        .catch(error => {
          console.log('Ocorreu um erro para obter os personagens: ', error)
        })

      fetch('https://rickandmortyapi.com/api/character?page=2', {
        method: 'GET'
      })
        .then(response => response.json())
        .then(function(json){
          json.results.map(function(results) {
            personagens.value.push(results)
          })
        })
        .catch(error => {
          console.log('Ocorreu um erro para obter os personagens: ', error)
        })

    }

    //rodando a nossa função de listar os personagens assim que a pagina carrega
    onMounted(() => {
      listarPersonagens()
    })
    return {
      personagens
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
      
      <div class="d-flex flex-wrap gap-5 justify-content-center px-4">
        <div v-for="personagem in personagens" :key="personagem.id">
          <CardPersonagem :personagem="personagem" />
        </div>
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