# 城市选择器

说明: 用于  出差申请  选择城市，可单选/多选

    基于 Select 组件

### PROPS

| prop | type | desc |
| ---- | ---- | ---- |
| - | - | Select 所有props |
| length | number | 最多选择数量 |

### 使用方法

```js
    <CitySelector {...this.props} length={x} /> 
```

### 注意

默认填充项 直接按照 Select 的 使用方式 就好，不需要特别的 defaultItem
+ 单选   id
+ 多选   ids