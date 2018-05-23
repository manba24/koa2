const Koa = require('koa')
const logger = require('koa-logger')
const app = new Koa()

const indent = (n) => {
    return new Array(n).join('&nbsp;')
}
const mid1 = () => {
    return async (ctx, next) => {
        ctx.body = `<h3>=>请求第一层中间件</h3>`
        await next()
        ctx.body += `<h3> <=响应第一层中间件</h3>`
    }
}

const mid2 = () => {
    return async (ctx, next) => {
        ctx.body += `<h3>${indent(4)}=>请求第二层中间件</h3>`
        await next()
        ctx.body += `<h3>${indent(4)} <=响应第二层中间件</h3>`
    }
}
const mid3 = () => {
    return async (ctx, next) => {
        ctx.body += `<h3>${indent(8)}=>请求第三层中间件</h3>`
        await next()
        ctx.body += `<h3> ${indent(8)}<=响应第三层中间件</h3>`
    }
}
app.use(logger())
app.use(mid1())
app.use(mid2())
app.use(mid3())
app.use(async (ctx, next) => {
    ctx.body += `<p style="color:#f60">${indent(12)}=>koa 核心处理业务<=</p>`
})

app.listen(2233, (err) => {
    if (err) throw err
    console.log('server is start')
})