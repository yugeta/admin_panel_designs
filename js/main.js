import { Init }     from './init.js'
import { SvgImport } from './lib/svg_import.js'

export const Main = {}

function start(){
  const page_name = 
  new Init({
    assets : [
      {file : 'asset/menu.html',                 selector : 'menu'},
      {file : 'asset/header.html',               selector : 'header'},
      {file : 'asset/footer.html',               selector : 'footer' },
      {file : `page/{{page_name}}/index.html`,   selector : 'main'},
    ],
  }).then(e => {
    new SvgImport()
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