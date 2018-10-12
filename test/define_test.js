/**
 * Test case for define.
 * Runs with mocha.
 */
'use strict'

const define = require('../lib/define.js')
const ponContext = require('pon-context')
const { ok } = require('assert')
const shell = require('shelljs')

describe('define', function () {
  this.timeout(3000)

  before(async () => {
    shell.mkdir('-p', 'tmp/mock')
    shell.cp('misc/mock/*', 'tmp/mock')
  })

  after(async () => {
  })

  it('Define', async () => {
    const ctx = ponContext({})
    const task = define({ patterns: [ 'tmp/mock/*.js?(x)' ], cache: false })
    ok(task)

    await Promise.resolve(task(ctx))
  })
})

/* global describe, before, after, it */
