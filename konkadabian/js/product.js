define(["jquery","jquery-cookie"],function($){
	function product(){
		$(function(){
			//页面加载完显示购物车数量
			sc_num();
			sc_msg();
			sum_price();
		//加载产品分类表格
			$.ajax({
				url:"../data/productlist.json",
				success:function(arr){
					for(var i = 0; i < arr[0].length; i++){
						var node1 = $(`<ul></ul>`);
						node1.appendTo(".listbox");
						for(var j = 0;j < arr[0][i].list.length; j++){
							var node2 = $(`<li><a href="">${arr[0][i].list[j]}</a></li>`);
							node2.appendTo(node1);
						}
					}
				},
				error:function(msg){
					alert("请求错误" + msg)
				}
			})
		//加载产品列表
			$.ajax({
				url:"../data/productlist.json",
				success:function(arr){
					for(var i = 0; i < arr[1].length; i++){
						var node1 = $(`<li>
							<a href="productDesc.html" id="${arr[1][i].id} class="pdt"><img src="${arr[1][i].img}" alt=""></a>
							<h4>${arr[1][i].title}</h4>
							<div>${arr[1][i].desc}</div>
							<p>${arr[1][i].price}</p>
							<div class='shop_car' ><a href="shoppingcar.html" class='join_car' id="${arr[1][i].id}">加入购物车</a><a href="">立即购买</a></div>
						</li>`);
						node1.appendTo(".product_list");
					}
				},
				error:function(msg){
					alert("请求错误" + msg)
				}
			}) 
		//给产品添加移入显示购物车和阴影音特效
			$(".product_list").on("mouseenter","li",function(){
				$(this).find(".shop_car").css("display","block").siblings("p").css("display","none")
				$(this).addClass("shadow")

			})

			$(".product_list").on("mouseleave",function(){
				$(this).find(".shop_car").css("display","none").siblings("p").css("display","block")
				$(".product_list").find("li").removeClass("shadow");
			})
		//添加到购物车功能
			$(".product_list").on("click",".join_car",function(){
				var id = this.id;
				console.log(id);
				//判断是否是第一次加入购物车
				var first = $.cookie("goods") == null ? true : false;
				if(first){
					//直接生成cookie
					$.cookie("goods",`[{"id":${id},"num":1}]`,{
						expires:7
					})
				}else{
					//判断之前是否添加过
					var same = false;//假设没有添加过
					var cookieStr = $.cookie("goods");
					if(cookieStr){
						var cookieArr = JSON.parse(cookieStr);
						console.log(cookieArr);
						for(var i = 0;i < cookieArr.length;i++){
							if(cookieArr[i].id == id){
								same = true;
								//之前添加过
								cookieArr[i].num++;
								break;
							}
						}
						//没添加过，新增一条记录
						if(!same){
							var obj ={id: id,num: 1};
							cookieArr.push(obj);
						}
						//将cookie重新存储回去
						$.cookie("goods",JSON.stringify(cookieArr),{
							expires:7
						})
					}
				}
				sc_num();
				sc_msg();
			})
			//封装计算商品数量的函数
			function sc_num(){
				var cookieStr = $.cookie("goods");
				if(cookieStr){
					var cookieArr = JSON.parse(cookieStr);
					var sum = 0;
					for(var i = 0;i < cookieArr.length;i++){
						sum += cookieArr[i].num;
					}
					//显示数据到购物车上面
					$(".shoppingcar").find("a").find("span").html(`购物车(${sum})`);
					$(".account h5").html(`已选择${sum}件商品,优惠后金额 ：`)
				}else{
					$(".shoppingcar a #car_num").html(`购物车(0)`)
				}
			}
			function sc_msg(){
				//清空购物车中之前的数据
				$("#cartcontainer").find(".goods_box").html("");
				//加载加入的数据
				$.ajax({
					type:"get",
					url:"../data/productlist.json",
					success:function(arr){
						var cookieStr = $.cookie("goods");
						
						if(cookieStr){
							var cookieArr = JSON.parse(cookieStr);
							var shopArr = [];
							for(var i = 0;i < arr[1].length;i++){
								for(var j = 0;j < cookieArr.length;j++){
									if(cookieArr[j].id == arr[1][i].id){
										arr[1][i].num = cookieArr[j].num;
										shopArr.push(arr[1][i]);
									}
								}
							}
							//通过查找到的新数组，将数据加载到页面上
							for(var i = 0;i < shopArr.length;i++){
								var node = $(`<div class="goods">
									<h3><input type="checkbox"></h3>
									<div class="img">
										<img src="${shopArr[i].img}" alt="">
									</div>
									<div class="good_infor">
										<p>${shopArr[i].title}</p>
										<p>65A10</p>
										<p>${shopArr[i].desc}</p>
									</div>
									<p class="good_price">${shopArr[i].price}</p>
									<div class="btn_good">
										<button id = "${shopArr[i].id}">-</button>
										<a>${shopArr[i].num}</a>
										<button id="${shopArr[i].id}">+</button>
									</div>
									<p class="sum_price">￥${parseInt(shopArr[i].price.substring(1))* shopArr[i].num}</p>
									<p id="del"><a id = "${shopArr[i].id}">删除</a></p>
								</div>`);
								node.appendTo(".shop_body .goods_box");
							}
						}
						
						
					},
					error:function(msg){
						alert("数据请求错误：" + msg)
					}
				})	
			}
			
			//增加+、——功能
			$(".goods_box").on('click',".goods button",function(){
				var id = this.id;
				//取出数据
				var cookieStr = $.cookie("goods");
				var cookieArr = JSON.parse(cookieStr);
				var obj = cookieArr.find(item => item.id == id);
				if($(this).html() == "+"){
					obj.num++;
				}else{
					if(obj.num==1){
						alert("商品不能再减了")
					}else{
						obj.num--;
					}
				}
				//更改显示的内容
				$(this).siblings("a").html(obj.num);
				//把数据插入回去
				$.cookie("goods",JSON.stringify(cookieArr),{
					expires:7
				})

				//修改购物车价格的函数
				var str_price = $(this).closest(".btn_good").siblings(".good_price").html();
				var str = parseInt(str_price.substring(1)) * obj.num;
				$(this).closest(".btn_good").siblings(".sum_price").html("￥" + str);

				//修改购物车显示的数据
				sc_num();
				sum_price();

			})

			//删除功能的实现
			$(".goods_box").on('click',".goods #del a",function(){
				var id = this.id;
				console.log(id);
				//cookie中删除，页面中删除
				var cookieStr = $.cookie("goods");
				var cookieArr = JSON.parse(cookieStr);
				for(var i = 0; i < cookieArr.length;i++){
					if(cookieArr[i].id == id){
						cookieArr.splice(i,1);//删掉一个元素
						break;
					}
				}
				if(!cookieArr.length){
					$.cookie("goods", null);
				}else{
					$.cookie("goods", JSON.stringify(cookieArr),{
						expires: 7
					})
				}
				//将页面上的商品的节点删除
				$(this).closest(".goods").remove();
				sc_num();
				sum_price();
			})

			//计算总价：
			function sum_price(){
				//先清除原来的数据
				$(".account").find("strong").html("");
					$.ajax({
						type:"get",
						url:"../data/productlist.json",
						success:function(arr){
							var cookieStr = $.cookie("goods");
							var sum_price = 0; 
							if(cookieStr){
								var cookieArr = JSON.parse(cookieStr);
								var shopArr = [];
								for(var i = 0;i < arr[1].length;i++){
									for(var j = 0;j < cookieArr.length;j++){
										if(cookieArr[j].id == arr[1][i].id){
											arr[1][i].num = cookieArr[j].num;
											shopArr.push(arr[1][i]);
										}
									}
								}
								for(var i = 0; i < shopArr.length;i++){
									//总价
									var danjia = parseInt(shopArr[i].price.substring(1))
									sum_price += (danjia * shopArr[i].num);
								}
								$(".account").find("strong").html(sum_price + "元");	
							}
								$(".account").find("strong").html(sum_price + "元");	

						}
					})
					
			}

			//商品详情页商品加入购物车
			$(".text_box").find(".insert").click(function(){
				var id = this.id;
				console.log(id);
				//判断是否是第一次加入购物车
				var first = $.cookie("goods") == null ? true : false;
				if(first){
					//直接生成cookie
					$.cookie("goods",`[{"id":${id},"num":1}]`,{
						expires:7
					})
				}else{
					//判断之前是否添加过
					var same = false;//假设没有添加过
					var cookieStr = $.cookie("goods");
					if(cookieStr){
						var cookieArr = JSON.parse(cookieStr);
						console.log(cookieArr);
						for(var i = 0;i < cookieArr.length;i++){
							if(cookieArr[i].id == id){
								same = true;
								//之前添加过
								cookieArr[i].num++;
								break;
							}
						}
						//没添加过，新增一条记录
						if(!same){
							var obj ={id: id,num: 1};
							cookieArr.push(obj);
						}
						//将cookie重新存储回去
						$.cookie("goods",JSON.stringify(cookieArr),{
							expires:7
						})
					}
				}
				sc_num();
				sc_msg();
			})
			// 详情页面+- 功能的实现
			$(".count").on('click',"button",function(){
				var id = this.id;
				//取出数据
				var cookieStr = $.cookie("goods");
				var cookieArr = JSON.parse(cookieStr);
				var obj = cookieArr.find(item => item.id == id);
				if($(this).html() == "+"){
					obj.num++;
				}else{
					if(obj.num==1){
						alert("商品不能再减了")
					}else{
						obj.num--;
					}
				}
				//更改显示的内容
				$(this).siblings("span").html(obj.num);
				//把数据插入回去
				$.cookie("goods",JSON.stringify(cookieArr),{
					expires:7
				})

				//修改购物车价格的函数
				var str_price = $(this).closest(".btn_good").siblings(".good_price").html();
				var str = parseInt(str_price.substring(1)) * obj.num;
				$(this).closest(".btn_good").siblings(".sum_price").html("￥" + str);

				//修改购物车显示的数据
				sc_num();
				sum_price();

			})

		})

	}
	//前端注册登陆的验证
	function register(){
		$(function(){
			//用户名的验证
			$("form").find("input").focus(function(){
				$("#alert").css("display","none");
			})
			$("form").find("input").blur(function(){
				$("#alert").css("display","none");
			})
			if(!$("form").find("input").val()){
				$("#alert").css("display","none");
			}
			$("#username").blur(function(){
				//去空格
				var ovalue = $("#username").val();
				if (!ovalue){
					$("#alert").css("display","none");
				}
				$("#username").val(ovalue.replace(/\s/g,""));
				var ouservalue = $("#username").val();

				// 2.判断长度、开头是否是英文、是否是数字字母下划线
				if(ouservalue.length < 6 || ouservalue.length > 18){
					$("#alert").css("display","block");
					$("#alert_txt").html("!长度应为6-18个字符")
				}else if(/[^a-zA-Z]/.test(ouservalue[0])){
					$("#alert").css("display","block");
					$("#alert_txt").html("!须以英文字母开头")
				}else if(/\W/.test(ouservalue)){
					$("#alert").css("display","block");
					$("#alert_txt").html("!包含非法字符")
				}else{
					$("#alert").css("display","none");
				}
			})

			//密码验证
			$("#password").blur(function(){
				$("#alert").css({
					"top":144,
					right:130,
					"display":"block"
				});
				var ovalue = $("#password").val();
				if (!ovalue){
					$("#alert").css("display","none");
				}
				// 1.将空格删除
				$("#password").val(ovalue.replace(/\s/g,""));
				var opvalue = $("#password").val();
				if (!opvalue){
					$("#alert").css("display","none");
				}
				// 2.判断长度、是否数字字母下划线
				if(opvalue.length < 6 || opvalue.length > 16){
					$("#alert").css("display","block");
					$("#alert_txt").html("!长度应为6-18个字符")
				}else if(/\W/.test(opvalue)){
					$("#alert").css("display","block");
					$("#alert_txt").html("!包含非法字符")
				}else{
					$("#alert").css("display","none");
				}
			})
			//密码确认验证
			$("#repassword").blur(function(){
				$("#alert").css({
					"top":194,
					right:130,
					"display":"block"
				});
				// 1.将空格 删除
				var revalue = $("#repassword").val();
				repvalue = revalue.replace(/\s/,'')
				if (!repvalue){
					$("#alert").css("display","none");
				}
				// 2.验证与之前的密码是否相同
				if($("#password").val() != repvalue){
					$("#alert").css("display","block");
					$("#alert_txt").html("两次密码输入不一致")
				}else{
					$("#alert").css("display","none");
				}
			})
			//生成验证码
			function testCode(n){
				var arr = [];
				for(var i = 0; i < n; i++){
					var tmp = parseInt(Math.random() * 123);
					if(tmp >= 0 && tmp <= 9){
						arr.push(tmp);
					}else if(tmp >= 65 && tmp <= 90){
						//大写字母
						var charStr = String.fromCharCode(tmp);
						arr.push(charStr);
					}else if(tmp >= 97 && tmp <= 122){
						var charStr = String.fromCharCode(tmp);
						arr.push(charStr);
					}else{
						i--;
					}
				}
				return arr.join("");
		}
		// 验证码放入盒子中
		$("#code_box").html(testCode(4));
		$("#change").click(function(){
			$("#code_box").html(testCode(4));
		})	
		//判断验证码的正确与否
		$("#test_code").blur(function(){
			$("#alert").css({
				"top":244,
				right:130,
				"display":"block"
			});
			var otvalue = $("#test_code").val();
			var boxvalue = $("#code_box").html();

			if(otvalue.toLowerCase() != boxvalue.toLowerCase()){
					$("#alert").css("display","block");
					$("#alert_txt").html("验证码输入不正确")
			}else{
					$("#alert").css("display","none");
			}
		})
		// 后端验证
		$("#submit").click(function(){
			var obj ={
						username: $("#username").val(),
						password:$("#password").val(),
						repassword:$("#repassword").val()
					}
					alert(obj);
					console.log(obj);
			$.ajax({
				type:"get",
				url:"../php/register.php",
				data:obj,
				success:function(obj1){
					var obj = JSON.parse(obj1);
					if(!obj.code){
						$("#alert").css({
							"top":144,
							"right":130,
							"display":"block",
							"background-color":"#88DD4B"
						});
						$("#alert").find("h2").css("display","none");
						$("#alert_txt").css("background-color","#88DD4B");
						$("#alert_txt").html("恭喜注册成功，赶快登陆吧");


						// 注册成功，启动延时器跳转到登录页面
						setTimeout(function(){
							location.replace('login.html');
						},1000)

					}else{
						$("#alert").css({
							"top":144,
							"right":130,
							"display":"block",
							"background-color":"#88DD4B"
						});
						$("#alert_txt").html(obj.message);
					}
				},
				error:function(msg){
						console.log("数据加载失败" + msg)
				}
			})
		})
		//登录页面
		$(".submit").click(function(){
			var obj ={
						username: $("#username").val(),
						password:$("#password").val()
					}
			$.ajax({
				type:"get",
				url:"../php/register.php",
				data:obj,
				success:function(obj1){
					var obj = JSON.parse(obj1);
					if(!obj.code){
						$("#alert").css({
							"top":144,
							"right":130,
							"display":"block",
							"background-color":"#88DD4B"
						});
						$("#alert").find("h2").css("display","none");
						$("#alert_txt").css("background-color","#88DD4B");
						$(".alert_txt").html("登录成功");


						// 登录成功，启动延时器跳转到首页
						setTimeout(function(){
							location.replace('../html/index.html');
							console.log("111");
						},1000)

					}else{
						$("#alert").css({
							"top":144,
							"right":130,
							"display":"block",
							"background-color":"#88DD4B"
						});
						$(".alert_txt").html(obj.message);
					}
				},
				error:function(msg){
						console.log("数据加载失败" + msg)
				}
			})
		})

		})
	}

	return{
		product:product,
		register:register
	}
})
