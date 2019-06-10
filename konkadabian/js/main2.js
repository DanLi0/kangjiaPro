/*配置路径*/
require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"parabola": "parabola",
		"banner": "banner",
		"product":"product"

	},
	//jquery-cookie模块依赖jquery开发，在这里声明依赖关系
	shim:{
		"jquery-cookie": ["jquery"],
		//声明不适用AMD规范的模块
		"parabola": {
			exports: "_"
		}
	}
})

// 调用模块
require(["banner","product"],function(banner,product){
	banner.toptab();
	product.product();

})