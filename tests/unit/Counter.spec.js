import { shallow } from '@vue/test-utils'
import Counter from '@/components/Counter.vue' // I guess @ goes directly to src/
import expect from 'expect'

describe('Counter', () => {
  it('defaults to a count of 0', () => {
    const wrapper = shallow(Counter)
    expect(wrapper.vm.count).toBe(0)
  })

  it('represents the current count', () => {
    const wrapper = shallow(Counter)
    expect(wrapper.text()).toContain(0)
  })

  it('increments the count when increment button is clicked', () => {
    const wrapper = shallow(Counter)
    wrapper.find('button.increment').trigger('click')

    expect(wrapper.vm.count).toBe(1)
  })
  
  it('decrements the count when decrement button is clicked', () => {
    const wrapper = shallow(Counter, {
      data: {
        count: 5
      }
    })
    wrapper.find('button.decrement').trigger('click')
    expect(wrapper.vm.count).toBe(4)
    wrapper.find('button.decrement').trigger('click')
    expect(wrapper.vm.count).toBe(3)
  })

  // it('never goes below 0', () => {
  //   const wrapper = shallow(Counter)
  //   expect(wrapper.vm.count).toBe(0)
  //   wrapper.find('button.decrement').trigger('click')
  //   expect(wrapper.vm.count).toBe(0)  
  // })

  it('doesn\'t show decrement button when count is 0', () => {
    const wrapper = shallow(Counter, {
      data: { count: 1 }
    })
    expect(wrapper.find('button.decrement').exists()).toBe(true)
    wrapper.find('button.decrement').trigger('click')
    expect(wrapper.find('button.decrement').exists()).toBe(false)
  })

})