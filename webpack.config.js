var webpack = require('webpack')
var getConfig = require('hjs-webpack')

var config = getConfig({
    in: 'src/app.js',
    out: 'public',
    clearBeforeBuild: false,
    html: function(data) {
        return {
            'index.html': data.defaultTemplate({html: ''})
        }
    }
})

config.target = 'node-webkit';

config.plugins.push(
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        _: "underscore"
    })
);

module.exports = config
