(function(){

  function Common(){

  }

  // 任意文字列の中から、{{key}}という文字列を、{key:val}で置換する処理
  Common.prototype.double_blancket_convert = function(str , data){
    if(data){
      const reg = new RegExp('{{(.*?)}}','g')
      const arr = []
      let res = []
      while ((res = reg.exec(str)) !== null) {
        arr.push(res[1])
      }
      for(let key of arr){
        const val = typeof data[key] !== 'undefined' ? data[key] : ''
        str = str.split('{{'+String(key)+'}}').join(val)
      }
    }
    return str
  }

  window.Common = new Common

})()