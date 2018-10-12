'use strict'

const pon = require('pon')
const ponTaskPrettier = require('pon-task-lint')

;(async () => {
  let run = pon({
    myTask01: ponTaskPrettier()
  })

  run('myTask01')
}).catch((err) => console.error(err))
