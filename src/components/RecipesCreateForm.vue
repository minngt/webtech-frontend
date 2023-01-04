<template>
  <button class="btn btn-success sticky-button" data-bs-toggle="offcanvas" data-bs-target="#recipes-create-offcanvas" aria-controls="#recipes-create-offcanvas">
    <i class="bi bi-recipe-plus-fill"></i>
  </button>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="recipes-create-offcanvas" aria-labelledby="offcanvas-label">
    <div class="offcanvas-header">
      <h5 id="offcanvas-label">New Recipe</h5>
      <button type="button" id="close-offcanvas" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <form class="text-start needs-validation" id="recipes-create-form" novalidate>
        <div class="mb-3">
          <label for="recipe-name" class="form-label">Recipe name</label>
          <input type="text" class="form-control" id="recipe-name" v-model="recipeName" required>
          <div class="invalid-feedback">
            Please provide the recipe name.
          </div>
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">category</label>
          <select id="category" class="form-select" v-model="category" required>
            <option value="" selected disabled>Choose...</option>
            <option value="STARTER">Starter</option>
            <option value="MAIN_COURSE">Main course</option>
            <option value="DESSERT">Dessert</option>
            <option value="DRINK">Drink</option>
            <option value="Other">Other</option>
          </select>
          <div class="invalid-feedback">
            Please select a valid category.
          </div>
        </div>
        <div class="mb-3">
          <label for="portion" class="form-label">Portion</label>
          <input type="text" class="form-control" id="portion" v-model="portion" required>
          <div class="invalid-feedback">
            Please provide the number of portion.
          </div>
        </div>
        <div class="mb-3">
          <label for="total-time" class="form-label">Total</label>
          <input type="text" class="form-control" id="total-time" v-model="totalTime" required>
          <div class="invalid-feedback">
            Please provide the total time to finish.
          </div>
        </div>
        <div class="mb-3">
          <label for="ingredients" class="form-label">Ingredients</label>
          <input type="text" class="form-control" id="ingredients" v-model="ingredients" required>
          <div class="invalid-feedback">
            Please provide the ingredients.
          </div>
        </div>
        <div class="mb-3">
          <label for="instruction" class="form-label">Instruction</label>
          <input type="text" class="form-control" id="instruction" v-model="instruction" required>
          <div class="invalid-feedback">
            Please provide the instruction.
          </div>
        </div>
        <div v-if="this.serverValidationMessages">
          <ul>
            <li v-for="(message, index) in serverValidationMessages" :key="index" style="color: red">
              {{ message }}
            </li>
          </ul>
        </div>
        <div class="mt-5">
          <button class="btn btn-primary me-3" type="submit" @click.prevent="createRecipe">Create</button>
          <button class="btn btn-danger" type="reset">Reset</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipesCreateForm',
  data () {
    return {
      recipeName: '',
      category: '',
      portion: '',
      totalTime: '',
      ingredients: '',
      instruction: '',
      serverValidationMessages: []
    }
  },
  emits: ['created'],
  methods: {
    async createRecipe () {
      if (this.validate()) {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/recipes'
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        const recipe = JSON.stringify({
          recipeName: this.recipeName,
          category: this.category,
          portion: this.portion,
          totalTime: this.totalTime
        })
        const requestOptions = {
          method: 'POST',
          headers,
          body: recipe,
          redirect: 'follow'
        }
        const response = await fetch(endpoint, requestOptions)
        await this.handleResponse(response)
      }
    },
    async handleResponse (response) {
      if (response.ok) {
        this.$emit('created', response.headers.get('location'))
        document.getElementById('close-offcanvas').click()
      } else if (response.status === 400) {
        response = await response.json()
        response.errors.forEach(error => {
          this.serverValidationMessages.push(error.defaultMessage)
        })
      } else {
        this.serverValidationMessages.push('Unknown error occurred')
      }
    },
    validate () {
      const form = document.getElementById('recipes-create-form')
      form.classList.add('was-validated')
      return form.checkValidity()
    }
  }
}
</script>

<style scoped>
.sticky-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  border-radius: 30px;
}
</style>
