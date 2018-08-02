module.exports = function (ctx, flow) {
  return new Promise((resolve, reject) => {
  // TODO: hello???
    if (ctx.config.mode === 'development') {
      console.log(flow)
    }
  })
}