import axios from 'axios';

// 构建一个 axios 对象，取名为 'xAxios'，并进行自定义配置，并 export 出去，让外面调用
const xAxios = axios.create({
  // 自定义 baseURL，请求的时候可以使用相对 url，会自动把 baseURL 拼上去
  baseURL: "https://free-api.heweather.net/s6/weather/",
  // 请求超时时间
  timeout: 5000,
  
});
// 默认的参数
xAxios.defaults.params={
  key: "96e8453513a5487c923a71d839a180ca"
}

export {
  xAxios
}
