import Twig from 'twig'
import { autoRegisterTwig } from './autoRegister'

export function resolvePageId(): string {
  const path = window.location.pathname

  if (path === '/' || path === '') {
    return 'home'
  }

  // /about -> about
  // /news/detail -> news/detail
  const id = path.replace(/^\/|\/$/g, '')

  return id || 'home'
}

export function renderCurrentPage(data: any = {}) {
    autoRegisterTwig()
  let pageId = resolvePageId()
  
  let tpl
  try {
    tpl = Twig.twig({ ref: pageId })

    if (!tpl) {
      tpl = Twig.twig({ ref: '404' })
    }
    
  } catch {
    tpl = Twig.twig({ ref: '404' })
    pageId = '404'
  }

  return tpl.render({
    ...data,
    page: pageId,
  })
}
