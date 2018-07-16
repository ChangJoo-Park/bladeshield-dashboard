const express = require('express')
const bodyParser = require('body-parser')
const {
  Nuxt,
  Builder
} = require('nuxt')
// const { auth } = require('google-auth-library')
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
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  title: String,
  source: String,
  assigned: String,
  resolved: Boolean
})

const ProjectSchema = new Schema({
  name: String,
  description: String,
  owner: String,
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  },
  issues: [{
    type: Schema.Types.ObjectId,
    ref: 'Issue'
  }],
  slack: {
    url: String,
    channel: String,
    username: String
  }
})

const OrganizationSchema = new Schema({
  name: String,
  description: String,
  owner: String,
  users: [],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }]
})

const schemes = [OrganizationSchema, ProjectSchema, IssueSchema, EventSchema]

// plugins
schemes.forEach(schema => {
  schema.plugin(timestampPlugin)
})


const Organization = mongoose.model('Organization', OrganizationSchema)
const Project = mongoose.model('Project', ProjectSchema)
const Issue = mongoose.model('Issue', IssueSchema)
const Event = mongoose.model('Event', EventSchema)
const Comment = mongoose.model('Comment', CommentSchema)

app.set('port', port)

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/api/auth/user', function (req, res) {
  res.status(200).json({})
})

// API
// Organization
app
  .get('/api/me/organizations', async (req, res) => {
    // FIXME: Using Access Token
    const { email: owner } = req.query
    if (!owner) {
      console.log('email not found')
      return res.json([])
    }
    const organizations = await Organization.find({ owner })
    res.json(organizations)
  })
  .get('/api/organizations', async (req, res) => {
    try {
      const orgs = await Organization.find()
      res.json(orgs)
    } catch (error) {
      res.status(500).json(error)
    }
  })
  .get('/api/organizations/:organization', async (req, res) => {
    try {
      const organizationId = req.params['organization']
      const org = await Organization.findById(organizationId).populate('projects')
      res.json(org)
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  })
  .post('/api/organizations', async (req, res) => {
    try {
      const { name, description, owner } = req.body
      const newOrg = new Organization({ name, description, owner })
      newOrg.users.push(owner)
      const saved = await newOrg.save()
      res.json(saved)
    } catch (error) {
      res.status(500).json(error)
    }
  })
  .patch('/api/organizations/:organization', async (req, res) => {
    try {
      const { name = '', description = '' } = req.body
      const organizationId = req.params['organization']
      const org = await Organization.findById(organizationId)
      org.name = name || org.name
      org.description = description || org.description
      const savedOrg = await org.save()
      res.json(savedOrg)
    } catch (error) {
      res.status(500).json(error)
    }
  })

// Project
app
  .get('/api/projects', async (req, res) => {
    try {
      const { organization = '' } = req.query()
      let projects = []
      if (organization) {
        projects = await Project.find({ organization })
      } else {
        projects = await Project.find()
      }
      res.json(projects)
    } catch (error) {
      console.log('error')
      res.status(500).json(error)
    }
  })
  .post('/api/projects', async (req, res) => {
    try {
      const { organizationId, name, description } = req.body
      const organization = await Organization.findById(organizationId)
      const newProject = new Project({ name, description, organization: organizationId })
      const savedProject = await newProject.save()
      organization.projects.push(savedProject)
      await organization.save()
      res.json(savedProject)
    } catch (error) {
      console.log('error => ', error)
      res.status(500).json(error)
    }

  })
  .get('/api/projects/:projectId', async (req, res) => {
    const { projectId } = req.params
    const { organization = '' } = req.query
    const project = await Project.findById(projectId).populate('issues')
    res.json(project)
  })
  .patch('/api/projects/:project', async (req, res) => {
    const project = await Project.findById(req.params.project)
    const body = req.body
    Object.keys(body).forEach(key => {
      project[key] = body[key]
    })
    console.log('body => ', body)
    console.log('project => ', project)
    const savedProject = await project.save()
    res.json(savedProject)
  })

// Issue
app
  .get('/api/issues', (req, res) => {
    res.json({})
  })
  .post('/api/issues', (req, res) => {
    res.json({})
  })
  .get('/api/issues/:issue', (req, res) => {
    res.json({})
  })
  .patch('/api/issues/:issue', (req, res) => {
    res.json({})
  })
  .post('/api/issues/:issue/comments', (req, res) => {
    res.json({})
  })

// Event
app
  .get('/api/events', (req, res) => {
    res.json({})
  })
  .post('/api/events', (req, res) => {
    res.json({})
  })
  .get('/api/events/:event', (req, res) => {
    res.json({})
  })
  .patch('/api/events/:event', (req, res) => {
    res.json({})
  })

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
