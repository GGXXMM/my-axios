// 调用 axios 的 get 方法发送请求，可以想象它还有 POST，PUT，DELETE 等 HTTP 协议支持的方法
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 调用 axios 的 request 方法发送请求
axios.request({
  url:"/user?ID=12345"
})

// 可以通过向 axios 传递相关配置来创建请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

// 可以使用自定义配置新建一个 axios 实例
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});