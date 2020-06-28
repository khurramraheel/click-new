const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/checklogin', { target: 'http://localhost:1001/' }));
  app.use(proxy('/showProduct', { target: 'http://localhost:1001/' }));
  app.use(proxy('/signin', { target: 'http://localhost:1001/' }));
  app.use(proxy('/purchase', { target: 'http://localhost:1001/' }));
  app.use(proxy('/uploads', { target: 'http://localhost:1001/' }));
  app.use(proxy('/logout', { target: 'http://localhost:1001/' }));
  app.use(proxy('/signin', { target: 'http://localhost:1001/' }));
};