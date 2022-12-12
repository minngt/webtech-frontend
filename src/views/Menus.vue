<template>
  <h1>Welcome to Menus</h1>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col" v-for="menu in menus" :key="menu.id">
      <div class="col">
        <div class="card">
          <img :src="getAvatar(menu)" class="card-img-top" :alt="menu.menuName">
          <div class="card-body">
            <h5 class="card-title">{{menu.menuName}}</h5>
            <p class="card-text">
              {{menu.quantity}} {{menu.unit}}(s) {{ menu.menuName }}, category {{ menu.course }} are ordered.
              Include {{menu.ingsName.length}} ingredient(s).
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menus',
  data () {
    return {
      menus: []
    }
  },
  methods: {
    getAvatar (menu) {
      if (menu.course === 'DESSERT') {
        return require('../assets/cookies.jpg')
      } else if (menu.course === 'DRINK') {
        return require('../assets/cappuccino.jpg')
      }
    }
  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/menus'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(menu => {
        this.menus.push(menu)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>
</style>
