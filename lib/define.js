/**
 * Define task
 * @function define
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

const { CLIEngine } = require('eslint')
const { join } = require('path')

/** @lends define */
function define (options = {}) {
  const { patterns = [] } = options
  async function task (ctx) {
    const { logger, cwd } = ctx
    const config = {
      baseConfig: {
        extends: [ 'standard', 'standard-jsx' ],
        rules: {
          'comma-dangle': 'off',
        },
        parser: 'babel-eslint',
      },
      cache: true,
      cacheLocation: join(cwd, 'tmp/cache/eslintcache')
    }

    let fixedFiles = []
    {
      const cli = new CLIEngine(config)

      const report = cli.executeOnFiles(patterns)
      fixedFiles = report.results
        .filter(({ fixableErrorCount, fixableWarningCount }) => fixableErrorCount + fixableWarningCount > 0)
        .map(({ filePath }) => filePath)
    }

    {
      const cli = new CLIEngine({
        ...config,
        fix: true,
      })
      const report = cli.executeOnFiles(patterns)
      CLIEngine.outputFixes(report)
    }

    if (fixedFiles.length > 0) {
      for (const file of fixedFiles) {
        logger.debug(`Fixed ${file}`)
      }
    }
  }

  return Object.assign(task,
    // Define sub tasks here
    {}
  )
}

module.exports = define
