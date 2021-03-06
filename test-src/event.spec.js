const expect = require('expect.js')
const config = require('./config');
const nattyFetch = require('natty-fetch');

describe('./hooks', function(){

    describe('willFetch', function(){

        this.timeout(1000*60);

        it('ajax willFetch call', function (done) {
            let context = nattyFetch.context({
                urlPrefix: config.host,
                willFetch() {
                    done()
                }
            })
            context.create({
                getApi: {
                    url: 'api/return-json',
                    fit(resp) {
                        return {
                            success: true,
                            content: resp
                        }
                    }
                }
            })
            context.api.getApi().then((content) => {})
        })

        it('jsonp willFetch call', function (done) {
            let context = nattyFetch.context({
                urlPrefix: config.host,
                willFetch() {
                    done()
                }
            })
            context.create({
                getApi: {
                    url: 'api/jsonp-order-create',
                    jsonp: true,
                    fit(resp) {
                        return resp
                    }
                }
            })
            context.api.getApi().then((content) => {})
        })

    })

    describe('didFetch', function(){

        it('ajax success didFetch', function (done) {
            let context = nattyFetch.context({
                urlPrefix: config.host
            })
            context.create({
                getApi: {
                    url: 'api/return-json',
                    fit(resp) {
                        return {
                            success: true,
                            content: resp
                        }
                    },
                    didFetch(config) {
                        //console.log(config)
                        done()
                    }
                }
            })
            context
                .api
                .getApi()
                .then((content) => {
                })
        })

        it('jsonp success didFetch long time', function (done) {
            let context = nattyFetch.context({
                urlPrefix: config.host
            })
            context.create({
                getApi: {
                    url: 'api/jsonp-timeout',
                    jsonp: true,
                    timeout: 2000,
                    fit(resp) {
                        return {
                            success: true,
                            content: resp
                        }
                    },
                    didFetch(config) {
                        //console.log(config)
                        done()
                    }
                }
            })
            context
                .api
                .getApi()
                .then((content) => {
                })
        })

        it('ajax error didFetch', function (done) {
            let context = nattyFetch.context({
                urlPrefix: config.host
            })
            context.create({
                getApi: {
                    url: 'api/return-error',
                    fit(resp) {
                        return resp
                    },
                    didFetch(config) {
                        //console.log(config)
                        done()
                    }
                }
            })
            context
                .api
                .getApi()
                .then((content) => {
                }, (reason) => {
                    //console.log(reason)
                })
        })

        it('jsonp error didFetch', function (done) {
            let context = nattyFetch.context({
                urlPrefix: config.host,
                jsonp: true
            })
            context.create({
                getApi: {
                    url: 'api/jsonp-order-create-error',
                    fit(resp) {
                        return resp
                    },
                    didFetch(config) {
                        //console.log(config)
                        done()
                    }
                }
            })
            context
                .api
                .getApi()
                .then((content) => {
                }, (reason) => {
                    //console.log(reason)
                })
        })

        it('ajax timeout didFetch', function (done) {
            let context = nattyFetch.context({
                urlPrefix: config.host,
                timeout: 500
            })
            context.create({
                getApi: {
                    url: 'api/timeout',
                    fit(resp) {
                        return {
                            success: true,
                            content: resp
                        }
                    },
                    didFetch(config) {
                        //console.log(config)
                        done()
                    }
                }
            })
            context
                .api
                .getApi()
                .then((content) => {
                }, (reason) => {
                    //console.log(reason)
                })
        })

        it('jsonp timeout didFetch', function (done) {
            let context = nattyFetch.context({
                urlPrefix: config.host,
                jsonp: true,
                timeout: 500
            })
            context.create({
                getApi: {
                    url: 'api/jsonp-timeout',
                    fit(resp) {
                        return {
                            success: true,
                            content: resp
                        }
                    },
                    didFetch(config) {
                        //console.log(config)
                        done()
                    }
                }
            })
            context
                .api
                .getApi()
                .then((content) => {
                }, (reason) => {
                    //console.log(reason)
                })
        })

    })

})
