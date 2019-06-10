define(["jquery"],function($){
	//建立一个选项卡模块
	function toptab(){
		$(function(){
			//动态加载顶部的选项卡
			$.ajax({
				url: "../data/dataTab.json",
				success:function(arr){
					//通过循环，将数据加载到页面上
					for(var i = 0; i < arr[3].length;i++){
						var node1 = $(`<ul></ul>`);
						node1.appendTo(".nav_contain");

						//第二次循环加载ul里面的li
						for(var j = 0;j < arr[3][i].length;j++){
							var node2 = $(`<li>
							<h3><a href=""><img src="${arr[3][i][j].img}" alt=""></a></h3>
							<p>${arr[3][i][j].title}</p>
							<p>${arr[3][i][j].desc}</p>
							<h4>${arr[3][i][j].price}</h4>
						</li>`)
							node2.appendTo(node1);
						}
					}
				},
				error:function(msg){
					alert("请求错误" + msg)
				}
			})
			/*顶部选项卡功能实现*/
			$(".nav_contain").find("a").mouseover(function(){
				//取消按钮所有样式
				$(this).css("background-color", '#fff').siblings("a").css("backgroundColor", "#f7f7f7");

				
				if($(this).index() == 0 || $(this).index() == 1 ){
					$(".nav_contain").find('ul').eq($(this).index()-2).css("display", 'none')
				}else{
					$(".nav_contain").find('ul').eq($(this).index()-2).css("display", 'block')
					.siblings("ul").css("display","none");
				}
				//划入选项卡也显示
				$(".nav_contain").find("ul").eq($(this).index()-2).mouseover(function(){
					$(this).css("display",'block')
				})
				$(".nav_contain").find("ul").eq($(this).index()-2).mouseout(function(){
					$(this).css("display",'none');

				})	

			})

			$(".nav_contain").find("a").mouseout(function(){
				$(".nav_contain").find('ul').prevAll("a").css("backgroundColor", '#f7f7f7');
				$(".nav_contain").find('ul').css("display", 'none');

			})
			// 脚部上部数据
			$.ajax({
				url:"../data/dataFoot.json",
				success:function(arr){
					for(var i = 0;i < arr[0].length;i++){
						$(`<li>
						<div><img src="${arr[0][i].img}" alt=""></div>
						<div><h4>${arr[0][i].title}</h4><p>${arr[0][i].desc}</p></div>
						</li>`).appendTo(".foot_box .footer")
					}
				},
				error:function(msg){
					alert("请求错误" + msg)
				}
			})
			//脚部下部分数据
			$.ajax({
				url:"../data/dataFoot.json",
				success:function(arr){
					for(var i = 0;i < arr[1].length;i++){
						var node1 = $(`<ul></ul>`);
						node1.appendTo(".foot_box .foot_list");

						for(var j = 0;j < arr[1][i].length;j++){
							var node2 = $(`<li><a href="">${arr[1][i][j]}</li>`);
								node2.appendTo(node1);
							/*for(var k = 0;k < arr[1][i][j][k].length;j++){
								var node3 = $(`<a href="">${arr[1][i][j][k]}</a>`);
								node3.appendTo(node2);
							}*/
						}
					}
				},
				error:function(msg){
					alert("请求错误" + msg)
				}
			})
		})
	}
	//建立index模块
	function banner(){

		$(function(){
			//动态加载轮播图
			$.ajax({
				url:"../data/dataBanner.json",
				success:function(arr){
					//通过循环，将数据加载到页面上
					for(var i = 0; i < arr.length;i++){
						$(
							`<li><a href=""><img src="${arr[i].img}" alt=""></a></li>
							`
						).appendTo(".bannerbox ul")
					}
				},
				error:function(msg){
					alert("请求错误" + msg)
				}

			})
			//轮播图效果
			var obtns = $(".bannerbox").find("ol").find("li");
			var oul = $(".bannerbox").find("ul");
			var ulis = oul.find("li");
			//设置当前点击的按钮的下标，应该和图片的下标
			var inow = 0;

			obtns.click(function(){
				inow = $(this).index();
				tab();	
			})

			//编写切换图片的函数
			function tab(){
				obtns.attr("class",'').eq(inow).attr("class",'active');
				if(inow == obtns.size()){
					obtns.eq(0).attr("class",'active');
				}

				oul.stop().animate({
					left: -inow *  100  + "%"
				},function(){
					if(inow == obtns.size()){
						oul.css("left", 0 );
						inow = 0;
					}
				})
			}

			//启动定时器，轮播图自己滚动
			var timer = setInterval(function(){
				inow++;
				tab();

			},4000)

			$("ul").mouseenter(function(){
				clearInterval(timer);
			})

			$("ul").mouseleave(function(){
				timer = setInterval(function(){
					inow++;
					tab();
				},3000)
			})

			//动态加载侧边栏的子菜单
			$.ajax({
				url:"../data/dataTab.json",
				success:function(arr){
					//循环，数据加载侧边栏的子菜单1
					for(var i = 0;i < arr[0].length;i++){
						$(`<li><img src="${arr[0][i].img}" alt=""><span>${arr[0][i].title}</span></li>`)
						.appendTo(".side_menu .child1_list")
					}
					//循环，数据加载侧边栏的子菜单2
					for(var i = 0;i < arr[1].length;i++){
						$(`<li><img src="${arr[1][i].img}" alt=""><span>${arr[1][i].title}</span></li>`)
						.appendTo(".side_menu .child2_list")
					}
					//循环，数据加载侧边栏下面的广告图片
					for(var i = 0;i < arr[2].length;i++){
						$(`<div><a href=""><img src="${arr[2][i].img}" alt=""></a></div>`)
						.appendTo(".advertize")
					}
				},
				error:function(msg){
					alert("请求错误" + msg)
				}
			})

			//选项卡
				$(".list").find('li').mouseover(function(){
					//取消按钮所有样式
					$(".list").find('li').attr("background-color", "#333333");
					$(".list").siblings('ul').css("display", 'none')
					.eq($(this).index()).css("display", 'block');
					//划入选项卡也显示
					$(".list").siblings('ul').eq($(this).index()).mouseover(function(){
						$(this).css("display",'block')
					}).mouseout(function(){
						$(this).css("display",'none')
					})


					$(this).css("backgroundColor", 'red');

				})

				$(".list").find('li').mouseout(function(){

					$(".list ").find('li').css("background-color", "#333333");
					$(".list").siblings('ul').css("display", 'none');

				})

			// 电视产品的加载
			$.ajax({
				url:"../data/dataProduct.json",
				success:function(arr){
					for(var i = 0;i < arr[0].length;i++){
						$(`<li id="${arr[0][i].id} class="shadow">
					<p>限时特惠</p>
					<a href=""><img src="${arr[0][i].img}" alt=""></a>
					<p>${arr[0][i].title}</p>
					<p>${arr[0][i].desc}</p>
					<p>${arr[0][i].price}</p>
					</li>`).appendTo(".tv ul")
					}
				},
				error:function(msg){
					alert("请求错误" + msg)
				}
			})

			//冰箱产品的加载
 			$.ajax({
				url:"../data/dataProduct.json",
				success:function(arr){
					for(var i = 0;i < arr[1].length;i++){
						$(`<li id="${arr[1][i].id} class="shadow"">
					<p>限时特惠</p>
					<a href=""><img src="${arr[1][i].img}" alt=""></a>
					<p>${arr[1][i].title}</p>
					<p>${arr[1][i].desc}</p>
					<p>${arr[1][i].price}</p>
					</li>`).appendTo(".fridge ul")
					}

				},
				error:function(msg){
					alert("请求错误" + msg)
				}
			})
			
			//当滚动高度大于900px时，返回商品的列表可以看见
			$(window).scroll(function(){
				var scroolltop = $(window).scrollTop()

				if( scroolltop > 650){
					$(".back_product").css("display","block")
				}else{
					$(".back_product").css("display","none")
				}
			})
			//鼠标悬停阴影效果
			var b = $(".tv ul li");
			$(".tv ul").on("mouseover","li",function(){
				var e = $(this);
				$(".tv ul").find("li").removeClass("shadow");
				e.addClass("shadow")

			})

			$(".tv ul").on("mouseout","li",function(){
				$(".tv ul").find("li").removeClass("shadow");
			})
			
		})
	}

	return{
			banner: banner,
			toptab:toptab
		}
})
