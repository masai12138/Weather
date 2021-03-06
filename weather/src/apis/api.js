// 这里没有 import 默认的 axios 对象，而是从 network.js 里面 import 自定义的 axios 对象
// xAxios 的
import { xAxios } from "./network";
/**
 * 请求某个地点的实时天气（对外提供 Promise 的方式）
 *
 * @param {*} location 地点
 */
function requestWeatherNow(location) {
  // 构造一个 Promise 对象，让调用者可以通过 then / catch 的方式获取请求结果
  return new Promise(function(resolve, reject) {
    xAxios
      // 使用了 xAxios 对象，只需要编写相对 url 就可以
      .get(`/now?location=${location}`)
      // 如果成功，则回调到这里
      .then(function(response) {
        console.log("请求结果[requestWeatherNow]: ", response);

        // 如果 status 不是 200，则说明 http 请求失败
        if (response.status !== 200) {
          // http 请求失败，则调用 reject，返回一个对象（对象里面的数据设置了一个错误码 code 和一个错误信息 msg），告诉调用者请求失败
          reject({ code: response.status, msg: response.statusText });
          return;
        }
        let weatherArray = response.data.HeWeather6;
        // 如果 weather 数组是空的，说明没有有效的数据则，则调用 reject，返回一个对象（对象里面的数据设置了一个错误码 code 和一个错误信息 msg）
        if (!weatherArray || weatherArray.length <= 0) {
          reject({ code: -1, msg: `查不到地区${location}的天气数据数据` });
          return;
        }
        // 否则，说明天气数组不是空，则拿到第一个结果，通过 resolve 方法返回第一个数据
        resolve(weatherArray[0]);
      })
      .catch(function(e) {
        reject({ code: -100, msg: `请求失败:${e}` });
      });
  });
}

/**
 * 请求某个地点的实时天气（对外提供 方法回调 的方式）
 * @param {*} location
 * @param {*} success 请求成功回调方法
 * @param {*} fail 请求失败回调方法
 *
 */
function requestWeatherNow2(location, success, fail) {
  xAxios
    .get(`/now?location=${location}`)
    // 如果成功，则回调到这里
    .then(function(response) {
      console.log("请求结果[requestWeatherNow2]: ", response);

      // 如果 status 不是 200，则说明 http 请求失败
      if (response.status !== 200) {
        // http 请求失败，则调用 reject，返回一个对象（对象里面的数据设置了一个错误码 code 和一个错误信息 msg），告诉调用者请求失败
        fail({ code: response.status, msg: response.statusText });
        return;
      }
      let weatherArray = response.data.HeWeather6;
      // 如果 weather 数组是空的，说明没有有效的数据则，则调用 reject，返回一个对象（对象里面的数据设置了一个错误码 code 和一个错误信息 msg）
      if (!weatherArray || weatherArray.length <= 0) {
        fail({ code: -1, msg: `查不到地区${location}的天气数据数据` });
        return;
      }
      // 否则，说明天气数组不是空，则拿到第一个结果，通过 resolve 方法返回第一个数据
      success(weatherArray[0]);
    })
    .catch(function(e) {
      fail({ code: -100, msg: `请求失败:${e}` });
    });
}

/**
 * 请求某个地点的预报天气
 * @param {*} location
 */

function requestForecast(location) {
  return new Promise(function(resolve, reject) {
    xAxios
      .get(`/forecast`, {
        params: {location: location}
      })
      .then(function(response1) {
        console.log("预告请求结果[requestForecast]", response1);
        if (response1.status !== 200) {
          reject({ code: response1.status, msg: response1.statusText });
          return;
        }
        let weatherRailerArray = response1.data.HeWeather6;
        if (!weatherRailerArray || weatherRailerArray.length <= 0) {
          reject({ code: -1, msg: `查不到地区${location}的天气数据数据` });
          return;
        }
        resolve(weatherRailerArray[0]);
      })
      .catch(function(e) {
        reject({ code: -100, msg: `请求失败:${e}` });
      });
  });
}

// 对外
export default {
    // requestWeatherNow 前一个是对外暴露的方法
    requestWeatherNow,
    requestWeatherNow2,
    requestForecast,
}
