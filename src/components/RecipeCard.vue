<template>
  <div class="card" style="width: 16rem;">
    <img :src="getAvatar(recipe)" class="card-img-top" :alt="recipe.recipeName">
    <div class="card-body">
      <h5 class="card-title">{{ recipe.recipeName }}</h5>
      <p class="card-text">Here is your {{recipe.recipeName}} recipe</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Category: {{ recipe.category }}</li>
      <li class="list-group-item">Portion: {{recipe.portion}}</li>
      <li class="list-group-item">Total time: {{recipe.totalTime}} (min)</li>
      <li class="list-group-item">Ingredients: {{recipe.ingredients}}</li>
      <li class="list-group-item">Instructions: {{recipe.instruction}}</li>
      <div class="d-grid gap-2">
        <button type="btn btn-primary me-md-2" class="btn btn-outline-warning">Update</button>
        <button v-on:click="deleteRecipe(recipe.id)" type="btn btn-primary " class="btn btn-outline-danger">Delete</button>
      </div>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'RecipeCard',
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    getAvatar (recipe) {
      if (recipe.category === 'DESSERT') {
        return require('../assets/dessert.jpeg')
      } else if (recipe.category === 'DRINK') {
        return require('../assets/drink.jpeg')
      } else if (recipe.category === 'STARTER') {
        return require('../assets/starter.jpeg')
      } else if (recipe.category === 'MAIN_COURSE') {
        return require('../assets/main_course.jpeg')
      } else if (recipe.category === 'OTHER') {
        return require('../assets/other.jpeg')
      }
    },
    deleteRecipe (id) {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/recipes/' + id
      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      }

      fetch(endpoint, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
      this.splice(id, 1)
    },
    mounted () {
      this.getData()
    }
  }
}
</script>

<style scoped>

</style>
