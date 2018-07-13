const express = require('express')
const bodyParser = require('body-parser')
const {
  Nuxt,
  Builder
} = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const mongoose = require('mongoose')
const timestampPlugin = require('./plugins/timestamps')
const Schema = mongoose.Schema

const EventSchema = new Schema({
  message: String,
  source: String,
  lineno: String,
  colno: String,
  stack: String,
  browserVendor: String,
  browserVersion: String,
  os: String,
  platform: String
})

const CommentSchema = new Schema({
  author: String,
  body: String
})

const IssueSchema = new Schema({
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  assigned: String,
  resolved: Boolean
})

const ProjectSchema = new Schema({
  name: String,
  description: String,
  owner: String,
  issues: [Schema.Types.ObjectId],
  slack: {
    url: String,
    channel: String,
    username: String,
    text: String
  }
})

const OrganizationSchema = new Schema({
  name: String,
  description: String,
  owner: String,
  users: [],
  projects: [Schema.Types.ObjectId]
})

const schemes = [OrganizationSchema, ProjectSchema, IssueSchema, EventSchema]

// plugins
schemes.forEach(schema => {
  schema.plugin(timestampPlugin)
})

mongoose.model('Organization', OrganizationSchema)
mongoose.model('Project', ProjectSchema)
mongoose.model('Issue', IssueSchema)
mongoose.model('Event', EventSchema)

app.set('port', port)

app.use(bodyParser.json())

app.get('/api/auth/user', function (req, res) {
  res.status(200).json({})
})

// API
// Organization
app
  .get('/api/me', (req, res) => {})
  .get('/api/me/organizations', (req, res) => {})
  .get('/api/organizations', (req, res) => {})

// Project
app
  .get('/api/projects', (req, res) => {})
  .post('/api/projects', (req, res) => {})
  .get('/api/projects/:project', (req, res) => {})
  .patch('/api/projects/:project', (req, res) => {})

// Issue
app
  .get('/api/issues', (req, res) => {})
  .post('/api/issues', (req, res) => {})
  .get('/api/issues/:issue', (req, res) => {})
  .patch('/api/issues/:issue', (req, res) => {})
  .post('/api/issues/:issue/comments', (req, res) => {})

// Event
app
  .get('/api/events', (req, res) => {})
  .post('/api/events', (req, res) => {})
  .get('/api/events/:event', (req, res) => {})
  .patch('/api/events/:event', (req, res) => {})

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
