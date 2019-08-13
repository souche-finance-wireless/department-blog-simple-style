module.exports = {
  title: '金融前端组博客',
  description: 'theme config',
  // base: '/department-blog-simple-style/',
  dest: 'dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'https://github.com/souche-finance-wireless/department-blog-simple-style',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
      // 假如文档放在一个特定的分支下：
    docsBranch: 'master',

    repoLabel: '查看源码',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我改善此页面！',
    // editLinkText: 'Help us improve this page',
    lastUpdated: 'Last Updated', // string | boolean
    sidebarGroupOrder: [
      'getting-started',
      'configurations'
    ],
    // 自动形成侧边导航
    sidebarDepth: 1,
    // 最后更新时间
    lastUpdated: '更新时间',
  },
  serviceWorker: false,
  markdown: {
    lineNumbers: true
  },
  plugins: [
    [
      'vuepress-plugin-yuque', {
        html: true,
        repoUrl: 'https://souche.yuque.com/souche_blog/hxqhhs',
        authToken: 'm3DjDKg7PQVrORVj6ClSpLUjXX2toG8CtwtBLRsO'
      }
    ]
   ]
}



