(()=>{
  'use strict'

  // 初期設定データ
  const Options = {
    version : '1.0.0',
    current_script_selector : `head > script[src='js/main.js']`,
    current_script_info  : null,
    root_dir : null,
    load_files : [
      'lib/ajax.js',
      'lib/common.js',
      'lib/load_asset.js',
      'lib/urlinfo.js',
      'lib/convert.js',
    ],
    // setting_file : 'data/setting.json',
    loaded_files : [],
    head_tag : null,
    asset_name : null,
    header : true,
    menu   : true,
    main   : true,
    footer : true,
    title  : '--',
  }

  // 共通ライブラリの自動読み込み（全てのモジュール読み込みが完了した後callbackでMainを起動）
  function Autoload(){
    const files = Options.load_files
    if(!files || !files.length){return}
    Options.current_script_info = this.get_tag_current_script()
    Options.root_dir = this.get_root_dir()
    if(!Options.current_script_info){return}
    Options.head_tag = this.get_tag_head()
    for(let file of files){
      switch(file.split('.').pop()){
        case 'js':
          this.load_script(file)
          break
      }
    }
  }

  Autoload.prototype.get_root_dir = function(){
    const scripts = document.querySelectorAll('script')
    if(!scripts || !scripts.length){return}
    for(let i=scripts.length-1; i>=0; i--){
      if(!scripts[i].matches(Options.current_script_selector)){continue}
      const src = scripts[i].getAttribute('src')
      return src.split('?')[0].replace(/js\/main\.js$/ , '')
    }
  }
  Autoload.prototype.get_tag_current_script = function(){
    const scripts = document.querySelectorAll('script')
    if(!scripts || !scripts.length){return}
    for(let i=scripts.length-1; i>=0; i--){
      if(!scripts[i].matches(Options.current_script_selector)){continue}
      const src = scripts[i].getAttribute('src')
      const dir = src.split('?')[0].replace(/main\.js$/ , '')
      return {
        elm : scripts[i],
        src : src,
        dir : dir,
      }
    }
  }
  Autoload.prototype.get_tag_head = function(){
    return document.querySelector('head')
  }

  Autoload.prototype.load_script = function(file){
    const script = document.createElement('script')
    script.src = `${Options.current_script_info.dir}${file}?${Options.version}`
    script.onload = this.loaded.bind(this , file)
    Options.head_tag.appendChild(script)
  }

  Autoload.prototype.loaded = function(name){
    if(!name){return}
    Options.loaded_files.push(name)
    if(Options.loaded_files.length < Options.load_files.length){return}
    this.callback()
  }
  Autoload.prototype.callback = function(){
    // ページ読み込み確認をして起動
    switch(document.readyState){
      case 'complete':
      case 'interactive':
        window.Main = new Main()
        break
      default:
        window.addEventListener("load", (function(){window.Main = new Main()}))
        break
    }
  }

  /**
   * Main
   */
  function Main(){
    this.options = Options
    this.init()
    this.check_env()
    this.load_setting()
    
  }
  Main.prototype.init = function(){
    Options.title = document.title
  }

  Main.prototype.load_setting = function(){
    if(Options.setting_file){
      new Ajax({
        url     : `${Options.root_dir}${Options.setting_file}?${Options.version}`,
        method  : 'get',
        success : ((e)=>{
          this.settings = JSON.parse(e.target.response)
          this.start()
        }).bind(this)
      })
    }
    else{
      this.settings = Options
      this.start()
    }
  }

  Main.prototype.start = function(){
    this.load_modules()
    this.load_assset()
    // this.set_page_active()
  }

  // 開発環境判定 : urlがlocalhostでアクセスしている場合は開発環境とする（モジュールキャッシュを無くす）
  Main.prototype.check_env = function(){
    const urlinfo = new UrlInfo()
    if(urlinfo.domain === 'localhost'){
      Options.version = (+ new Date())
    }
  }

  // script + link
  Main.prototype.load_modules = function(){
    const elm_js = document.querySelector(`script[data-module='mynt']`)
    if(!elm_js){
      Options.asset_name = this.get_asset_name()
      const script = document.createElement('script')
      script.setAttribute('data-module' , 'mynt')
      script.src = `js/page/${Options.asset_name}.js?${Options.version}`
      Options.head_tag.appendChild(script)
    }
    const elm_css = document.querySelector(`link[data-module='mynt']`)
    if(!elm_css){
      const link = document.createElement('link')
      link.setAttribute('data-module' , 'mynt')
      link.rel = 'stylesheet'
      link.href = `css/${Options.asset_name}.css?${Options.version}`
      Options.head_tag.appendChild(link)
    }
  }

  Main.prototype.get_asset_name = function(){
    const urlinfo = new UrlInfo()
    if(urlinfo.query && urlinfo.query.p){
      return urlinfo.query.p
    }
    else if(urlinfo.filename){
      return urlinfo.filename
    }
    else{
      return 'index'
    }
  }
  Main.prototype.load_assset = function(){
    let loadd_count = 0
    this.check_load_lists = []
    if(Options.header){
      loadd_count++
      const path = 'common/header.html'
      this.check_load_lists.push(path)
      const la = new LoadAsset({
        path     : path ,
        selector :  'header' ,
        callback : this.loaded_asset.bind(this),
      })
      if(la.status !== null){

      }
    }
    if(Options.footer){
      loadd_count++
      const path = 'common/footer.html'
      this.check_load_lists.push(path)
      new LoadAsset({
        path     : path , 
        selector : 'footer' , 
        callback : this.loaded_asset.bind(this),
      })
    }
    if(Options.menu){
      loadd_count++
      const path ='common/menu.html'
      this.check_load_lists.push(path)
      new LoadAsset({
        path     :  path, 
        selector : 'menu' , 
        callback : this.loaded_asset.bind(this),
      })
    }
    if(Options.main){
      loadd_count++
      const path = `page/${Options.asset_name}.html`
      new LoadAsset({
        path     : path  ,
        selector : 'main',
      })
    }
    if(!loadd_count){
      this.loaded()
    }
  }
  Main.prototype.loaded_asset = function(res){
    const index = this.check_load_lists.findIndex(e => e === res.options.path)
    this.check_load_lists.splice(index,1)
    if(this.check_load_lists.length){return}
    this.loaded()
  }

  Main.prototype.loaded = function(){
    this.set_page_active()
  }

  Main.prototype.set_page_active = function(){
    const urlinfo = new UrlInfo()
    const current_p = urlinfo.query.p
    const side_menus = document.querySelectorAll('menu > a')
    const head_menus = document.querySelectorAll('header .menu > a')
    const menus = [...side_menus , ...head_menus]
    for(const menu of menus){
      const menu_urlinfo = new UrlInfo(menu.href)
      if(current_p === menu_urlinfo.query.p){
        menu.setAttribute('data-status' , 'active')
      }
    }
  }

  // 実行
  new Autoload()
})()
