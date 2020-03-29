module.exports = env => {
  return {
    mode: env.production ? 'production' : 'development',
    entry: './lib/index.js',
    output: {
      filename: 'index.js'
    },
    watch: env.development,
    node: {
      fs: 'empty'
    }
  }
}