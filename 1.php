<?php
$keyword = $_POST['keyword'];
if($keyword=="你好") {
	$data['res'] = "hello";
}
if($keyword=="世界") {$data['res'] = "world";}
$a = array('isOk'=>1,'data'=>$data);
echo json_encode($a);
exit();
?>