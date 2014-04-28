/**********************************************************************
 ***   Task Object file for HTML/JavaScript Application             ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   03/24/2014                                          ***
 **********************************************************************/

function Task(obj) {
    "use strict";
    var STORAGE = window.localStorage,
        NEW_ID = -1,
        PREFIX = "TASKS:",
        STORED_INDEX = PREFIX + "index",
        ENTRY = PREFIX + "task-",
        STATUSES = ["Not Started", "In Progress", "Completed"];

    if ((typeof obj) === (typeof "a string")) {
        obj = JSON.parse(obj);
    }
    if (!obj) {
        obj = {};
    }

    this.id = parseInt(obj.id, 10) || 0;
    this.name = obj.name || "";
    this.description = obj.description || "";
    this.duedate = obj.duedate || "";
    this.status = parseInt(obj.status, 10) || 0;

    this.store = function() {
        var json;

        if (this.id === -1) {
            this.id = parseInt(STORAGE.getItem(STORED_INDEX), 10);
        }

        json = JSON.stringify(this);

        STORAGE.setItem(ENTRY + this.id, json);

        if (STORAGE.getItem(STORED_INDEX) <= this.id) {
            STORAGE.setItem(STORED_INDEX, this.id + 1);
        }
    };
    this.load = function() {
        var data, prop;

        if (isNaN(this.id)) {
            return;
        }

        data = STORAGE.getItem(ENTRY + this.id);

        this.parse(data);
    };

    this.parse = function(data) {
        var prop;

        data = JSON.parse(data);

        for (prop in data) {
            if (data.hasOwnProperty(prop)) {
                this[prop] = data[prop];
            }
        }
    };
    this.getStatus = function() {
        if (this.status < 0 || this.status >= STATUSES.length) {
            this.status = 0;
        }

        return STATUSES[this.status];
    };
    this.getDuedate = function() {
        return this.duedate.replace(/\//g, "-");
    };

    this.delete = function() {
        STORAGE.removeItem(ENTRY + this.id);
    };

    this.hasId = function(task_id) {
        return (parseInt(this.id, 10) === parseInt(task_id, 10));
    };
}
