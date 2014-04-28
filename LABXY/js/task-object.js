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
            this.id = parseInt(STORAGE.getItem(PREFIX + "index"), 10);
        }

        json = JSON.stringify(this);

        STORAGE.setItem(PREFIX + "task-" + this.id, json);

        if (STORAGE.getItem(PREFIX + "index") <= this.id) {
            STORAGE.setItem(PREFIX + "index", this.id + 1);
        }
    };
    this.load = function() {
        var data, prop;

        if (isNaN(this.id)) {
            return;
        }

        data = STORAGE.getItem(PREFIX + "task-" + this.id);
        data = JSON.parse(data);

        for (prop in data) {
            if (data.hasOwnProperty(prop)) {
                this[prop] = data[prop];
            }
        }
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

    this.display = function(isSelected) {
        var name_div, desc_div, stat_div, name_wrap, name_col, date_col, task_panel, top_row, bottom_row, list_item;

        isSelected = (isSelected !== undefined) ? isSelected : false;

        name_div = $("<span></span>").addClass("task-name");
        name_div.text(this.name);

        stat_div = $("<small data-status-id=\"" + this.status + "\"></small>");
        stat_div.addClass("task-status");
        stat_div.text(" (" + this.getStatus() + ")");

        name_wrap = $("<h5></h5>");
        name_wrap.append(name_div);
        name_wrap.append(stat_div);

        name_col = $("<div></div>").addClass("large-8 columns");
        name_col.append(name_wrap);

        date_col = $("<div></div>").addClass("large-4 columns text-right task-duedate");
        date_col.text(this.getDuedate());

        top_row = $("<div></div>").addClass("row");
        top_row.append(name_col);
        top_row.append(date_col);

        desc_div = $("<div></div>").addClass("large-12 columns task-description");
        desc_div.text(this.description);

        bottom_row = $("<div></div>").addClass("row");
        bottom_row.append(desc_div);
        if (isSelected) {
            task_panel = $("<div data-task-id=\"" + this.id + "\"></div>").addClass("panel task-panel radius clearfix active-task");
        } else {
            task_panel = $("<div data-task-id=\"" + this.id + "\"></div>").addClass("panel task-panel radius clearfix");
        }
        task_panel.append(top_row);
        task_panel.append(bottom_row);

        list_item = $("<li></li>").addClass("row");
        list_item.append(task_panel);

        $("#task-list").append($(list_item));
    };

    this.fillForm = function() {
        var index;

        $("#entry-status").html("");

        for (index in STATUSES) {
            if (!isNaN(index)) {
                $("#entry-status").append(new Option(STATUSES[index], index));
            }
        }

        $("#entry-id").val(this.id);
        $("#entry-name").val(this.name);
        $("#entry-description").val(this.description);
        $("#entry-duedate").val(this.getDuedate());
        $("#entry-status").val(this.status);

        $("#op-entry-delete").removeClass("disabled");
    };

    this.storeForm = function() {
        this.id = parseInt($("#entry-id").val(), 10);
        this.name = $("#entry-name").val();
        this.description = $("#entry-description").val();
        this.duedate = $("#entry-duedate").val();
        this.status = parseInt($("#entry-status").val(), 10);

        this.store();
    };

    this.delete = function() {
        STORAGE.removeItem(PREFIX + "task-" + this.id);
    };

    this.hasId = function(task_id) {
        return (parseInt(this.id, 10) === parseInt(task_id, 10));
    };
}
