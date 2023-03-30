(function(){
  window.UrlInfo = function(uri){
    this.uri = uri || location.href
    this.setUrl()
    this.setDomain()
		this.setHash()
    this.setQuery()
    this.setFilename()
	};


  UrlInfo.prototype.setUrl = function(uri){
    uri = uri || this.uri
    if(uri.indexOf("?")!=-1){
      this.url = uri.split("?")[0]
    }
		else if(uri.indexOf(";")!=-1){
      this.url = uri.split(";")[0]
    }
    else{
      this.url = uri
    }
  }
  UrlInfo.prototype.setDomain = function(uri){
    uri = uri || this.uri
    const sp = uri.split('/')
    if(!sp[2]){return null}
    this.hostname = sp[2]
    const sp2 = sp[2].split(':')
    if(uri.match(/^http:\/\//)){
      this.port = sp2[1] || 80
      this.protocol = 'http'
    }
    else if(uri.match(/^https:\/\//)){
      this.port = sp2[1] || 443
      this.protocol = 'https'
    }
    this.domain = sp2[0]
  }
  UrlInfo.prototype.setHash = function(uri){
    uri = uri || this.uri
    if(!uri || uri.indexOf('#')==-1){return null}
    const sp = uri.split('#')
    this.hash = sp.slice(1)
  }
  UrlInfo.prototype.setQuery = function(uri){
    uri = uri || this.uri
    let query = this.getQueryString(uri)
    const newDatas = {}
    if(query){
      const querys = query.split("&")
      for(var i=0;i<querys.length;i++){
        var sp = querys[i].split("=")
        if(!sp[0]){continue}
        newDatas[sp[0]]=sp[1]
      }
    }
    this.query = newDatas
  }
  UrlInfo.prototype.getQueryString = function(uri){
    if(!uri){return null}
    uri = uri.split('#')[0]
    if(uri.indexOf("?")!=-1){return uri.split("?")[1]}
		if(uri.indexOf(";")!=-1){return uri.split(";")[1]}
    return null
  }
  UrlInfo.prototype.setFilename = function(url){
    url = url || this.url
    const sp = url.split('/')
    this.basename = sp[sp.length-1]
    this.path = this.domain ? sp.slice(3,sp.length-1).join('/') : sp.slice(0,sp.length-1).join('/')
    this.setName(this.basename)
  }

  UrlInfo.prototype.setName = function(basename){
    if(!basename){return null}
    const sp = basename.split('.')
    if(sp.length <= 1){return null}
    this.filename = sp.slice(0,sp.length-1).join('.')
    this.extension = sp[sp.length-1]
  }
})()