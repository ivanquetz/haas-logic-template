module.exports = function (ctx,flow) {
  return new Promise((resolve, reject) => {
    ctx.nodes.log(ctx, 'get_id_start')
    var id = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    for (var i = 0; i < 4; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    id += Date.now().toString()
    ctx.nodes.log(ctx, 'get_id_done')
    resolve(id)
  })
}