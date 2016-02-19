(function(_global) {

    /**
     * Class to unzip files
     *
     * @class Unzipper
     * @param {Object}   options  [description]
     * @param {Function} callback [description]
     * @constructor
     */

    function Unzipper(options, callback) {
        this.init(options, callback);
    }

    Unzipper.prototype.init = function(options, callback) {
        if(!this.STORAGE) {
            this.STORAGE = new Storage();
        }

        if(callback)
            callback(null, {success: true});
    }

    /**
     * Start method for unzip file
     * @param  {Object}   options  {from : 'String', to:'String'}
     * @param  {Function} callback [description]
     */
    Unzipper.prototype.start = function init(options, callback) {
        var FROM_PATH,
            TO_PATH,
            FOLDER_NAME,
            folder;

        FROM_PATH = options.from;
        TO_PATH = options.to;
        FOLDER_NAME = options.folder || extractFileFromPath(FROM_PATH).split('.')[0];

        if(!FROM_PATH || !TO_PATH)
            return callback({message: 'invalid arguments. Required {from:"", to: ""}'});

        var onSuccess = function (data){
            if(typeof callback == 'function')
                callback(null, {success: true});
        };

        var onError = function (error){
            if(typeof callback == 'function')
                callback(getError(error), null);
        };

        options = {
            zipPath: normalizePath(FROM_PATH),
            targetPath: normalizePath(TO_PATH) + '/' + FOLDER_NAME,
        };

        _log(options)

        this.STORAGE.unzipFile( onSuccess , onError , options );
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

        if(file.indexOf('.') > -1)
            return file;
        else
            return '';
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

    _global.Unzipper = Unzipper;
})(this);


/**
 *
 *    var unzipper =  new Unzipper({
 *        fileSystemPlugin : document.querySelector('#FileSystemPlugin')
 *    });
 *
 *    unzipper.start({
 *        from: '/mtd_down/common/test/file.zip',
 *        to: '/mtd_down/common/test',
 *    }, function(error, data){
 *        console.log('complete', error, data)
 *    });
 *
 **/
