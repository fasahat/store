const proxy = require('http-proxy-middleware');

module.exports = function(app) {

    app.use(proxy('/auth/login', { target: 'http://localhost:8003' }));

    // app.use(proxy('/auth/login', { target: 'http://localhost:8003' }));
    app.use(proxy('/api/v1/', { target: 'http://localhost:8000' }));

    app.use(proxy('/gw/', { target: 'http://localhost:8000' }));
    // app.use(proxy('/api/map/', { target: 'http://localhost:8080' }));

};
