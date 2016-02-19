var unzipper;
var defaultDir = 'file://internal/example';

fromTxt.value = defaultDir + '/file.zip';
toTxt.value = defaultDir;

window.onload = function () {
	_log('onload')

	unzipper =  new Unzipper();
}


function init(){
	_log('init');
	unzipper.start({
		from: fromTxt.value,
		to: toTxt.value,
	}, function(error, data){
		_log('complete', error, data)
	});
}