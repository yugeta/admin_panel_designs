import { GoogleOAuth2 } from './lib/google_oauth2.js'

export class Login{
  constructor(){
    this.load_setting()
    this.set_logout_event()
  }

  get setting_file(){
    return 'data/login.json'
  }
  get target_element(){
    return this.setting_data && this.setting_data.parent_id ? document.getElementById(this.setting_data.parent_id) : null
  }
  get icon_element(){
    return this.setting_data && this.setting_data.user_id ? document.getElementById(this.setting_data.user_id) : null
  }
  get is_logined(){
    return this.load_cache() ? true : false
  }
  get get_google_url(){
    return 'https://accounts.google.com/gsi/client'
  }
  get head(){
    return document.querySelector('head')
  }

  load_setting(){
    const xhr = new XMLHttpRequest()
    xhr.open('get' , this.setting_file , true)
    xhr.setRequestHeader('Content-Type', 'text/html');
    xhr.onreadystatechange = (e => {
      if(xhr.readyState !== XMLHttpRequest.DONE){return}
      const status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        this.loaded(e)
      }
      else {
        this.loaded(e)
      }
    }).bind(this)
    xhr.send()
  }

  loaded(e){
    if(!e || !e.target || !e.target.response){return}
    this.setting_data = JSON.parse(e.target.response)
    this.root_flg()
    this.set_google_oauth()
  }

  root_flg(){
    if(!document.body){return}
    switch(this.is_logined){
      case true:
        document.body.setAttribute('data-auth','logined')
        break
      case false:
        document.body.setAttribute('data-auth','')
        break
    }
  }

  set_google_oauth(){
    const script  = document.createElement('script')
    script.src    = this.get_google_url
    script.async  = true
    script.defer  = true
    script.onload = this.loaded_google_oauth.bind(this)
    this.head.appendChild(script)
  }
  loaded_google_oauth(){
    switch(this.is_logined){
      // logout
      case true:
        this.google_login_icon_view()
        break

      // login
      case false:
      default:
        this.google_login_view()
        break
    }
  }

  google_login_icon_view(){
    const elm = this.icon_element
    if(!elm){return}
    const data = this.load_cache()
    if(!data || !data.picture){return}
    const img = new Image()
    img.src = data.picture
    elm.innerHTML = ''
    elm.appendChild(img)
  }

  google_login_view(){
    google.accounts.id.initialize({
      prompt_parent_id      : this.setting_data.parent_id,
      client_id             : this.setting_data.client_id,
      prompt_close_button   : false,
      callback              : this.callback_google_oauth.bind(this),
    })
    google.accounts.id.renderButton(document.getElementById(this.setting_data.parent_id) , {
      logo_alignment : 'center',
      size           : 'large',
    })
  }
  callback_google_oauth(e){
    const data = this.jwt_decode(e.credential)
    this.save_cache(data)
    this.root_flg()
    this.google_login_icon_view()
    // location.href = './'
  }

  load_cache(){
    const str = window.localStorage.getItem(this.setting_data.cache_name)
    if(!str){return null}
    return JSON.parse(decodeURIComponent(window.atob(str)))
  }

  save_cache(data){
    const str = window.btoa(encodeURIComponent(JSON.stringify(data)))
    window.localStorage.setItem(this.setting_data.cache_name , str)
  }

  remove_cache(){
    window.localStorage.removeItem(this.setting_data.cache_name)
  }

  jwt_decode(jwt){
    const base64Url = jwt.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const str1 = atob(base64)
    const str2 = escape(str1)
    const str3 = decodeURIComponent(str2)
    return JSON.parse(str3)
  }

  set_logout_event(){
    const elms = document.querySelectorAll('.logout')
    if(!elms.length){return}
    for(const elm of elms){
      elm.onclick = this.click_logout.bind(this)
    }
  }

  click_logout(e){
    this.remove_cache()
    this.root_flg()
    this.google_login_view()
    return false
  }

}