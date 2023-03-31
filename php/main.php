<?php
class Main{
  public static $options = [
    'languages'  => ['ja' , 'en'],
    'language'   => null,
    'pagename'   => null,
    'asset_path' => 'asset/',
  ];

  function __construct(){
     self::set_language();
     self::set_pagename();
  }

  public static function set_language(){
    $cookie_json = isset($_COOKIE['nanoHub_data']) ? $_COOKIE['nanoHub_data'] : '{}';
    $cookie_data = json_decode($cookie_json , true);
    self::$options['language'] = isset($cookie_data['language']) ? $cookie_data['language'] : 'japanese';
  }

  public static function get_language(){
    return self::$options['language'];
  }

  public static function set_pagename(){
    self::$options['pagename'] = @$_GET['p'] ? $_GET['p'] : 'index';
  }
  public static function get_pagename(){
    return self::$options['pagename'];
  }

  public static function get_title(){
    $add = '';
    switch(@$_GET['p']){
      case 'about':
        $add = ' : このサイトについて';
        break;
      case 'contact':
        $add = ' : お問合せ';
        break;
      case 'work':
        $add = ' : お仕事内容';
        break;
    }
    return 'カンタンWEB' . $add;
  }

  // partsファイルの読み込み
  public static function get_asset($filename=''){
    if(!$filename){return;}
    $path = self::$options['asset_path'] . $filename;
    return self::get_file($path);
  }

  // 対象pageの読み込み
  public static function get_page(){
    return self::get_asset('page/'. self::get_pagename() .'.html');
    // $path = 'asset/page/'. self::get_pagename() .'.html';
    // return self::get_file($path);
  }

  // cssの読み込み
  public static function get_tag_css(){
    $path = 'css/'. self::get_pagename() .'.css';
    if(!is_file($path)){return;}
    return "<link data-module='mynt' rel='stylesheet' href='$path?".date('YmdHis')."'>".PHP_EOL;
  }

  // jsの読み込み
  public static function get_tag_js(){
    $path = 'js/page/'. self::get_pagename() .'.js';
    if(!is_file($path)){return;}
    return "<script data-module='mynt' src='$path?".date('YmdHis')."'></script>".PHP_EOL;
  }

  // 任意ファイルパスの読み込み
  public static function get_file($path=''){
    if(!$path || !is_file($path)){return;}
    return file_get_contents($path);
  }

  public static function view_asset($file){
    echo self::get_asset($file);
  }
  public static function view_page(){
    echo self::get_page();
  }

}