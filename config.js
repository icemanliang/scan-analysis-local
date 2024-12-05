module.exports = {
  // 任务id
  taskId: '6',
  // 任务code
  taskCode: 'xxx',
  // 令牌
  token: 'xxx',
  // 获取配置地址
  getConfigUrl: 'http://iceman.analysis.cn/analysis/task',
  // 上传结果地址
  uploadUrl: 'http://iceman.analysis.cn/analysis/result/sync',
  // 上传结果contentType
  contentType: 'application/json; charset=utf-8',
  // 结果目录
  resourcesDir: 'resources',
  // 扫描结果目录
  scanResultDir: 'scan-results',
  // 最大并发数
  maxWorkerNum: 4
}
