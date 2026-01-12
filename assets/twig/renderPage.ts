import Twig from 'twig'
import { autoRegisterTwig } from './autoRegister'

let initialized = false

export function renderPage(id: string, data: any) {
  if (!initialized) {
    autoRegisterTwig()
    initialized = true
  }

  const tpl = Twig.twig({ ref: id })
  return tpl.render(data)
}
