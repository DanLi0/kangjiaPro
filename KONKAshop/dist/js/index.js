define(["jquery"],function($){
	//建立index模块

	function banner(){

		$(function(){
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
				obtns.eq(inow).attr("class",'active').siblings().attr("class",'');
				if(inow == obtns.size()){
					obtns.eq(0).attr("class",'active');
				}

				oul.stop().animate({

					"left": -inow * 100% 

				},function(){
					if(inow == obtns.size()){
						oul.attr("left", 0 )
						inow = 0;
					}
				})
			}

			//启动定时器，轮播图自己滚动
			var timer = setInterval(function(){
				inow++;
				tab();

			},2000)

			$(".ul").mouseenter(function(){
					clearInterval(timer);
			})

			$(".ul").mouseleave(function(){
				timer = setInterval(function(){
					inow++;
					tab();
				}, 2000);
			})


		})
	}

	return{
			banner: banner
		}

})