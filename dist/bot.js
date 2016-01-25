/**
 * Created by valentin on 22/01/16.
 */
"use strict";var _DataBase = require("./DataBase.js");var _DataBase2 = _interopRequireDefault(_DataBase);var _Slack = require("./Slack.js");var _interpreteur = require("./interpreteur.js");var _interpreteur2 = _interopRequireDefault(_interpreteur);var _utils = require("./utils.js");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}





// Error handling of unhandled promise rejections
process.on('unhandledRejection', function (err) {console.error(err);console.error(err.stack);});

var db = new _DataBase2.default();
var slack = new _Slack.Slack();
var interpreteur = new _interpreteur2.default(slack, db);

(0, _utils.log)("Setting up event listeners");

slack.on([
["open", function (event) {
	(0, _utils.log)("Bot connected.");}], 

["raw_message", function (event) {
	if (!(0, _utils.beginWith)(event.type, "reaction_")) return; //L'event concerne les réactions
	if (event.item.type !== "message") return; // La réaction concerne un message
	if (!(0, _utils.endWith)(event.type, "added") && !(0, _utils.endWith)(event.type, "removed")) return; // Il s'agit d'un ajout ou d'une supression

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQTs7Ozs7OztBQU9BLFFBQVEsRUFBUixDQUFXLG9CQUFYLEVBQWlDLGVBQU8sQ0FBQyxRQUFRLEtBQVIsQ0FBYyxHQUFkLEVBQUQsT0FBcUIsQ0FBUSxLQUFSLENBQWMsSUFBSSxLQUFKLENBQWQsQ0FBckIsQ0FBUCxDQUFqQzs7QUFFQSxJQUFJLEtBQUssd0JBQUw7QUFDSixJQUFJLFFBQVEsa0JBQVI7QUFDSixJQUFJLGVBQWUsMkJBQWlCLEtBQWpCLEVBQXdCLEVBQXhCLENBQWY7O0FBRUosZ0JBQUksNEJBQUo7O0FBRUEsTUFBTSxFQUFOLENBQVM7QUFDUixDQUFDLE1BQUQsRUFBUyxpQkFBUztBQUNqQixpQkFBSSxnQkFBSixFQURpQixDQUFULENBREQ7O0FBSVIsQ0FBQyxhQUFELEVBQWdCLGlCQUFTO0FBQ3hCLEtBQUcsQ0FBQyxzQkFBVSxNQUFNLElBQU4sRUFBWSxXQUF0QixDQUFELEVBQXFDLE9BQXhDO0FBRHdCLEtBRXJCLE1BQU0sSUFBTixDQUFXLElBQVgsS0FBb0IsU0FBcEIsRUFBK0IsT0FBbEM7QUFGd0IsS0FHckIsQ0FBQyxvQkFBUSxNQUFNLElBQU4sRUFBWSxPQUFwQixDQUFELElBQWlDLENBQUMsb0JBQVEsTUFBTSxJQUFOLEVBQVksU0FBcEIsQ0FBRCxFQUFpQyxPQUFyRTtBQUh3QjtBQUt4QixTQUFRLEdBQVIsQ0FBWSw0QkFBWixFQUx3QjtBQU14QixLQUFJLG1CQUFKLENBTndCOztBQVF4QixPQUFNLFVBQU4sQ0FBaUIsTUFBTSxJQUFOLENBQVcsT0FBWCxFQUFvQixNQUFNLElBQU4sQ0FBVyxFQUFYLENBQXJDO0FBQ0UsS0FERixDQUNPLHFCQUFZLFlBQVYsUUFBVTtBQUNqQix1QkFBUSxNQUFNLElBQU4sRUFBWSxPQUFwQixJQUErQixHQUFHLFNBQUgsQ0FBYSxJQUFiLENBQS9CLEdBQW9ELEdBQUcsV0FBSCxDQUFlLElBQWYsQ0FBcEQsR0FESyxDQURQOztBQUlFLEtBSkYsQ0FJTyxpQkFBWSxLQUFWLGtCQUFVO0FBQ2pCLE1BQUcsS0FBSyxNQUFMLEtBQWdCLENBQWhCO0FBQ0YsU0FBTyxHQUFHLFVBQUgsQ0FBYyxPQUFkLENBQVAsQ0FERDtBQUVLLE1BQUcsS0FBSyxNQUFMLEtBQWdCLENBQWhCO0FBQ1AsU0FBTyxHQUFHLFVBQUgsQ0FBYyxPQUFkLEVBQXVCLEtBQUssQ0FBTCxFQUFRLE1BQVIsSUFBa0Isb0JBQVEsTUFBTSxJQUFOLEVBQVksT0FBcEIsSUFBK0IsQ0FBL0IsR0FBbUMsQ0FBQyxDQUFELENBQXJELENBQTlCLENBREksQ0FIQSxDQUpQLENBUndCLENBQVQsQ0FKUjs7O0FBdUJSLENBQUMsU0FBRCxFQUFZLGlCQUFTO0FBQ3BCLEtBQUksVUFBVSxNQUFNLGFBQU4sQ0FBb0IsS0FBcEIsQ0FBVixDQURnQjtBQUVwQixLQUFHLENBQUMsT0FBRCxFQUFVLE9BQWI7QUFDQSxpQkFBSSxxQkFBSixFQUEyQixPQUEzQixFQUhvQjs7QUFLcEIsY0FBYSxXQUFiLENBQXlCLE9BQXpCO0FBQ0UsS0FERixDQUNPLGtCQUFVO0FBQ2YsTUFBRyxNQUFILEVBQVcsTUFBTSxHQUFOLENBQVUsdUJBQVYsQ0FBa0MsTUFBTSxPQUFOLENBQWxDLENBQWlELElBQWpELENBQXNELE1BQXRELEVBQVgsQ0FESyxDQURQLENBTG9CLENBQVQsQ0F2QkosQ0FBVDs7O0FBaUNFLGVBakNGLENBaUNrQixhQUFLLENBQUMsTUFBTSxDQUFOLENBQUQsQ0FBTCxDQWpDbEI7QUFrQ0UsS0FsQ0Y7O0FBb0NBIiwiZmlsZSI6ImJvdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB2YWxlbnRpbiBvbiAyMi8wMS8xNi5cbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgRGF0YUJhc2UgZnJvbSBcIi4vRGF0YUJhc2UuanNcIjtcbmltcG9ydCB7U2xhY2t9IGZyb20gXCIuL1NsYWNrLmpzXCI7XG5pbXBvcnQgSW50ZXJwcmV0ZXVyIGZyb20gXCIuL2ludGVycHJldGV1ci5qc1wiO1xuaW1wb3J0IHtsb2csIGJlZ2luV2l0aCwgZW5kV2l0aH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcblxuLy8gRXJyb3IgaGFuZGxpbmcgb2YgdW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uc1xucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgZXJyID0+IHtjb25zb2xlLmVycm9yKGVycik7IGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTt9KTtcblxudmFyIGRiID0gbmV3IERhdGFCYXNlKCk7XG52YXIgc2xhY2sgPSBuZXcgU2xhY2soKTtcbnZhciBpbnRlcnByZXRldXIgPSBuZXcgSW50ZXJwcmV0ZXVyKHNsYWNrLCBkYik7XG5cbmxvZyhcIlNldHRpbmcgdXAgZXZlbnQgbGlzdGVuZXJzXCIpO1xuXG5zbGFjay5vbihbXG5cdFtcIm9wZW5cIiwgZXZlbnQgPT4ge1xuXHRcdGxvZyhcIkJvdCBjb25uZWN0ZWQuXCIpO1xuXHR9XSxcblx0W1wicmF3X21lc3NhZ2VcIiwgZXZlbnQgPT4ge1xuXHRcdGlmKCFiZWdpbldpdGgoZXZlbnQudHlwZSwgXCJyZWFjdGlvbl9cIikpIHJldHVybjsgLy9MJ2V2ZW50IGNvbmNlcm5lIGxlcyByw6lhY3Rpb25zXG5cdFx0aWYoZXZlbnQuaXRlbS50eXBlICE9PSBcIm1lc3NhZ2VcIikgcmV0dXJuOyAvLyBMYSByw6lhY3Rpb24gY29uY2VybmUgdW4gbWVzc2FnZVxuXHRcdGlmKCFlbmRXaXRoKGV2ZW50LnR5cGUsIFwiYWRkZWRcIikgJiYgIWVuZFdpdGgoZXZlbnQudHlwZSwgXCJyZW1vdmVkXCIpKSByZXR1cm47IC8vIElsIHMnYWdpdCBkJ3VuIGFqb3V0IG91IGQndW5lIHN1cHJlc3Npb25cblxuXHRcdGNvbnNvbGUubG9nKFwiQm90IDogcmVhY3Rpb24gaW50ZXJhY3Rpb25cIik7XG5cdFx0bGV0IHVzZXJfaWQ7XG5cblx0XHRzbGFjay5nZXRNZXNzYWdlKGV2ZW50Lml0ZW0uY2hhbm5lbCwgZXZlbnQuaXRlbS50cylcblx0XHRcdC50aGVuKCh7bWVzc2FnZSA6e3VzZXJ9fSkgPT5cblx0XHRcdFx0ZW5kV2l0aChldmVudC50eXBlLCBcImFkZGVkXCIpID8gZGIuZ2l2ZVBvaW50KHVzZXIpIDogZGIucmVtb3ZlUG9pbnQodXNlcilcblx0XHRcdClcblx0XHRcdC50aGVuKCh7cm93c30pID0+IHtcblx0XHRcdFx0aWYocm93cy5sZW5ndGggPT09IDApXG5cdFx0XHRcdFx0cmV0dXJuIGRiLmNyZWF0ZVVzZXIodXNlcl9pZCk7XG5cdFx0XHRcdGVsc2UgaWYocm93cy5sZW5ndGggPT09IDEpXG5cdFx0XHRcdFx0cmV0dXJuIGRiLnVwZGF0ZVVzZXIodXNlcl9pZCwgcm93c1swXS5wb2ludHMgKyAoZW5kV2l0aChldmVudC50eXBlLCBcImFkZGVkXCIpID8gMSA6IC0xKSk7XG5cdFx0XHR9KVxuXHR9XSxcblx0W1wibWVzc2FnZVwiLCBldmVudCA9PiB7XG5cdFx0bGV0IGNvbW1hbmQgPSBzbGFjay5kaXJlY3RNZW50aW9uKGV2ZW50KTtcblx0XHRpZighY29tbWFuZCkgcmV0dXJuO1xuXHRcdGxvZyhcIkNvbW1hbmQgcmVjZWl2ZWQgOiBcIiwgY29tbWFuZCk7XG5cblx0XHRpbnRlcnByZXRldXIuaW50ZXJwcmV0ZXIoY29tbWFuZClcblx0XHRcdC50aGVuKHJlc3VsdCA9PiB7XG5cdFx0XHRcdGlmKHJlc3VsdCkgc2xhY2suYXBpLmdldENoYW5uZWxHcm91cE9yRE1CeUlEKGV2ZW50LmNoYW5uZWwpLnNlbmQocmVzdWx0KVxuXHRcdFx0fSk7XG5cdH1dXSlcblx0LmFkZEVycm9ySGFuZGxlcihlID0+IHt0aHJvdyBlO30pXG5cdC5sb2dpbigpO1xuXG5kZWJ1Z2dlcjsiXX0=