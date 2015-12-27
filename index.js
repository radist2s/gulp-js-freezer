var util = require('util')
var gutil = require('gulp-util')
var ResourceFreezer = require('static-resources-freezer')

const PLUGIN_NAME = 'gulp-js-freezer'

function pipeMainTransform(resourceFreezer, stream, sourceFile) {
    if (sourceFile.isNull()) {
        return stream.emit('data', sourceFile)
    }

    if (sourceFile.isStream()) {
        return stream.emit('error', 'Streaming not supported')
    }

    try {
        var destFile

        // Find and freeze resources
        var js = sourceFile.contents

        // Create JS freeze path
        var jsFilePath = resourceFreezer.createFileSubDirPath(resourceFreezer.createFileName(sourceFile))

        destFile = new gutil.File({
            path: jsFilePath,
            base: '',
            cwd: '',
            contents: new Buffer(js)
        })

        destFile.sourcePath = sourceFile.path

        stream.push(destFile)
    }
    catch (err) {
        stream.emit('error', new gutil.PluginError(PLUGIN_NAME, err))
    }
}

function gulpJSFreezer(options) {
    var config = {freezeMapFileName: 'js-freeze-map.json'}

    var resourceFreezer = new ResourceFreezer(util._extend(config, options))

    return resourceFreezer.stream(pipeMainTransform.bind(undefined, resourceFreezer))
}

gulpJSFreezer.freezeMapResolve = ResourceFreezer.freezeMapResolve

module.exports = gulpJSFreezer