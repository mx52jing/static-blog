# Taro 中使用tailwindcss 3.x版本

:::tip
- nodejs的版本`^18.17.0`或者`>=20.5.0`
:::

## 安装Tailwindcss

```shell
pnpm install -D tailwindcss@3
# Taro 中内置了postcss autoprefixer 所以不用下载了
```

## 初始化Tailwindcss

- [报错参考](https://github.com/shadcn-ui/ui/issues/6434#issuecomment-2610375530)

```shell
pnpm dlx tailwindcss init

# 如果报错 ERR_PNPM_DLX_NO_BIN  No binaries found in tailwindcss，执行下面的命令

pnpm dlx tailwindcss@3.4.17 init -p
```

##  配置`tailwind.config.(js|ts)`

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  // 这里给出了一份 uni-app /taro 通用示例，具体要根据你自己项目的目录结构进行配置
  // 不在 content 包括的文件内，你编写的 class，是不会生成对应的css工具类的
  content: ['./src/index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  // 其他配置项
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发小程序和 h5 端，你应该使用环境变量来控制它
    preflight: false
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 引入`tailwindcss`

在`src/app.scss`中引入


```scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

## 安装`weapp-tailwindcss`

```shell
pnpm install -D weapp-tailwindcss

# 假如 tailwindcss 在 weapp-tailwindcss 之后安装，可以手动执行一下 patch 方法
# pnpm dlx weapp-tw patch
```

然后把下列脚本，添加进`package.json`的`scripts`字段里:

```js
"scripts": {
  "postinstall": "weapp-tw patch"
}
```

## 注册插件

在`config/index.(js|ts)`配置

```typescript
import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import tailwindcss from 'tailwindcss'
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite'

import devConfig from './dev'
import prodConfig from './prod'

import type { Plugin } from 'vite'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'vite'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'vite'> = {
    // ...其他配置
    compiler: {
      type: 'vite',
      vitePlugins: [
        {
          // 通过 vite 插件加载 postcss,
          name: 'postcss-config-loader-plugin',
          config(config) {
            // 加载 tailwindcss
            if (typeof config.css?.postcss === 'object') {
              config.css?.postcss.plugins?.unshift(tailwindcss())
            }
          },
        },
        uvtw({
          // rem转rpx
          rem2rpx: true,
          // 除了小程序这些，其他平台都 disable
          disabled: process.env.TARO_ENV === 'h5' || process.env.TARO_ENV === 'harmony' || process.env.TARO_ENV === 'rn',
          // 由于 taro vite 默认会移除所有的 tailwindcss css 变量，所以一定要开启这个配置，进行css 变量的重新注入
          injectAdditionalCssVarScope: true,
        })
      ] as Plugin[] // 从 vite 引入 type, 为了智能提示
    },
    // ...其他配置
})
```

## 参考

- [weapp-tailwindcss](https://tw.icebreaker.top/docs/intro)