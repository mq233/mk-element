const path = require('path')
const fs = require('fs')
const join = path.join

const NODE_ENV = process.env.NODE_ENV

const devConfig = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  }
}

const buildConfig = {
  outputDir: 'lib',
  productionSourceMap: false,
  css: {
    sourceMap: true,
    extract: {
      filename: 'style/[name].css'
    }
  },
  configureWebpack: {
    entry: {
      ...getEntries('packages')
    },
    output: {
      filename: '[name].js',
      libraryTarget: 'commonjs2'
    }
    // module: {
    //   rules: [
    //     {
    //       test: /\.vue$/,
    //       include: '/packages',
    //       use: ['vue-loader', 'eslint-loader']
    //     },
    //     {
    //       test: /\.(js)|(vue)$/,
    //       include: '/packages',
    //       use: ['babel-loader']
    //     }
    //   ]
    // }
  },
  chainWebpack: config => {
    config.module
      .rule('babel_package')
      .test(/\.(js)|(vue)$/)
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })

    config.module
      .rule('vue_transfer')
      .test(/\.vue$/)
      .include
      .add('/packages')
      .end()
      // .use('eslint-loader')
      // .loader('eslint-loader')
      // .end()
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        return options
      })

    // 去除 @vue/cli 自带的一些功能
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')

    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(option => {
        option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
        return option
      })
  }
}


const config = NODE_ENV === 'production' ? buildConfig : devConfig
module.exports = config

/**
 * 获取所有组件入口地址
 * @param {string} dir 组件文件夹相对当前路径
 * @returns {object} 入口地址对象
 */
function getEntries(dir) {
  const files = fs.readdirSync(dir)
  const entries = files.reduce((res, file) => {
    const filePath = join(dir, file)
    const isDir = fs.statSync(filePath).isDirectory()
    if (isDir) {
      res[file] = resolvePath(join(filePath, 'index.js'))
    } else {
      // packages 根目录除了 js 文件全部忽略
      if (!/packages\/\w+\.[^(js)]{1,}/.test(filePath)) {
        const [fileName] = file.split('.')
        res[fileName] = resolvePath(`${filePath}`)
      }
    }
    return res
  }, {})

  return entries
}

/**
 * 解析组件路径
 * @param {string} dir 文件相对路径
 * @returns {string} 组件绝对路径
 */
function resolvePath(dir) {
  return path.resolve(__dirname, dir)
}
