/**
 * @type {import('vitepress').UserConfig}
 */
export default {
	base: '/static-blog/',
	title: 'mx52jing', //站点标题
	description: 'mx52jing的博客', //mate标签description，多用于搜索引擎抓取摘要
	smoothScroll: true, // 设置页面滚动行为
	displayAllHeaders: true, // 显示所有页面的标题链接
	cleanUrls: true, // 简化访问URL，地址栏内的路径不用出现.html/.md后缀了
	appearance: true, // 开启主题切换
	themeConfig: {
		// 网站标题
		siteTitle: "mx52jing",
		// 启动页面丝滑滚动
		smoothScroll: true,
		// 导航栏配置
		nav: [
			{ text: '首页', link: '/' },
			{ text: '随手一记', link: '/hand-notes/JavaScript/数字四舍五入' },
			{ text: '知识沉淀', link: '/knowledge-deposition/前端工程化/Babel/Babel基础' },
			{ text: '算法', link: '/algorithm/刷题/1-两数之和' },
			{ text: '收藏夹', link: '/favorites/CSS/' },
		],
		// 左侧边栏配置
		sidebar: {
			'/hand-notes/': [
				{
					text: 'JavaScript',
					collapsible: false,
					collapsed: false,
					items: [
						{ text: '数字四舍五入', link: '/hand-notes/JavaScript/数字四舍五入' },
						{ text: '根据生日计算年龄', link: '/hand-notes/JavaScript/根据生日计算年龄' },
						{ text: '控制并发执行函数', link: '/hand-notes/JavaScript/控制并发执行函数' },
					]
				},
				{
					text: 'Chart',
					collapsible: false,
					collapsed: false,
					items: [
						{
							text: 'AntVF2',
							collapsible: false,
							collapsed: false,
							items: [
								{ text: '使用小记', link: '/hand-notes/Chart/AntVF2/使用小记'}
							]
						}
					]
				},
				{
					text: 'CSS',
					collapsible: true,
					collapsed: false,
					items: [
						{ text: 'CSS实现文字渐变', 'link': '/hand-notes/CSS/CSS实现文字渐变'},
						{ text: 'CSS实现突出不同颜色的圆角', 'link': '/hand-notes/CSS/CSS实现突出不同颜色的圆角'},
						{ text: 'CSS计数器-counter', 'link': '/hand-notes/CSS/CSS计数器-counter'},
						{ text: 'CSS模拟数字loading', 'link': '/hand-notes/CSS/CSS模拟数字loading'},
						{ text: '实现高度过渡', 'link': '/hand-notes/CSS/实现高度过渡'},
						{ text: 'CSS实现类似微信头像效果', 'link': '/hand-notes/CSS/CSS实现类似微信头像效果'},
					]
				},
				{
					text: 'Sass',
					collapsible: false,
					collapsed: false,
					items: [
						{ text: 'sass小技巧', 'link': '/hand-notes/Sass/sass小技巧'},
						{ text: '通过mixin简化响应式代码', 'link': '/hand-notes/Sass/通过mixin简化响应式代码'},
						{ text: 'sass实现星空效果', 'link': '/hand-notes/Sass/sass实现星空效果'},
					]
				},
				{
					text: 'Linux',
					collapsible: false,
					collapsed: false,
					items: [
						{ text: 'Bash实用方法', link: '/hand-notes/Linux/practice-method'},
						{ text: '图片压缩和格式转换', link: '/hand-notes/Linux/图片压缩和格式转换'},
						{ text: '计算升级版本号', link: '/hand-notes/Linux/计算升级版本号'},
					]
				},
				{
					text: 'Mac',
					collapsible: false,
					collapsed: false,
					items: [
						{ text: '环境初始化', link: '/hand-notes/Mac/init'},
						{ text: '使用小记', link: '/hand-notes/Mac/frequently-commands'},
						{ text: '快捷运行自定义shell脚本', link: '/hand-notes/Mac/快捷运行自定义shell脚本'}
					]
				},
				{
					text: 'Charles',
					collapsible: false,
					collapsed: false,
					items: [
						{ text: '抓包配置', link: '/hand-notes/Charles/抓包配置' },
						{ text: '修改请求或响应', link: '/hand-notes/Charles/修改请求或响应' },
					]
				}
			],
			'/knowledge-deposition/': [
				{
					text: '前端工程化',
					collapsible: false,
					collapsed: false,
					items: [
						{
							text: 'Babel',
							collapsible: false,
							collapsed: false,
							items: [
								{ text: 'Babel基础', link: '/knowledge-deposition/前端工程化/Babel/Babel基础'},
							]
						},
						{

							text: 'Vite',
							collapsible: false,
							collapsed: false,
							items: [
								{ text: '初体验', link: '/knowledge-deposition/前端工程化/Vite/初体验' },
								{ text: '区分不同环境', link: '/knowledge-deposition/前端工程化/Vite/区分不同环境'},
								{ text: '处理样式', link: '/knowledge-deposition/前端工程化/Vite/处理样式'},
								{ text: '处理静态资源', link: '/knowledge-deposition/前端工程化/Vite/处理静态资源'},
								{ text: '依赖预构建', link: '/knowledge-deposition/前端工程化/Vite/依赖预构建'},
								{ text: 'esbuild相关', link: '/knowledge-deposition/前端工程化/Vite/esbuild相关'},
								{ text: 'Rollup的插件机制', link: '/knowledge-deposition/前端工程化/Vite/Rollup的插件机制'},
								{ text: 'Vite插件机制', link: '/knowledge-deposition/前端工程化/Vite/Vite插件机制'},
							]
						}
					]
				},
				{
					text: 'Docker',
					collapsible: false,
					collapsed: false,
					items: [
						{ text: 'Docker基础知识', link: '/knowledge-deposition/Docker/Docker基础知识'},
						{ text: 'Dockerfile', link: '/knowledge-deposition/Docker/Dockerfile'}
					]
				},
				{
					text: 'MySQL',
					collapsible: false,
					collapsed: false,
					items: [
						{ text: '基础', link: '/knowledge-deposition/MySQL/基础知识'},
						{ text: 'SQL', link: '/knowledge-deposition/MySQL/SQL'},
						{ text: '数据操作和查询', link: '/knowledge-deposition/MySQL/数据操作和查询'},
						{ text: '函数', link: '/knowledge-deposition/MySQL/函数'},
						{ text: '分组和子查询', link: '/knowledge-deposition/MySQL/分组和子查询'},
						{ text: '表连接', link: '/knowledge-deposition/MySQL/表连接'},
					]
				},
				{
					text: 'SSH',
					collapsible: false,
					collapsed: false,
					items: [
						{ text: 'SSH基础', link: '/knowledge-deposition/SSH/ssh-base'}
					]
				},
				{
					text: 'Linux',
					collapsible: false,
					collapsed: false,
					items: [
						{ text: 'Bash 基础知识', link: '/knowledge-deposition/Linux/Bash基础知识'},
						{ text: '文件压缩', link: '/knowledge-deposition/Linux/文件压缩'},
					]
				},
				{
					text: 'GoLang',
					collapsible: false,
					collapsed: false,
					items: [
						{
							text: '基础知识',
							collapsible: false,
							collapsed: true,
							items: [
								{ text: '环境搭建', link: '/knowledge-deposition/GoLang/基础知识/环境搭建'},
								{ text: 'fmt格式输出含义', link: '/knowledge-deposition/GoLang/基础知识/fmt输出含义' },
								{ text: '变量常量', link: '/knowledge-deposition/GoLang/基础知识/变量常量'},
								{ text: '流程控制', link: '/knowledge-deposition/GoLang/基础知识/流程控制'},
								{ text: '基础数据类型', link: '/knowledge-deposition/GoLang/基础知识/基础数据类型'},
								{ text: '数组、切片、Map', link: '/knowledge-deposition/GoLang/基础知识/数组、切片、Map'},
								{ text: 'strings包', link: '/knowledge-deposition/GoLang/基础知识/strings包'},
								{ text: '函数', link: '/knowledge-deposition/GoLang/基础知识/函数'},
								{ text: '指针', link: '/knowledge-deposition/GoLang/基础知识/指针'},
								{ text: '结构体', link: '/knowledge-deposition/GoLang/基础知识/结构体'},
								{ text: '接口', link: '/knowledge-deposition/GoLang/基础知识/接口'},
								{ text: '协程', link: '/knowledge-deposition/GoLang/基础知识/协程'},
								{ text: '协程安全', link: '/knowledge-deposition/GoLang/基础知识/协程安全'},
								{ text: '通道channel', link: '/knowledge-deposition/GoLang/基础知识/通道channel'},
								{ text: 'Select', link: '/knowledge-deposition/GoLang/基础知识/Select'},
								{ text: 'time包', link: '/knowledge-deposition/GoLang/基础知识/time包'},
								{ text: 'json序列化', link: '/knowledge-deposition/GoLang/基础知识/json序列化'},
								{ text: 'Context', link: '/knowledge-deposition/GoLang/基础知识/Context'},
								{
									text: '文件操作',
									collapsible: false,
									collapsed: true,
									link: '/knowledge-deposition/GoLang/基础知识/文件操作/',
									items: [
										{ text: "读文件", link: '/knowledge-deposition/GoLang/基础知识/文件操作/读文件' },
										{ text: "写文件", link: '/knowledge-deposition/GoLang/基础知识/文件操作/写文件' },
										{ text: "文件复制", link: '/knowledge-deposition/GoLang/基础知识/文件操作/文件复制' },
										{ text: "目录操作", link: '/knowledge-deposition/GoLang/基础知识/文件操作/目录操作' },
										{ text: "读取配置文件", link: '/knowledge-deposition/GoLang/基础知识/文件操作/读取配置文件' },
										{ text: "并发下载远程文件", link: '/knowledge-deposition/GoLang/基础知识/文件操作/并发下载远程文件' },
									]
								},
								{
									text: '网络',
									collapsible: false,
									collapsed: true,
									items: [
										{ text: 'TCP', link: '/knowledge-deposition/GoLang/基础知识/网络/TCP'},
										{ text: 'HTTP', link: '/knowledge-deposition/GoLang/基础知识/网络/HTTP'},
										{ text: 'RPC', link: '/knowledge-deposition/GoLang/基础知识/网络/RPC'},
									]
								},
								{ text: 'Test', link: '/knowledge-deposition/GoLang/基础知识/Test'},
							]
						},
						{
							text: 'Gin',
							collapsible: false,
							collapsed: true,
							items: [
								{ text: "hello-world", link: "/knowledge-deposition/GoLang/Gin/hello-world" },
								{ text: "响应数据", link: "/knowledge-deposition/GoLang/Gin/响应数据" },
								{ text: "请求参数", link: "/knowledge-deposition/GoLang/Gin/请求参数" },
								{ text: "bind绑定器", link: "/knowledge-deposition/GoLang/Gin/bind绑定器" },
								{ text: "请求头和响应头", link: "/knowledge-deposition/GoLang/Gin/请求头和响应头" },
								{ text: "上传和下载文件", link: "/knowledge-deposition/GoLang/Gin/上传和下载文件" },
								{ text: "路由分组", link: "/knowledge-deposition/GoLang/Gin/路由分组" },
								{ text: "中间件", link: "/knowledge-deposition/GoLang/Gin/中间件" },
								{ text: "支持跨域", link: "/knowledge-deposition/GoLang/Gin/支持跨域" },
								{ text: "集成Swagger", link: "/knowledge-deposition/GoLang/Gin/集成Swagger" },
							]
						},
						{
							text: 'Gorm',
							collapsible: false,
							collapsed: true,
							items: [
								{ text: '连接数据库', link: '/knowledge-deposition/GoLang/Gorm/连接数据库' },
								{ text: '模型定义', link: '/knowledge-deposition/GoLang/Gorm/模型定义' },
								{ text: 'Create', link: '/knowledge-deposition/GoLang/Gorm/Create' },
								{ text: 'Query', link: '/knowledge-deposition/GoLang/Gorm/Query' },
								{ text: 'AdvancedQuery', link: '/knowledge-deposition/GoLang/Gorm/AdvancedQuery' },
								{ text: 'Update', link: '/knowledge-deposition/GoLang/Gorm/Update' },
								{ text: 'Delete', link: '/knowledge-deposition/GoLang/Gorm/Delete' },
								{ text: '关联之一对一', link: '/knowledge-deposition/GoLang/Gorm/关联之一对一' },
								{ text: '关联之一对多', link: '/knowledge-deposition/GoLang/Gorm/关联之一对多' },
								{ text: '关联之多对多', link: '/knowledge-deposition/GoLang/Gorm/关联之多对多' },
								{ text: '事务', link: '/knowledge-deposition/GoLang/Gorm/事务' },
								{ text: '自定义数据类型', link: '/knowledge-deposition/GoLang/Gorm/自定义数据类型' },
							]
						},
						{
							text: 'Logger',
							collapsible: false,
							collapsed: true,
							items: [
								{
									text: 'Logrus',
									collapsible: false,
									collapsed: true,
									items: [
										{ text: '基础用法', link: '/knowledge-deposition/GoLang/Logger/Logrus/基础用法' },
										{ text: 'Hook', link: '/knowledge-deposition/GoLang/Logger/Logrus/Hook' },
										{ text: '日志分割', link: '/knowledge-deposition/GoLang/Logger/Logrus/日志分割' },
									]
								},
								{
									text: 'Zap',
									collapsible: false,
									collapsed: true,
									items: [
										{ text: 'zap使用', link: '/knowledge-deposition/GoLang/Logger/Zap/zap使用' },
									]
								},
							]
						},
						{
							text: "爬虫",
							collapsible: false,
							collapsed: true,
							items: [
								{ text: 'HTTP请求方法', link: '/knowledge-deposition/GoLang/爬虫/HTTP请求方法' },
							]
						},
						{
							text: "加密",
							collapsible: false,
							collapsed: true,
							items: [
								{ text: 'AES加密', link: '/knowledge-deposition/GoLang/加密/AES加密' },
								{ text: 'RSA加密', link: '/knowledge-deposition/GoLang/加密/RSA加密' },
							]
						}
					]
				}
			],
			'/algorithm/': [
				{
					text: "刷题",
					collapsible: false,
					collapsed: true,
					items: [
						{ text: '1-两数之和', link: '/algorithm/刷题/1-两数之和' },
						{ text: '20-有效的括号', link: '/algorithm/刷题/20-有效的括号' },
						{ text: '26-删除有序数组中的重复项', link: '/algorithm/刷题/26-删除有序数组中的重复项' },
						{ text: '27-移除元素', link: '/algorithm/刷题/27-移除元素' },
					]
				}
			],
			'/favorites/': [
				{ text: 'CSS', link: '/favorites/CSS/' },
				{ text: 'Git', link: '/favorites/Git/' },
				{ text: 'Mobile Side', link: '/favorites/Mobile/' },
				{ text: 'Nginx', link: '/favorites/Nginx/' },
				{ text: 'Mac', link: '/favorites/Mac/' },
				{ text: 'Canvas', link: '/favorites/Canvas/' },
				{ text: 'Browser', link: '/favorites/Browser/' },
				{ text: 'ProblemSolving', link: '/favorites/ProblemSolving/' },
			]
		},
		// 社交账户链接
		socialLinks: [
			{ icon: "github", link: "https://github.com/mx52jing" },
		],
		// 页面底部
		// footer: {
		// 	message: '感谢浏览',
		// 	copyright: 'Copyright © 2022 mx52jing'
		// }
		algolia: { // 配置搜索
			appId: 'OZ2LZP2CGA',
			apiKey: 'f4ad8bb32fae6abf12202305c27f286e',
			indexName: 'static'
		},
		// markdown: {
		// 	lineNumbers: true,
		// },
		lastUpdated: true, // 设置展示最后更新时间
		aside: true, // 展示右侧 文章标题
		outline: 'deep', // 设置右侧文章标题展示多级，而不是只有一级
	},
	vite: {
		plugins: []
	}
}
