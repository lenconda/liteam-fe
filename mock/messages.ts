// import { delay } from 'roadhog-api-doc';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const server = {
  'GET /api/messages': {
    code: '200',
    msg: '成功',
    data: [
      // {
      //   from: 1,
      //   to: 3,
      //   data: '',
      //   type: 'request',
      //   read: false,
      //   time: new Date().toLocaleString(),
      // },
      {
        from: 3,
        to: 1,
        data: 'asdasdasdasd',
        type: 'text',
        read: false,
        time: new Date().toLocaleString(),
      },
      {
        from: 3,
        to: 1,
        data: 'asdasdasdasd',
        type: 'text',
        read: false,
        time: new Date().toLocaleString(),
      },
      {
        from: 3,
        to: 1,
        data: 'asdasdasdasd',
        type: 'text',
        read: false,
        time: new Date().toLocaleString(),
      },
      {
        from: 3,
        to: 1,
        data: 'asdasdasdasd',
        type: 'text',
        read: false,
        time: new Date().toLocaleString(),
      },
      {
        from: 3,
        to: 1,
        data: 'asdasdasdasd',
        type: 'text',
        read: false,
        time: new Date().toLocaleString(),
      },
      {
        from: 1,
        to: 3,
        data: 'asdasdasdasd',
        type: 'text',
        read: true,
        time: new Date().toLocaleString(),
      },
      {
        from: 3,
        to: 1,
        data: 'asdasdasdasd',
        type: 'text',
        read: false,
        time: new Date().toLocaleString(),
      },
      {
        from: 1,
        to: 3,
        data: 'https://avatars0.githubusercontent.com/u/9963587?s=460&v=4',
        type: 'image',
        read: false,
        time: new Date().toLocaleString(),
      },
      {
        from: 3,
        to: 1,
        data: 'asdasdasdasd',
        type: 'text',
        read: false,
        time: new Date().toLocaleString(),
      },
      {
        from: 3,
        to: 1,
        data: 'asdasdasdasd',
        type: 'text',
        read: false,
        time: new Date().toLocaleString(),
      },
      {
        from: 3,
        to: 1,
        data: 'asdasdasdasd',
        type: 'text',
        read: false,
        time: new Date().toLocaleString(),
      },
    ],
  },
};

export default server;
// export default delay(server, 3000);
