import { Init }      from './init.js'
import { SvgImport } from './lib/svg_import.js'
import { Menu }      from './menu.js'

window.loaded_callbacks = []
export const Main = {}

function start(){
  new Init({
    assets : [
      {file : 'asset/menu.html',                 selector : 'menu'},
      {file : 'asset/header.html',               selector : 'header'},
      {file : 'asset/footer.html',               selector : 'footer' },
      {file : `page/{{page_name}}/index.html`,   selector : 'main'},
    ],
  }).then(e => {
    console.log('main')
    new SvgImport()
    new Menu()
    for(const callback of window.loaded_callbacks){
      callback()
    }
    window.loaded_callbacks = null
  })
}

switch(document.readyState){
  case 'complete':
  case 'interactive':
    start()
    break
  default:
    window.addEventListener('DOMContentLoaded' , start)
    break
}