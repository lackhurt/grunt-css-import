var IMPORT_REG = /@import\s+[^;\n]+;/g;
var PATH_REG = /@import\s+['"](.*)['"]/;
var PATH_REG_WITH_URL = /@import\s+url\s*\(\s*['"](.*)['"]\s*\)/;
// var BACKGROUND_REG = /(background[^;\}]+)url\s*\(['"]?([^\)'"]*)['"]?\)([^;\n]*)[;\}]/g;
var ASSETS_URL_REG = /url\s*\(\s*['"]?([^\)'"]*)['"]?\)([^;\n]*\s*[;,]?)/ig;

var path = require('path');

/**
 * 分析出文件内的@import指令引入的css路径(这里直处理的相对路径的)
 * @param content
 * @returns {Array}
 */
function parseExtraCss(content) {
	var matches = content.match(IMPORT_REG) || [];

	return matches.map(function(importStr) {
		var matches = importStr.match(PATH_REG);

		if (!matches || !matches[1]) {
			matches = importStr.match(PATH_REG_WITH_URL);
		}

		if (matches && matches[1]) {
			return matches[1];
		}

		return null;
	});
}

/**
 * 以@import指令为界,分割文件
 * @param content
 * @returns {Array}
 */
function splitCssFileByImport(content) {
	return content.split(IMPORT_REG);
}

/**
 * 判断是否为相对路径
 * @param url
 * @returns {boolean|*}
 */
function isRelativeUrl(url) {
	return !/^(http|ftp|https):\/\//.test(url) && /^[^\/]/.test(url);
}


/**
 * Resolve paths and urls of assets (fonts, background ..etc)
 *
 * @method		resolveRelativeUrls
 * @author		Sidati <contact@sidati.com>
 * @param		string		srcFilePath
 * @param		string		relativePath
 * @return		string		Resolved Path/Url
 */
function resolveRelativeUrls(srcFilePath, relativePath) {
	return path.join(path.dirname(srcFilePath), relativePath);
	}

/**
 * 是否是base64
 * @param url
 * @returns {boolean}
 */
function isBase64DataUrl(url) {
	return /^(data:)/.test(url) && /^[^\/]/.test(url);
}

/**
 * 替换css中的外部资源路径,目前只有background-image
 * @param content
 * @param srcFilePath
 * @returns {XML|string|void|*}
 */
function replaceExtraResourcesPath(content, srcFilePath) {
	return content.replace(ASSETS_URL_REG, function(all, url, semicon) {
		if (!isBase64DataUrl(url) && isRelativeUrl(url)) {
			url = resolveRelativeUrls(srcFilePath, url);
		}
		return 'url(\'' + url + '\')' + (semicon || '');
	});
}

module.exports = {
	replaceExtraResourcesPath: replaceExtraResourcesPath,
	parseExtraCss: parseExtraCss,
	isRelativeUrl: isRelativeUrl,
	fetchImportPath: resolveRelativeUrls,
	splitCssFileByImport: splitCssFileByImport
};
