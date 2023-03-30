(function(){
  function Main(){
    this.data_load()
  }
  Main.prototype.data_load = function(){
    new Ajax({
      url : 'data/tutorial.json',
      method : 'get',
      success : this.data_loaded.bind(this)
    })
  }
  Main.prototype.data_loaded = function(res){
    const json = res.target.response
    const datas = JSON.parse(json)
    this.view_lists(datas)
  }
  Main.prototype.view_lists = function(datas){
    for(let data of datas){
      this.view_list(data)
    }
  }
  Main.prototype.view_list = function(data){
    const template = this.get_template('tutorial-list-item')
    const list_root = this.get_list_root()
    const html = Common.double_blancket_convert(template , data)
    list_root.insertAdjacentHTML('beforeend' , html)
  }
  Main.prototype.get_template = function(name){
    if(!name){return}
    const elm = document.querySelector(`.template [data-name='${name}']`)
    if(elm.tagName === 'TEXTAREA'){
      return elm.value
    }
    else{
      return elm.innerHTML
    }
  }
  Main.prototype.get_list_root = function(){
    return document.querySelector('main .lists > ul')
  }

  new Main()
})()