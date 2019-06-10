require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"banner":"banner",
		"product":"product"
	},
	shim:{
		"jquery-cookie":["jquery"],
		"parabola": {
			exports: "_"
		}
	}
})
//调用模块
require(["banner","product"],function(banner,product){
	banner.toptab();
	product.register();
})
