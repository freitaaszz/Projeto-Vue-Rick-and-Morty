<script>
export default {
  name: 'CardPersonagem',
  props: {
    personagem: {
      type: Object,
    }
  }
}
</script>

<template>
  <div class="card h-100 text-center bg-dark text-white card-personagem mx-auto" style="width: 18rem;">
    <img :src="personagem.image" class="card-img-top">
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title fw-bold">{{ personagem.name }}</h5>
      <p class="card-text text-secondary">{{ personagem.species }}</p>
      <a :href="'/detalhes/' + personagem.id" class="btn btn-new w-100 mt-2">
        Ver detalhes
      </a>
    </div>
  </div>
</template>

<style scoped>
.card-personagem {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-personagem:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 174, 239, 0.5);
}

.btn.btn-new {
  background-color: #00AEEF;
  color: white;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn.btn-new:hover {
  background-color: #0177b2;
  color: white;
}
</style>