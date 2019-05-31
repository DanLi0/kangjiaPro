define(["jquery"],function($){
	//建立index模块

	function banner(){

		$(function(){
			//动态加载轮播图
			$.ajax({
				url:"data/dataBanner.json",
				success:function(arr){
					//通过循环，将数据加载到页面上
					for(var i = 0; i < arr.length;i++){
						$(
							`<li><a href=""><img src="${arr[i].img}" alt=""></a></li>
							`
						).appendTo($(".bannerbox ul"))
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
				},4000)
			})

			//动态加载侧边栏的子菜单
			$.ajax({
				url:"data/dataTab.json",
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


		})
	}

	return{
			banner: banner
		}

})