"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var setup_1 = require("./setup");
var common_1 = require("../core/common");
var methods_1 = require("./methods");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
exports.User = User;
var Entry = /** @class */ (function (_super) {
    __extends(Entry, _super);
    function Entry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Entry;
}(sequelize_1.Model));
exports.Entry = Entry;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        get: function () {
            return this.getDataValue('id');
        }
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        get: function () {
            return this.getDataValue('username');
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        get: function () {
            return this.getDataValue('password');
        },
        set: function (value) {
            this.setDataValue('password', common_1.hashPassword(value));
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize: setup_1.db,
    timestamps: false
});
Entry.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set: function (value) {
            var key = methods_1.findUserById(this.id).then(function (r) { return r.get('password'); })["catch"](function (r) { throw r; });
            this.setDataValue('login', common_1.encrypt(value, key));
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set: function (value) {
            var key = methods_1.findUserById(this.id).then(function (r) { return r.get('password'); })["catch"](function (r) { throw r; });
            this.setDataValue('password', common_1.encrypt(value, key));
        }
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: setup_1.db,
    timestamps: false
});
User.hasMany(Entry);
Entry.belongsTo(User);
