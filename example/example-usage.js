'use strict'

const pon = require('pon')
const ponTaskLint = require('pon-task-lint')

;(async () => {
  let run = pon({
    myTask01: ponTaskLint({ patterns: [ 'lib/**/**.js?(x)' ] })
  })

  run('myTask01')
}).catch((err) => console.error(err))
