module.exports = {
  // 任务id
  taskId: '37',
  // 任务code
  taskCode: '4bac3fs57-50k0-4b4d-bdc4-bc1fd56e7679',
  // 令牌
  token: 'your-secret-token',
  // 获取配置地址
  getConfigUrl: `${process.env.origin}/api/task/getById`,
  // 上传结果地址
  uploadUrl: `${process.env.origin}/api/result/sync`,
  // 上传结果contentType
  contentType: 'application/json; charset=utf-8',
  // 结果目录
  resourcesDir: 'resources',
  // 扫描结果目录
  scanResultDir: 'scan-results',
  // 最大并发数
  maxWorkerNum: 4
}
