import axios from 'axios'



const debug = process.env.NODE_ENV !== 'production'
if(debug==true){
	axios.defaults.baseURL = 'http://127.0.0.1:80/';	
}else{
	axios.defaults.baseURL = '/'; //生产环境
}

axios.defaults.headers.common['Authorization'] = 'session';
/*axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';*/

axios.interceptors.request.use(function (config) {
	// Do something before request is sent
	console.log("请求拦截器");
	//console.log(config);
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});
// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
	// Do something with response data
	console.log("个响应拦截器");
	//console.log(response);

	return response;
}, function (error) {
	// Do something with response error
	return Promise.reject(error);
});

export default axios;