

import './styles/app.pcss'

import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'
import 'flowbite'
import DarkMode from './ts/alpine/DarkMode'
import SearchBox from './ts/alpine/ SearchBox'
import MultiDirectional from './ts/alpine/MultiDirectional'
import PlyrContainer from './ts/alpine/PlyrContainer'
import Lightbox from './ts/alpine/Lightbox'

const initializeComponents = () => {
    DarkMode()
    SearchBox()
    MultiDirectional()
    PlyrContainer()
    Lightbox()
}

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.Alpine = Alpine
  Alpine.plugin(intersect)
  initializeComponents()
  Alpine.start()
})
