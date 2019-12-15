import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';
import { IMessage } from '@/components/MessageBox';
import _ from 'lodash';

import {
  getAllMessages,
} from '@/services/messages';
import { ConnectState, IUserModelState } from './connect.d';
import { findUserById } from '@/services/user';

export interface IGlobalModelState {
  collapsed?: boolean;
  messages?: IMessage[];
  messageSenders?: IGroupItem[];
  currentSender?: IUserModelState;
}

export interface IGroupItem {
  from: IUserModelState;
  currentMessage: IMessage;
  count: number;
}

export interface IGlobalModelType {
  namespace: 'global';
  state: IGlobalModelState;
  effects: {
    getAllMessages: Effect;
    getOneMessage: Effect;
    groupMessages: Effect;
    getCurrentSender: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<IGlobalModelState>;
    setAllMessages: Reducer<IGlobalModelState>;
    setOneMessage: Reducer<IGlobalModelState>;
    updateMessageSenders: Reducer<IGlobalModelState>;
    changeCurrentSender: Reducer<IGlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: IGlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    messages: [],
    messageSenders: [],
    currentSender: {},
  },

  effects: {
    *getAllMessages({ payload }, { call, put }) {
      const response = yield call(getAllMessages);
      yield put({
        type: 'setAllMessages',
        payload: response.data.data,
      });
      yield put({
        type: 'groupMessages',
      });
    },

    *getOneMessage({ payload }, { call, put, select }) {
      const messages =
        yield select(({ global }: ConnectState): IMessage[] => global.messages || []);
      yield put({
        type: 'setOneMessage',
        payload: messages.concat(payload),
      });
      yield put({
        type: 'groupMessages',
      });
    },

    *groupMessages({ payload }, { put, select, call }) {
      const messages: IMessage[] =
        yield select(({ global }: ConnectState): IMessage[] => global.messages || []);
      const currentUser: IUserModelState =
        yield select(({ user }: ConnectState): IUserModelState => user);
      const result = _.groupBy(messages, 'from');
      const resultKeys = Object.keys(result);

      const groups: IGroupItem[] = [];

      for (let index = 0; index < resultKeys.length; index += 1) {
        if (currentUser.id && resultKeys[index] !== currentUser.id.toString()) {
          const currentGroupItem: IMessage[] = result[resultKeys[index]];
          const user = yield call(findUserById, resultKeys[index]);
          const conversation =
            messages.filter(
              value =>
                value.from === currentUser.id
                || value.from === user.data.data.id,
            );
          groups.push({
            from: user.data.data,
            count: currentGroupItem.filter(value => !value.read).length,
            currentMessage: conversation[conversation.length - 1],
          });
        }
      }

      yield put({
        type: 'updateMessageSenders',
        payload: groups,
      });
    },

    *getCurrentSender({ payload }, { put, call }) {
      const user = yield call(findUserById, payload);
      yield put({
        type: 'changeCurrentSender',
        payload: user.data.data,
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

    setOneMessage(state, { payload }) {
      return {
        ...state,
        messages: payload,
      };
    },

    updateMessageSenders(state, { payload }) {
      return {
        ...state,
        messageSenders: payload,
      };
    },

    changeCurrentSender(state, { payload }) {
      return {
        ...state,
        currentSender: payload,
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
