import request from "@/libs/http/request";

export const getUerInfo = (bind, output) => {
  bind.addEventListener('click', async () => {
    let res = await request('user.getUserInfo');
    // debugger;
    if (res) {
      res = JSON.stringify(res);
      output.innerHTML = res;
    }
  })
};

export const cleanContent = (bind, output) => {
  bind.addEventListener('click', () => {
    output.innerHTML = '';
  })
};
