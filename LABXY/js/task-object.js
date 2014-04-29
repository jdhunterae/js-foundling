/**********************************************************************
 ***   Task Object file for HTML/JavaScript Application             ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   04/28/2014                                          ***
 **********************************************************************/

/**
 * Task Object
 * @param obj object containing some or all of the Task object's
 *                   attributes for assignment.
 */

function Task(obj) {
    "use strict";
    // constants for use to make scripting more 'readable'
    var STORAGE = window.localStorage,
        PREFIX = "TASKS:",
        STORED_INDEX = PREFIX + "index",
        ENTRY = PREFIX + "task-",
        NEW_ID = -1,
        STATUSES = ["Not Started", "In Progress", "Completed"];

    // check type of object and parse or assign empty object
    // if necessary.
    if ((typeof obj) === "string") {
        obj = JSON.parse(obj);
    } else if (!obj) {
        obj = {};
    }

    // assign attributes from object, or set to default value.
    this.id = parseInt(obj.id, 10) || 0;
    this.name = obj.name || "";
    this.description = obj.description || "";
    this.duedate = obj.duedate || "";
    this.status = parseInt(obj.status, 10) || 0;

    // declare 'pretty' getters for number to string values.
    this.getDuedate = function() {
        return this.duedate.replace(/\//g, "-");
    };
    this.getStatus = function() {
        if (this.status < 0 || this.status >= STATUSES.length) {
            this.status = 0;
        }
        return STATUSES[this.status];
    };

    // method for parsing loaded json string into object
    this.parse = function(data) {
        var prop;
        data = JSON.parse(data);
        for (prop in data) {
            if (data.hasOwnProperty(prop)) {
                this[prop] = data[prop];
            }
        }
    };

    // method for storing object to localStorage as json string
    this.store = function() {
        var json;
        if (this.id === NEW_ID) {
            this.id = parseInt(STORAGE.getItem(STORED_INDEX), 10);
        }
        json = JSON.stringify(this);
        STORAGE.setItem(ENTRY + this.id, json);
        if (STORAGE.getItem(STORED_INDEX) <= this.id) {
            STORAGE.setItem(STORED_INDEX, this.id + 1);
        }
    };
    // method for retrieving json string from localStorage
    this.load = function() {
        var data;
        if (isNaN(this.id)) {
            return;
        }
        data = STORAGE.getItem(ENTRY + this.id);
        this.parse(data);
    };

    // method for removing this task from localStorage
    this.delete = function() {
        STORAGE.removeItem(ENTRY + this.id);
    };

    // checks that this task's id attribute matches argument
    this.hasId = function(task_id) {
        return (parseInt(this.id, 10) === parseInt(task_id, 10));
    };
    // checks that this task's json string matches the argument
    this.equals = function(task) {
        var us, them;
        us = JSON.stringify(this);
        them = JSON.stringify(task);

        return (us === them);
    };
}
