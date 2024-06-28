---
layout: doc
---

# ProTable

## 表格搜索修改

> `ProTable`高级表格添加`search={true}`后，默认所有的`column`都会支持搜索，搜索的`key`就是`dataIndex`字段，
>
> 例如：下面的`column`的`dataIndex`为`realName`，那么启用搜索后，传入的`params`就是`{realName: "输入的值""}`，如果想改变传给接口的`key`需要进一步处理

```javascript
const columns = [
    {
        title: 'xxxxxx',
        dataIndex: 'realName',
        fieldProps: {
            showSearch: true, // 启用select的搜索
            debounceTime: 500 // 使用防抖
        },
        valueType: "select",
        request: async (params) => {
            const { data } = await fetchLeaderShipName({
                current: 1,
                limit: 20,
                page: 1,
                pageSize: 20,
                pageType: 1,
                positionIdList: [],
                realName: params?.keyWords
            })
            if(!data?.length) return []
            return data.map(item => ({
                label: `${item.realName}-${item.userId}`,
                value: item.userId
            }))
        }
    }
]
```

> 进行如下处理后，可以将传给后端的`{realName: "输入的值""}`修改为`{userId: "输入的值""}`
> 
:::tip
关键的配置是`search.transform`的转换实现了该功能
:::

```javascript
const columns = [
    {
        title: 'xxxxxx',
        dataIndex: 'realName',
        fieldProps: {
            showSearch: true, // 启用select的搜索
            debounceTime: 500
        },
        valueType: "select",
        request: async (params) => {
            const { data } = await fetchLeaderShipName({
                current: 1,
                limit: 20,
                page: 1,
                pageSize: 20,
                pageType: 1,
                positionIdList: [],
                realName: params?.keyWords
            })
            if(!data?.length) return []
            return data.map(item => ({
                label: `${item.realName}-${item.userId}`,
                value: item.userId
            }))
        },
        // 使用search.transform 实现 表格搜索姓名时，搜索字段不使用column的dataIndex，而使用自定义的key
        // 默认表格搜索传的params是 { realName: "xxx" }, 使用transform转换后，搜索传的param是 { userId: "xxx" }
        search: {
            transform: (value: any) => {
                return { userId: value }
            }
        },
    },
]
```