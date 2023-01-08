import { mount } from '@vue/test-utils'
import Recipes from '@/views/Recipes.vue'
import RecipesCardList from '@/components/RecipesCardList.vue'
import RecipesCreateForm from '@/components/RecipesCreateForm.vue'

describe('Testing Recipes.vue', () => {
  it('should show page title', () => {
    // when
    const wrapper = mount(Recipes)

    // then
    expect(wrapper.text()).toMatch('Recipes')
  })

  it('should have recipes card list component', () => {
    // when
    const wrapper = mount(Recipes)

    // then
    const cardList = wrapper.findComponent(RecipesCardList)
    expect(cardList.exists()).toBeTruthy()
  })

  it('should have persons create form component', () => {
    // when
    const wrapper = mount(Recipes)

    // then
    const createForm = wrapper.findComponent(RecipesCreateForm)
    expect(createForm.exists()).toBeTruthy()
  })
})
