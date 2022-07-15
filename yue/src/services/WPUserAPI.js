/** @format */

import { get, has } from "lodash";

import { Config, Languages } from "@common";

import { request, error } from "../Omni";

const url = Config.WooCommerce.url;
const consumerKey = Config.WooCommerce.consumerKey
const consumerSecret = Config.WooCommerce.consumerSecret
const isSecured = url.startsWith("https");
const secure = isSecured ? "" : "&insecure=cool";
const cookieLifeTime = 120960000000;

const WPUserAPI = {
  login: async (username, password) => {
    const _url = `${url}/wp-json/api/flutter_user/generate_auth_cookie`;

    return request(_url, {
      method: "POST",
      body: JSON.stringify({
        second: cookieLifeTime,
        username,
        password,
      }),
    });
  },
  loginFacebook: async (token) => {
    const _url = `${url}/wp-json/api/flutter_user/fb_connect/?second=${cookieLifeTime}&access_token=${token}${secure}`;

    return request(_url);
  },
  loginSMS: async (token) => {
    const _url = `${url}/wp-json/api/flutter_user/sms_login/?access_token=${token}${secure}`;

    return request(_url);
  },
  appleLogin: async (email, fullName, username) => {
    const _url = `${url}/wp-json/api/flutter_user/apple_login?email=${email}&display_name=${fullName}&user_name=${username}${secure}`;

    return request(_url);
  },
  //注册
  register: async ({
    username,
    email,
    firstName,
    lastName,
    password = undefined,
  }) => {
    try {
      const _url = `${url}/wp-json/api/flutter_user/register/`;

      const resp = await request(_url, {
        method: "POST",
        body: JSON.stringify({
          username,
          user_login: username,
          user_email: email,
          email,
          display_name: `${firstName} ${lastName}`,
          first_name: firstName,
          last_name: lastName,
          password,
          user_pass: password,
        }),
      });

      if (has(resp, "user_id")) {
        return resp;
      }

      return { error: get(resp, "message") || Languages.CanNotRegister };
    } catch (err) {
      error(err);
      return { error: err };
    }
  },
  //修改用户信息
  modification: async ({
    info
  }) => {
    const _url = `${url}/wp-json/wc/v3/customers/14?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`

    const resp = await request(_url, {
      method: "PUT",
      body: JSON.stringify(info)
    })
    console.log(resp, '注册会员显示结果')
  },

  getAll: async () => {
    const _url = `${url}/wp-json/wc/v3/coupons?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
    const resp = await request(_url, {
      method: "GET",
    })
    return resp;
  },
  //获取自定义首页顶部分类
  async getCategoryById(parent_id){
    const _url = `${url}/wp-json/wc/v3/products/categories?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&parent=${parent_id}`;
    const resp = await request(_url, {
      method: "GET",
    });
    return resp;

  }

};




export default WPUserAPI;
