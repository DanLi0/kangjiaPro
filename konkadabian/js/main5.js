require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"parabola": "parabola",
		"banner": "banner",
		"product":"product",
		"descripe":"descripe"
	},
	shim:{
		"jquery-cookie":["jquery"],
		"parabola": {
			exports: "_"
		}
	}
})
//调用模块
require(["banner","descripe","product"],function(banner,desc,product){
	banner.toptab();
	desc.desc();
	product.product();
	product.register();
})