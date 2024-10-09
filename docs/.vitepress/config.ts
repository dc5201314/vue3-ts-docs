import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "前端工程化",
  description: "vue3 + Typescript 学习文档",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'vue3基础学习', link: '/guide/' },
      { text: 'vue3的组件学习', link: '/components/' },
      { text: '完整项目实践', link: '/api/' },
      { text: '常见问题', link: '/faq/' },
    ],
    socialLinks:[
      {icon:'github',link:'https://github.com/dc5201314/vue3-ts-docs.git'}
    ],
    sidebar: {
      '/guide/': [
        {
          text: '初识',
          items: [
            { text: 'vue3的核心概念', link: '/guide/concepts' },
            { text: 'vue3的组件体系', link: '/guide/installation' }
          ]
        }
      ],
      '/components/': [
        {
          text: '工程化',
          items: [
            { text: '什么是Api', link: '/components/button' },
            { text: 'Element Plus入门', link: '/components/form'},
            { text: 'VueUse的简单示例', link: '/components/VueUse' }
          ]
        }
      ],
      '/faq/': [
        {
          text: '常见问题',
          items: [
            { text: '常见问题', link: '/faq/question' },
            { text: '好句分享', link: '/faq/sentence' },
          ]
        }
      ]
    }
  }
})
