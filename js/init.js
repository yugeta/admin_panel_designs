import { Main } from './main.js'
import { Urlinfo }   from './lib/urlinfo.js'

import { Asset }     from './asset.js'

export class Init{
  constructor(options){
    this.options = options || {}
    return new Promise(resolve => {
      this.resolve = resolve
      this.count = 0
      this.load_assets()
    })
  }

  get urlinfo(){
    return new Urlinfo()
  }

  get page_name(){
    return this.urlinfo.queries.p || 'index'
  }

  get assets(){
    return this.options.assets || []
  }

  load_assets(){
    for(const asset_data of this.assets){
      asset_data.file     = asset_data.file.replace('{{page_name}}' , this.page_name)
      asset_data.callback = this.loaded.bind(this)
      new Asset(asset_data)
    }
  }

  loaded(){
    this.count++
    if(this.count < this.assets.length){return}
    this.finish()
  }

  finish(){
    if(this.resolve){
      this.resolve(this)
    }
  }
}