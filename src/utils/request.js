import fetch from 'dva/fetch';
import qs from 'qs';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 * 
 * optons.params 可携带callback参数 请求执行完毕 自调回调函数
 */

function get(url, options) {

  //合并fetch配置参数
  let option = Object.assign({
    // headers: {},
    params: {},
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
  }, options)

  //检查是否有需要执行回调函数
  const callback = option.params.callback || function () {}
  if (callback) 
    delete option.params.callback

  //GET请求 params自动转换 GET请求方式 参数传递
  let path = `${url}${option.params ? '?' + qs.stringify(option.params) : ''}`

  return fetch(path, option)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {callback(); return data})
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

export default { get }


// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(data => ({ data }))
//     .catch(err => ({ err }));
// }