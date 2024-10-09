# Vue 语音识别功能实现说明

说明如何结合 VueUse 实现语音识别功能，并根据识别的颜色变化界面的背景和字体颜色。

---

## 概述

本项目使用 Vue 3 和 VueUse 库实现语音识别功能。用户可以通过语音输入特定颜色名称（红、蓝、绿、黄、紫），界面颜色会根据用户的输入实时变化。详细可以查看官网（[useSpeechRecognition | VueUse](https://vueuse.org/core/useSpeechRecognition/)）

## 技术栈

- **Vue 3**: JavaScript 框架，用于构建用户界面。
- **VueUse**: 提供组合式 API，可以更简单地实现响应式特性。
- **TypeScript**: JavaScript 的超集，为代码提供类型安全。

## 功能特点

- 通过语音识别捕捉用户的声音输入。
- 实时更新背景颜色和字体颜色，根据用户的语音输入改变页面样式。
- 适配性检测，确保在支持语音识别的浏览器上正常工作。

## 环境准备

### 1. 创建 Vue 项目

使用 Vue CLI 创建一个新的 Vue 3 项目：

```bash
vue create voice-color-recognition
```

选择 Vue 3 和 TypeScript 支持。

### 2. 安装 VueUse

进入项目目录并安装 VueUse：

```bash
cd voice-color-recognition
npm install @vueuse/core
```

## 实现步骤

### 1. 创建语音识别组合式 API

在 `src/composables` 目录中创建 `useSpeech.ts` 文件，并添加以下代码：

```typescript
// src/composables/useSpeech.ts
import { ref, watch } from "vue";
import { useSpeechRecognition } from "@vueuse/core";

export function useSpeech(langCode = "zh-CN") {
  const lang = ref(langCode);
  const colors = ["红", "蓝", "绿", "黄", "紫"]; // 可识别的颜色
  const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(" | ")} ;`;

  const speech = useSpeechRecognition({
    lang,
    continuous: true,
  });

  const color = ref("transparent"); // 默认背景颜色
  const textColor = ref("black"); // 默认字体颜色

  // 确保浏览器支持语音识别
  if (speech.isSupported.value) {
    const SpeechGrammarList =
      (window as any).SpeechGrammarList ||
      (window as any).webkitSpeechGrammarList;
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1); // 加入自定义颜色语法
    speech.recognition!.grammars = speechRecognitionList;

    watch(speech.result, (newResult) => {
      const trimmedResult = newResult.value.trim();
      if (colors.includes(trimmedResult)) {
        color.value = trimmedResult; // 更新背景颜色
        textColor.value = trimmedResult; // 更新字体颜色为对应的颜色
      } else {
        textColor.value = "black"; // 默认字体颜色为黑色
      }
    });
  }

  function start() {
    color.value = "transparent"; // 重置背景颜色
    speech.start();
  }

  const { isListening, isSupported, stop, result } = speech;

  return {
    start,
    stop,
    isListening,
    isSupported,
    result,
    color,
    textColor,
  };
}
```

### 2. 创建 Vue 组件

在 `src/components` 目录中创建 `SpeechRecognition.vue` 文件，并添加以下代码：

```vue
<template>
  <div>
    <div v-if="!isSupported">您的浏览器不支持语音识别 API。</div>

    <div v-else>
      <button v-if="!isListening" @click="start">按下并说话</button>

      <button v-if="isListening" @click="stop">停止</button>

      <p :style="{ background: color, color: textColor }">{{ result }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSpeech } from "../composables/useSpeech"; // 引入封装的语音识别逻辑

const { start, stop, isListening, isSupported, result, color, textColor } =
  useSpeech();
</script>

<style scoped>
/* 添加其它样式，按需求自定义 */
</style>
```

### 3. 主应用程序组件

在 `src/App.vue` 中使用 `SpeechRecognition.vue` 组件：

```vue
<template>
  <div id="app">
    <h1>语音识别颜色变化示例</h1>

    <SpeechRecognition />
  </div>
</template>

<script setup lang="ts">
import SpeechRecognition from "./components/SpeechRecognition.vue";
</script>

<style>
/* 适当的全局样式 */
</style>
```

### 4. 运行项目

确保所有代码无误后，启动开发服务器：

```bash
npm run serve
```

在浏览器中打开相应的地址（通常是 `http://localhost:5173`）。

## 使用说明

- 点击“按下并说话”按钮，然后说出以下颜色名称：“红”、“蓝”、“绿”、“黄”、“紫”。
- 页面背景颜色随之变化，且字体颜色也相应变化。

## 注意事项

- 确保在支持 Web Speech API 的浏览器中使用该功能（如 Chrome）。
- 在使用语音输入时，确保周围环境安静，以提高识别率。

---
