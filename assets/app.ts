import '@styles/app.pcss'

import Alpine from 'alpinejs'
import { renderCurrentPage, resolvePageId } from './twig/router'
import 'flowbite'

import intersect from '@alpinejs/intersect'
import DarkMode from './ts/alpine/DarkMode'
import SearchBox from './ts/alpine/ SearchBox'
import Lightbox from './ts/alpine/Lightbox'
import MySplider from './ts/alpine/MySplider'
import CustomKeenSlider from './ts/alpine/CustomKeenSlider'
import FetchNews from './ts/alpine/FetchNews'

let page = resolvePageId()
const html = renderCurrentPage({
  page,
  title: `${page} | twig template`,
  headline: "前端 Twig 渲染",
  description: "不需要 PHP"
})

const app = document.querySelector('#app')!
app.innerHTML = html

const titleEl = app.querySelector('title')

if (titleEl) {
  document.title = titleEl.textContent || 'the default title'
}

const initializeComponents = () => {
  DarkMode()
  SearchBox()
  Lightbox()
  MySplider()
  CustomKeenSlider()
  FetchNews()
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