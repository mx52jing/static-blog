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
			{ text: '随手一记', link: '/hand-notes/bash/practice-method' },
			{ text: '知识沉淀', link: '/knowledge-deposition/ssh/ssh-base' },
		],
		// 左侧边栏配置
		sidebar: {
			'/hand-notes/': [
				{
					text: 'Bash',
					items: [
						{ text: 'Bash实践记录', link: '/hand-notes/bash/practice-method'}
					]
				},
				{
					text: 'Mac',
					items: [
						{ text: '使用小记', link: '/hand-notes/mac/frequently-commands'}
					]
				}
			],
			'/knowledge-deposition/': [
				{
					text: 'SSH',
					items: [
						{ text: 'SSH基础', link: '/knowledge-deposition/ssh/ssh-base'}
					]
				},
				{
					text: 'Bash',
					items: [
						{ text: 'Bash 基础语法', link: '/knowledge-deposition/bash/basic-syntax'}
					]
				}
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
		lastUpdated: "Last Updated", // 设置展示最后更新时间
		aside: true, // 展示右侧 文章标题
		outline: 'deep', // 设置右侧文章标题展示多级，而不是只有一级
	}
}
