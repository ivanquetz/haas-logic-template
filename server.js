// =================
// MAIN DEPENDENCIES
const fs = require('fs')
const path = require('path')
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const bodyParser = require('body-parser')
const cors = require('cors')
const io = require('socket.io')(server)
const chokidar = require('chokidar')
const clearRequire = require('clear-require')
const Ajv = require('ajv')

var ajv = new Ajv({allErrors: true, format: 'full'})
var currentPath = process.cwd()
var config = require('./nodes/config.js')
var port = process.env.PORT || config.port
var nodes = require('require-all')({ dirname: __dirname + '/nodes' })
var flows = require('require-all')({ dirname: __dirname + '/flows' })
var watcher = chokidar.watch(['./nodes', './flows'], {ignoreInitial: true, persistent: true})
var db = null

function getCtx () {
  return {config: config, nodes: nodes, flows: flows}
}
// ==========
// MIDDLEWARE
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// ============
// SERVE CLIENT
app.use(express.static('public'));
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// ==============
// SOCKET TRIGGER
io.on('connect', (socket) => {
  console.log('...new connection...')
  socket.on('online', (data) => {
    console.log('handle online', data)
  })
})

// ============
// HTTP TRIGGER
app.post('/:route', (req, res) => {
  console.log(req.body)
  res.json({ok: true})
  // nodes['FLOW_ROUTER'](getC(),{route: req.params.route, trigger: 'httppost', errors: [], token: req.headers['authorization'], msg: req.body, res: res, req: req})
})

async function INIT () {
  console.log('INIT_start')
  var id = await nodes['get_id'](getCtx(), {errors: []})
  console.log('id', id)
  // =========
  // HOT NODES
//   watcher.on('all', (event, filename, stats) => {
//     console.log('event: ', event)
//     console.log('filename: ', filename)
//     if (event === 'change') {
//       let _split = filename.split('/')
//       let _folder = _split[0]
//       let _name = _split[1].split('.')[0]
//       let p = currentPath + '/' + filename
// //       clearRequire(p)
//       console.log(event, ' filename: ', filename)
// //       if (_folder === 'nodes') nodes[_file] = require(currentPath + '/' + filename)
// //       if (_folder === 'flows') flows[_file] = require(currentPath + '/' + filename)
//     }
//   })
  // ===========
  // HTTP SERVER
  server.listen(port, '0.0.0.0', () => {
    console.log('*** Server started at port: ' + port + ' ***')
  })
  console.log('INIT_done')
}
INIT()