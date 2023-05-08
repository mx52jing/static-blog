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
								{ text: 'CSS实现文字渐变', 'link': '/hand-notes/CSS/CSS效果/CSS实现文字渐变'}
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
						{ text: 'Bash脚本', link: '/hand-notes/Bash/Bash-scripts'},
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
				}
			],
			'/knowledge-deposition/': [
				{
					text: 'Babel',
					collapsible: false,
					collapsed: true,
					items: [
						{ text: 'Babel基础', link: '/knowledge-deposition/Babel/Babel基础'}
					]
				},
				{
					text: 'SSH',
					collapsible: false,
					collapsed: true,
					items: [
						{ text: 'SSH基础', link: '/knowledge-deposition/SSH/SSH-base'}
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
				// {
				// 	text: 'GoLang',
				// 	collapsible: false,
				// 	collapsed: true,
				// 	items: [
				// 		{
				// 			text: '基础知识',
				// 			collapsible: false,
				// 			collapsed: true,
				// 			items: [
				// 				{ text: '环境搭建', link: '/knowledge-deposition/GoLang/基础知识/环境搭建'},
				// 				{ text: 'fmt格式输出含义', link: '/knowledge-deposition/GoLang/基础知识/fmt输出含义' },
				// 				{ text: '变量常量', link: '/knowledge-deposition/GoLang/基础知识/变量常量'},
				// 				{ text: '流程控制', link: '/knowledge-deposition/GoLang/基础知识/流程控制'},
				// 				{ text: '基础数据类型', link: '/knowledge-deposition/GoLang/基础知识/基础数据类型'},
				// 				{ text: '数组、切片、Map', link: '/knowledge-deposition/GoLang/基础知识/数组、切片、Map'},
				// 				{ text: 'strings包', link: '/knowledge-deposition/GoLang/基础知识/strings包'},
				// 				{ text: '函数', link: '/knowledge-deposition/GoLang/基础知识/函数'},
				// 				{ text: '指针', link: '/knowledge-deposition/GoLang/基础知识/指针'},
				// 				{ text: '结构体', link: '/knowledge-deposition/GoLang/基础知识/结构体'},
				// 				{ text: '接口', link: '/knowledge-deposition/GoLang/基础知识/接口'},
				// 				{ text: '协程', link: '/knowledge-deposition/GoLang/基础知识/协程'},
				// 				{ text: '协程安全', link: '/knowledge-deposition/GoLang/基础知识/协程安全'},
				// 				{ text: '通道channel', link: '/knowledge-deposition/GoLang/基础知识/通道channel'},
				// 				{ text: 'Select', link: '/knowledge-deposition/GoLang/基础知识/Select'},
				// 				{ text: 'time包', link: '/knowledge-deposition/GoLang/基础知识/time包'},
				// 				{ text: 'json序列化', link: '/knowledge-deposition/GoLang/基础知识/json序列化'},
				// 				{
				// 					text: '文件操作',
				// 					collapsible: false,
				// 					collapsed: true,
				// 					link: '/knowledge-deposition/GoLang/基础知识/文件操作/',
				// 					items: [
				// 						{ text: "读文件", link: '/knowledge-deposition/GoLang/基础知识/文件操作/读文件' },
				// 						{ text: "写文件", link: '/knowledge-deposition/GoLang/基础知识/文件操作/写文件' },
				// 						{ text: "文件复制", link: '/knowledge-deposition/GoLang/基础知识/文件操作/文件复制' },
				// 						{ text: "目录操作", link: '/knowledge-deposition/GoLang/基础知识/文件操作/目录操作' },
				// 					]
				// 				},
				// 				{
				// 					text: '网络',
				// 					collapsible: false,
				// 					collapsed: true,
				// 					items: [
				// 						{ text: 'TCP', link: '/knowledge-deposition/GoLang/基础知识/网络/TCP'},
				// 						{ text: 'HTTP', link: '/knowledge-deposition/GoLang/基础知识/网络/HTTP'},
				// 						{ text: 'RPC', link: '/knowledge-deposition/GoLang/基础知识/网络/RPC'},
				// 					]
				// 				}
				// 			]
				// 		},
				// 		{
				// 			text: 'Gin',
				// 			collapsible: false,
				// 			collapsed: true,
				// 			items: [
				// 				{ text: "1-hello-world", link: "/knowledge-deposition/GoLang/Gin/1-hello-world" },
				// 				{ text: "2-响应数据", link: "/knowledge-deposition/GoLang/Gin/2-响应数据" },
				// 			]
				// 		}
				// 	]
				// }
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
