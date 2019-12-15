import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';
import { IMessage } from '@/components/MessageBox';

import {
  getAllMessages,
} from '@/services/messages';

export interface IGlobalModelState {
  collapsed?: boolean;
  messages?: IMessage[];
}

export interface IGlobalModelType {
  namespace: 'global';
  state: IGlobalModelState;
  effects: {
    getAllMessages: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<IGlobalModelState>;
    setAllMessages: Reducer<IGlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: IGlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    messages: [],
  },

  effects: {
    *getAllMessages({ payload }, { call, put }) {
      const response = yield call(getAllMessages);
      yield put({
        type: 'setAllMessages',
        payload: response.data.data,
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },

    setAllMessages(state, { payload }) {
      return {
        ...state,
        messages: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
