"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();Object.defineProperty(exports, "__esModule", { value: true });var _utils = require("./utils.js");function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 


Interpreteur = function () {

	function Interpreteur(slack, db) 
	{_classCallCheck(this, Interpreteur);
		this.slack = slack;
		this.db = db;}_createClass(Interpreteur, [{ key: "interpreter", value: function interpreter(


		rawCommand) 
		{
			var command = rawCommand.split(' ');

			if (command.length === 0) return Promise.resolve("Oui ?");

			var fun = command.shift().toLowerCase().trim();
			var params = command;

			try {return this['_i_' + fun].apply(this, _toConsumableArray(params));} 
			catch (e) 
			{
				console.error(e);
				if (e instanceof TypeError) return Promise.resolve(fun + " ? Kézako ?");else 
				throw e;}} }, { key: "_i_classement", value: function _i_classement() 





		/*Affiche le classement des points cocaud*/
		{var _this = this;
			return this.db.getClassement().
			then(function (classement) {
				var text = "Voici le classement :\n";var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
					for (var _iterator = classement[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var _step$value = _step.value;var user_id = _step$value.user_id;var points = _step$value.points;
						text += _this.slack.api.getUserByID(user_id).name + " : " + points + "\n";}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
				return text;});} }, { key: "_i_give", value: function _i_give(



		userTag) 
		/* Donne un point cocaud à @user */
		{var _this2 = this;
			return new Promise(function (resolve) {
				var userId = _this2.slack.userFromTag(userTag).id;

				if (!userId) return resolve("Gros débile, donne moi un nom au moins... Comme ça : give @untrouducul");else 
				return _this2.db.givePoint(userId);});} }, { key: "_i_remove", value: function _i_remove(



		userTag) 
		/* Enlève un point cocaud à @user */
		{var _this3 = this;
			return new Promise(function (resolve) {
				var userId = _this3.slack.userFromTag(userTag).id;

				if (!userId) resolve("Gros débile, donne moi un nom au moins... Comme ça : give @untrouducul");
				return _this3.db.removePoint(userId);});} }, { key: "_i_help", value: function _i_help() 




		/* Affiche l'aide */
		{
			var text = "Tu veux de l'aide ? Voilà ce que je sais faire :\n";var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
				for (var _iterator2 = Object.getOwnPropertyNames(Object.getPrototypeOf(this))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) 
				{var key = _step2.value;
					if ((0, _utils.beginWith)(key, "_i_")) 
					{
						text += "    - " + key.substr(3);
						(0, _utils.log)(this[key].toString());
						var fn = this[key].toString().
						match(/^function\s*_i_.*\(\s*(.*)\)\s*(?:\/\*(.*)\*\/)?/m);
						var args = fn[1].split(/\s*,\s*/);
						var description = fn[2];var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
							for (var _iterator3 = args[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var a = _step3.value;text += a != '' ? " [" + a + "]" : '';}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}
						text += description ? "  : " + description + '\n' : '\n';}}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}



			return Promise.resolve(text);} }]);return Interpreteur;}();exports.default = Interpreteur;
//# sourceMappingURL=data:application/json;base64,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LEtBQUssRUFBTCxHQUFVLE9BQU8sQ0FBUCxHQUFXLEdBQVgsR0FBaUIsRUFBM0IsRUFBM0Isd05BUEQ7QUFRQyxjQUFRLGNBQWMsU0FBUyxXQUFULEdBQXVCLElBQXZCLEdBQThCLElBQTVDLENBUlQsQ0FEQSxDQUZELHdOQUZEOzs7O0FBaUJDLFVBQU8sUUFBUSxPQUFSLENBQWdCLElBQWhCLENBQVAsQ0FqQkQsYUEvRG9CIiwiZmlsZSI6ImludGVycHJldGV1ci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHtsb2csIGJlZ2luV2l0aCwgZW5kV2l0aH0gZnJvbSBcIi4vdXRpbHMuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcnByZXRldXJcbntcblx0Y29uc3RydWN0b3Ioc2xhY2ssIGRiKVxuXHR7XG5cdFx0dGhpcy5zbGFjayA9IHNsYWNrO1xuXHRcdHRoaXMuZGIgPSBkYjtcblx0fVxuXG5cdGludGVycHJldGVyKHJhd0NvbW1hbmQpXG5cdHtcblx0XHRsZXQgY29tbWFuZCA9IHJhd0NvbW1hbmQuc3BsaXQoJyAnKTtcblxuXHRcdGlmKGNvbW1hbmQubGVuZ3RoID09PSAwKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFwiT3VpID9cIik7XG5cblx0XHRsZXQgZnVuID0gY29tbWFuZC5zaGlmdCgpLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuXHRcdGxldCBwYXJhbXMgPSBjb21tYW5kO1xuXG5cdFx0dHJ5IHsgcmV0dXJuIHRoaXNbJ19pXycgKyBmdW5dKC4uLnBhcmFtcyk7IH1cblx0XHRjYXRjaChlKVxuXHRcdHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XG5cdFx0XHRpZihlIGluc3RhbmNlb2YgVHlwZUVycm9yKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZ1biArIFwiID8gS8OpemFrbyA/XCIpO1xuXHRcdFx0ZWxzZSB0aHJvdyBlO1xuXHRcdH1cblxuXHR9XG5cblx0X2lfY2xhc3NlbWVudCgpXG5cdC8qQWZmaWNoZSBsZSBjbGFzc2VtZW50IGRlcyBwb2ludHMgY29jYXVkKi9cblx0e1xuXHRcdHJldHVybiB0aGlzLmRiLmdldENsYXNzZW1lbnQoKVxuXHRcdFx0LnRoZW4oY2xhc3NlbWVudCA9PiB7XG5cdFx0XHRcdGxldCB0ZXh0ID0gXCJWb2ljaSBsZSBjbGFzc2VtZW50IDpcXG5cIjtcblx0XHRcdFx0Zm9yKGxldCB7dXNlcl9pZCwgcG9pbnRzfSBvZiBjbGFzc2VtZW50KVxuXHRcdFx0XHRcdHRleHQgKz0gdGhpcy5zbGFjay5hcGkuZ2V0VXNlckJ5SUQodXNlcl9pZCkubmFtZSArIFwiIDogXCIgKyBwb2ludHMgKyBcIlxcblwiO1xuXHRcdFx0XHRyZXR1cm4gdGV4dDtcblx0XHRcdH0pO1xuXHR9XG5cblx0X2lfZ2l2ZSh1c2VyVGFnKVxuXHQvKiBEb25uZSB1biBwb2ludCBjb2NhdWQgw6AgQHVzZXIgKi9cblx0e1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0XHRcdGxldCB1c2VySWQgPSB0aGlzLnNsYWNrLnVzZXJGcm9tVGFnKHVzZXJUYWcpLmlkO1xuXG5cdFx0XHRpZighdXNlcklkKSByZXR1cm4gcmVzb2x2ZShcIkdyb3MgZMOpYmlsZSwgZG9ubmUgbW9pIHVuIG5vbSBhdSBtb2lucy4uLiBDb21tZSDDp2EgOiBnaXZlIEB1bnRyb3VkdWN1bFwiKTtcblx0XHRcdGVsc2UgcmV0dXJuIHRoaXMuZGIuZ2l2ZVBvaW50KHVzZXJJZCk7XG5cdFx0fSk7XG5cdH1cblxuXHRfaV9yZW1vdmUodXNlclRhZylcblx0LyogRW5sw6h2ZSB1biBwb2ludCBjb2NhdWQgw6AgQHVzZXIgKi9cblx0e1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0XHRcdGxldCB1c2VySWQgPSB0aGlzLnNsYWNrLnVzZXJGcm9tVGFnKHVzZXJUYWcpLmlkO1xuXG5cdFx0XHRpZighdXNlcklkKSByZXNvbHZlKFwiR3JvcyBkw6liaWxlLCBkb25uZSBtb2kgdW4gbm9tIGF1IG1vaW5zLi4uIENvbW1lIMOnYSA6IGdpdmUgQHVudHJvdWR1Y3VsXCIpO1xuXHRcdFx0cmV0dXJuIHRoaXMuZGIucmVtb3ZlUG9pbnQodXNlcklkKTtcblx0XHR9KTtcblx0fVxuXG5cdF9pX2hlbHAoKVxuXHQvKiBBZmZpY2hlIGwnYWlkZSAqL1xuXHR7XG5cdFx0bGV0IHRleHQgPSBcIlR1IHZldXggZGUgbCdhaWRlID8gVm9pbMOgIGNlIHF1ZSBqZSBzYWlzIGZhaXJlIDpcXG5cIjtcblx0XHRmb3IobGV0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykpKVxuXHRcdHtcblx0XHRcdGlmKGJlZ2luV2l0aChrZXksIFwiX2lfXCIpKVxuXHRcdFx0e1xuXHRcdFx0XHR0ZXh0ICs9IFwiICAgIC0gXCIgKyBrZXkuc3Vic3RyKDMpO1xuXHRcdFx0XHRsb2codGhpc1trZXldLnRvU3RyaW5nKCkpO1xuXHRcdFx0XHRsZXQgZm4gPSB0aGlzW2tleV0udG9TdHJpbmcoKVxuXHRcdFx0XHRcdC5tYXRjaCgvXmZ1bmN0aW9uXFxzKl9pXy4qXFwoXFxzKiguKilcXClcXHMqKD86XFwvXFwqKC4qKVxcKlxcLyk/L20pO1xuXHRcdFx0XHRsZXQgYXJncyA9IGZuWzFdLnNwbGl0KC9cXHMqLFxccyovKTtcblx0XHRcdFx0bGV0IGRlc2NyaXB0aW9uID0gZm5bMl1cblx0XHRcdFx0Zm9yKGxldCBhIG9mIGFyZ3MpIHRleHQgKz0gYSAhPSAnJyA/IFwiIFtcIiArIGEgKyBcIl1cIiA6ICcnO1xuXHRcdFx0XHR0ZXh0ICs9IGRlc2NyaXB0aW9uID8gXCIgIDogXCIgKyBkZXNjcmlwdGlvbiArICdcXG4nIDogJ1xcbic7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh0ZXh0KVxuXHR9XG59Il19