"use strict";var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();Object.defineProperty(exports, "__esModule", { value: true });exports.Slack = undefined;exports.







userTag = userTag;exports.




isDirectMessage = isDirectMessage;var _slackClient = require('slack-client');var _slackClient2 = _interopRequireDefault(_slackClient);var _utils = require('./utils.js');require('source-map-support/register');var _properties = require('../properties.json');var _properties2 = _interopRequireDefault(_properties);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var userTagPatern = new RegExp("<@(.*)>");function userTag(userId) {return "<@" + userId + ">";}function isDirectMessage(message, userId) 
{
	return message.substr(0, userTag(userId).length) === userTag(userId);}var 


Slack = exports.Slack = function () {

	function Slack() 
	{_classCallCheck(this, Slack);
		this.api = new _slackClient2.default(
		_properties2.default.slack.token, 
		_properties2.default.slack.autoReconnect, 
		_properties2.default.slack.autoMark);}_createClass(Slack, [{ key: 'on', value: function on(



		handlers) 
		{var _this = this;
			handlers.forEach(function (_ref) {var _ref2 = _slicedToArray(_ref, 2);var event = _ref2[0];var handler = _ref2[1];return _this.api.on(event, handler);});
			return this;} }, { key: 'login', value: function login() 



		{
			this.api.login();
			return this;} }, { key: 'addErrorHandler', value: function addErrorHandler(


		handler) 
		{
			this.on([['error', function (e) {throw e;}]]);
			return this;}


		// If the event is a direct mention, it return the message after the mention, undefined if not
	}, { key: 'directMention', value: function directMention(event) 
		{
			if (isDirectMessage(event.text, this.api.self.id)) 
			{
				var messageSplited = event.text.split(':');
				if (messageSplited.length === 2) return messageSplited[1].trim();}} }, { key: 'getMessage', value: function getMessage(



		channel, ts) 
		{var _this2 = this;
			return new Promise(function (resolve, reject) {return _this2.api._apiCall(
				"reactions.get", 
				{ timestamp: ts, channel: channel }, 
				function (data) {
					if (data.type !== "message") reject("Ceci n'est pas un message");else 
					resolve(data);});});} }, { key: 'userFromTag', value: function userFromTag(




		userTag) 
		{
			if (!userTag || !userTag.match(userTagPatern)) return;else 
			return this.api.getUserByID(userTag.replace(userTagPatern, "$1"));} }]);return Slack;}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNsYWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFnQjs7Ozs7QUFLQSx5aUJBUGhCLElBQUksZ0JBQWdCLElBQUksTUFBSixDQUFXLFNBQVgsQ0FBaEIsQ0FFRyxTQUFTLE9BQVQsQ0FBaUIsTUFBakIsRUFDUCxDQUNDLE9BQU8sT0FBTyxNQUFQLEdBQWdCLEdBQWhCLENBRFIsQ0FETyxTQUtTLGVBQVQsQ0FBeUIsT0FBekIsRUFBa0MsTUFBbEM7QUFDUDtBQUNDLFFBQU8sUUFBUSxNQUFSLENBQWUsQ0FBZixFQUFrQixRQUFRLE1BQVIsRUFBZ0IsTUFBaEIsQ0FBbEIsS0FBOEMsUUFBUSxNQUFSLENBQTlDLENBRFIsQ0FETzs7O0FBS007O0FBRVosVUFGWSxLQUVaO0FBQ0Esd0JBSFksT0FHWjtBQUNDLE9BQUssR0FBTCxHQUFXO0FBQ1YsdUJBQVcsS0FBWCxDQUFpQixLQUFqQjtBQUNBLHVCQUFXLEtBQVgsQ0FBaUIsYUFBakI7QUFDQSx1QkFBVyxLQUFYLENBQWlCLFFBQWpCLENBSEQsQ0FERCxDQURBLGFBRlk7Ozs7QUFXVDtBQUNIO0FBQ0MsWUFBUyxPQUFULENBQWlCLHlEQUFFLHFCQUFPLDBCQUFhLE1BQUssR0FBTCxDQUFTLEVBQVQsQ0FBWSxLQUFaLEVBQW1CLE9BQW5CLEdBQXRCLENBQWpCLENBREQ7QUFFQyxVQUFPLElBQVAsQ0FGRDs7OztBQU1BO0FBQ0MsUUFBSyxHQUFMLENBQVMsS0FBVCxHQUREO0FBRUMsVUFBTyxJQUFQLENBRkQ7OztBQUtnQjtBQUNoQjtBQUNDLFFBQUssRUFBTCxDQUFRLENBQUMsQ0FBQyxPQUFELEVBQVUsYUFBSyxDQUFDLE1BQU0sQ0FBTixDQUFELENBQUwsQ0FBWCxDQUFSLEVBREQ7QUFFQyxVQUFPLElBQVAsQ0FGRDs7OzswREFNYztBQUNkO0FBQ0MsT0FBRyxnQkFBZ0IsTUFBTSxJQUFOLEVBQVksS0FBSyxHQUFMLENBQVMsSUFBVCxDQUFjLEVBQWQsQ0FBL0I7QUFDQTtBQUNDLFFBQUksaUJBQWlCLE1BQU0sSUFBTixDQUFXLEtBQVgsQ0FBaUIsR0FBakIsQ0FBakIsQ0FETDtBQUVDLFFBQUcsZUFBZSxNQUFmLEtBQTBCLENBQTFCLEVBQTZCLE9BQU8sZUFBZSxDQUFmLEVBQWtCLElBQWxCLEVBQVAsQ0FBaEMsQ0FIRDs7OztBQU9VLFdBQVM7QUFDcEI7QUFDQyxVQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsVUFBcUIsT0FBSyxHQUFMLENBQVMsUUFBVDtBQUN2QyxtQkFEdUM7QUFFdkMsTUFBQyxXQUFZLEVBQVosRUFBZ0IsU0FBVSxPQUFWLEVBRnNCO0FBR3ZDLG9CQUFRO0FBQ1AsU0FBRyxLQUFLLElBQUwsS0FBYyxTQUFkLEVBQXlCLE9BQU8sMkJBQVAsRUFBNUI7QUFDSyxhQUFRLElBQVIsRUFETCxDQURELEdBSGtCLENBQW5CLENBREQ7Ozs7O0FBV1k7QUFDWjtBQUNDLE9BQUcsQ0FBQyxPQUFELElBQVksQ0FBQyxRQUFRLEtBQVIsQ0FBYyxhQUFkLENBQUQsRUFBK0IsT0FBOUM7QUFDSyxVQUFPLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsUUFBUSxPQUFSLENBQWdCLGFBQWhCLEVBQStCLElBQS9CLENBQXJCLENBQVAsQ0FETCxhQXJEVyIsImZpbGUiOiJTbGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IFNsYWNrQ2xpZW50IGZyb20gJ3NsYWNrLWNsaWVudCc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgcHJvcGVydGllcyBmcm9tIFwiLi4vcHJvcGVydGllcy5qc29uXCI7XG5cbmxldCB1c2VyVGFnUGF0ZXJuID0gbmV3IFJlZ0V4cChcIjxAKC4qKT5cIik7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VyVGFnKHVzZXJJZClcbntcblx0cmV0dXJuIFwiPEBcIiArIHVzZXJJZCArIFwiPlwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEaXJlY3RNZXNzYWdlKG1lc3NhZ2UsIHVzZXJJZClcbntcblx0cmV0dXJuIG1lc3NhZ2Uuc3Vic3RyKDAsIHVzZXJUYWcodXNlcklkKS5sZW5ndGgpID09PSB1c2VyVGFnKHVzZXJJZCk7XG59XG5cbmV4cG9ydCBjbGFzcyBTbGFja1xue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHR0aGlzLmFwaSA9IG5ldyBTbGFja0NsaWVudChcblx0XHRcdHByb3BlcnRpZXMuc2xhY2sudG9rZW4sXG5cdFx0XHRwcm9wZXJ0aWVzLnNsYWNrLmF1dG9SZWNvbm5lY3QsXG5cdFx0XHRwcm9wZXJ0aWVzLnNsYWNrLmF1dG9NYXJrXG5cdFx0KTtcblx0fVxuXG5cdG9uKGhhbmRsZXJzKVxuXHR7XG5cdFx0aGFuZGxlcnMuZm9yRWFjaCgoW2V2ZW50LCBoYW5kbGVyXSkgPT4gdGhpcy5hcGkub24oZXZlbnQsIGhhbmRsZXIpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGxvZ2luKClcblx0e1xuXHRcdHRoaXMuYXBpLmxvZ2luKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRFcnJvckhhbmRsZXIoaGFuZGxlcilcblx0e1xuXHRcdHRoaXMub24oW1snZXJyb3InLCBlID0+IHt0aHJvdyBlfV1dKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8vIElmIHRoZSBldmVudCBpcyBhIGRpcmVjdCBtZW50aW9uLCBpdCByZXR1cm4gdGhlIG1lc3NhZ2UgYWZ0ZXIgdGhlIG1lbnRpb24sIHVuZGVmaW5lZCBpZiBub3Rcblx0ZGlyZWN0TWVudGlvbihldmVudClcblx0e1xuXHRcdGlmKGlzRGlyZWN0TWVzc2FnZShldmVudC50ZXh0LCB0aGlzLmFwaS5zZWxmLmlkKSlcblx0XHR7XG5cdFx0XHRsZXQgbWVzc2FnZVNwbGl0ZWQgPSBldmVudC50ZXh0LnNwbGl0KCc6Jyk7XG5cdFx0XHRpZihtZXNzYWdlU3BsaXRlZC5sZW5ndGggPT09IDIpIHJldHVybiBtZXNzYWdlU3BsaXRlZFsxXS50cmltKCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0TWVzc2FnZShjaGFubmVsLCB0cylcblx0e1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB0aGlzLmFwaS5fYXBpQ2FsbChcblx0XHRcdFwicmVhY3Rpb25zLmdldFwiLFxuXHRcdFx0e3RpbWVzdGFtcCA6IHRzLCBjaGFubmVsIDogY2hhbm5lbH0sXG5cdFx0XHRkYXRhID0+IHtcblx0XHRcdFx0aWYoZGF0YS50eXBlICE9PSBcIm1lc3NhZ2VcIikgcmVqZWN0KFwiQ2VjaSBuJ2VzdCBwYXMgdW4gbWVzc2FnZVwiKTtcblx0XHRcdFx0ZWxzZSByZXNvbHZlKGRhdGEpO1xuXHRcdFx0fVxuXHRcdCkpO1xuXHR9XG5cblx0dXNlckZyb21UYWcodXNlclRhZylcblx0e1xuXHRcdGlmKCF1c2VyVGFnIHx8ICF1c2VyVGFnLm1hdGNoKHVzZXJUYWdQYXRlcm4pKSByZXR1cm47XG5cdFx0ZWxzZSByZXR1cm4gdGhpcy5hcGkuZ2V0VXNlckJ5SUQodXNlclRhZy5yZXBsYWNlKHVzZXJUYWdQYXRlcm4sIFwiJDFcIikpO1xuXHR9O1xufVxuIl19