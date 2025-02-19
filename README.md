# scan-analysis-local
scan-analysis-local

## 本地开发

step1: 配置config.js
```js
taskId: 任务id
taskCode: 任务code
token: 令牌
```

step2: 执行本地脚本

```bash
# 拉取代码
pnpm run scan:local
# 上传结果
pnpm run upload:local
```
