export default {
  // baseURL: 'localhost',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }, // 所有请求数据格式均为 json
  withCredentials: true, // 跨域携带 cookie (此选项造成了 stackblitz 编辑器和预览窗口的跨域问题)
};
