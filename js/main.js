import { Init }      from './init.js'
import { SvgImport } from './lib/svg_import.js'
import { Menu }      from './menu.js'
import { Login }     from './login.js'

window.loaded_callbacks = []
export const Main = {}

function start(){
  new Init({
    assets : [
      {type : 'menu'    , file : 'asset/menu.html',                 selector : 'menu'},
      {type : 'header'  , file : 'asset/header.html',               selector : 'header'},
      {type : 'footer'  , file : 'asset/footer.html',               selector : 'footer'},
      {type : 'content' , file : `page/{{page_name}}/index.html`,   selector : 'main'},
    ],
  }).then(e => {
    new SvgImport()
    new Menu()
    new Login()
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