# uView + uni-app + Tailwind CSS 模板

基于 uni-app、Vite、Vue 3 + Tailwind CSS 的模板仓库

本项目已经集成 [weapp-ide-cli](https://www.npmjs.com/package/weapp-ide-cli)，可以通过 CLI 对 IDE 进行额外操作。

## 快速开始

使用 [pnpm](https://pnpm.io) 包管理器。

```ts
# 安装依赖
pnpm i

# 开发模式（使用开发环境配置），支持热更新
pnpm dev:mp

# 开发模式（使用生产环境配置），支持热更新
pnpm prod:mp

# 发行模式，最终上传代码时请使用这个产物
pnpm build:mp
```

使用微信开发者工具导入目录（`dev:mp` 和 `prod:mp` 的产物都在 `dist/dev/mp-weixin`，`build:mp` 的产物在 `dist/build/mp-weixin`），即可预览。开发模式下，保存文件会触发增量编译，发行模式则不会。

微信开发者工具内置了一个 “热重载” 功能（在 IDE 的左上角，手机型号右边），有时候会和 uni-app 的热重载冲突，建议关闭。

## Tips

- 环境变量可以利用 Vite 的[特性](https://cn.vitejs.dev/guide/env-and-mode.html)来配置，开发环境的配置填写在 `.env.development`，生产环境的配置填写在 `.env.production`。

  需要注意，变量应该以 `VITE_` 开头，否则可能不会被 Vite 识别。举例：

  ```
  # .env.development
  VITE_API_URL = http://localhost:1234
  ```

  在代码中通过 `import.meta.env.VITE_API_URL` 来访问环境变量。可以把 TypeScript 类型定义写在 [src/types/env.d.ts](./src/types/env.d.ts)。

- 升级 uni-app 依赖：执行 `npx @dcloudio/uvm` 后，选择 pnpm 包管理器。uvm 会安装所有平台的依赖，建议每次升级完后删除不必要的依赖，仅保留正在开发的平台。

- 交互式升级其它依赖：`pnpm up -i --latest`

  > 可以设置代理以加速 pnpm 安装，以 Clash 7890 端口为例：`export http_proxy=http://127.0.0.1:7890 https_proxy=http://127.0.0.1:7890 all_proxy=http://127.0.0.1:7890`。也可以修改 pnpm 的镜像源。

- 如果升级 Pinia 的版本后出现 `hasInjectionContext is not exported` 相关的错误，可参考 [pinia/issues/2210](https://github.com/vuejs/pinia/issues/2210)
