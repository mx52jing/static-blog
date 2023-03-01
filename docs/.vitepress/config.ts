/**
 * @type {import('vitepress').UserConfig}
 */
export default {
	title: 'mx52jing', //站点标题
	description: 'mx52jing的博客', //mate标签description，多用于搜索引擎抓取摘要
	themeConfig: {
		// 网站标题
		siteTitle: "mx52jing",
		// 启动页面丝滑滚动
		smoothScroll: true,
		// 导航栏配置
		nav: [
			{ text: '随手笔记', link: '/hand-notes/' },
			{ text: '知识沉淀', link: '/knowledge-deposition/' },
		],
		// 左侧边栏配置
		sidebar: {
			'/hand-notes/': [{}],
			'/knowledge-deposition/': [
				{
					text: 'SSH 相关',
					collapsible: true,
					collapsed: true,
					items: [
						{ text: 'SSH基础', link: '/knowledge-deposition/ssh/ssh-base'}
					]
				},
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
	}
}
