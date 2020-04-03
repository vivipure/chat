import store from './store'
import { changeModeAction } from './store/actionType'

const WIDTH = 767

function isMobie() {
     const rect = document.body.getBoundingClientRect()
     return rect.width - 1 < WIDTH
}

window.addEventListener('resize', () => {
    const type = isMobie() ? 'phone':'normal'
    const action = changeModeAction(type)
    store.dispatch(action)
})

window.addEventListener('DOMContentLoaded', () => {
    const type = isMobie() ? 'phone':'normal'
    const action = changeModeAction(type)
    store.dispatch(action)
})