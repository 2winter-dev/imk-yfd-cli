#!/usr/bin/env node

import ora from 'ora';
import chalk from 'chalk';
import {program} from "commander";
import path from "path";
import Handlebars from 'handlebars';
import {existsSync, mkdirSync, cpSync, rmdirSync, readFileSync, writeFileSync, rmSync, cp} from 'fs'
import inquirer from 'inquirer';
import clone from 'download-git-repo';


const new_item_config = {};
(async () => {
    console.log(chalk.yellow('拉取中...'))
    clone('github:winterOmii/ms_store_tpl#master', './', {},function (err) {
            console.log(err ? "Error" : "Success", err);
            console.log(err);
    });





    //
    // let inkConfig = {
    //     tpl_path: 'https://github.com/winterOmii/ms_store_tpl.git',//模板项目路径默认本地
    // };
    // let current_pwd = process.cwd();
    // let IMKC, CURRENT_PATH;
    // let platform = (await inquirer.prompt({
    //     name: 'platform',
    //     message: '是OSX平台？',
    //     type: 'confirm',
    //     default: 'Y'
    // }, '')).platform;
    // if (platform) {
    //     platform = 'OSX';
    //     CURRENT_PATH = current_pwd + '/node_modules/imk-yfd-cli/bin/Config.js.tpl'
    //
    // } else {
    //     platform = 'Windows';
    //     CURRENT_PATH = current_pwd + '\\node_modules\\imk-yfd-cli\\bin\\Config.js.tpl'
    //
    // }
    // console.log(chalk.yellow('当前项目配置文件路径:' + CURRENT_PATH));
    // try {
    //     IMKC = readFileSync(CURRENT_PATH);
    // } catch (e) {
    //     console.log(chalk.red('载入配置文件失败:' + JSON.stringify(e)));
    //     process.exit()
    // }
    // if (!IMKC) {
    //     console.log(chalk.red('未发现配置文件'));
    //     process.exit();
    // }
    // let w_obj = await inquirer.prompt({name: 'new_item_name', message: '输入新项目名称'}, '')
    // if (!w_obj.new_item_name) {
    //     console.log(chalk.red('项目名称不可以为空！'));
    //     process.exit();
    // }
    // new_item_config.name = w_obj.new_item_name;
    //
    // w_obj = await inquirer.prompt({name: 'new_item_url', message: '输入新项目主域名'}, '')
    // if (!w_obj.new_item_url) {
    //     console.log(chalk.red('主域名不可以为空！'));
    //     process.exit();
    // }
    // new_item_config.new_item_url = w_obj.new_item_url;
    //
    // w_obj = await inquirer.prompt({name: 'new_item_woo_key', message: '输入Woo Key'}, '');
    // if (!w_obj.new_item_woo_key) {
    //     console.log(chalk.red('Woo Key不可以为空！'));
    //     process.exit();
    // }
    // new_item_config.new_item_woo_key = w_obj.new_item_woo_key;
    //
    // w_obj = await inquirer.prompt({name: 'new_item_woo_sec', message: '输入Woo Sec'}, '');
    // if (!w_obj.new_item_woo_sec) {
    //     console.log(chalk.red('Woo Sec不可以为空！'));
    //     process.exit();
    // }
    // new_item_config.new_item_woo_sec = w_obj.new_item_woo_sec;
    //
    // w_obj = await inquirer.prompt({name: 'new_item_stripe_key', message: '输入stripe key'}, '');
    // if (!w_obj.new_item_stripe_key) {
    //     console.log(chalk.red('stripe key不可以为空！'));
    //     process.exit();
    // }
    // new_item_config.new_item_stripe_key = w_obj.new_item_stripe_key;
    //
    // w_obj = await inquirer.prompt({name: 'new_item_oneSignal_id', message: '输入oneSignal id'}, '');
    // if (!w_obj.new_item_oneSignal_id) {
    //     console.log(chalk.red('oneSignal id不可以为空！'));
    //     process.exit();
    // }
    // new_item_config.oneSignal_id = w_obj.new_item_oneSignal_id;
    //
    // w_obj = await inquirer.prompt({name: 'new_item_android_package', message: '输入android包名'}, '');
    // if (!w_obj.new_item_android_package) {
    //     console.log(chalk.red('android包名不可以为空！'));
    //     process.exit();
    // }
    // new_item_config.new_item_android_package = w_obj.new_item_android_package;
    //
    // w_obj = await inquirer.prompt({name: 'new_item_ios_bundle', message: '输入iOS BundleID'}, '');
    // if (!w_obj.new_item_ios_bundle) {
    //     console.log(chalk.red('iOS BundleID不可以为空！'));
    //     process.exit();
    // }
    // new_item_config.new_item_ios_bundle = w_obj.new_item_ios_bundle;
    //
    // w_obj = await inquirer.prompt({name: 'tpl_path', message: '输入模板项目路径（URL）', default: inkConfig.tpl_path}, '');
    // if (!w_obj.tpl_path) {
    //     console.log(chalk.red('模板项目路径不可以为空！'));
    //     process.exit();
    // }
    // new_item_config.tpl_path = w_obj.tpl_path;
    //
    // console.log(chalk.green('配置如下:'))
    // console.table(new_item_config);
    // let next_obj = await inquirer.prompt({type: 'confirm', name: 'next_confirm', message: ""}, '是否使用该配置进行初始化项目?');
    // if (!next_obj.next_confirm) {
    //     console.log(chalk.red('已终止初始化'));
    //     process.exit();
    // }
    // console.log(chalk.green('创建新项目空间'))
    // let new_item_path = path.join(current_pwd, './' + new_item_config.name);
    // if (!existsSync(new_item_path)) {
    //     mkdirSync(new_item_path);
    // }
    // let spinner = ora().start('开始检查模板文件');
    // spinner.prefixText = 'imk-yfd-cli';
    // spinner.succeed('开始拉取模板文件到当前项目路径...')
    // try {
    //
    //
    //     cpSync(new_item_config.tpl_path, new_item_path, {
    //         recursive: true, force: true, filter(source, destination) {
    //
    //             let exList = [
    //                 `${new_item_config.tpl_path}/.git.*?`,
    //                 `${new_item_config.tpl_path}/node_modules.*?`,
    //                 `${new_item_config.tpl_path}/android.*?`,
    //                 `${new_item_config.tpl_path}/ios.*?`,
    //             ];
    //             for (let i of exList) {
    //                 if (source.match(i)) {
    //                     console.log(chalk.yellow(source + ':路径跳过！'))
    //                     return false;
    //                 }
    //             }
    //
    //             console.log(chalk.green('复制OK：' + source));
    //             return true;
    //
    //         }
    //     });
    //
    // } catch (e) {
    //     spinner.fail('复制失败:' + chalk.red(JSON.stringify(e)))
    // }
    //
    // spinner.succeed('复制完成')
    // spinner.start('开始更新配置...');
    // spinner.prefixText = 'imk-yfd-cli:98%';
    // //读取模板文件
    // try {
    //     let preConfigTpl = Handlebars.compile(IMKC.toString());
    //     let newPreConfig = preConfigTpl(new_item_config);
    //     writeFileSync(new_item_path + '/src/common/Config.js', newPreConfig);//更新模板APP配置
    //     //更新Package.js配置
    //     //更新app.json配置
    //     spinner.prefixText = 'imk-yfd-cli:100%'
    //     spinner.succeed(chalk.green('配置更新完成'));
    //     spinner.succeed(chalk.yellow('接下来需要： 1.cd ios && pod install 安装iOS端依赖后运行react-native run-ios'))
    //     spinner.succeed(chalk.yellow('2.iOS端使用Xcode打开xwork:space!!!!文件后，设置开发者签名与BundleID以及权限,另外iOS需要复制项目目录scripts下FacebookSDK文件夹到~/Facexxxx'))
    //     spinner.succeed(chalk.yellow('3.设置firebase与woo后端,提示：下载对应的service文件'))
    //     spinner.succeed(chalk.yellow('4.如果无法运行，请执行对应平台:src/scripts/*.sh'))
    //     process.exit();
    // } catch (e) {
    //     spinner.fail(chalk.red('更新配置错误：' + JSON.stringify(e)));
    //     process.exit();
    // }

})()









