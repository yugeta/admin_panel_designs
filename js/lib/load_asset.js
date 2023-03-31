(()=>{
  'use strict'

  // window.LoadAsset = function(asset_name , selector , callback){
  window.LoadAsset = function(options){
    this.status = null
    this.options = options || {}
    this.elm = document.querySelector(this.options.selector)
    if(!this.elm){
      this.status = 'none'
      return
    }
    if(this.elm.innerHTML){
      this.finish()
      return
    }
    this.load()
  }
  LoadAsset.prototype.load = function(){
    new Ajax({
      url     : `asset/${this.options.path}?${(+new Date())}`,
      method  : 'get',
      success : this.loaded.bind(this)
    })
  }
  LoadAsset.prototype.loaded = function(e){
    // const elm = document.querySelector(this.options.selector)
    // if(!elm){return}
    this.elm.innerHTML =  new Convert(e.target.response).double_braket(Main.settings)
    this.runScript()
    this.finish()
  }
  LoadAsset.prototype.runScript = function(){
    // if(!elm){return}
    const scripts = this.elm.getElementsByTagName('script')
    if(!scripts || !scripts.length){return}
    for(let script of scripts){
      if(script.src){
        const s = document.createElement('script')
        s.src = script.getAttribute('src')
        script.parentNode.removeChild(script)
        this.elm.appendChild(s)
      }
      else{
        const val = script.textContent
        eval(val)
      }
    }
  }
  LoadAsset.prototype.finish = function(){
    this.status = 'finish'
    if(!this.options.callback){return}
    this.options.callback(this)
  }
})()