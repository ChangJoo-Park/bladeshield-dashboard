
const express = require('express')
const Router = express.Router
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
})

const IssueSchema = new Schema({
  events: [EventSchema]
})

const ProjectSchema = new Schema({
  name: String,
  description: String,
  owner: String,
  issues: [IssueSchema]
})

const OrganizationSchema = new Schema({
  name: String,
  description: String,
  owner: String,
  users: [],
  projects: [ProjectSchema]
})

const Organization = mongoose.model('Organization', OrganizationSchema)
const Project = mongoose.model('Project', ProjectSchema)
const Issue = mongoose.model('Issue', IssueSchema)
const Event = mongoose.model('Event', EventSchema)

app.set('port', port)

app.get('/api/auth/user', function (req, res) {
  console.log(req)
  console.log('api auth user')
  res.status(200).json({})
});

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
// Connect mongoDB
mongoose.connect('mongodb://localhost/bladeshield').then(_ => {
  console.log('connect mongodb successfully.')
})

start()
