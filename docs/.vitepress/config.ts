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
			{ text: '算法', link: '/algorithm/LeetCode刷题/1-两数之和' },
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
						{ text: '随机数的应用', link: '/hand-notes/JavaScript/随机数的应用' },
						{ text: '判断字母大小写', link: '/hand-notes/JavaScript/判断字母大小写' },
					]
				},
				{
					text: 'React',
					collapsible: false,
					collapsed: false,
					items: [
						{
							text: 'ProComponents',
							collapsible: false,
							collapsed: false,
							items: [
								{ text: 'ProTable', link: '/hand-notes/React/ProComponents/ProTable' },
							]
						},
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
								{ text: '使用小记', link: '/hand-notes/Chart/AntVF2/使用小记'},
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
						{ text: '虚线边框', 'link': '/hand-notes/CSS/虚线边框'},
						{ text: '图片加载出错样式设置', 'link': '/hand-notes/CSS/图片加载出错样式设置'},
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
						{ text: '小球交互loading', 'link': '/hand-notes/Sass/小球交互loading'},
					]
				},
				{
					text: 'Canvas',
					collapsible: false,
					collapsed: false,
					items: [
						{ text: '绘制图片不清晰问题', 'link': '/hand-notes/Canvas/绘制图片不清晰问题'},
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
						{ text: '文件压缩', link: '/hand-notes/Linux/文件压缩'},
						{ text: '用户操作相关', link: '/hand-notes/Linux/用户操作相关'},
						{ text: '权限相关', link: '/hand-notes/Linux/权限相关'},
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
						{ text: 'Bash基础知识', link: '/knowledge-deposition/Linux/Bash基础知识'},
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
								{ text: 'url包', link: '/knowledge-deposition/GoLang/基础知识/url包'},
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
							text: "Crawler",
							collapsible: false,
							collapsed: true,
							items: [
								{ text: 'HTTP请求方法', link: '/knowledge-deposition/GoLang/Crawler/HTTP请求方法' },
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
				},
				{
					text: 'Nacos',
					collapsible: false,
					collapsed: false,
					items: [
						{ text: '基本概念和安装启动', link: '/knowledge-deposition/Nacos/基本概念和安装启动'},
						{ text: '操作动态配置文件', link: '/knowledge-deposition/Nacos/操作动态配置文件'},
					]
				},
			],
			'/algorithm/': [
				{
					text: "LeetCode刷题",
					collapsible: false,
					collapsed: true,
					items: [
						{ text: '1-两数之和', link: '/algorithm/LeetCode刷题/1-两数之和' },
						{ text: '20-有效的括号', link: '/algorithm/LeetCode刷题/20-有效的括号' },
						{ text: '26-删除有序数组中的重复项', link: '/algorithm/LeetCode刷题/26-删除有序数组中的重复项' },
						{ text: '27-移除元素', link: '/algorithm/LeetCode刷题/27-移除元素' },
						{ text: '28-找出字符串中第一个匹配项的下标', link: '/algorithm/LeetCode刷题/28-找出字符串中第一个匹配项的下标' },
						{ text: '3-无重复字符的最长子串', link: '/algorithm/LeetCode刷题/3-无重复字符的最长子串' },
						{ text: '35-搜索插入位置', link: '/algorithm/LeetCode刷题/35-搜索插入位置' },
						{ text: '14-最长公共前缀', link: '/algorithm/LeetCode刷题/14-最长公共前缀' },
						{ text: '58-最后一个单词的长度', link: '/algorithm/LeetCode刷题/58-最后一个单词的长度' },
						{ text: '136-只出现一次的数字', link: '/algorithm/LeetCode刷题/136-只出现一次的数字' },
						{ text: 'LCR-018-验证回文串', link: '/algorithm/LeetCode刷题/LCR-018-验证回文串' },
						{ text: '9-回文数', link: '/algorithm/LeetCode刷题/9-回文数' },
						{ text: '17-电话号码的字母组合', link: '/algorithm/LeetCode刷题/17-电话号码的字母组合' },
						{ text: '202-快乐数', link: '/algorithm/LeetCode刷题/202-快乐数' },
						{ text: '485-最大连续1的个数', link: '/algorithm/LeetCode刷题/485-最大连续1的个数' },
						{ text: '628-三个数的最大乘积', link: '/algorithm/LeetCode刷题/628-三个数的最大乘积' },
						{ text: '414-第三大的数', link: '/algorithm/LeetCode刷题/414-第三大的数' },
						{ text: '520-检测大写字母', link: '/algorithm/LeetCode刷题/520-检测大写字母' },
						{ text: '977-有序数组的平方', link: '/algorithm/LeetCode刷题/977-有序数组的平方' },
						{ text: '209-长度最小的子数组', link: '/algorithm/LeetCode刷题/209-长度最小的子数组' },
						{ text: '203-移除链表元素', link: '/algorithm/LeetCode刷题/203-移除链表元素' },
						{ text: '707-设计链表', link: '/algorithm/LeetCode刷题/707-设计链表' },
						{ text: '206-反转链表', link: '/algorithm/LeetCode刷题/206-反转链表' },
						{ text: '24-两两交换链表中的节点', link: '/algorithm/LeetCode刷题/24-两两交换链表中的节点' },
						{ text: '19-删除链表的倒数第N个结点', link: '/algorithm/LeetCode刷题/19-删除链表的倒数第N个结点' },
						{ text: '242-有效的字母异位词', link: '/algorithm/LeetCode刷题/242-有效的字母异位词' },
						{ text: '349-两个数组的交集', link: '/algorithm/LeetCode刷题/349-两个数组的交集' },
						{ text: '454-四数相加II', link: '/algorithm/LeetCode刷题/454-四数相加II' },
						{ text: '15-三数之和', link: '/algorithm/LeetCode刷题/15-三数之和' },
						{ text: '18-四数之和', link: '/algorithm/LeetCode刷题/18-四数之和' },
						{ text: '344-反转字符串', link: '/algorithm/LeetCode刷题/344-反转字符串' },
						{ text: '541-反转字符串II', link: '/algorithm/LeetCode刷题/541-反转字符串II' },
						{ text: '151-反转字符串中的单词', link: '/algorithm/LeetCode刷题/151-反转字符串中的单词' },
						{ text: '1047-删除字符串中的所有相邻重复项', link: '/algorithm/LeetCode刷题/1047-删除字符串中的所有相邻重复项' },
						{ text: '150-逆波兰表达式求值', link: '/algorithm/LeetCode刷题/150-逆波兰表达式求值' },
						{ text: '144-94-145-遍历二叉树', link: '/algorithm/LeetCode刷题/144-94-145-遍历二叉树' },
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
				{ text: 'React', link: '/favorites/React/' },
				{ text: 'Docker', link: '/favorites/Docker/' },
				{ text: '算法', link: '/favorites/算法/' },
				{ text: 'Golang', link: '/favorites/Golang/' },
				{ text: 'IDE', link: '/favorites/IDE/' },
				{ text: 'Linux', link: '/favorites/Linux/' },
				{ text: 'UI设计灵感', link: '/favorites/UI设计灵感/' },
				{ text: 'Books', link: '/favorites/Books/' },
				{ text: '其他', link: '/favorites/其他/' },
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
