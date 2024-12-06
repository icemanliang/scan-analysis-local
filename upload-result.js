const fs = require('fs');
const zlib = require('zlib');
const axios = require('axios');
const path = require('path');
const { taskId, taskCode, token, uploadUrl, contentType, resourcesDir, getConfigUrl } = require('./config');
const { execSync } = require('child_process');

// 获取配置
const getConfig = () => {
  return axios.post(getConfigUrl+'?id='+taskId, {}, {
    headers: {
      'Content-Type': contentType,
      'x-token': token
    }
  }).then((res) => {
    return res.data;
  }).catch((error) => {
    console.error('upload failed:', error);
  });
}
// 获取commitId
const getCommitId = (appName) => {
  const appPath = path.join(__dirname, resourcesDir, appName);
  try {
    // 执行 git 命令获取最新的 commit ID
    const commitId = execSync('git rev-parse HEAD', { cwd: appPath }).toString().trim().slice(0, 8);
    return commitId;
  } catch (error) {
    console.error(`获取 ${appName} 的 commit ID 时发生错误:`, error);
    return null;
  }
}
// 上传结果
const uploadResult = (result) => {
  return axios.post(uploadUrl, result, {
    headers: {
      'Content-Type': contentType,
      'x-token': token
    }
  }).then((res) => {
    console.log('upload result:', res.data);
  }).catch((error) => {
    console.error('upload failed:', error);
  });
}
// 获取appId
const getAppId = (config, name) => {
  return config.info.apps.find(app => app.name === name).id;
}
// 获取repoName
const getRepoName = (config, name) => {
  const repo = config.info.apps.find(app => app.name === name).repo;
  return repo.split('/').pop().replace('.git', '');
}
// 压缩结果
const zip = (filePath) => {
  const zipBuffer = zlib.gzipSync(fs.readFileSync(filePath, 'utf8'));
  return zipBuffer.toString('base64');
}
// 格式结果
const formatResult = (config, result) => {
  const scanResults = {
    task_id: taskId,
    task_code: taskCode,
    cost_time: result.scanTotalTime,
    task_log: zip(result.scanLogFile),
    app_results: []
  };
  
  result.scanResults.forEach((appResult) => {
    const resultContent = zip(appResult.resultFile);
    const logContent = zip(appResult.logFile);

    const zipResult = {
      app_id: getAppId(config, appResult.appName),
      cost_time: appResult.duration,
      app_log: logContent,
      commit_id: getCommitId(getRepoName(config, appResult.appName)),
      result_json: resultContent
    };
    scanResults.app_results.push(zipResult);
  });

  return scanResults;
}

// 开始上传
const startUpload = async () => {
  // 1. 获取配置
  const config = await getConfig();
  // 2. 读取结果
  const result = fs.readFileSync(path.join(__dirname, 'scan-results/manifest.json'), 'utf8');
  // 3. 格式结果 
  const formattedResult = formatResult(config, JSON.parse(result));
  // console.log('formatted result:', formattedResult);
  // 4. 上传结果
  await uploadResult(formattedResult);
}
  
startUpload();
