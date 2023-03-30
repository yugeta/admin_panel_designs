(function(){
  function Loading(){
    this.loadCss()
  }

  Loading.prototype.loadCss = function(){
    if(document.querySelector('.loading-css')){return}
    const loadingCss = document.createElement('link')
    loadingCss.className = 'loading-css'
    loadingCss.rel = 'stylesheet'
    loadingCss.href = 'css/loading.css'
    document.querySelector('head').appendChild(loadingCss)
  }

  Loading.prototype.view = function(){
    if(document.querySelector('.loading')){return}
    switch(document.readyState){
      case "complete":
        this.make()
        break
  
      default:
        window.addEventListener("load",this.make.bind(this))
        break
    }
  }

  Loading.prototype.make = function(){
    if(document.querySelector('.loading')){return}
    const loading = document.createElement('div')
    loading.className = 'loading'
    document.body.appendChild(loading)
    this.setContent_points(loading)
  }
  
  Loading.prototype.close = function(){
    const loading = document.querySelector('.loading')
    if(!loading){return}
    loading.parentNode.removeChild(loading)
  }

  Loading.prototype.setContent_points = function(loading){
    loading = loading || document.querySelector('.loading')
    if(!loading){return}
    const point = document.createElement('div')
    point.className = 'loading-circle'
    for(let i=0; i<12; i++){
      point.innerHTML += '<div class="dot"></div>'
    }
    loading.appendChild(point)
  }


  window.Loading = new Loading()
})()