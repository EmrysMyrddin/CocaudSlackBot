/**
 * Created by valentin on 22/01/16.
 */
"use strict";var _DataBase = require("./DataBase.js");var _DataBase2 = _interopRequireDefault(_DataBase);var _Slack = require("./Slack.js");var _interpreteur = require("./interpreteur.js");var _interpreteur2 = _interopRequireDefault(_interpreteur);var _properties = require("../properties.json");var _properties2 = _interopRequireDefault(_properties);var _utils = require("./utils.js");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}






// Error handling of unhandled promise rejections
process.on('unhandledRejection', function (err) {console.error(err.message);console.error(err.stack);});

var db = new _DataBase2.default();
var slack = new _Slack.Slack();
var interpreteur = new _interpreteur2.default(slack, db);

(0, _utils.log)("Setting up event listeners");

slack.on([
["open", function () {
	(0, _utils.log)("Bot connected.");}], 

["raw_message", function (event) {
	if (!(0, _utils.beginWith)(event.type, "reaction_")) return; //L'event concerne les réactions
	if (event.item.type !== "message") return; // La réaction concerne un message
	if (!(0, _utils.endWith)(event.type, "added") && !(0, _utils.endWith)(event.type, "removed")) return; // Il s'agit d'un ajout ou d'une supression

	// Est-ce que la réaction fait parti des réactions qui doivent être réconnues
	var reactionRecognized = false;var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
		for (var _iterator = _properties2.default.bot.reactions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var r = _step.value;
			reactionRecognized = reactionRecognized || r === event.reaction;
			console.log(reactionRecognized, r, event.reaction);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}

	if (!reactionRecognized) return;

	console.log("Bot : reaction interaction");
	var user_id = undefined;

	slack.getMessage(event.item.channel, event.item.ts).
	then(function (_ref) {var user = _ref.message.user;return (
			(0, _utils.endWith)(event.type, "added") ? db.givePoint(user) : db.removePoint(user));}).

	then(function (_ref2) {var rows = _ref2.rows;
		if (rows.length === 0) 
		return db.createUser(user_id);else 
		if (rows.length === 1) 
		return db.updateUser(user_id, rows[0].points + ((0, _utils.endWith)(event.type, "added") ? 1 : -1));});}], 


["message", function (event) {
	var command = slack.directMention(event);
	if (!command) return;
	(0, _utils.log)("Command received : ", command);

	interpreteur.interpreter(command).
	then(function (result) {
		if (result) slack.api.getChannelGroupOrDMByID(event.channel).send(result);});}]]).


addErrorHandler(function (e) {throw e;}).
login();

debugger;
//# sourceMappingURL=data:application/json;base64,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QUFNLENBQU4sQ0FBRCxDQUFMLENBekNsQjtBQTBDRSxLQTFDRjs7QUE0Q0EiLCJmaWxlIjoiYm90LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHZhbGVudGluIG9uIDIyLzAxLzE2LlxuICovXG5cInVzZSBzdHJpY3RcIjtcbmltcG9ydCBEYXRhQmFzZSBmcm9tIFwiLi9EYXRhQmFzZS5qc1wiO1xuaW1wb3J0IHtTbGFja30gZnJvbSBcIi4vU2xhY2suanNcIjtcbmltcG9ydCBJbnRlcnByZXRldXIgZnJvbSBcIi4vaW50ZXJwcmV0ZXVyLmpzXCI7XG5pbXBvcnQgcHJvcGVydGllcyBmcm9tIFwiLi4vcHJvcGVydGllcy5qc29uXCI7XG5pbXBvcnQge2xvZywgYmVnaW5XaXRoLCBlbmRXaXRofSBmcm9tIFwiLi91dGlscy5qc1wiO1xuXG4vLyBFcnJvciBoYW5kbGluZyBvZiB1bmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb25zXG5wcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCBlcnIgPT4ge2NvbnNvbGUuZXJyb3IoZXJyLm1lc3NhZ2UpOyBjb25zb2xlLmVycm9yKGVyci5zdGFjayk7fSk7XG5cbnZhciBkYiA9IG5ldyBEYXRhQmFzZSgpO1xudmFyIHNsYWNrID0gbmV3IFNsYWNrKCk7XG52YXIgaW50ZXJwcmV0ZXVyID0gbmV3IEludGVycHJldGV1cihzbGFjaywgZGIpO1xuXG5sb2coXCJTZXR0aW5nIHVwIGV2ZW50IGxpc3RlbmVyc1wiKTtcblxuc2xhY2sub24oW1xuXHRbXCJvcGVuXCIsICgpID0+IHtcblx0XHRsb2coXCJCb3QgY29ubmVjdGVkLlwiKTtcblx0fV0sXG5cdFtcInJhd19tZXNzYWdlXCIsIGV2ZW50ID0+IHtcblx0XHRpZighYmVnaW5XaXRoKGV2ZW50LnR5cGUsIFwicmVhY3Rpb25fXCIpKSByZXR1cm47IC8vTCdldmVudCBjb25jZXJuZSBsZXMgcsOpYWN0aW9uc1xuXHRcdGlmKGV2ZW50Lml0ZW0udHlwZSAhPT0gXCJtZXNzYWdlXCIpIHJldHVybjsgLy8gTGEgcsOpYWN0aW9uIGNvbmNlcm5lIHVuIG1lc3NhZ2Vcblx0XHRpZighZW5kV2l0aChldmVudC50eXBlLCBcImFkZGVkXCIpICYmICFlbmRXaXRoKGV2ZW50LnR5cGUsIFwicmVtb3ZlZFwiKSkgcmV0dXJuOyAvLyBJbCBzJ2FnaXQgZCd1biBham91dCBvdSBkJ3VuZSBzdXByZXNzaW9uXG5cblx0XHQvLyBFc3QtY2UgcXVlIGxhIHLDqWFjdGlvbiBmYWl0IHBhcnRpIGRlcyByw6lhY3Rpb25zIHF1aSBkb2l2ZW50IMOqdHJlIHLDqWNvbm51ZXNcblx0XHRsZXQgcmVhY3Rpb25SZWNvZ25pemVkID0gZmFsc2U7XG5cdFx0Zm9yKGxldCByIG9mIHByb3BlcnRpZXMuYm90LnJlYWN0aW9ucykge1xuXHRcdFx0cmVhY3Rpb25SZWNvZ25pemVkID0gcmVhY3Rpb25SZWNvZ25pemVkIHx8IChyID09PSBldmVudC5yZWFjdGlvbik7XG5cdFx0XHRjb25zb2xlLmxvZyhyZWFjdGlvblJlY29nbml6ZWQsIHIsIGV2ZW50LnJlYWN0aW9uKTtcblx0XHR9XG5cdFx0aWYoIXJlYWN0aW9uUmVjb2duaXplZCkgcmV0dXJuO1xuXG5cdFx0Y29uc29sZS5sb2coXCJCb3QgOiByZWFjdGlvbiBpbnRlcmFjdGlvblwiKTtcblx0XHRsZXQgdXNlcl9pZDtcblxuXHRcdHNsYWNrLmdldE1lc3NhZ2UoZXZlbnQuaXRlbS5jaGFubmVsLCBldmVudC5pdGVtLnRzKVxuXHRcdFx0LnRoZW4oKHttZXNzYWdlIDp7dXNlcn19KSA9PlxuXHRcdFx0XHRlbmRXaXRoKGV2ZW50LnR5cGUsIFwiYWRkZWRcIikgPyBkYi5naXZlUG9pbnQodXNlcikgOiBkYi5yZW1vdmVQb2ludCh1c2VyKVxuXHRcdFx0KVxuXHRcdFx0LnRoZW4oKHtyb3dzfSkgPT4ge1xuXHRcdFx0XHRpZihyb3dzLmxlbmd0aCA9PT0gMClcblx0XHRcdFx0XHRyZXR1cm4gZGIuY3JlYXRlVXNlcih1c2VyX2lkKTtcblx0XHRcdFx0ZWxzZSBpZihyb3dzLmxlbmd0aCA9PT0gMSlcblx0XHRcdFx0XHRyZXR1cm4gZGIudXBkYXRlVXNlcih1c2VyX2lkLCByb3dzWzBdLnBvaW50cyArIChlbmRXaXRoKGV2ZW50LnR5cGUsIFwiYWRkZWRcIikgPyAxIDogLTEpKTtcblx0XHRcdH0pXG5cdH1dLFxuXHRbXCJtZXNzYWdlXCIsIGV2ZW50ID0+IHtcblx0XHRsZXQgY29tbWFuZCA9IHNsYWNrLmRpcmVjdE1lbnRpb24oZXZlbnQpO1xuXHRcdGlmKCFjb21tYW5kKSByZXR1cm47XG5cdFx0bG9nKFwiQ29tbWFuZCByZWNlaXZlZCA6IFwiLCBjb21tYW5kKTtcblxuXHRcdGludGVycHJldGV1ci5pbnRlcnByZXRlcihjb21tYW5kKVxuXHRcdFx0LnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdFx0aWYocmVzdWx0KSBzbGFjay5hcGkuZ2V0Q2hhbm5lbEdyb3VwT3JETUJ5SUQoZXZlbnQuY2hhbm5lbCkuc2VuZChyZXN1bHQpXG5cdFx0XHR9KTtcblx0fV1dKVxuXHQuYWRkRXJyb3JIYW5kbGVyKGUgPT4ge3Rocm93IGU7fSlcblx0LmxvZ2luKCk7XG5cbmRlYnVnZ2VyOyJdfQ==