define(["jquery","jquery-cookie"],function($){
	function desc(){
		$(function(){
			//放大镜功能的实现
			//移入图片框时，mark这一层显示，大图片这一层显示
			$(".img_box").mouseenter(function(){
				$("#mark").css("display","block");
				$(".img_big").css("display","block");
			})
			//mark滑动功能
			$(".img_box").mousemove(function(ev){
				var l = ev.clientX - $(".img_box").offset().left - 50;
				if(l <= 0){
					l = 0;
				}
				if(l >= 400){
					l = 400
				}
				var t = ev.clientY - $(".img_box").offset().top - 50;
				if(t<= 0){
					t = 0;
				}
				if(t >= 400){
					t = 400;
				}
				$("#mark").css({
					top: t,
					left: l
				})
				$(".fangda").css({
					top: -t * 2,
					left: -l * 2
				})
			})
			//移出消失
			$(".img_box").mouseleave(function(){
				$("#mark").css("display","none");
				$(".img_big").css("display","none");
			})
		})
	}
	return{
		desc:desc
	}
})