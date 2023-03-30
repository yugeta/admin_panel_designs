<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once 'php/message.php';

if(!isset($_POST['mode']) || !$_POST['mode']
|| !isset($_POST['type']) || !$_POST['type']){
  Message::error_json_exit(['message'=>'no query.']);
}

$path = 'php/'. $_POST['type'] .'.php';
$upperType = ucfirst($_POST['type']);
if(is_file($path)){
  require_once $path;
  if($_POST['mode'] !== 'mode' && method_exists($upperType , $_POST['mode'])){
    call_user_func_array([$upperType , $_POST['mode']] , [$_POST]);
  }
  else{
    Message::error_json_exit(['message'=>'no user function. '. $upperType.'::'.$_POST['mode'] .'()']);
  }
}
else{
  Message::error_json_exit(['message'=>'no module.']);
}
