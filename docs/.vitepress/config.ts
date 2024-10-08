import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "炫酷前端学习指南",
  description: "学习vue3项目",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/guide/' },
      { text: '组件', link: '/components/' },
      { text: 'API', link: '/api/' },
      { text: '常见问题', link: '/faq/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '教程',
          items: [
            { text: '概念', link: '/guide/concepts' },
            { text: '安装', link: '/guide/installation' }
          ]
        }
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: '按钮', link: '/components/button' },
            { text: '表单', link: '/components/form' }
          ]
        }
      ],
      '/faq/': [
        {
          text: '常见问题',
          items: [
            { text: '常见问题', link: '/faq/' },
          ]
        }
      ]
    }
  }
})
