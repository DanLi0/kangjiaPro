<?php 
	header('content-type:text/html;charset="utf-8"');
	//跟后台约定好一个统一返回的格式
	$responseState = array("code" => 0, "message" => "");

	/*
		获取post提交过来的数据
	*/
	$username = $_GET["username"];
	$password = $_GET["password"];
	$repassword = $_GET["repassword"];

	/*
		两次输入的密码必须一致
	*/
	if($password != $repassword){
		$responseState["code"] = 1;
		$responseState["message"] = "两次密码输入不一致";
		echo json_encode($responseState);
		exit; //退出程序
	}

	$link = mysql_connect("localhost", "root", "123456");

	if(!$link){
		$responseState["code"] = 2;
		$responseState["message"] = "数据库链接失败";
		echo json_encode($responseState);
		exit; //退出程序
	}

	mysql_set_charset("utf8");

	mysql_select_db("qd1903");

	/*
		用户名不能重复
	*/

	$sql = "SELECT * FROM students WHERE username='{$username}'";

	$res = mysql_query($sql);
	
	$row = mysql_fetch_assoc($res);
	if($row){
		$responseState["code"] = 3;
		$responseState["message"] = "用户名已存在";
		echo json_encode($responseState);
		exit; //退出程序
	}
	//密码要加密去存储
	$password = md5(md5(md5($password)."qian").'feng');

	//准备sql进行注册
	$sql = "INSERT INTO students (username,password) VALUES('{$username}','{$password}')";

	$res = mysql_query($sql);

	//判断是否插入成功
	if($res){
		$responseState["message"] = "注册成功";
		echo json_encode($responseState);
	}else{
		$responseState["code"] = 4;
		$responseState["message"] = "注册失败";
		echo json_encode($responseState);
	}

	mysql_close($link);


 ?>