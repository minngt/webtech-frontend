import { mount } from '@vue/test-utils'
import RecipeCard from '@/components/RecipeCard.vue'

describe('Testing RecipeCard.vue', () => {
  it('should render recipe name', () => {
    // when
    const wrapper = mount(RecipeCard, {
      propsData: {
        recipe: {
          id: 1,
          recipeName: 'testRecipe',
          category: 'DRINK',
          portion: 1,
          totalTime: 5,
          ingredients: 'aaa,bbb, ccc',
          instruction: 'add abcd'
        }
      }
    })

    // then
    const cardTitle = wrapper.find('.card-title')
    expect(cardTitle.text()).toBe('testRecipe')
  })
})
