import './style.css'
import axiosLogo from '/axios.svg'
import javascriptLogo from '/javascript.svg'
import { cleanContent, getUerInfo } from '/src/hanlders'
import viteLogo from '/vite.svg'


document.querySelector('#app').innerHTML = `
  <div>
    <img src="${viteLogo}" class="logo" alt="Vite logo" />
    <img src="${javascriptLogo}" class="logo vanilla" alt="javascript logo" />
    <div><img src="${axiosLogo}" class="logo" alt="axios logo" /><div/>
    <h1>axios-wrapper-lite</h1>
    <div class="card">
      <button type="button" id='userInfo'>提交请求</button>
      <button type="button" id='cleanRes'>清空响应</button>
    </div>
    <div>响应结果<div/>
      <p class="output-the-response">
        测试
      </p>
  </div>
`
const subBtn = document.querySelector('#userInfo');
const cleanBtn = document.querySelector('#cleanRes');
const output = document.querySelector('.output-the-response');
getUerInfo(subBtn, output);
cleanContent(cleanBtn, output);
