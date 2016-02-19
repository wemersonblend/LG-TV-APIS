(function(_global) {

    /**
     * Classe to manipulate filesystem
     *
     * @class Filesystem
     * @constructor
     * @param {String} projPath Caminho do projeto
     */
    function Filesystem(options, callback) {
        this.init(options, callback);
    }

    Filesystem.prototype.init = function init(options, callback) {

        if(!this.STORAGE) {
            this.STORAGE = new Storage();
        }

        if(callback)
            callback(null, {success: true});
    };

    /**
     * Creates a directory.
     *
     * @method mkdir
     * @param {string} path
     * @param {object} options || callback
     * @param {function} callback
     */
    Filesystem.prototype.mkdir = function (path, options, callback) {
        if(!path)
           return callback({message: 'Invalid dir path'}, null);

        if(typeof options == 'function')
            callback = options;

        var onSuccess = function (data){
            if(typeof callback == 'function')
                callback(null, {success: true});
        };

        var onError = function (error){
            if(typeof callback == 'function')
                callback(getError(error), null);
        };

        this.STORAGE.mkdir( onSuccess , onError , { path: normalizePath(path) } );
    };

    /**
     * Remove a directory.
     *
     * @method rmdir
     * @param {string} path
     * @param {object} options || callback
     * @param {function} callback
     */
    Filesystem.prototype.rmdir = function (path, options, callback) {
        if(!path)
            return callback({message: 'Invalid file path'}, null);

        if(typeof options == 'function')
            callback = options;


        var onSuccess = function (data){
            if(typeof callback == 'function')
                callback(null, {success: true});
        };

        var onError = function (error){
            if(typeof callback == 'function')
                callback(getError(error), null);
        };

        options = (typeof options == 'object') ? options : {};
        options.file = normalizePath(path);
        options.recursive = ('recursive' in options) ? options.recursive : false;

        this.STORAGE.removeFile( onSuccess , onError , options );
    };

    /**
     * Remove a file.
     *
     * @method rm
     * @param {string} filePath
     * @param {object} options
     * @param {function} callback
     */
    Filesystem.prototype.rm = function (filePath, options, callback) {
        return this.rmdir(filePath, options, callback);
    };

    /**
     * Read a file like text.
     *
     * @method readFile
     * @param {string} filePath
     * @param {function} callback
     */
    Filesystem.prototype.readFile = function (filePath, callback) {
        if(!filePath)
            return callback({message: 'Invalid file filePath'}, null);

        var onSuccess = function (data){
            if(typeof callback == 'function')
                callback(null, data.data);
        };

        var onError = function(error) {
            if(typeof callback == 'function')
                callback(getError(error), null);
        };

        var options = {
            path : normalizePath(filePath),
            position : 0,
            encoding: 'utf8'
        };

        this.STORAGE.readFile( onSuccess , onError , options );
   };

    /**
     * Write a file.
     *
     * @method writeFile
     * @param {string} path
     * @param {string} data
     * @param {string} fileType
     * @param {object} options
     * @param {function} callback
     */
    Filesystem.prototype.writeFile = function(filePath, data, fileType, options, callback){
        if(!filePath)
            return callback({message: 'Invalid file filePath'}, null);

        if(typeof fileType == 'function')
            callback = fileType;

        if(typeof options == 'function')
            callback = options;

        var onSuccess = function (data){
            if(typeof callback == 'function')
                callback(null, data);
        };

        var onError = function(error) {
            if(typeof callback == 'function')
                callback(getError(error), null);
        };

        options = {
            data: data,
            path: normalizePath(filePath),
            position : 0,
            mode :'truncate',
            offset:0,
            length : data.length,
            encoding: 'utf8'
        };

        this.STORAGE.writeFile( onSuccess , onError , options );
    };

   /**
     * Rename file.
     *
     * @method renameFile
     * @param {string} filePath
     * @param {string} newName
     * @param {function} callback
     */
    Filesystem.prototype.renameFile = function(filePath, newFilePath, callback) {

        if(!filePath)
           return callback({message: 'Invalid dir filePath'}, null);

        var onSuccess = function (){
            if(typeof callback == 'function')
                callback(null, data);
        };

        var onError = function(cbObject){
            if(typeof callback == 'function')
                callback(getError(error), null);
        };

        var options = {
            oldPath: normalizePath(filePath),
            newPath : normalizePath(newFilePath)
        };

        this.STORAGE.moveFile( onSuccess , onError , options );
    };

    /**
     * List all files that exists in the specified path.
     *
     * @param  {string}   path     path to list
     * @param  {Function} callback Callback function
     * @return {array}             Outputs an array of objects
     */
    Filesystem.prototype.ls = function ls(path, callback) {
        var list = [];

        if(!path)
           return callback({message: 'Invalid file path'}, null);

        var onSuccess = function (data){

            for (var i = 0; i < data.files.length; i++) {
                var file = data.files[i];
                list.push({
                    name: file.name,
                    size: file.size,
                    isDirectory: (file.type == 'folder') ? true : false,
                    isFile: (file.type == 'file') ? true : false
                });
            }

            if(typeof callback == 'function')
                callback(null, list);
        };

        var onError = function (error){
            if(typeof callback == 'function')
                callback(getError(error), null);
        };

        this.STORAGE.listFiles( onSuccess , onError , { path: normalizePath(path) } );
    };


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

    _global.Filesystem = Filesystem;
})(this);


/**
 *
 *  var fs = new Filesystem();
 *      fs.init(function(){
 *          fs.ls('/', function(){});
 *       });
 *
 **/
