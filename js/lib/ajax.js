(()=>{
  'use strict'

  window.Ajax = function(options){
    this.options = options || {}
    this.xhr = new XMLHttpRequest()
    this.send()
  }
  
  Ajax.prototype.send = function(){
    this.xhr.open(this.options.method || 'get' , this.options.url || getApiUrl() , true)
    this.xhr.setRequestHeader('Content-Type', this.getContentType(this.options))
    this.xhr.onload = this.options.success || null
    this.xhr.send(this.getQuery(this.options))
  }
  
  Ajax.prototype.getQuery = function(){
    return this.options.query ? Object.entries(this.options.query).map((e)=>`${e[0]}=${e[1]}`).join('&') : ''
  }
  
  Ajax.prototype.getContentType = function(){
    return this.options.contentText || 'application/x-www-form-urlencoded'
  }
})()