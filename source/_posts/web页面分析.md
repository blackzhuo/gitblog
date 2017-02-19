title: web页面分析
keywords: web页面分析,webapp分析,页面分析,Lighthouse
description: web页面分析
tags: web
toc: true
date: 2017-02-19 21:24:03
---
webapp在我们日常生活中随处可见，性能问题也是常常谈起，有一个好的性能分析工具，收集展示平台，能够辅助我们去优化我们的页面。今天介绍一个github上开源的webapp以及web页面的分析工具[Lighthouse](https://github.com/GoogleChrome/lighthouse)。
Lighthouse能够分析web app以及web页面，能够收集现代性能指标以及给出最佳实践的建议。

<!--more-->

#### 环境要求
Chrome 56+
NodeJs 6+

#### setup
npm install -g lighthouse

#### use
##### 输出到控制台
使用控制台收集展示页面新能信息:
lighthouse https://baidu.com/ 
会打开chrome进行性能分析，页面加载过程截图以及数据收集

##### 输出到文件
lighthouse https://baidu.com --output-path=~/loginfo/foo.out --save-assets
会生成5个文件，包括性能分析的json数据文件，html展示页面，以及html截图文件等。

##### chrome真机调试
adb forward tcp:9222 localabstract:chrome_devtools_remote
lighthouse --disable-device-emulation --disable-cpu-throttling https://baidu.com/

##### 编写程序测试
使用nodejs编写程序进行真机测试
npm install lighthouse --save
```javascript
const Lighthouse = require('lighthouse');
const ChromeLauncher = require('lighthouse/lighthouse-cli/chrome-launcher.js').ChromeLauncher;
const Printer = require('lighthouse/lighthouse-cli/printer');

function launchChromeAndRunLighthouse(url, flags, config) {
  const launcher = new ChromeLauncher({port: 9222, autoSelectChrome: true});

  return launcher.isDebuggerReady()
    .catch(() => {
      if (flags.skipAutolaunch) {
        return;
      }
      return launcher.run(); // Launch Chrome.
    })
    .then(() => Lighthouse(url, flags, config)) // Run Lighthouse.
    .then(results => launcher.kill().then(() => results)) // Kill Chrome and return results.
    .catch(err => {
      // Kill Chrome if there's an error.
      return launcher.kill().then(() => {
        throw err;
      }, console.err);
    });
}

// Use an existing config or create a custom one.
const config = require('lighthouse/lighthouse-core/config/perf.json');
const url = 'https://example.com';
const flags = {output: 'html'};

launchChromeAndRunLighthouse(url, flags, config).then(lighthouseResults => {
  lighthouseResults.artifacts = undefined; // You can save the artifacts separately if so desired
  return Printer.write(lighthouseResults, flags.output);
}).catch(err => console.error(err));
```

获取页面评分
```javascript
function getOverallScore(lighthouseResults) {
  const scoredAggregations = lighthouseResults.aggregations.filter(a => a.scored);
  const total = scoredAggregations.reduce((sum, aggregation) => sum + aggregation.total, 0);
  return (total / scoredAggregations.length) * 100;
}
```

#### help
```bash
amos@ubuntu:~$ lighthouse --help
lighthouse url

Logging:
  --verbose  Displays verbose logging                                  [boolean]
  --quiet    Displays no progress, debug logs or errors                [boolean]

Configuration:
  --save-assets            Save the trace contents & screenshots to disk
                                                                       [boolean]
  --save-artifacts         Save all gathered artifacts to disk         [boolean]
  --list-all-audits        Prints a list of all available audits and exits
                                                                       [boolean]
  --list-trace-categories  Prints a list of all required trace categories and
                           exits                                       [boolean]
  --config-path            The path to the config JSON.
  --perf                   Use a performance-test-only configuration   [boolean]
  --port                   The port to use for the debugging protocol. Use 0 for
                           a random port                          [默认值: 9222]

Output:
  --output       Reporter for the results
                           [可选值: "pretty", "json", "html"] [默认值: "pretty"]
  --output-path  The file path to output the results
                 Example: --output-path=./lighthouse-results.html
                                                              [默认值: "stdout"]

选项：
  --help                        显示帮助信息                           [boolean]
  --version                     显示版本号                             [boolean]
  --disable-device-emulation    Disable Nexus 5X emulation             [boolean]
  --disable-cpu-throttling      Disable CPU throttling  [boolean] [默认值: true]
  --disable-network-throttling  Disable network throttling             [boolean]
  --skip-autolaunch             Skip autolaunch of Chrome when already running
                                instance is not found                  [boolean]
  --select-chrome               Interactively choose version of Chrome to use
                                when multiple installations are found  [boolean]
  --interactive                 Open Lighthouse in interactive mode    [boolean]

```