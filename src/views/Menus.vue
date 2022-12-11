
<template>
  <h1>Welcome to Menus</h1>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col" v-for="menu in menus" :key="menu.id">
      <div class="col">
        <div class="card">
          <img :src="getAvatar(menu)" class="card-img-top" :alt="menu.menuName">
          <div class="card-body">
            <h5 class="card-title">{{menu.menuName}}</h5>
            <p class="card-text">{{menu.quantity}} {{menu.unit}} {{ menu.menuName }} are ordered, Category {{ menu.course }}.
              Made by {{menu.ingsId.length}} ingredients </p>
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
      menus: [
        {
          id: 1,
          menuName: 'Cappuccino',
          unit: 'cup',
          quantity: '3',
          course: 'Drink',
          ingsId: []
        },
        {
          id: 2,
          menuName: 'Cookies',
          unit: 'piece',
          quantity: '4',
          course: 'Dessert',
          ingsId: [
            1,
            2,
            4
          ]
        }
      ]
    }
  },
  methods: {
    getAvatar (menu) {
      if (menu.course === 'DRINK') {
        return require('../assets/cappuccino.jpg')
      } else if (menu.course === 'DESSERT') {
        return require('../assets/cookies.jpg')
      }
    }
  }
}
</script>

<style scoped>
</style>
