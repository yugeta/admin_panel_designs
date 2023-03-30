(()=>{
  window.Convert = function(str , data){
    this.str = str
    
  }
  Convert.prototype.double_braket = function(data){
    if(data){
      const reg = new RegExp('{{(.*?)}}','g')
      const arr = []
      let res = []
      while ((res = reg.exec(this.str)) !== null) {
        arr.push(res[1])
      }
      for(let key of arr){
        const val = typeof data[key] !== 'undefined' ? data[key] : ''
        this.str = this.str.split('{{'+ String(key) +'}}').join(val)
      }
    }
    return this.str
  }
})()