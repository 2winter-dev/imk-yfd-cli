#!/usr/bin/env node

import ora from 'ora';
import chalk from 'chalk';

import {program} from "commander";
import path from "path";

import {existsSync, mkdirSync, cpSync, rmdirSync, readFileSync, writeFileSync,rmSync,cp} from 'fs'
import inquirer from 'inquirer';

const new_item_config = {};
(async () => {


    let current_pwd = process.cwd();
    //TODO 修改为bin路径
    let IMKC = readFileSync(current_pwd + '/bin/Config.js.tpl');
    if (!IMKC) {
        console.log(chalk.red('未发现配置文件'));
        process.exit();
    }

    let w_obj = await inquirer.prompt({name: 'new_item_name', message: '输入新项目名称'}, '')
    if (!w_obj.new_item_name) {
        console.log(chalk.red('项目名称不可以为空！'));
        process.exit();
    }
    new_item_config.name = w_obj.new_item_name;
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
    // new_item_config.stripe_key = w_obj.new_item_stripe_key;
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

    w_obj = await inquirer.prompt({name: 'tpl_path', message: '输入模板项目路径（绝对路径，暂不支持URL）',default:'/Users/apple/Documents/GitHub/poetic-hous/scripts'}, '');
    if (!w_obj.tpl_path) {
        console.log(chalk.red('模板项目路径不可以为空！'));
        process.exit();
    }
    new_item_config.tpl_path = w_obj.tpl_path;

    console.log(chalk.green('配置如下:'))
    console.table(new_item_config);
    let next_obj = await inquirer.prompt({type: 'confirm', name: 'next_confirm', message: ""}, '是否使用该配置进行初始化项目?');
    if (!next_obj.next_confirm) {
        console.log(chalk.red('已终止初始化'));
        process.exit();
    }
    let spinner = ora().start('开始检查模板文件');
    spinner.prefixText = 'imk-yfd-cli';
    if (!existsSync(new_item_config.tpl_path)) {
        spinner.fail('模板路径不存在！');
        process.exit();
    }

    let new_item_path = path.join(current_pwd, './' + new_item_config.name);
    if (!existsSync(new_item_path)) {
        mkdirSync(new_item_path);
    }
    spinner.text = '开始复制模板文件到当前项目路径...';
    spinner.start('复制中，耐心等待...');
    try{
         cpSync(new_item_config.tpl_path,new_item_path,{recursive:true,force:true,filter(source, destination) {
             console.log(source)
             }});
        spinner.succeed('复制完成')
    }catch (e){
        spinner.fail('复制失败:'+chalk.red(JSON.stringify(e)))
    }
//     spinner.start('配置处理...');
//     spinner.prefixText = '更新配置';
//     let pk = readFileSync(new_item_path + '/package.json');
//
//     if (pk) {
//         let pk2 = JSON.parse(pk.toString());
//         pk2.name = IMKC.name;
//         writeFileSync(new_item_path + '/package.json', JSON.stringify(pk2), {flag: 'w'})
//         spinner.succeed(chalk.yellow('更新:Package.json成功'));
//     } else {
//         spinner.fail('更新:Package.json 失败')
//     }
//     let new_item_src = new_item_path + '/src';
//
//     let oldWooConfig = readFileSync(new_item_src + '/common/Config.js.tpl').toString();
//
//     if (oldWooConfig) {
//
//         // oldWooConfig.replace(/WooCommerce.*?}/g,JSON.stringify(IMKC.WooCommerce));
//         // oldWooConfig.replace(/OneSignal.*?}/g,JSON.stringify(IMKC.OneSignal));
//         // oldWooConfig.replace(/Stripe.*?}/g,JSON.stringify(IMKC.Stripe));
//
//         writeFileSync(new_item_src+'/common/Config.js.tpl',oldWooConfig.toString(),{flag:'w'});
//         spinner.succeed(chalk.yellow('woo,OneSignal,Stripe 配置更新完成  '));
//
//     } else {
//         spinner.fail(chalk.red('文件不存在！'))
//     }

})()









