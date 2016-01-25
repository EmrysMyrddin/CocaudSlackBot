/**
 * Created by valentin on 22/01/16.
 */
"use strict";var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();Object.defineProperty(exports, "__esModule", { value: true });var _mysql = require('mysql');var _mysql2 = _interopRequireDefault(_mysql);var _slackClient = require('slack-client');var _slackClient2 = _interopRequireDefault(_slackClient);var _utils = require('./utils');var _properties = require('../properties');var _properties2 = _interopRequireDefault(_properties);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 





DataBase = function () {

	function DataBase() 
	{_classCallCheck(this, DataBase);
		this.connection = _mysql2.default.createConnection(_properties2.default.database);
		this.connection.connect();}_createClass(DataBase, [{ key: 'query', value: function query(


		sql, param) 
		{var _this = this;
			console.log("DataBase.query : ", sql, param);

			return new Promise(function (resolve, reject) {return (
					_this.connection.query(sql, param, function (err, results, fields) {return (
							err ? reject(err) : resolve({ rows: results, fields: fields }));}));});} }, { key: 'getClassement', value: function getClassement() 




		{
			return this.query("SELECT user_id, points FROM points ORDER BY points DESC").
			then(function (_ref) {var rows = _ref.rows;return rows;});} }, { key: 'getUser', value: function getUser(


		user_id) 
		{
			return this.query("SELECT * FROM points WHERE user_id = ?", [user_id]);} }, { key: 'givePoint', value: function givePoint(


		user_id) 
		{var _this2 = this;
			return this.getUser(user_id).then(function (_ref2) {var rows = _ref2.rows;return (
					rows.length === 0 ? 
					_this2.createUser(user_id) : 
					_this2.updateUser(user_id, rows[0].points + 1));});} }, { key: 'removePoint', value: function removePoint(



		user_id) 
		{var _this3 = this;
			return this.getUser(user_id).then(function (_ref3) {var rows = _ref3.rows;return (
					rows.length !== 0 ? _this3.updateUser(user_id, rows[0].points - 1) : Promise.reject("No user"));});} }, { key: 'createUser', value: function createUser(



		user_id) 
		{
			return this.query("INSERT INTO points(user_id, points) VALUES(?, 1);", [user_id]);} }, { key: 'updateUser', value: function updateUser(


		user_id, points) 
		{
			return this.query("UPDATE points SET points = ? WHERE user_id = ?", [points, user_id]);} }]);return DataBase;}();exports.default = DataBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRhdGFCYXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBOzs7Ozs7QUFNcUI7O0FBRXBCLFVBRm9CLFFBRXBCO0FBQ0Esd0JBSG9CLFVBR3BCO0FBQ0MsT0FBSyxVQUFMLEdBQWtCLGdCQUFNLGdCQUFOLENBQXVCLHFCQUFXLFFBQVgsQ0FBekMsQ0FERDtBQUVDLE9BQUssVUFBTCxDQUFnQixPQUFoQixHQUZELENBREEsYUFGb0I7OztBQVFkLE9BQUs7QUFDWDtBQUNDLFdBQVEsR0FBUixDQUFZLG1CQUFaLEVBQWlDLEdBQWpDLEVBQXNDLEtBQXRDLEVBREQ7O0FBR0MsVUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWO0FBQ2xCLFdBQUssVUFBTCxDQUFnQixLQUFoQixDQUFzQixHQUF0QixFQUEyQixLQUEzQixFQUFrQyxVQUFDLEdBQUQsRUFBTSxPQUFOLEVBQWUsTUFBZjtBQUNqQyxhQUFNLE9BQU8sR0FBUCxDQUFOLEdBQW9CLFFBQVEsRUFBQyxNQUFPLE9BQVAsRUFBZ0IsUUFBUyxNQUFULEVBQXpCLENBQXBCLEdBRGlDLElBRGhCLENBQW5CLENBSEQ7Ozs7O0FBVUE7QUFDQyxVQUFPLEtBQUssS0FBTCxDQUFXLHlEQUFYO0FBQ0wsT0FESyxDQUNBLHFCQUFFLHdCQUFVLE1BQVosQ0FEUCxDQUREOzs7QUFLUTtBQUNSO0FBQ0MsVUFBTyxLQUFLLEtBQUwsQ0FBVyx3Q0FBWCxFQUFxRCxDQUFDLE9BQUQsQ0FBckQsQ0FBUCxDQUREOzs7QUFJVTtBQUNWO0FBQ0MsVUFBTyxLQUFLLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLElBQXRCLENBQTJCLHNCQUFFO0FBQ25DLFVBQUssTUFBTCxLQUFnQixDQUFoQjtBQUNDLFlBQUssVUFBTCxDQUFnQixPQUFoQixDQUREO0FBRUMsWUFBSyxVQUFMLENBQWdCLE9BQWhCLEVBQXlCLEtBQUssQ0FBTCxFQUFRLE1BQVIsR0FBa0IsQ0FBbEIsQ0FGMUIsR0FEaUMsQ0FBbEMsQ0FERDs7OztBQVFZO0FBQ1o7QUFDQyxVQUFPLEtBQUssT0FBTCxDQUFhLE9BQWIsRUFBc0IsSUFBdEIsQ0FBMkIsc0JBQUU7QUFDbkMsVUFBSyxNQUFMLEtBQWdCLENBQWhCLEdBQW9CLE9BQUssVUFBTCxDQUFnQixPQUFoQixFQUF5QixLQUFLLENBQUwsRUFBUSxNQUFSLEdBQWtCLENBQWxCLENBQTdDLEdBQW9FLFFBQVEsTUFBUixDQUFlLFNBQWYsQ0FBcEUsR0FEaUMsQ0FBbEMsQ0FERDs7OztBQU1XO0FBQ1g7QUFDQyxVQUFPLEtBQUssS0FBTCxDQUFXLG1EQUFYLEVBQWdFLENBQUMsT0FBRCxDQUFoRSxDQUFQLENBREQ7OztBQUlXLFdBQVM7QUFDcEI7QUFDQyxVQUFPLEtBQUssS0FBTCxDQUFXLGdEQUFYLEVBQTZELENBQUMsTUFBRCxFQUFTLE9BQVQsQ0FBN0QsQ0FBUCxDQURELGFBbkRvQiIsImZpbGUiOiJEYXRhQmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB2YWxlbnRpbiBvbiAyMi8wMS8xNi5cbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgbXlzcWwgZnJvbSAnbXlzcWwnO1xuaW1wb3J0IHNsYWNrIGZyb20gJ3NsYWNrLWNsaWVudCc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgcHJvcGVydGllcyBmcm9tICcuLi9wcm9wZXJ0aWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YUJhc2Vcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0dGhpcy5jb25uZWN0aW9uID0gbXlzcWwuY3JlYXRlQ29ubmVjdGlvbihwcm9wZXJ0aWVzLmRhdGFiYXNlKTtcblx0XHR0aGlzLmNvbm5lY3Rpb24uY29ubmVjdCgpO1xuXHR9XG5cblx0cXVlcnkoc3FsLCBwYXJhbSlcblx0e1xuXHRcdGNvbnNvbGUubG9nKFwiRGF0YUJhc2UucXVlcnkgOiBcIiwgc3FsLCBwYXJhbSk7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT5cblx0XHRcdHRoaXMuY29ubmVjdGlvbi5xdWVyeShzcWwsIHBhcmFtLCAoZXJyLCByZXN1bHRzLCBmaWVsZHMpID0+XG5cdFx0XHRcdGVyciA/IHJlamVjdChlcnIpIDogcmVzb2x2ZSh7cm93cyA6IHJlc3VsdHMsIGZpZWxkcyA6IGZpZWxkc30pKVxuXHRcdCk7XG5cdH1cblxuXHRnZXRDbGFzc2VtZW50KClcblx0e1xuXHRcdHJldHVybiB0aGlzLnF1ZXJ5KFwiU0VMRUNUIHVzZXJfaWQsIHBvaW50cyBGUk9NIHBvaW50cyBPUkRFUiBCWSBwb2ludHMgREVTQ1wiKVxuXHRcdFx0LnRoZW4oKHtyb3dzfSkgPT4gcm93cyk7XG5cdH1cblxuXHRnZXRVc2VyKHVzZXJfaWQpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5xdWVyeShcIlNFTEVDVCAqIEZST00gcG9pbnRzIFdIRVJFIHVzZXJfaWQgPSA/XCIsIFt1c2VyX2lkXSk7XG5cdH1cblxuXHRnaXZlUG9pbnQodXNlcl9pZClcblx0e1xuXHRcdHJldHVybiB0aGlzLmdldFVzZXIodXNlcl9pZCkudGhlbigoe3Jvd3N9KSA9PlxuXHRcdFx0cm93cy5sZW5ndGggPT09IDAgP1xuXHRcdFx0XHR0aGlzLmNyZWF0ZVVzZXIodXNlcl9pZCkgOlxuXHRcdFx0XHR0aGlzLnVwZGF0ZVVzZXIodXNlcl9pZCwgcm93c1swXS5wb2ludHMgKyAgMSlcblx0XHQpO1xuXHR9XG5cblx0cmVtb3ZlUG9pbnQodXNlcl9pZClcblx0e1xuXHRcdHJldHVybiB0aGlzLmdldFVzZXIodXNlcl9pZCkudGhlbigoe3Jvd3N9KSA9PlxuXHRcdFx0cm93cy5sZW5ndGggIT09IDAgPyB0aGlzLnVwZGF0ZVVzZXIodXNlcl9pZCwgcm93c1swXS5wb2ludHMgLSAgMSkgOiBQcm9taXNlLnJlamVjdChcIk5vIHVzZXJcIilcblx0XHQpO1xuXHR9XG5cblx0Y3JlYXRlVXNlcih1c2VyX2lkKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucXVlcnkoXCJJTlNFUlQgSU5UTyBwb2ludHModXNlcl9pZCwgcG9pbnRzKSBWQUxVRVMoPywgMSk7XCIsIFt1c2VyX2lkXSk7XG5cdH1cblxuXHR1cGRhdGVVc2VyKHVzZXJfaWQsIHBvaW50cylcblx0e1xuXHRcdHJldHVybiB0aGlzLnF1ZXJ5KFwiVVBEQVRFIHBvaW50cyBTRVQgcG9pbnRzID0gPyBXSEVSRSB1c2VyX2lkID0gP1wiLCBbcG9pbnRzLCB1c2VyX2lkXSk7XG5cdH1cbn0iXX0=