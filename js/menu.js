import { Urlinfo }   from './lib/urlinfo.js'

export class Menu{
  constructor(){
    this.set_active()
  }
  get urlinfo(){
    return new Urlinfo()
  }
  get page_name(){
    return this.urlinfo.queries.p || null
  }

  get_href2page_name(href){
    const queries = Object.fromEntries(new URLSearchParams(href))
    return queries.p || null
  }

  set_active(){
    const page_name = this.page_name
    const elms = document.querySelectorAll('menu nav a')
    if(!elms){return}
    for(const elm of elms){
      const href = elm.getAttribute('href')
      if(!href){continue}
      if(page_name === this.get_href2page_name(href)){
        elm.setAttribute('data-status' , 'active')
        // 子階層の場合、階層を開く
        const parent = elm.closest(`menu nav > ul > li`)
        if(parent.querySelector('label')){
          parent.querySelector(`:scope > input[type='checkbox']`).checked=true
        }
      }
    }
  }

}