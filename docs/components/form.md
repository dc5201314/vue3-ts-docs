# Element Plus 学习笔记

Element Plus 是 Vue 3 的一个 UI 组件库，继承自 Element UI，并已更新为支持 Vue 3 的 Composition API。下面是对 Element Plus 样式库的学习笔记，包括一些基本的组件用法和示例。官网（[一个 Vue 3 UI 框架 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/)）

---

## 1. 入门

Element Plus 安装非常简单，可以通过 npm 或者 yarn 完成安装：

```bash
npm install element-plus --save
# 或者
yarn add element-plus
```

### 1.1 引用 Element Plus

在你的 Vue 项目中引入 Element Plus：

```javascript
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";

const app = createApp(App);
app.use(ElementPlus);
app.mount("#app");
```

## 2. 常用组件介绍及示例

以下是一些 Element Plus 中常用组件的简介和使用示例。

### 2.1 ElButton（按钮）

按钮组件是最基本的组件之一，用于处理点击事件。

```vue
<template>
  <el-button type="primary" @click="handleClick">点击我</el-button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert("按钮被点击");
    },
  },
};
</script>
```

### 2.2 ElTable（表格）

用于展示数据表格，具备排序、筛选等功能。

```vue
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="address" label="地址" />
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2021-05-03",
          name: "张三",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2021-05-02",
          name: "李四",
          address: "上海市普陀区金沙江路 1517 弄",
        },
      ],
    };
  },
};
</script>
```

### 2.3 ElDialog（对话框）

对话框组件用于弹出窗口展示内容。

```vue
<template>
  <el-button type="text" @click="dialogVisible = true"
    >点击打开对话框</el-button
  >

  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
    <span>这是一段信息</span>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>

        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
};
</script>
```

### 2.4 ElForm（表单）

用于数据收集、校验和提交。

```vue
<template>
  <el-form :model="form" label-width="80px">
    <el-form-item label="活动名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="活动区域">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>

        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>

      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!", this.form);
    },
  },
};
</script>
```

## 3. 响应式和主题定制

Element Plus 支持响应式布局，并允许通过修改 SCSS 变量来定制主题。

### 3.1 响应式布局

Element Plus 使用了 Flex 布局，可以很容易实现响应式设计。

### 3.2 主题定制

通过修改 `element-variables.scss` 文件，可以改变默认的颜色、边框等：

```sass
/* 改变主题颜色 */
$--color-primary: teal;
```

## 4. 总结

Element Plus 为 Vue 3 提供了一套完整的高质量组件，并支持最新的 Composition API，是开发中快速搭建界面的有力工具。其设计思想和详尽的文档可以帮助开发者提高工作效率。

---

这个笔记提供了Element Plus的快速启动指南、常用组件示例和一些高级用法。当你深入学习和实际应用时，可以根据具体需要访问官方文档获得更多信息。希望这些笔记能够帮助你更好地使用 Element Plus 完成项目开发。
