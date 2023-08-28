import apiMap from '@/libs/http/api/index';
import cfg from '@/libs/http/config';
import axios from 'axios';
import qs from 'qs';


export default function (apiKey, data = {}) {
  /**
   * ! useAxios 仅作为局部变量使用。
   * ! 若放在方法外部作用域，会导致每次请求都使用同一个 axios 实例（同一个 http 请求连接）。
   */
  const useAxios = axios.create({ ...cfg });
  let api = getAPI(apiKey, apiMap); // 获取 api 配置

  // debugger;
  let handlReq = useAxios.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem('token');

      if (token && api.auth) {
        config.headers['Authorization'] = token;
      } else if (!token && api.auth) {
        // todo 重定向到登陆
      } else {
      }

      if (!config.headers['content-type']) {
        if (config.method === 'post') {
          config.headers['content-type'] = 'application/json; charset=utf-8'; // 默认类型
          config.data = qs.stringify(config.data); // 序列化,比如表单数据
        }
      }

      return config;
    },
    (err) => {
      alert(err);
    }
  );

  let handlRes = useAxios.interceptors.response.use(
    (res) => {
      // debugger;
      if (res.status != '200') return null;
      // if (!handelAuthError(res.data.errNo)) return null;
      // if (!handelNormalError(res.data.errNo, res.data.errMsg)) return null;
      return res.data;
    },
    (err) => {
      // todo 处理网络错误 
      // handelNetworkError(err.response.status);
      return null;
    }
  );

  // 注销拦截器
  // useAxios.interceptors.eject(handlReq);
  // useAxios.interceptors.eject(handlRes);


  if (api.method.toLowerCase() == 'get') {
    return useAxios({
      url: api.url,
      method: api.method,
      params: data,
    });
  }

  if (api.method.toLowerCase() == 'post') {
    return useAxios({
      url: api.url,
      method: api.method,
      dara,
    });
  }
}

/**
 * 获取接口
 * @param {String} key - 接口键，比如 user.getUserInfo 就是获取 user 模块下 getUserInfo 接口
 * @param {Object} apiMap 
 * @returns 
 */
function getAPI(key, apiMap) {
  let keys = key.split('.');
  let api = apiMap;

  keys.forEach((key) => {
    api = api[key];
  });

  return api;
}

/**
 * 处理网络错误
 * @param {String} statusCode 
 */
function handelNetworkError(statusCode) {
  let errMsg = '';

  if (statusCode) {
    switch (statusCode) {
      case 400:
        errMsg = '错误的请求';
        break;
      case 401:
        errMsg = '未授权，请重新登录';
        break;
      case 403:
        errMsg = '拒绝访问';
        break;
      case 404:
        errMsg = '请求错误,未找到该资源';
        break;
      case 405:
        errMsg = '请求方法未允许';
        break;
      case 408:
        errMsg = '请求超时';
        break;
      case 500:
        errMsg = '服务器端出错';
        break;
      case 501:
        errMsg = '网络未实现';
        break;
      case 502:
        errMsg = '网络错误';
        break;
      case 503:
        errMsg = '服务不可用';
        break;
      case 504:
        errMsg = '网络超时';
        break;
      case 505:
        errMsg = 'http版本不支持该请求';
        break;
      default:
        errMsg = `其他连接错误 --${statusCode}`;
    }
  } else {
    errMsg = '无法连接到服务器！';
  }

  // 提示用户
  alert(errMsg);
}

/**
 * 处理用户校验错误
 * @param {String} errNo 
 * @returns 
 */
function handelAuthError(errNo) {
  const authErrMap = {
    10031: '登录失效，需要重新登录', // token 失效
    10032: '您太久没登录，请重新登录~', // token 过期
    10033: '账户未绑定角色，请联系管理员绑定角色',
    10034: '该用户未注册，请联系管理员注册用户',
    10035: 'code 无法获取对应第三方平台用户',
    10036: '该账户未关联员工，请联系管理员做关联',
    10037: '账号已无效',
    10038: '账号未找到',
  };

  if (authErrMap.hasOwnProperty(errNo)) {
    alert(authErrMap[errNo]);
    // todo 跳转重新登陆
    return false;
  }

  return true;
}

/**
 * 处理一般错误
 * @param {String} errNo 
 * @param {String || Object} errMsg 
 * @returns 
 */
function handelNormalError(errNo, errMsg) {
  if (errNo != '0') {
    // 提示错误信息
    alert(errMsg);
    return false;
  }

  return true;
}
