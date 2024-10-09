# Vue 3 组件体系

## 1. 组件基础

### 1.1 组件定义

Vue 组件是 Vue 应用程序的基本构建块。每个组件本质上是一个包含状态和行为的独立的 Vue 实例。

- 组件可以通过定义 `template`、`script` 和 `style` 来实现。
- 在 Vue 3 中，可以使用 `defineComponent` 或者 `setup` 函数创建组件。

### 1.2 全局组件与局部组件

- **全局组件**：使用 `app.component` 注册，能在整个应用中使用。
- **局部组件**：在特定组件中通过 `components` 选项注册，仅在该组件及其子组件中使用。

```javascript
// 全局组件注册
app.component("MyComponent", {
  /* options */
});

// 局部组件注册
export default {
  components: {
    MyComponent,
  },
};
```

## 2. `setup` 函数与组合式 API

### 2.1 `setup` 函数

`setup` 是 Vue 3 中组合式 API 的入口函数，用于在组件初始化时执行。

- **参数**：`props` 和 `context`（包含 `attrs`、`slots`、`emit`）。
- **返回值**：可以返回一个对象或渲染函数，返回的对象会暴露给模板。

```javascript
import { ref } from "vue";

export default {
  setup(props, { emit }) {
    const count = ref(0);

    function increment() {
      count.value++;
      emit("incremented", count.value);
    }

    return {
      count,
      increment,
    };
  },
};
```

### 2.2 组合式 API

组合式 API 提供了更灵活的代码组织方式，可以按功能拆分逻辑：

- **Reactive API**：`ref`、`reactive`、`computed` 等。
- **Lifecycle hooks**：`onMounted`、`onUpdated` 等。

```javascript
import { ref, onMounted } from "vue";

export default {
  setup() {
    const message = ref("Hello Vue 3");

    onMounted(() => {
      console.log("Component mounted");
    });

    return { message };
  },
};
```

## 3. 组件的 Props 和 Emit

### 3.1 Props

用于在父组件向子组件传递数据。

- 可以使用 `type` 和 `required` 进行类型校验。
- 默认值可以通过 `default` 设置。

```javascript
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: "Default Title",
    },
  },
};
```

### 3.2 Emit

用于从子组件向父组件发送事件。

- 在 `setup` 中使用 `context.emit`。
- 使用 `emits` 选项显式声明事件。

```javascript
export default {
  emits: ["update"],
  setup(props, { emit }) {
    const updateValue = () => {
      emit("update", newValue);
    };

    return { updateValue };
  },
};
```

## 4. 插槽（Slots）

### 4.1 基本插槽

插槽用于在组件中传递内容，可以在组件的 `template` 中使用 `<slot>` 标签。

```vue
<template>
  <div>
    <slot></slot>
  </div>
</template>
```

### 4.2 具名插槽

使用具名插槽可以在不同位置插入不同内容。

```vue
<template>
  <div>
    <slot name="header"></slot>

    <slot></slot>
    <!-- default slot -->
    <slot name="footer"></slot>
  </div>
</template>
```

使用时：

```vue
<MyComponent>
  <template v-slot:header>
    <h1>Header Content</h1>

  </template>

  <template v-slot:footer>
    <p>Footer Content</p>

  </template>

</MyComponent>
```

### 4.3 作用域插槽

用于在插槽中传递数据。

```vue
<template>
  <slot :user="user"></slot>
</template>
```

使用时：

```vue
<MyComponent v-slot:default="{ user }">
  <p>{{ user.name }}</p>

</MyComponent>
```

## 5. 动态组件和异步组件

### 5.1 动态组件

使用 `component` 选项或 `<component :is="componentName">` 进行动态组件切换。

```vue
<component :is="currentComponent"></component>
```

### 5.2 异步组件

在 Vue 3 中，可以通过 `defineAsyncComponent` 函数来定义异步加载的组件。

```javascript
import { defineAsyncComponent } from "vue";

const AsyncComponent = defineAsyncComponent(() => import("./MyComponent.vue"));
```

## 6. 生命周期钩子

### 6.1 生命周期钩子简介

Vue 3 提供了更贴近 JavaScript 的生命周期钩子函数，例如 `onMounted`、`onUpdated` 等。常用的钩子包括：

- `onBeforeMount` / `onMounted`
- `onBeforeUpdate` / `onUpdated`
- `onBeforeUnmount` / `onUnmounted`

### 6.2 使用示例

```javascript
import { onMounted, onUnmounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      console.log("Component has been mounted");
    });

    onUnmounted(() => {
      console.log("Component is about to be unmounted");
    });
  },
};
```

## 7. 自定义指令

Vue 3 支持通过 `beforeMount`、`mounted`、`beforeUpdate` 和 `updated` 等钩子创建自定义指令。

```javascript
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});
```

在模板中使用：

```vue
<input v-focus />
```

## 8. Composition API 与 Options API 对比

| 功能         | Options API             | Composition API               |
| ------------ | ----------------------- | ----------------------------- |
| 状态管理     | `data`、`methods` 等    | `ref`、`reactive`、`computed` |
| 生命周期钩子 | `mounted`、`updated` 等 | `onMounted`、`onUpdated` 等   |
| 代码组织     | 以功能为中心            | 以逻辑为中心                  |
| 灵活性       | 较低                    | 高                            |

---

内容覆盖了 Vue 3 组件体系的主要内容，包括组件的定义、组合式 API 的使用、组件之间的数据传递方式、插槽、动态组件、生命周期钩子等。带你认识vue的组件体系。
