(()=>{
  'use strict'

  window.ImageLazyLoad = function(){

  ImageLazyLoad.prototype.load = function(){
    const images = document.querySelectorAll('img[data-src]')
    if(!images.length){
      if(this.status === 'running' && typeof Loading !== 'undefined'){
        this.status === 'finish'
        Loading.close()
      }
      this.hash_scroll()
      return
    }
    if(this.status === 'start' && typeof Loading !== 'undefined'){
      this.status = 'running'
      Loading.view()
    }
    for(let i=0; i<images.length; i++){
      const src = images[i].getAttribute('data-src')
      images[i].onload  = this.load.bind(this)
      images[i].onerror = this.error.bind(this)
      images[i].setAttribute('src' , src)
      images[i].removeAttribute('data-src')
      break
    }
  }

  ImageLazyLoad.prototype.error = function(e){
    if(e.target.hasAttribute('data-src')){
      e.target.removeAttribute('data-src')
    }
    this.img_lazyLoad()
  }
})()