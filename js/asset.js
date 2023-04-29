import { Ajax } from './lib/ajax.js'

export class Asset{
  constructor(options){
    this.options = options || {}
    if(!this.file || !this.elm){return}
    this.load()
  }

  get file(){
    return this.options.file
  }
  get elm(){
    return document.querySelector(this.options.selector)
  }

  load(){
    new Ajax({
      url : this.file,
      method : 'get',
      success : this.loaded.bind(this)
    })
  }

  loaded(res){
    if(!res || !res.data){return}
    this.elm.insertAdjacentHTML('beforeend' , res.data)
    this.set_script()
    this.finish()
  }

  set_script(){
    const scripts = this.elm.querySelectorAll('script')
    if(!scripts || !scripts.length){return}
    for(const script of scripts){
      const new_script = document.createElement('script')
      if(script.getAttribute('src')){
        this.set_script_src(script , new_script)
      }
      else{
        this.set_script_inner(script)
      }
    }
  }

  set_script_src(berfore_script){
    const new_script = document.createElement('script')
    this.copy_attributes(berfore_script , new_script)
    new_script.setAttribute('data-set',1)
    berfore_script.parentNode.insertBefore(new_script , berfore_script)
    berfore_script.parentNode.removeChild(berfore_script)
  }
  set_script_inner(berfore_script){
    const script_value = berfore_script.textContent
    return Function('(' + script_value + ')')();
  }

  copy_attributes(before_elm , after_elm){
    if(!before_elm || !after_elm){return}
    const attributes = before_elm.attributes
    if(!attributes || !attributes.length){return}
    for(const attr of attributes){
      after_elm.setAttribute(attr.nodeName , attr.nodeValue)
    }
  }

  finish(){
    if(!this.options.callback){return}
    this.options.callback(this)
  }
}