import router from 'umi/router';
import { Effect } from 'dva';
import { stringify } from 'querystring';

import { login } from '@/services/login';
import { getPageQuery } from '@/utils/utils';

export interface ILoginModelType {
  namespace: string;
  state: {};
  effects: {
    login: Effect;
    logout: Effect;
  };
}

const Model: ILoginModelType = {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { call }) {
      const response = yield call(login, payload);
      // Login successfully
      // console.log(response.data.msg);
      if (response.data.msg === '登录成功') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
          router.push(redirect || '/');
        }
      }
    },

    *logout() {
      const { redirect } = getPageQuery();
      window.localStorage.removeItem('token');
      window.sessionStorage.removeItem('token');
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield router.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
};

export default Model;
