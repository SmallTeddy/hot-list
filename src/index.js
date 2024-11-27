#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const open = require('open');
const ora = require('ora');
const chalk = require('chalk');
const { ResourceUtil } = require("./common/resource-util");
const { Resources } = require("./resources");
// const { getDouyin } = require('./platforms/douyin');
// const { getWeibo } = require('./platforms/weibo');
// const { getTencent } = require('./platforms/tencent');
// const { getBaidu } = require('./platforms/baidu');
// const { getBilibili } = require('./platforms/bilibili');
// const { get36Kr } = require('./platforms/36kr');
// const { getZhihu } = require('./platforms/zhihu');
// const { getIthome } = require('./platforms/ithome');
// const { getSspai } = require('./platforms/sspai');
// const { getThepaper } = require('./platforms/thepaper');
// const { getDouban } = require('./platforms/douban');
// const { getJuejin } = require('./platforms/juejin');
// const { getNetease } = require('./platforms/netease');
// const { getWeread } = require('./platforms/weread');
// const { getHellogithub } = require('./platforms/hellogithub');
// const { getJianshu } = require('./platforms/jianshu');

const platforms = {
  'all': '所有平台',
  'douyin': '抖音热搜',
  'weibo': '微博热搜',
  'tencent': '腾讯新闻',
  'baidu': '百度热搜',
  'bilibili': 'B站热搜',
  '36kr': '36氪热搜',
  'zhihu': '知乎热搜',
  'ithome': 'IT之家热榜',
  'sspai': '少数派热榜',
  'thepaper': '澎湃新闻',
  'douban': '豆瓣电影',
  'juejin': '掘金热榜',
  'netease': '网易新闻',
  'weread': '微信读书',
  'hellogithub': 'HelloGitHub',
  'jianshu': '简书热榜'
};

async function showHotList(items, platformName) {
  if (!items || items.length === 0) {
    console.log(chalk.yellow('暂无数据'));
    return;
  }

  const choices = items.map((item, index) => ({
    name: `${index + 1}. ${item.title} ${item.hot ? `(🔥${item.hot})` : ''}`,
    value: item.url || item.link || ''
  }));

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'url',
      message: `${platformName}热搜列表(使用上下键选择，回车打开链接):`,
      choices: [...choices, new inquirer.Separator(), { name: '返回主菜单', value: 'back' }],
      pageSize: 15
    }
  ]);

  if (answer.url === 'back') {
    console.clear();
    return;
  }

  if (answer.url) {
    await open(answer.url);
  } else {
    console.log(chalk.yellow('该条目暂无链接'));
  }

  // 打开链接后询问是否继续浏览当前平台
  const { continue: shouldContinue } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: '是否继续浏览该平台热搜?',
      default: true
    }
  ]);

  if (shouldContinue) {
    await showHotList(items, platformName);
  } else {
    console.clear();
  }
}

async function showList(items, platform) {
  const spinner = ora('正在获取热搜数据...').start();
  try {
    if (platform === 'all') {
      spinner.succeed('获取成功！');
      const platformNames = Object.keys(items);
      // 展示所有平台数据的选择列表
      const allPlatformChoices = platformNames.map((name, index) => ({
        name: `${name} (${items[name].length}条)`,
        value: { data: items[name], name }
      }));

      const { platform: selectedPlatform } = await inquirer.prompt([
        {
          type: 'list',
          name: 'platform',
          message: '选择要查看的平台:',
          choices: allPlatformChoices,
          pageSize: platformNames.length
        }
      ]);
      await showHotList(selectedPlatform.data, selectedPlatform.name);
    } else {
      spinner.succeed('获取成功！');
      await showHotList(items, platforms);
    }
  } catch (error) {
    spinner.fail('获取失败！');
    console.error(error);
  }
}

async function main() {
  console.log(chalk.cyan('热搜聚合工具'));
  console.log(chalk.gray('请输入数字选择要查看的平台:'));
  ResourceUtil.init(Resources);
  const list = [{ name: "所有平台", type: 'all' }, ...ResourceUtil.getAllResourceTypeList()]
  const choices = list.map((item, index) => ({
    name: item.name,
    value: item
  }));
  const answer = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'platform',
      message: '选择平台:',
      choices: choices,
      pageSize: choices.length
    }
  ]);
  const finals = await ResourceUtil.getResource(answer.platform)
  await showList(finals, answer.platform.type);
  // 询问是否继续查看其他平台
  const { continue: shouldContinue } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: '是否查看其他平台?',
      default: true
    }
  ]);

  if (shouldContinue) {
    console.clear();
    main();
  } else {
    console.log(chalk.cyan('\n感谢使用!'));
    process.exit(0);
  }
}

// 启动程序
main().catch(console.error); 
