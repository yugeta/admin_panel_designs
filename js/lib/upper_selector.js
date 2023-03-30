(()=>{
  'use strict'

  window.UpperSelector = function(elm , selectors){
    if(!selectors){return}
    selectors = typeof selectors === "object" ? selectors : [selectors]
    if(!elm || !selectors){return}
    let cur, flg = null
    for(let i=0; i<selectors.length; i++){
      if(!selectors[i]){continue}
      for(cur=elm; cur; cur=cur.parentElement) {
        if(!cur.matches(selectors[i])){continue}
        flg = true
        break
      }
      if(flg){break}
    }
    return cur
  }
})()