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
  }
}