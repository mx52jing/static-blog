// import * as path from 'path';
// import { statSync } from 'node:fs';
// // @ts-ignore
// import { globSync } from 'glob'
//
// const BASEDIR_NAME = 'docs';
// // sidebar的一些额外配置选项
// const extraSidebarConfig = {
// 	collapsible: false,
// 	collapsed: true,
// }
// const generateSideBar = () => {
// 	const genRouterConfig = dirname => {
// 		const files = globSync(`${BASEDIR_NAME}/${dirname}/*`, { ignore: ["**/index.md"]});
// 		console.log(files, 'files');
// 		if(!files?.length) return;
// 		files.forEach(file => {
// 			console.log(path.basename(file), 'basename', path.dirname(file))
// 		})
// 	}
// 	// 最终要生成的sideBar
// 	const sidebarConfig = {};
// 	// 先找到所有的一级目录
// 	const firstLevelDir = globSync(`${BASEDIR_NAME}/*`, { ignore: ['**/.vitepress', '**/public', "**/index.md"] });
// 	if(!firstLevelDir?.length) return;
// 	// 筛选出所有一级目录的名称
// 	const firstLevelDirNames = firstLevelDir.map(item => item.replace(new RegExp(`${BASEDIR_NAME}\\/`), ''));
// 	firstLevelDirNames.forEach(dirname => {
// 		sidebarConfig[dirname] = [];
// 		genRouterConfig(dirname);
// 	});
// };
//
// export default generateSideBar;
