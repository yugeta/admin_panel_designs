import { Urlinfo }   from './lib/urlinfo.js'

export class Menu{
  constructor(){
    this.set_active()
    this.set_tooltip()
  }
  get urlinfo(){
    return new Urlinfo()
  }
  get page_name(){
    return this.urlinfo.queries.p || null
  }
  get area(){
    return document.querySelector('menu')
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

  set_tooltip(){
    this.area.addEventListener('mouseover' , this.area_mouseover.bind(this))
    this.area.addEventListener('mouseout'  , this.area_mouseout.bind(this))
  }
  area_mouseover(e){
    const target_li = e.target.closest('menu nav ul > li')
    if(!target_li){return}
    const target = target_li.querySelector(':scope > a , :scope > label')
    if(!target){return}
    const name = target.textContent.trim()
    if(this.get_tooltip(name)){return}
    this.make_tooltip(name , target)
  }
  area_mouseout(e){
    this.clear_tooltips()
  }
  get_tooltip(name){
    return document.querySelector(`.menu-tooltip[data-name='${name}']`)
  }
  make_tooltip(name , target){
    const div = document.createElement('div')
    div.classList.add('menu-tooltip')
    div.setAttribute('data-name' , name)
    div.textContent = name
    document.body.appendChild(div)
    const rect = target.getBoundingClientRect()
    const pos = {
      x : rect.width,
      y : rect.top,
    }
    div.style.setProperty('height' , `${rect.height}px` , '')
    div.style.setProperty('line-height' , `${rect.height}px` , '')
    div.style.setProperty('left' , `${pos.x}px` , '')
    div.style.setProperty('top'  , `${pos.y}px` , '')
  }
  clear_tooltips(){
    const elms = document.querySelectorAll('.menu-tooltip')
    for(let i=elms.length-1; i>=0; i--){
      elms[i].parentNode.removeChild(elms[i])
    }
  }

}