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
	themeConfig: {
		// 网站标题
		siteTitle: "mx52jing",
		// 启动页面丝滑滚动
		smoothScroll: true,
		// 导航栏配置
		nav: [
			{ text: '首页', link: '/' },
			{ text: '随手一记', link: '/hand-notes/' },
			{ text: '知识沉淀', link: '/knowledge-deposition/' },
			{ text: '收藏夹', link: '/favorites/' },
		],
		// 左侧边栏配置
		sidebar: {
			'/hand-notes/': [
				{
					text: 'JavaScript',
					collapsible: false,
					collapsed: true,
					items: [
						{
							text: '实用工具方法',
							collapsible: false,
							collapsed: true,
							items: [
								{ text: '数字四舍五入', link: '/hand-notes/JavaScript/实用工具方法/数字四舍五入' },
								{ text: '根据生日计算年龄', link: '/hand-notes/JavaScript/实用工具方法/根据生日计算年龄' },
								{ text: '控制并发执行函数', link: '/hand-notes/JavaScript/实用工具方法/控制并发执行函数' },
							]
						}
					]
				},
				{
					text: 'Chart',
					collapsible: false,
					collapsed: true,
					items: [
						{
							text: 'AntVF2',
							collapsible: false,
							collapsed: true,
							items: [
								{ text: '使用小记', link: '/hand-notes/Chart/AntVF2/使用小记'}
							]
						}
					]
				},
				{
					text: 'CSS',
					collapsible: false,
					collapsed: true,
					items: [
						{
							text: 'CSS效果',
							collapsible: false,
							collapsed: true,
							items: [
								{ text: 'CSS实现文字渐变', 'link': '/hand-notes/CSS/CSS效果/CSS实现文字渐变'},
								{ text: 'CSS实现突出不同颜色的圆角', 'link': '/hand-notes/CSS/CSS效果/CSS实现突出不同颜色的圆角'},
							]
						}
					]
				},
				{
					text: 'Bash',
					collapsible: false,
					collapsed: true,
					items: [
						{ text: 'Bash实用方法', link: '/hand-notes/Bash/practice-method'},
						{ text: '图片压缩和格式转换', link: '/hand-notes/Bash/图片压缩和格式转换'},
						{ text: '计算升级版本号', link: '/hand-notes/Bash/计算升级版本号'},
					]
				},
				{
					text: 'Mac',
					collapsible: false,
					collapsed: true,
					items: [
						{ text: '环境初始化', link: '/hand-notes/Mac/init'},
						{ text: '使用小记', link: '/hand-notes/Mac/frequently-commands'}
					]
				},
				{
					text: 'Charles',
					collapsible: false,
					collapsed: true,
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
					collapsed: true,
					items: [
						{
							text: 'Babel',
							collapsible: false,
							collapsed: true,
							items: [
								{ text: 'Babel基础', link: '/knowledge-deposition/前端工程化/Babel/Babel基础'},
							]
						},
						{

							text: 'Vite',
							collapsible: false,
							collapsed: true,
							items: [
								{ text: '初体验', link: '/knowledge-deposition/前端工程化/Vite/初体验' },
								{ text: '区分不同环境', link: '/knowledge-deposition/前端工程化/Vite/区分不同环境'},
								{ text: '处理样式', link: '/knowledge-deposition/前端工程化/Vite/处理样式'},
								{ text: '处理静态资源', link: '/knowledge-deposition/前端工程化/Vite/处理静态资源'},
								{ text: '依赖预构建', link: '/knowledge-deposition/前端工程化/Vite/依赖预构建'},
							]
						}
					]
				},
				{
					text: 'Docker',
					collapsible: false,
					collapsed: true,
					items: [
						{ text: 'Docker基础知识', link: '/knowledge-deposition/Docker/Docker基础知识'},
						{ text: 'Dockerfile', link: '/knowledge-deposition/Docker/Dockerfile'}
					]
				},
				{
					text: 'MySQL',
					collapsible: false,
					collapsed: true,
					items: [
						{ text: '基础', link: '/knowledge-deposition/MySQL/基础知识'},
						{ text: 'SQL', link: '/knowledge-deposition/MySQL/SQL'}
					]
				},
				{
					text: 'SSH',
					collapsible: false,
					collapsed: true,
					items: [
						{ text: 'SSH基础', link: '/knowledge-deposition/SSH/ssh-base'}
					]
				},
				{
					text: 'Bash',
					collapsible: false,
					collapsed: true,
					items: [
						{ text: 'Bash 基础知识', link: '/knowledge-deposition/Bash/基础知识'}
					]
				},
				{
					text: 'Linux',
					collapsible: false,
					collapsed: true,
					items: [
						{ text: '文件压缩', link: '/knowledge-deposition/Linux/文件压缩'}
					]
				},
				{
					text: 'GoLang',
					collapsible: false,
					collapsed: true,
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
								}
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
							]
						},
						{
							text: 'Logrus',
							collapsible: false,
							collapsed: true,
							items: [
								{ text: '基础用法', link: '/knowledge-deposition/GoLang/Logrus/基础用法' },
								{ text: 'Hook', link: '/knowledge-deposition/GoLang/Logrus/Hook' },
								{ text: '日志分割', link: '/knowledge-deposition/GoLang/Logrus/日志分割' },
							]
						},
					]
				}
			],
			'/favorites/': [
				{ text: 'CSS', link: '/favorites/CSS/' },
				{ text: 'Git', link: '/favorites/Git/' },
				{ text: 'Mobile Side', link: '/favorites/Mobile/' },
				{ text: 'Nginx', link: '/favorites/Nginx/' },
				{ text: 'Mac', link: '/favorites/Mac/' },
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
