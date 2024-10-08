import DefaultTheme from "vitepress/theme";

import "vitepress-theme-demoblock/dist/theme/styles/index.css";

import "./style/var.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {},
};