(()=>{
  'use strict'

  // window.LoadAsset = function(asset_name , selector , callback){
  window.LoadAsset = function(options){
    this.status = null
    this.options = options || {}
    this.load_scripts = []
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
    this.removeScript()
    this.loadScript()
    this.finish()
  }
  LoadAsset.prototype.runScript = function(){
    const scripts = this.elm.getElementsByTagName('script')
    if(!scripts || !scripts.length){return}
    for(let script of scripts){
      if(script.src){
        this.load_scripts.push({
          async  : script.async,
          src    : script.getAttribute('src'),
          target : script,
        })
      }
      else{
        const val = script.textContent
        eval(val)
      }
    }
  }
  LoadAsset.prototype.loadScript = function(){
    if(!this.load_scripts.length){return}
    const script = this.load_scripts.shift()
    const new_script = document.createElement('script')
    new_script.src = script.src
    if(!script.async){
      new_script.onload = (()=>{
        this.loadScript()
      }).bind(this)
    }
    document.querySelector('head').appendChild(new_script)
    if(script.async){
      this.loadScript()
    }
  }
  LoadAsset.prototype.removeScript = function(){
    const scripts = this.elm.getElementsByTagName('script')
    if(!scripts){return}
    for(let i=scripts.length-1; i>=0; i--){
      if(!scripts[i].src){continue}
      scripts[i].parentNode.removeChild(scripts[i])
    }
  }
  LoadAsset.prototype.finish = function(){
    this.status = 'finish'
    if(!this.options.callback){return}
    this.options.callback(this)
  }
})()