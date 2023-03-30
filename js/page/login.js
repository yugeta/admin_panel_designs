/**
 * Google OAuth2 認証
 * 詳細 : https://developers.google.com/identity/protocols/oauth2
 * javascript-module : https://github.com/google/google-api-javascript-client
 * 1. Google Cloud Platformの登録と以下の発行
 * - API KEY
 * - OAuthクライアントID
 * - Googleアカウントのユーザー名も取得するため「People」APIを有効にする
 * 2. 
 * 
 */


// <script src=https://apis.google.com/js/client.js?onload=hoge></script>
// <script>
// function hoge(){
//   //この関数が実行されます。
// }
// </script>



(function(d){
  const s = d.createElement('script')
  s.onload = google_oauth
  // s.src = 'https://apis.google.com/js/client.js?onload=google_oauth'
  s.src = 'https://apis.google.com/js/client.js'
  d.querySelector('head').appendChild(s)
})(document)

function google_oauth(e){
  console.log(gapi)
  const client_secret = 'test-236222'
  gapi.auth2.init(client_secret)
  // gapi.client.setApiKey(client_secret);
  // //認証を行います。setTimoutしているのは認証中にブラウザが待ち状態になってしまうのを防ぐため。
  // setTimeout(function(){
  //   gapi.auth.authorize({client_id: client_id, scope: scope, immediate: true}, handleAuthResult);
  // },1);
}

// (function(){

//   const setting = {
//     redirect : {
//       success : 'room.html',
//       error   : '',
//     },
//   }

//   function Main(){
//     this.setEvent()
//   }

//   Main.prototype.setEvent = function(){
//     document.querySelector('.login-submit button').addEventListener('click' , this.clickSubmitButton.bind(this))
//   }

//   Main.prototype.clickSubmitButton = function(){
//     const urlinfo = this.urlinfo(location.href)
//     const data = {
//       type : 'user',
//       mode : 'check_login',
//       mail : document.querySelector('input[name="mail"]').value,
//       pass : document.querySelector('input[name="pass"]').value,
//     }
//     const query = Object.entries(data).map((e)=>`${e[0]}=${e[1]}`).join('&')
//     const xhr = new XMLHttpRequest();
//     xhr.open('post', urlinfo.dir +'api.php' , true)
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
//     xhr.onload = this.checkPassword.bind(this)
//     xhr.send(query)
//     this.error('')
//   }

//   Main.prototype.checkPassword = function(res){
//     if(!res || !res.target || !res.target.response){return}
//     const data = JSON.parse(res.target.response)
//     if(!data.status || data.status !== 'success'){
//       this.error(data.data.message);
//       return
//     }
//     this.session = $$session.set_data(data.data)
//     location.href = setting.redirect.success
//   }

//   Main.prototype.error = function(message){
//     const elm = document.querySelector('.error')
//     elm.innerHTML = message
//   }

//   Main.prototype.urlinfo = function(url){
//     if(!url){return null}
//     const sp1 = url.split("#")
//     const sp2 = sp1[0].split("?")
//     const sp3 = sp2[0].split('/')
//     const dir = sp3.slice(0,sp3.length-1).join('/') +'/'
//     return {
//       dir   : dir,
//       url   : sp2[0],
//       query : (function(q){
//         if(!q){return null}
//         const sp = q.split("&")
//         let arr = {}
//         if(sp && sp.length){
//           for(let item of sp){
//             let q1 = item.split("=")
//             arr[q1[0]] = q1[1] || null
//           }
//         }
//         return arr
//       })(sp2[1]),
//       hash : sp1[1] || null
//     }
//   }


//   // ページ読み込み後に起動
//   switch(document.readyState){
//     case "complete":
//       new Main()
//       break
//     default:
//       window.addEventListener("load" , (function(){new Main()}))
//       break
//   }
// })()