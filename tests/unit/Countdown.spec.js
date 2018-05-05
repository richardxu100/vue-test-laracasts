import { shallow } from '@vue/test-utils'
import expect from 'expect'
import moment from 'moment'
import sinon from 'sinon'

import Countdown from '@/components/Countdown.vue'

describe('Countdown', () => {
  let wrapper, clock 

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    wrapper = shallow(Countdown, {
      propsData: {
        until: moment().add(10, 'seconds')
      }
    })
  })

  afterEach(() => clock.restore())

  it('renders a countdown timer', () => {
    see('0 Days')
    see('0 Hours')
    see('0 Minutes')
    see('10 Seconds')
    // countdown until December 5 2017
  })

  it('broadcasts when the countdown is finished', async () => {
    clock.tick(10000)

    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().finished).toBeTruthy()
  })

  it('reduces the countdown every second', async () => {
    see('10 Seconds')
    clock.tick(1000)

    await wrapper.vm.$nextTick()
    see('9 Seconds')
  })

  it('shows an expired message when the countdown has completed', async () => {
    clock.tick(10000)

    await wrapper.vm.$nextTick()
    see('Now Expired')
  })
  
  it('shows a custom message when the countdown has completed', async () => {
    wrapper.setProps({ expiredText: 'Contest is over' })

    clock.tick(10000)

    await wrapper.vm.$nextTick()
    see('Contest is over')
  })

  it('clears the interval once completed', async () => {
    clock.tick(10000)

    expect(wrapper.vm.now.getSeconds()).toBe(10)

    await wrapper.vm.$nextTick()
    clock.tick(5000)
    expect(wrapper.vm.now.getSeconds()).toBe(10)
      // expect(wrapper.emitted().finished).toBeTruthy()
  })

  // Helper Functions
  function see(text, selector) {
    const wrap = selector ? wrapper.find(selector) : wrapper 

    expect(wrap.html()).toContain(text)
  }

  function type(text, selector) {
    wrapper.find(selector).element.value = text
    wrapper.find(selector).trigger('input')
  }

  function click(selector) {
    wrapper.find(selector).trigger('click')
  }
})