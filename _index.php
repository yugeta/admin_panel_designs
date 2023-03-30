<?php 
  require 'php/main.php';
  $main = new Main();
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <link rel='stylesheet' href='css/style.css'>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <link rel="shortcut icon" type="image/svg+xml" href="favicon.svg">
  <title><?php $main->get_title(); ?></title>
  <script src="js/main.js"></script>
</head>
<body>
  <div class='logo'>
    <img src='favicon.svg'/>
    <span class='title'>管理画面</span>
  </div>
  <header><?php $main->view_asset('common/header.html');?></header>
  <menu><?php $main->view_asset('common/menu.html');?></menu>
  <main><?php $main->view_page();?></main>
  <footer><?php $main->view_asset('common/footer.html');?></footer>
</body>
</html>
