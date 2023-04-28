import { Asset }   from './asset.js'
import { Urlinfo } from './lib/urlinfo.js'

export const Main = {
  urlinfo : new Urlinfo(),
}

function start(){
  assets()
  content()
}

function assets(){
  new Asset({
    file     : 'asset/menu.html',
    selector : 'menu',
  })
  new Asset({
    file     : 'asset/header.html',
    selector : 'header',
  })
  new Asset({
    file     : 'asset/footer.html',
    selector : 'footer',
  })
}

function content(){
  const page = Main.urlinfo.queries.p || 'index'
  new Asset({
    file     : `page/${page}/index.html`,
    selector : 'main',
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