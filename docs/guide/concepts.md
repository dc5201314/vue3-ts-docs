# Vue 3 的核心概念

汇总了 Vue.js 3 的核心概念、组件体系和常见功能模块的用法。内容涵盖了从基础到进阶的所有知识点，帮助你系统性地学习和掌握 Vue 3 框架。

---

## 1. Vue 3 简介

### 1.1 什么是 Vue.js？

Vue.js 是一个渐进式 JavaScript 框架，用于构建用户界面。与传统的 JavaScript 框架相比，Vue.js 提供了更灵活、更简洁的开发模式，使开发者能够快速上手并轻松构建复杂的应用程序。

- **渐进式**：Vue 允许开发者根据项目的复杂度，逐步引入 Vue 的功能模块（如组件、路由、状态管理等）。
- **组件化**：Vue 提供了一个功能强大的组件系统，将复杂的 UI 逻辑拆分为小的、可复用的组件，从而提高代码的组织性和可维护性。
- **响应式**：Vue 的核心是响应式数据绑定，它可以根据数据变化自动更新视图，从而提高开发效率。

### 1.2 Vue.js 的特点

- **声明式渲染**：使用模板语法将数据和 DOM 绑定在一起，让开发者只需关注数据逻辑而不必操心 DOM 操作。
- **数据驱动**：基于响应式系统的自动化更新机制，可以让视图随数据变化而自动更新。
- **强大的组件系统**：组件是 Vue 的基本构建块，复杂应用可拆分为多个小的、独立的模块，从而提高复用性和开发效率。

---

## 2. 安装与配置

### 2.1 Vue 3 项目初始化

Vue 3 官方推荐使用 Vite 作为项目初始化工具。以下是使用 Vite 创建 Vue 项目的步骤：

```bash
# 安装 Vite
npm create vite@latest my-vue-app -- --template vue

# 安装依赖并启动开发服务器
cd my-vue-app
npm install
npm run dev
```

该命令将启动开发服务器，默认在 `http://localhost:5173` 运行。

### 2.2 在现有项目中引入 Vue 3

如果你已经有一个现有的项目，可以通过以下命令安装 Vue 3：

```bash
npm install vue@next
```

然后在项目的入口文件（如 `main.js`）中引入 Vue 3：

```javascript
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

---

## 3. Vue.js 核心概念

### 3.1 数据绑定与模板语法

Vue.js 提供了一个直观的模板语法，将数据和 DOM 绑定在一起：

```vue
<template>
  <div>
    <h1>{{ message }}</h1>

    <p>当前日期：{{ date }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
const message = ref("Hello, Vue 3!");
const date = ref(new Date().toLocaleDateString());
</script>
```

- 使用 `{{}}` 语法在模板中插值数据。
- 通过 `ref` 创建响应式数据，并在模板中引用它们。

### 3.2 条件渲染与列表渲染

#### 条件渲染

使用 `v-if` 和 `v-show` 来控制元素的显示与隐藏：

```vue
<template>
  <button @click="toggle">切换显示</button>

  <p v-if="isVisible">显示的内容</p>
</template>

<script setup>
import { ref } from "vue";
const isVisible = ref(true);
const toggle = () => {
  isVisible.value = !isVisible.value;
};
</script>
```

- `v-if` 会真正从 DOM 中移除或添加元素，而 `v-show` 仅通过 CSS 控制元素的显示。

#### 列表渲染

使用 `v-for` 渲染数组或对象：

```vue
<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
const items = ref(["苹果", "香蕉", "橘子"]);
</script>
```

### 3.3 事件处理

Vue 使用 `v-on`（或 `@` 简写）来绑定事件：

```vue
<template>
  <button @click="handleClick">点击我</button>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);
const handleClick = () => {
  count.value++;
  console.log("按钮被点击", count.value);
};
</script>
```

- 可以使用 `.prevent`、`.stop` 等修饰符处理事件行为。

### 3.4 表单输入绑定

使用 `v-model` 实现双向数据绑定：

```vue
<template>
  <input v-model="inputValue" placeholder="输入点内容吧" />
  <p>你输入的是：{{ inputValue }}</p>
</template>

<script setup>
import { ref } from "vue";
const inputValue = ref("");
</script>
```

- `v-model` 自动在数据和输入框之间建立双向绑定，适用于 `input`、`textarea`、`checkbox` 等表单控件。

---

## 4. Vue.js 组件

### 4.1 组件定义

在 Vue.js 中，每个组件本质上是一个独立的 Vue 实例。组件由 `template`、`script` 和 `style` 三个部分组成：

```vue
<template>
  <div class="component">
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.component {
  color: blue;
}
</style>
```

### 4.2 组件之间的通信

Vue 提供了多种方式实现组件间的数据通信：

- **父子组件通信（Props & Events）**：父组件通过 `props` 传递数据，子组件通过 `emit` 触发事件。

```vue
<!-- ParentComponent.vue -->
<template>
  <ChildComponent :message="parentMessage" @custom-event="handleEvent" />
</template>

<script setup>
import { ref } from "vue";
import ChildComponent from "./ChildComponent.vue";
const parentMessage = ref("Hello from Parent!");
const handleEvent = (payload) => {
  console.log("Event received:", payload);
};
</script>
```

- **跨级组件通信（Provide & Inject）**：适合跨越多层组件传递数据。

```vue
<!-- GrandParentComponent.vue -->
<template>
  <ParentComponent />
</template>

<script setup>
import { provide } from "vue";
const user = { name: "张三" };
provide("user", user);
</script>
```

- **兄弟组件通信（Event Bus 或 Vuex）**：推荐使用 Vuex 或其他状态管理工具。

---

## 5. 响应式系统

Vue 3 引入了全新的响应式 API，如 `ref`、`reactive` 和 `computed`。

### 5.1 `ref` 和 `reactive` 的使用

- `ref`：用于基本数据类型。

```javascript
const count = ref(0);
count.value++; // 修改 ref 的值时要使用 .value
```

- `reactive`：用于对象和数组的响应式数据。

```javascript
const user = reactive({ name: "张三", age: 25 });
user.age++; // 直接修改对象属性
```

### 5.2 计算属性（Computed）

计算属性用于基于其他状态派生出新的值，并且具有缓存特性。

```javascript
const price = ref(100);
const discount = ref(0.8);
const discountedPrice = computed(() => price.value * discount.value);
```

### 5.3 监听器（Watch）

`watch` 函数用于监听响应式数据的变化，并执行特定逻辑：

```javascript
watch(price, (newValue, oldValue) => {
  console.log(`价格从 ${oldValue} 变为 ${newValue}`);
});
```

---

## 6. 高级特性

### 6.1 自定义指令

自定义指令用于扩展 Vue 的模板功能，例如自动聚焦：

```javascript
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});
```

### 6.2 动态组件

通过 `component` 选项实现动态组件切换：

```vue
<template>
  <component :is="currentComponent" />
</template>
```

---

这些内容涵盖了 Vue 3 的大部分核心功能与特性。带你初识vue3。
