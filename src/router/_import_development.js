/** _import_development.js
 * 使用 这种加载方式实现 开发环境 路由的实时加载, 生产环境的路由懒加载
 */
module.exports = filePath => require('../' + filePath).default
