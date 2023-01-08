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
      <div class="mt-2">
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" :data-bs-target="`#recipe-update-offcanvas-${recipe.id}`" aria-controls="#recipe-update-offcanvas-{{recipe.id}}">Edit</button>
        <div class="offcanvas offcanvas-end" tabindex="-1" :id="`recipe-update-offcanvas-${recipe.id}`" aria-labelledby="offcanvas-label">
          <div class="offcanvas-header">
            <h5 id="offcanvas-label">Edit Recipe</h5>
            <button type="button" id="close-offcanvas" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <form class="text-start needs-validation" novalidate id="recipe-update" >
                <img :src="getAvatar(recipe)" class="card-img-top" :alt="recipe.recipeName">
                <div class="card-body">
                  <h5 class="card-title">{{ recipe.recipeName }}</h5>
                  <p class="card-text">Edit is your {{recipe.recipeName}} recipe</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Category: {{ recipe.category }}</li>
                  <li class="list-group-item">Portion:
                    <form class="form-floating">
                      <input type="number" class="form-control" id="portion" v-model="portion" min="1" @keypress="isNumber($event)">
                      <div class="invalid-feedback">
                        Invalid number
                      </div>
                      <label for="portion">Edit portion</label>
                    </form>
                  </li>
                  <li class="list-group-item">Total time:
                    <form class="form-floating">
                      <input type="number" class="form-control" id="total-time" v-model="totalTime" min="1" @keypress="isNumber($event)">
                      <div class="invalid-feedback">
                        Invalid number
                      </div>
                      <label for="total-time">Edit total time</label>
                    </form>
                  </li>
                  <li class="list-group-item">Ingredients:
                    <form class="form-floating">
                      <input type="text" class="form-control" id="ingredients" v-model="ingredients" required>
                      <label for="portion">Edit Ingredients</label>
                      <div class="invalid-feedback">
                        Please provide the ingredients.
                      </div>
                    </form>
                  </li>
                  <li class="list-group-item">Instructions:
                    <form class="form-floating">
                      <input type="text" class="form-control" id="instruction" v-model="instruction" required>
                      <label for="portion">Edit Instruction</label>
                      <div class="invalid-feedback">
                        Please provide the instruction.
                      </div>
                    </form>
                  </li>
                </ul>
              <div v-if="this.serverValidationMessages">
                <ul>
                  <li v-for="(message, index) in serverValidationMessages" :key="index" style="color: red">
                    {{ message }}
                  </li>
                </ul>
              </div>
              <div class="mt-5">
                <button class="btn btn-primary me-3" type="submit" @click.prevent="updateRecipe(recipe.id)">Update</button>
              </div>
            </form>
          </div>
        </div>
        <button class="btn btn-danger" type="btn btn-primary " v-on:click="deleteRecipe(recipe.id)" >Delete</button>
      </div>
    </ul>
  </div>
</template>

<script>

import recipes from '@/views/Recipes.vue'

export default {
  name: 'RecipeCard',
  data () {
    return {
      portion: parseInt(''),
      totalTime: parseInt(''),
      ingredients: '',
      instruction: '',
      serverValidationMessages: []
    }
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    recipes () {
      return recipes
    },
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
    async deleteRecipe (id) {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/recipes' + '/' + id
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
    async updateRecipe (id) {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/recipes' + '/' + id
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const originalRecipe = this.$props.recipe
      const recipe = JSON.stringify({
        recipeName: originalRecipe.recipeName,
        category: originalRecipe.category,
        ingredients: this.ingredients,
        portion: parseInt(this.portion),
        totalTime: parseInt(this.totalTime),
        instruction: this.instruction
      })
      const requestOptions = {
        method: 'PUT',
        headers,
        body: recipe,
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
    },
    isNumber: function (evt) {
      evt = (evt) || window.event
      const charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    validate () {
      const forms = document.querySelectorALL('.needs-validation')
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
    }
  }
}
</script>

<style scoped>

</style>
