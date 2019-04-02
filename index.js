const fs = require('fs')

const get = require('lodash/get')
const keys = require('lodash/keys')
const reduce = require('lodash/reduce')
const sortBy = require('lodash/sortBy')
const startCase = require('lodash/startCase')

const chalk = require('chalk')

const catDependencies = () => {
  const arg = process.argv[2] || ''
  const dir = process.cwd()
  const route = `${dir}/${arg}`
  const packageJson = JSON.parse(fs.readFileSync(`${route}/package.json`))
  const getDependencies = key => reduce(sortBy(keys(get(packageJson, key, {}))),
    (dependenciesList, current) => dependenciesList + `${current} `, '')
  const getKey = label => chalk.green.bold(`${startCase(label)}:`)
  const showDependencies = key => console.log(getKey(key), getDependencies(key))
  showDependencies('dependencies')
  showDependencies('devDependencies')
}

module.exports = catDependencies
