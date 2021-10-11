import { shallowMount } from '@vue/test-utils'
import DropdowmEl from '@/components/DropdowmEl.vue'

describe('DropdowmEl.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(DropdowmEl, {
      props: { msg }
    })
    expect(wrapper.text())
  })
})
