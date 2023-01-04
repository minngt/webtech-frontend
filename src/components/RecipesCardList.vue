<template>
  <div class="row row-cols-1 row-cols-md-4 g-4">
    <div class="col" v-for="recipe in recipes" :key="recipe.id">
      <recipe-card :recipe="recipe"></recipe-card>
    </div>
  </div>
</template>

<script>
import RecipeCard from '@/components/RecipeCard.vue'
export default {
  name: 'RecipesCardList',
  components: {
    RecipeCard
  },
  props: {
    recipes: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
