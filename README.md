# AI JOBS UNIVERSE

> **Explore The Future Of AI Careers**  
> 企业级未来科技 AI 岗位宇宙展示平台

---

## 🚀 项目概述

AI JOBS UNIVERSE 是一个超高端、超震撼的未来 AI 岗位数字宇宙展示平台。采用电影级视觉设计，融合 Apple、OpenAI、Tesla 的设计风格，为用户提供沉浸式的职业探索体验。

### ✨ 核心特性

| 特性 | 描述 |
|------|------|
| **电影级视觉** | Three.js 粒子宇宙、神经网络连线、星空背景 |
| **真实数据** | 20+ 真实岗位数据，涵盖 AI、Web3、Frontend、Backend |
| **技术排行** | 实时技术热度排行榜，包含 AI、Web3、前端、后端四大类 |
| **技能树** | 37 节点技能树，从基础到前沿的完整技术图谱 |
| **趋势分析** | 24 个月技术需求演化曲线和预测 |
| **响应式设计** | 完美适配 PC、平板、手机 |
| **流畅动画** | GSAP + Framer Motion 驱动的微交互体验 |

---

## 🛠️ 技术栈

### 核心技术

| 分类 | 技术 | 版本 |
|------|------|------|
| **框架** | React | ^18.3.1 |
| **构建工具** | Vite | ^6.0.1 |
| **语言** | TypeScript | ^5.6.3 |
| **样式** | TailwindCSS | ^3.4.15 |
| **动画** | GSAP | ^3.12.5 |
| **动画** | Framer Motion | ^11.11.1 |
| **3D 渲染** | Three.js | ^0.169.0 |
| **3D 框架** | React Three Fiber | ^8.17.10 |
| **3D 工具** | Drei | ^9.114.3 |
| **路由** | React Router | ^6.28.0 |

### 设计系统

- **玻璃拟态 (Glassmorphism)** - 毛玻璃效果卡片
- **HUD UI** - 科技感界面元素
- **深色主题** - 黑银科技风配色
- **动态光影** - 电影级光效和阴影

---

## 📁 项目结构

```
AI JOBS UNIVERSE/
├── public/                    # 静态资源
│   ├── favicon.svg          # 网站图标
│   └── 项目主页动态背景.mp4   # Hero 视频背景
├── src/                      # 源代码
│   ├── components/           # 可复用组件
│   │   ├── three/           # Three.js 3D 组件
│   │   │   ├── StarField.tsx        # 粒子星空
│   │   │   ├── ParticleUniverse.tsx # 粒子宇宙
│   │   │   ├── NeuralNetwork.tsx    # 神经网络
│   │   │   └── BackgroundScene.tsx  # 合并场景
│   │   └── ui/              # UI 组件
│   │       ├── Navigation.tsx       # 导航栏
│   │       ├── GlowButton.tsx       # 发光按钮
│   │       ├── JobCard.tsx          # 岗位卡片
│   │       ├── TechRankingCard.tsx  # 技术排行卡片
│   │       ├── SectionHeading.tsx   # 标题组件
│   │       └── LoadingScreen.tsx    # 加载动画
│   ├── sections/             # 页面区块
│   │   ├── HeroSection.tsx         # 首页 Hero
│   │   ├── JobsUniverseSection.tsx  # 岗位宇宙展示
│   │   ├── TechRankingsSection.tsx # 技术排行榜
│   │   ├── SkillTreeSection.tsx    # AI 技能树
│   │   ├── TrendAnalysisSection.tsx # 趋势分析
│   │   └── Footer.tsx              # 页脚
│   ├── pages/                # 页面组件
│   │   ├── HomePage.tsx            # 首页
│   │   └── JobDetailPage.tsx       # 岗位详情页
│   ├── data/                 # 数据文件
│   │   ├── jobs.json               # 岗位数据
│   │   ├── techRankings.json       # 技术排行数据
│   │   ├── skillTree.json          # 技能树数据
│   │   └── trendData.json          # 趋势数据
│   ├── hooks/                # 自定义 Hooks
│   │   ├── useMousePosition.ts     # 鼠标位置追踪
│   │   ├── useScrollProgress.ts    # 滚动进度
│   │   ├── useCountUp.ts           # 数字滚动动画
│   │   ├── useMediaQuery.ts        # 响应式断点
│   │   ├── useParallax.ts          # 视差效果
│   │   └── useInView.ts            # 可见性检测
│   ├── utils/                # 工具函数
│   │   └── index.ts                # 通用工具函数
│   ├── types/                # TypeScript 类型
│   │   └── index.ts                # 类型定义
│   ├── styles/               # 全局样式
│   │   └── globals.css             # TailwindCSS 入口
│   ├── App.tsx               # 应用根组件
│   ├── main.tsx              # 应用入口
│   └── vite-env.d.ts         # Vite 类型声明
├── index.html                # HTML 模板
├── vite.config.ts            # Vite 配置
├── tailwind.config.js        # TailwindCSS 配置
├── postcss.config.js         # PostCSS 配置
├── tsconfig.json             # TypeScript 配置
└── package.json              # 项目依赖
```

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

启动后访问: `http://localhost:3000/ai-jobs-universe/`

### 生产构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录

### 部署到 GitHub Pages

```bash
npm run deploy
```

---

## 🎯 使用指南

### 导航系统

- **导航栏**: 点击导航项平滑滚动到对应区域，当前区域自动高亮
- **移动端菜单**: 点击汉堡图标展开/收起导航菜单

### 岗位浏览

- **分类过滤**: 点击分类标签（ALL/AI/WEB3/FRONTEND/BACKEND）筛选岗位
- **卡片交互**: 鼠标悬停显示 3D 悬浮效果，点击进入详情页

### 技术排行

- **分类切换**: 切换 AI TECH、WEB3 TECH、FRONTEND TECH、BACKEND TECH
- **实时数据**: 动态进度条展示技术热度

### 技能树

- **层级展示**: Level 1 到 Level 7 的技能递进
- **点击查看**: 点击技能节点查看详细描述

### 趋势分析

- **图表展示**: SVG 动画图表展示 24 个月趋势
- **预测数据**: 2025-2026 年技术增长预测

### 岗位详情页

- **详细信息**: 薪资、热度、市场需求、难度指标
- **学习路线**: 分阶段学习路径规划
- **相关岗位**: 推荐关联岗位

---

## 📊 数据说明

### 岗位数据来源

- LinkedIn
- Boss直聘
- 智联招聘
- 拉勾
- 猎聘
- Indeed
- Upwork
- CryptoJobs
- Web3 Career
- AI Job Board

### 岗位分类

| 分类 | 岗位数量 | 示例岗位 |
|------|----------|----------|
| AI | 7 | AI Agent Engineer, LLM Engineer, RAG Engineer |
| Web3 | 5 | Smart Contract Engineer, DeFi Engineer, Layer2 Engineer |
| Frontend | 4 | AI Frontend Engineer, Three.js Engineer, WebGL Engineer |
| Backend | 4 | AI Backend Engineer, Cloud Native Engineer, Distributed System Engineer |

---

## 🛡️ 性能优化

### 已实现优化

1. **代码分块**: Three.js、R3F、Framer Motion 独立 chunk
2. **动态导入**: 页面组件采用 lazy loading
3. **GPU 加速**: Three.js 使用 WebGL 渲染
4. **懒加载**: 图片和视频按需加载
5. **响应式设计**: 针对不同设备优化布局

### Lighthouse 指标目标

- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

---

## 🤝 贡献指南

### 开发流程

1. Fork 仓库
2. 创建特性分支: `git checkout -b feature/xxx`
3. 提交代码: `git commit -m 'feat: xxx'`
4. 推送到分支: `git push origin feature/xxx`
5. 提交 Pull Request

### 代码规范

- TypeScript 严格模式
- ESLint 代码检查
- Prettier 代码格式化
- 组件命名采用 PascalCase
- 文件命名采用 kebab-case

### 提交规范

```
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建/工具更新
```

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

- **Three.js** - 3D 渲染引擎
- **React Three Fiber** - React Three.js 封装
- **TailwindCSS** - 原子化 CSS 框架
- **GSAP** - 高性能动画库
- **Framer Motion** - React 动画库

---

## 📞 联系方式

- GitHub: [https://github.com](https://github.com)
- Twitter: [https://twitter.com](https://twitter.com)
- Discord: [https://discord.com](https://discord.com)

---

**Designed for the Future // Built for Tomorrow**  
*AI JOBS UNIVERSE v2.0*
