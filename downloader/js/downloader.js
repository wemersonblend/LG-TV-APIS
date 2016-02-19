(function(_global) {

    /**
     * Classe para gerenciar Downloads
     *
     * @class Downloader
     * @constructor
     * @param {String} projPath Caminho do projeto
     */
    function Downloader(options, callback) {
        this.init(options, callback);
    }

    Downloader.prototype.init = function(options, callback){
        if(!this.STORAGE) {
            this.STORAGE = new Storage();
        }

        if(callback)
            callback(null, {success: true});
    }

    Downloader.prototype.start = function start(options, callback) {

        var TO_PATH,
            FROM_URL,
            filename,
            that = this;

        TO_PATH = options.path;
        FROM_URL = options.url;

        filename = extractFileFromPath(TO_PATH);
        if(!filename) {
            filename = extractFileFromPath(FROM_URL);
            TO_PATH = TO_PATH + '/' + filename.split("?")[0];
        }

        if(!FROM_URL || !TO_PATH)
            return callback({message: 'invalid arguments. Required {url:"", path: ""}'});


        var onSuccessMove = function(data) {
            if(typeof callback == 'function') {
                callback(null, {success: true});
            }
        };

        var onErrorMove = function() {
            if(typeof callback == 'function')
                callback(getError(error), null);
        };

        var onSuccessDownload = function (data){
            var options = {
                oldPath: normalizePath(TO_PATH) + '.tmp',
                newPath : normalizePath(TO_PATH)
            };

            that.STORAGE.moveFile( onSuccessMove , onErrorMove , options );
        };

        var onErrorDownload = function (error){
            if(typeof callback == 'function')
                callback(getError(error), null);
        };

        options = {
            source: FROM_URL,
            destination: normalizePath(TO_PATH) + '.tmp'
        };

        that.STORAGE.copyFile( onSuccessDownload , onErrorDownload , options );
    }

    /**
     * Convert path string to correct format
     * @param  {String} pathString [description]
     * @example            normalizePath('file://internal')         file://internal
     * @example            normalizePath('file://internal/anyone')  file://internal/anyone
     * @example            normalizePath('/anyone')                 file://internal/anyone
     * @example            normalizePath('anyone')                  file://internal/anyone
     * @return {String}
     */
    function normalizePath (pathString) {

        if(!pathString.match('file://'))
            pathString = (pathString[0] == '/')    ?    pathString    :    '/' + pathString;

        pathString = (pathString[pathString.length -1] == '/')    ?    pathString.substring(0, pathString.length-1)    :    pathString;

        if(!pathString.match('file://internal'))
            pathString = pathString.match('file://internal') ? pathString : 'file://internal' + pathString;

        return pathString;
    }

    /**
     * Extract file from path or URL
     * @return {String} file.txt
     */
    function extractFileFromPath(pathString) {
        var file;

        if(typeof pathString != 'string')
            return '';

        pathString = pathString.split('/');
        file = pathString[pathString.length-1];
        file = file.split('?')[0];

        if(file.indexOf('.') > -1)
            return file;
        else
            return '';
    }

    function getError(error) {
        if(typeof error != 'object')
            return error;

        if(!('errorCode' in error) && !('errorText' in error))
            return error;

        return {
            code: error.errorCode,
            message: error.errorText
        };
    }

    _global.Downloader = Downloader;
})(this);


/**
 *
 *    var downloader =  new Downloader({
 *        downloaderPlugin : document.querySelector('#DownloaderPlugin')
 *    });
 *
 *    downloader.start({
 *        url: 'http://example.com/file.zip',
 *        path: 'file://internal/common/test',
 *    }, function(error, data){
 *        console.log('complete', error, data)
 *    });
 *
 **/
