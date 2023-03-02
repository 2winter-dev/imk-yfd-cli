#!/usr/bin/env node

import ora from 'ora';
import chalk from 'chalk';
import path from "path";
import Handlebars from 'handlebars';
import {existsSync, mkdirSync, cpSync, rmdirSync, readFileSync, writeFileSync,rmSync,cp} from 'fs'
import inquirer from 'inquirer';
import  clone from 'download-git-repo';

/**
 * @author yfd
 * @link winter_986@qq.com
 * @type {{}}
 */
const new_item_config = {};
(async () => {
    let current_pwd = process.cwd();
    let IMKC,CURRENT_PATH;
    let platform = (await  inquirer.prompt({name:'platform',message:'请提前准备好：WP后台密钥与其他配置密钥,是否使用OSX系统？',type:'confirm',default:'Y'},'')).platform;
    if(platform){
        CURRENT_PATH = current_pwd + '/node_modules/imk-yfd-cli/bin/Config.js.tpl'

    }else{

        CURRENT_PATH = current_pwd + '\\node_modules\\imk-yfd-cli\\bin\\Config.js.tpl'

    }
    console.log(chalk.yellow('当前项目配置文件路径:'+CURRENT_PATH ));
    try{
        IMKC = readFileSync(CURRENT_PATH);
    }catch (e){
        console.log(chalk.red('载入配置文件失败:'+JSON.stringify(e)));
        process.exit()
    }
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

    w_obj = await inquirer.prompt({name: 'new_item_url', message: '输入新项目主域名'}, '')
    if (!w_obj.new_item_url) {
        console.log(chalk.red('主域名不可以为空！'));
        process.exit();
    }
    new_item_config.new_item_url = w_obj.new_item_url;

    w_obj = await inquirer.prompt({name: 'new_item_woo_key', message: '输入Woo Key'}, '');
    if (!w_obj.new_item_woo_key) {
        console.log(chalk.red('Woo Key不可以为空！'));
        process.exit();
    }
    new_item_config.new_item_woo_key = w_obj.new_item_woo_key;

    w_obj = await inquirer.prompt({name: 'new_item_woo_sec', message: '输入Woo Sec'}, '');
    if (!w_obj.new_item_woo_sec) {
        console.log(chalk.red('Woo Sec不可以为空！'));
        process.exit();
    }
    new_item_config.new_item_woo_sec = w_obj.new_item_woo_sec;

    w_obj = await inquirer.prompt({name: 'new_item_stripe_key', message: '输入stripe key'}, '');
    if (!w_obj.new_item_stripe_key) {
        console.log(chalk.red('stripe key不可以为空！'));
        process.exit();
    }
    new_item_config.new_item_stripe_key = w_obj.new_item_stripe_key;

    // w_obj = await inquirer.prompt({name: 'new_item_oneSignal_id', message: '输入oneSignal id'}, '');
    // if (!w_obj.new_item_oneSignal_id) {
    //     console.log(chalk.red('oneSignal id不可以为空！'));
    //     process.exit();
    // }
    // new_item_config.oneSignal_id = w_obj.new_item_oneSignal_id;

    w_obj = await inquirer.prompt({name: 'new_item_android_package', message: '输入android包名'}, '');
    if (!w_obj.new_item_android_package) {
        console.log(chalk.red('android包名不可以为空！'));
        process.exit();
    }
    new_item_config.new_item_android_package = w_obj.new_item_android_package;

    w_obj = await inquirer.prompt({name: 'new_item_ios_bundle', message: '输入iOS BundleID'}, '');
    if (!w_obj.new_item_ios_bundle) {
        console.log(chalk.red('iOS BundleID不可以为空！'));
        process.exit();
    }
    new_item_config.new_item_ios_bundle = w_obj.new_item_ios_bundle;


    w_obj = await inquirer.prompt({name: 'ios_services_path', message: '输入iOS:GoogleService-Info.list绝对路径'}, '');
    if (!w_obj.ios_services_path) {
        // console.log(chalk.red('iOS:GoogleService-Info.list不可以为空！'));
        // process.exit();
    }
    new_item_config.ios_services_path  = w_obj.ios_services_path;


    w_obj = await inquirer.prompt({name: 'android_services_path', message: '输入Android:google-services.json绝对路径'}, '');
    if (!w_obj.android_services_path) {
        // console.log(chalk.red('Android:google-services.json不可以为空！'));
        // process.exit();
    }
    new_item_config.android_services_path = w_obj.android_services_path;



    let TPL_PATH ='';
    new_item_config.tpl_path = TPL_PATH;
    w_obj = await inquirer.prompt({name: 'remote_git_path', message: '输入远程地址 github:用户名/项目#分支'}, '');
    if (!w_obj.remote_git_path) {
        console.log(chalk.red('仓库地址不可以为空，格式 github:用户名/项目#分支'));
        process.exit();
    }
    TPL_PATH = w_obj.remote_git_path;
    new_item_config.tpl_path = TPL_PATH;
    if(!TPL_PATH){
        ora().fail('请配置远程仓库:github:用户名/项目#分支');
        process.exit();
    }
    console.log(chalk.green('配置如下:'))
    console.table(new_item_config);
    let next_obj = await inquirer.prompt({type: 'confirm', name: 'next_confirm', message: ""}, '是否使用该配置进行初始化项目?');
    if (!next_obj.next_confirm) {
        console.log(chalk.red('已终止初始化'));
        process.exit();
    }
    let spinner = ora().start('准备拉取仓库....');
    spinner.prefixText = 'imk-yfd-cli';


    let new_item_path = path.join(current_pwd, './' + new_item_config.name);
    if (!existsSync(new_item_path)) {
        mkdirSync(new_item_path);
    }

    spinner = ora().start('开始拉取仓库模板文件到当前项目路径...');


    clone(TPL_PATH,new_item_path,{},function (err){
        console.log(err ? "Error" : "Success", err);
        if(err){
            spinner.fail(err);
            process.exit();
        }else{
            spinner.succeed('拉取完成！');
            spinner.succeed('复制完成')
            spinner.start('开始更新配置...');
            spinner.prefixText = 'imk-yfd-cli:98%';
            //读取模板文件
            try{

                let preConfigTpl = Handlebars.compile(IMKC.toString());
                let newPreConfig = preConfigTpl(new_item_config);
                writeFileSync(new_item_path+'/src/common/Config.js',newPreConfig);
                spinner.prefixText='imk-yfd-cli:100%'
                spinner.succeed(chalk.green('配置更新SUCCESS'));
                ora().start('开始复制Service');
                if(!existsSync(new_item_config.android_services_path)){
                    ora().fail(new_item_config.android_services_path + ':services文件不存在或无法读取！');
                   // process.exit();
                }else{
                    cpSync(new_item_config.android_services_path,new_item_path+'/android/app/google-services.json');
                }

                if(!existsSync(new_item_config.ios_services_path)){
                    ora().fail(new_item_config.ios_services_path + ':services文件不存在或无法读取！');
                  //  process.exit();
                }else{
                    cpSync(new_item_config.ios_services_path,new_item_path+'/ios/GoogleService-Info.list');
                }

                //更新android包名
                ora().start('更新android包名...');
                //更新app/build.gradle
                try{
                    let gradleTpl = Handlebars.compile(readFileSync(new_item_path+'/android/app/build.gradle').toString());
                    if(!gradleTpl){
                        ora().fail(new_item_path+'/android/app/build.gradle'+'文件读取失败')
                        process.exit();
                    }
                    let newGradle = gradleTpl(new_item_config);
                    writeFileSync(new_item_path+'/android/app/build.gradle',newGradle);
                    ora().succeed('更新app/build.gradle成功')
                }catch (e){
                    ora().fail('更新app/build.gradle失败自动跳过...');
                    console.log(chalk.red(e));
                }
                //根系AndroidManifest.xml
                try{
                    let xmlTpl = Handlebars.compile(readFileSync(new_item_path+'/android/app/src/main/AndroidManifest.xml').toString());
                    if(!xmlTpl){
                        ora().fail(new_item_path+'/android/app/src/main/AndroidManifest.xml'+'文件读取失败')
                        process.exit();
                    }
                    let newXml = xmlTpl(new_item_config);
                    writeFileSync(new_item_path+'/android/app/src/main/AndroidManifest.xml',newXml);
                    ora().succeed('更新/android/app/src/main/AndroidManifest.xml成功')
                }catch (e){
                    ora().fail('更新/android/app/src/main/AndroidManifest.xml失败自动跳过...');
                    console.log(chalk.red(e));
                }

                //更新string.xml
                try{

                    let xml2Tpl = Handlebars.compile(readFileSync(new_item_path+'/android/app/src/main/res/values/strings.xml').toString());
                    if(!xml2Tpl){
                        ora().fail(new_item_path+'/android/app/src/main/res/values/strings.xml'+'文件读取失败')
                        process.exit();
                    }
                    let newXml2 = xml2Tpl(new_item_config);
                    writeFileSync(new_item_path+'/android/app/src/main/res/values/strings.xml',newXml2);
                    ora().succeed('更新/android/app/src/main/res/values/strings.xml成功');

                    //更新package.json

                    let xml3Tpl = Handlebars.compile(readFileSync(new_item_path+'/package.json').toString());
                    if(!xml3Tpl){
                        ora().fail(new_item_path+'/package.json'+'文件读取失败')
                        process.exit();
                    }
                    let newXml3 = xml3Tpl(new_item_config);
                    writeFileSync(new_item_path+'/package.json',newXml3);
                    ora().succeed('更新/package.json成功');
                }catch (e){
                    ora().fail('更新/android/app/src/main/res/values/strings.xml失败自动跳过...');
                    console.log(chalk.red(e));

                }

                //更新java包名
                try{
                    let javaTpl = Handlebars.compile(readFileSync(new_item_path+'/android/app/src/main/java/com/msstore/poetichouse/MainActivity.java').toString());
                    if(!javaTpl){
                        ora().fail(new_item_path+'MainActivity.java'+'文件读取失败')
                        process.exit();
                    }
                    let newJava =javaTpl(new_item_config);
                    writeFileSync(new_item_path+'/android/app/src/main/java/com/msstore/poetichouse/MainActivity.java',newJava);

                    let javaTpl2 = Handlebars.compile(readFileSync(new_item_path+'/android/app/src/main/java/com/msstore/poetichouse/SplashActivity.java').toString());
                    if(!javaTpl2){
                        ora().fail(new_item_path+'/SplashActivity.java'+'文件读取失败')
                        process.exit();
                    }
                    let newJava2 =javaTpl2(new_item_config);
                    writeFileSync(new_item_path+'/android/app/src/main/java/com/msstore/poetichouse/SplashActivity.java',newJava2);

                    let javaTpl3 = Handlebars.compile(readFileSync(new_item_path+'/android/app/src/main/java/com/msstore/poetichouse/MainApplication.java').toString());
                    if(!javaTpl3){
                        ora().fail(new_item_path+'/MainApplication.java'+'文件读取失败')
                        process.exit();
                    }
                    let newJava3 =javaTpl3(new_item_config);
                    writeFileSync(new_item_path+'/android/app/src/main/java/com/msstore/poetichouse/MainApplication.java',newJava3);

                    ora().succeed('更新java包完成')

                }catch (e){
                    ora().fail('更新/android/app/src/main/java包失败自动跳过...');
                    console.log(chalk.red(e));
                }
                //更新buk
                ora().start('开始更新buck');
                try{
                    let BUCKTpl = Handlebars.compile(readFileSync(new_item_path+'/android/app/BUCK').toString());
                    if(!BUCKTpl ){
                        ora().fail(new_item_path+'/android/app/BUCK'+'文件读取失败')
                        process.exit();
                    }
                    let newBUCK = BUCKTpl(new_item_config);
                    writeFileSync(new_item_path+'/android/app/BUCK',newBUCK);
                    ora().succeed('更新/android/app/src/main/BUCK成功')
                }catch (e){
                    ora().fail('更新/android/app/src/main/BUCK失败自动跳过...');
                    console.log(chalk.red(e));
                }
                ora().succeed('BUCK更新完成');
                spinner = ora().start('已完成模板配置，请CD到'+w_obj.name+'，执行react-native run-android --deviceId="你的设备ID"...')
                spinner.succeed(chalk.yellow('1.iOS接下来需要：安装POD，更改BundleId与开发者，复制FacebookSDK到～/'))
                spinner.succeed(chalk.yellow('2.Android端执行RN命令'))
                spinner.succeed(chalk.yellow('3.Web后台：设置firebase（短信，Database，Services）与WP后端（key，sec，API ）'))
                spinner.succeed(chalk.yellow('4.如果无法运行，请查看对应平台:src/scripts/*.sh'))
                process.exit();
            }catch (e){
                spinner.fail(chalk.red('更新配置错误：'+JSON.stringify(e)));
                spinner.fail(chalk.red(e));
                process.exit();
            }
        }
    })


})()









