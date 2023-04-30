001 : スタンダード管理画面
===
```
Create : 2023.03.29
Author : Yugeta.Koji
```

![banner](banner.png)

# Summary : 概要
- 管理画面サンプル


# Functions : 機能
- Responsive
  - 1000px以上 : PC画ビュー
  - 500px ~ 1000px : ミドルビュー(tablet)
  - 500px以下 : スマホビュー

- Badge
  - リストやアイコンなどの要素エリアに、data-badge='数値'を属性挿入すると、その項目の左上に赤丸のバッジが表示されます。
  - 数値はバッジナンバーに反映されます。
  - ブランクまたは未登録の場合は、表示されません。
  - 0の数値を入れると、0バッジが表示されます。

- メニュー
  - ヘッダメニュー : アイコン表示のみ
  - サイドメニュー : アイコン + 文字表示

- ハンバーガーメニュー
  - スマホビューのサイドメニューが、左からスライドインします。

- フッタ
  - サイドメニューまたは、画面最下部に表示されます。

# Page sample
- Dashboard (index)
  - 

# Caution
- コンテンツファイル、"page/[%page-name]/index.html"が存在しないと、ページエラーになるので、必ずファイルを設置する。

# Howto

1. /.gitフォルダを削除してお使い下さい。

2. Google OAuth認証をする場合の設定ファイルを設置
- data/login.json
```
{
  "cache_name" : "mynt_auth",    // localStorageの保存用key値
  "client_id"  : "***",          // GoogleOAuth2の、client-idを登録
  "parent_id"  : "google_login", // ログインボタンを表示する要素のID
  "user_id"    : "google_icon"   // ログインをした時のユーザーアイコン表示要素のID
}
```

3. ヘッダメニュー
- 編集ファイル : asset/header.html
- DOM構成 : header / nav / div.menu / *
  - aタグ : 内部に画像(img , svg)を設置することで、アイコンリンクの設置。
  - divタグ : 内部に ul/li構造で、プルダウンメニューを作ることが可能

4. サイドメニュー
- 編集ファイル : asset/menu.html
- DOM構成 : menu / nav / ul / li / a / 
  - svg（アイコン）
  - span（名称）
  - ul サブメニューを登録できる。

5. 属性仕様
- data-unlogin : 未ログイン状態の時のみ表示する。（値不要）
- data-logined : ログイン済み状態の時のみ表示する。（値不要）

6. コンテンツメニュー
- 編集ファイル : page/コンテンツ（ページ）name/index.html
- DOM構成 : main / 
- index.html内に、cssやscriptのタグを貼り付けて、処理を実行することができる。
- js仕様 : ページonload仕様 : onloadではフレームワークのmain関数が起動するだけなので、以下のように処理をする。
```
if(window.Main && window.Main.flg_loaded){
  %関数起動
}
else if(window.loaded_callbacks === null){
  %関数起動
}
else{
  window.loaded_callbacks.push((()=>{
    %関数起動
  }))
}
```
