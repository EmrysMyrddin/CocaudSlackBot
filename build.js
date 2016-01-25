// Import modules
var fs = require("fs");
var path = require("path");
var babelify = require("babelify");
var babel = require("babel-core");

console.log("Building...");

function p(fun, param)
{
	return new Promise((resolve, reject) => fun(param, (err, result) => err ? reject(err) : resolve(result)));
}

function p3(fun, param1, param2, param3)
{
	return new Promise((resolve, reject) => fun(param1, param2, param3, (err, result) => err ? reject(err) : resolve(result)));
}

var err = err => {throw err}
var log = console.log

function transform(sourceFileName) {
	babel.transformFile(sourceFileName+".js", {sourceMaps : 'both'}, (err, result) =>{
		if(err) throw err;
		fs.writeFile(
			path.resolve('./dist', path.relative('./src', sourceFileName + ".js")),
			result.code,
			{encoding: 'utf8'})
		fs.writeFile(
			path.resolve('./dist/map', path.relative('./src', sourceFileName + ".map")),
			result.map.mappings,
			{encoding: 'utf8'})

		console.log(sourceFileName + " builded");
	});
}

function scan(fileName, fct) {
 	p(fs.readdir, fileName).then(
		subFileNames => subFileNames.forEach(
			subFileName => {
				let fileSourceName = path.join(fileName, subFileName);
				p(fs.stat, fileSourceName).then(
					stats => stats.isFile() ? fct(fileSourceName.split('.')[0]) : scan(fileSourceName, fct)).catch(err);
			}
		),err).catch(err);
}

scan("./src", transform);
