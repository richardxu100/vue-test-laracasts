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

  it('broadcasts when the countdown is finished', (done) => {
    clock.tick(10000)

    assertOnNextTick(() => {
      expect(wrapper.emitted().finished).toBeTruthy()
    }, done)
  })

  it.only('reduces the countdown every second', (done) => {
    see('10 Seconds')
    clock.tick(1000)

    assertOnNextTick(() => {
      see('9 Seconds')
    }, done)
  })

  it('shows an expired message when the countdown has completed', (done) => {
    clock.tick(10000)

    assertOnNextTick(() => {
      see('Now Expired')
    }, done)
  })
  
  it('shows a custom message when the countdown has completed', (done) => {
    wrapper.setProps({ expiredText: 'Contest is over' })

    clock.tick(10000)

    assertOnNextTick(() => {
      see('Contest is over')
    }, done)
  })

  it('clears the interval once completed', (done) => {
    clock.tick(10000)

    expect(wrapper.vm.now.getSeconds()).toBe(10)

    assertOnNextTick(() => {
      clock.tick(5000)
      expect(wrapper.vm.now.getSeconds()).toBe(10)
    }, done)
      // expect(wrapper.emitted().finished).toBeTruthy()
  })

  // Helper Functions
  function assertOnNextTick(callback, done) {
    wrapper.vm.$nextTick(() => {
      try {
        callback()
        done()
      } catch (e) {
        done(e)
      }
    })
  }

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