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
      <li class="list-group-item">Instructions: {{recipe.direction}}</li>
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
    }
  }
}
</script>

<style scoped>

</style>
