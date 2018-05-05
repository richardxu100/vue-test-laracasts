import { shallow } from '@vue/test-utils'
import expect from 'expect'
import Reminders from '@/components/Reminders.vue'

describe('Reminders', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(Reminders)
  })
  
  it('hides the reminders list if there are none', () => {
    expect(wrapper.contains('ul')).toBe(false)
  })

  it('can add reminders', () => {
    addReminder('Go to the store')    

    expect(wrapper.find('ul').text()).toContain('Go to the store')
  })

  it('can remove any reminder', () => {
    addReminder('Go to the store')
    addReminder('Finish screencast')

    const deleteButton = wrapper.find('ul > li:first-child .remove')
    deleteButton.trigger('click')
    
    expect(wrapper.find('ul').text()).not.toContain('Go to the store')
    expect(wrapper.find('ul').text()).toContain('Finish screencast')
  })

  function addReminder(body) {
    const newReminder = wrapper.find('.new-reminder')

    newReminder.element.value = body
    newReminder.trigger('input')

    wrapper.find('button').trigger('click')
  }
  
})