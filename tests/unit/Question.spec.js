import { shallow } from '@vue/test-utils'
import expect from 'expect'
import Question from '@/components/Question.vue'

describe('Question', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(Question, {
      propsData: {
        dataQuestion: {
          title: 'The title',
          body: 'The body'
        }
      }
    })
  })

  it('can be edited', () => {
    expect(wrapper.contains('input[name=title]')).toBe(false)

    wrapper.find('button#edit').trigger('click')

    expect(wrapper.find('input[name=title]').element.value).toBe('The title')
    expect(wrapper.find('textarea[name=body]').element.value).toBe('The body')
  })

  it('hides the edit button during edit mode', () => {
    expect(wrapper.contains('#edit')).toBe(true)

    wrapper.find('#edit').trigger('click')

    expect(wrapper.contains('#edit')).toBe(false)
  })

  it('updates the question after being edited', () => {
    wrapper.find('#edit').trigger('click')
    
    type('input[name=title]', 'Changed title')
    type('textarea[name=body]', 'Changed body')

    click('#update')

    see('Changed title')
    see('Changed body')
  })

  it('can cancel out of edit mode', () => {
    click('#edit')

    type('input[name=title]', 'Changed title')

    click('#cancel')

    see('The title')
  })
  
  // see('Foobar)
  const see = (text, selector) => {
    let wrap = selector ? wrapper.find(selector) : wrapper 
    expect(wrap.text()).toContain(text)
  }

  const type = (selector, text) => {
    wrapper.find(selector).element.value = text
    wrapper.find(selector).trigger('input')
  }
  
  const click = selector => {
    wrapper.find(selector).trigger('click')
  }
})