/*
* @Author: Administrator
* @Date:   2018-09-09 16:55:52
* @Last Modified by:   Administrator
* @Last Modified time: 2018-09-09 21:43:13
*/

// 路径
const path = require('path')

const webpack = require('webpack')

// 打包样式到文件
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// html
const HtmlWebpackPlugin = require('html-webpack-plugin')


// 获取html-webpack-plugin参数
const getHtmlConfig = function (name) {
	return {
		// 模板的路径
		template: './src/view/' + name + '.html',
		// 要将HTML写入的文件
		filename: 'view/' + name + '.html',
		// true || 'head' || 'body' || false将所有资产注入给定的template或templateContent。过路时true或'body'所有javascript资源都将放在body元素的底部。'head'将脚本放在head元素中
		inject: true,
		// 如果true然后追加一个唯一的webpack编译散列到所有包含的脚本和CSS文件。这对于缓存破坏很有用
		hash: true,
		// 允许您只添加一些块
		chunks: ['common', name]
	}
}

module.exports = {
	// 入口
	entry: {
		// 公用逻辑
		common: ['./src/page/common/index.js'],
		home: ['./src/page/home/index.js'],
		login: ['./src/page/login/index.js']
	},
	// 出口
	output: {
		// 绝对路径
		path: path.join(__dirname, 'dist'),
		/**
		此选项决定了每个输出 bundle 的名称
		[hash]模块标识符(module identifier)的 hash
		[chunkhash]chunk 内容的 hash，既只要入口的内容发生改变就会生成新的hash值
		[name]模块名称
		**/
		filename: 'js/[name].js',
		publicPath: '/'
	},
	// webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问，详情地址：https://webpack.js.org/configuration/externals/#src/components/Sidebar/Sidebar.jsx
	externals: {
		jquery: 'window.jQuery'
	},
	// 装载机
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader"
		        })
			},
			{
				test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
				use: [
					{
						loader: 'url-loader?limit=100&name=image/[name].[ext]'
					}
				]
			}
		]
	},
	// 插件
	plugins: [
		//提取公用的js,详解地址：https://webpack.js.org/plugins/commons-chunk-plugin/#more-examples
		new webpack.optimize.CommonsChunkPlugin({
			// 对应的entry里的某个模块
			name: 'common',
			// 修改打包后的name
			filename: 'js/common.js'
		}),
		// 打包样式到文件，详解地址：https://webpack.js.org/plugins/extract-text-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
		new ExtractTextPlugin('css/[name].css'),
		// html处理模版, 详解地址：https://webpack.js.org/plugins/html-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
		// 首页
		new HtmlWebpackPlugin(getHtmlConfig('home')),
		// 登录
		new HtmlWebpackPlugin(getHtmlConfig('login'))
	]
}
