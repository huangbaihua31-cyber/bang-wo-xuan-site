# 帮我选官网

选择困难？交给随机。中文、手机优先的 App 官网，包含随机体验、功能介绍、Android APK 下载与安装说明。

- 官网：https://huangbaihua31-cyber.github.io/bang-wo-xuan-site/
- APK：https://github.com/huangbaihua31-cyber/bang-wo-xuan-site/releases/download/v1.0.0/bang-wo-xuan-1.0.0.apk

## 文件

- `site/`：原生 HTML、CSS、JavaScript，零依赖静态页面。
- `.github/workflows/pages.yml`：GitHub Pages 发布流程。
- `scripts/check-site.mjs`：发布前检查。

APK 使用现有 1.0.0 版本。完整安装包发布在仓库 Releases，下载按钮直接访问 Release 文件，不依赖 Expo 临时链接，不把 APK 大文件放进 Git 历史。网站不读取定位、不保存随机记录；附近地点在当前 APK 中仍为虚构演示，真实地点 API 尚未接通。APK 仅支持安卓。

安装包 SHA256：`82702017171bdbef60053c5fea24e0569dbeb212f3751d8171ad5329bb86cf9e`，大小 107,283,924 字节。安装包完整性已检查，安卓真机安装尚未测试。

GitHub Pages 使用 GitHub Actions，在仓库 Settings → Pages 中将 Source 设为 GitHub Actions。当前默认分支为 `codex/website`，推送后会自动检查并发布 `site/` 目录。发布前须将页面 APK 入口设为真实 Release 下载链接；检查脚本会拒绝未配置的下载链接。

本地预览可在 `site/` 目录使用任意静态 HTTP 服务。无需构建，无需 API Key。
