<template>
  <h1>Recipes</h1>
  <div class="container-fluid">
    <recipes-card-list :recipes="this.recipes"></recipes-card-list>
  </div>
  <recipes-create-form @created="addRecipe"></recipes-create-form>
</template>

<script>
import RecipesCardList from '@/components/RecipesCardList.vue'
import RecipesCreateForm from '@/components/RecipesCreateForm.vue'

export default {
  name: 'Recipes',
  components: {
    RecipesCardList,
    RecipesCreateForm
  },
  data () {
    return {
      recipes: []
    }
  },
  methods: {
    addRecipe (recipeLocation) {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + recipeLocation
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(person => this.persons.push(person))
        .catch(error => console.log('error', error))
    }
  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/recipes'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(recipe => {
        this.recipes.push(recipe)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>
</style>
