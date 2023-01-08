import { mount } from '@vue/test-utils'
import RecipesCardList from '@/components/RecipesCardList'
import RecipeCard from '@/components/RecipeCard'

describe('Testing RecipesCardList.vue', () => {
  it('should render a recipe card for each recipe', () => {
    // when
    const wrapper = mount(RecipesCardList, {
      propsData: {
        recipes: [
          {
            id: 1,
            recipeName: 'testRecipe1',
            category: 'DESSERT',
            portion: 2,
            totalTime: 20,
            ingredients: 'aaa,bbb',
            instruction: 'add abcd'
          },
          {
            id: 1,
            recipeName: 'testRecipe2',
            category: 'DRINK',
            portion: 1,
            totalTime: 5,
            ingredients: 'aaa,bbb, ccc',
            instruction: 'add abcd'
          }
        ]
      }
    })

    // then
    const recipeCards = wrapper.findAllComponents(RecipeCard)
    expect(recipeCards.length).toBe(2)
  })
})
