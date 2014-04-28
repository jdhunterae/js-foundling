/**********************************************************************
 ***   Task Manager Object file for HTML/JavaScript Application     ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   03/24/2014                                          ***
 **********************************************************************/

function TaskManager() {
    "use strict";
    var STORAGE = window.localStorage,
        PREFIX = "TASKS:",
        STORED_ORDER = PREFIX + "order",
        ENTRY = PREFIX + "task-",
        SORT_KEYS = ["", "id", "name", "duedate", "status"],
        STATUSES = ["Not Started", "In Progress", "Completed"],
        SORT_BY_ID = 1,
        SORT_BY_NAME = 2,
        SORT_BY_DUEDATE = 3,
        SORT_BY_STATUS = 4,
        NEW_ID = -1,
        ind;

    this.tasks = [];
    this.selected = null;
    this.sortIndex = SORT_BY_ID;
    this.filters = {};

    for (ind in STATUSES) {
        if (STATUSES.hasOwnProperty(ind)) {
            this.filters[ind] = false;
        }
    }

    this.selectTask = function(task_id) {
        if (this.selected !== null && this.selected.hasId(task_id)) {
            this.deselectTask();
        } else {
            this.selected = new Task();
            this.selected.id = task_id;
            this.selected.load();
            this.fillForm();
            $(".task-panel").each(function() {
                $(this).removeClass("active-task");
                if (parseInt($(this).data("task-id"), 10) === task_id) {
                    $(this).addClass("active-task");
                }
            });
        }
    };
    this.deselectTask = function() {
        this.selected = null;
        $(".task-panel").each(function() {
            $(this).removeClass("active-task");
        });
        this.clearForm();
    };

    this.clearDisplay = function() {
        $("#task-list").html("");
    };
    this.displayTasks = function() {
        var i;
        this.sort();
        this.clearDisplay();

        for (i = 0; i < this.tasks.length; i += 1) {
            this.display(this.tasks[i]);
        }
    };
    this.display = function(task) {
        var name_div, desc_div, stat_div, name_wrap, name_col, date_col, task_panel, top_row, bottom_row, list_item, isSelected = (this.selected !== null && task.hasId(this.selected.id));
        name_div = $("<span></span>").addClass("task-name");
        name_div.text(task.name);
        stat_div = $("<small data-status-id=\"" + task.status + "\"></small>");
        stat_div.addClass("task-status");
        stat_div.text(" (" + task.getStatus() + ")");
        name_wrap = $("<h5></h5>");
        name_wrap.append(name_div);
        name_wrap.append(stat_div);
        name_col = $("<div></div>").addClass("large-8 columns");
        name_col.append(name_wrap);
        date_col = $("<div></div>").addClass("large-4 columns text-right task-duedate");
        date_col.text(task.getDuedate());
        top_row = $("<div></div>").addClass("row");
        top_row.append(name_col);
        top_row.append(date_col);
        desc_div = $("<div></div>").addClass("large-12 columns task-description");
        desc_div.text(task.description);
        bottom_row = $("<div></div>").addClass("row");
        bottom_row.append(desc_div);
        if (isSelected) {
            task_panel = $("<div data-task-id=\"" + task.id + "\"></div>").addClass("panel task-panel radius clearfix active-task");
        } else {
            task_panel = $("<div data-task-id=\"" + task.id + "\"></div>").addClass("panel task-panel radius clearfix");
        }
        task_panel.append(top_row);
        task_panel.append(bottom_row);
        list_item = $("<li></li>").addClass("row");
        list_item.append(task_panel);
        $("#task-list").append($(list_item));
    };

    this.loadAll = function() {
        var pattern = new RegExp(ENTRY),
            i;
        this.tasks = [];

        for (i in STORAGE) {
            if (pattern.test(i)) {
                this.tasks.push(new Task(STORAGE.getItem(i)));
            }
        }
        return this.tasks;
    };
    this.storeAll = function() {
        var i;

        for (i in this.tasks) {
            if (this.tasks[i].id !== NEW_ID) {
                this.tasks[i].store();
            }
        }
    };

    this.changeSort = function(newIndex) {
        if (STORAGE.getItem(STORED_ORDER) && STORAGE.getItem(STORED_ORDER) === newIndex) {
            newIndex = -1 * newIndex;
        }
        switch (Math.abs(newIndex)) {
            case SORT_BY_STATUS:
                this.sortIndex = SORT_BY_STATUS;
                break;
            case SORT_BY_DUEDATE:
                this.sortIndex = SORT_BY_DUEDATE;
                break;
            case SORT_BY_NAME:
                this.sortIndex = SORT_BY_NAME;
                break;
            default:
                this.sortIndex = SORT_BY_ID;
                break;
        }
        if (newIndex < 0) {
            this.sortIndex = this.sortIndex * -1;
        }
        STORAGE.setItem(STORED_ORDER, this.sortIndex);
    };
    this.sort = function(param) {
        var sorted = this.filter(),
            key;
        if (param !== undefined) {
            this.changeSort(param);
        }
        key = SORT_KEYS[Math.abs(this.sortIndex)];
        sorted.sort(function(a, b) {
            return ((a[key] > b[key]) ? 1 : ((a[key] < b[key]) ? -1 : 0));
        });
        if (this.sortIndex < 0) {
            sorted = sorted.reverse();
        }
        this.tasks = sorted;
        return this.tasks;
    };

    this.setFilter = function(options) {
        var i;

        for (i in this.filters) {
            if (!isNaN(i)) {
                this.filters[i] = false;
            }
        }

        for (i = 0; i < options.length; i += 1) {
            this.filters[options[i]] = true;
        }
    };
    this.toggleFilter = function(option) {
        this.filters[option] = !this.filters[option];
    };
    this.filter = function(param) {
        var filtered = [],
            i;
        if (param !== undefined) {
            if ((typeof param) === (typeof new Array(1))) {
                this.setFilter(param);
            } else {
                this.toggleFilter(param);
            }
        }
        this.tasks = this.loadAll();

        for (i = 0; i < this.tasks.length; i += 1) {
            if (!this.filters[this.tasks[i].status]) {
                filtered.push(this.tasks[i]);
            }
        }
        this.tasks = filtered;
        return this.tasks;
    };

    this.taskClickListener = function(task) {
        if (task === this.selected) {
            this.selected = null;
            this.clearForm();
        } else {
            this.selected = task;
            this.fillForm();
        }
    };

    this.clearForm = function() {
        var empty = new Task({
            id: -1
        });
        this.selected = (new Task(empty));
        this.fillForm();
        $("#form-header").text("Add a New Task");
        $("#op-entry-delete").addClass("disabled");
        this.selected = null;
    };
    this.storeForm = function() {
        var data = {
            id: $("#entry-id").val(),
            name: $("#entry-name").val(),
            description: $("#entry-description").val(),
            duedate: $("#entry-duedate").val(),
            status: $("#entry-status").val()
        },
            task;
        task = new Task(data);
        task.store();
    };
    this.fillForm = function() {
        var index;
        if (this.selected === null) {
            this.clearForm();
            return;
        }
        $("#form-header").text("Edit Task");
        $("#entry-status").html("");

        for (index in STATUSES) {
            if (!isNaN(index)) {
                $("#entry-status").append(new Option(STATUSES[index], index));
            }
        }
        $("#entry-id").val(this.selected.id);
        $("#entry-name").val(this.selected.name);
        $("#entry-description").val(this.selected.description);
        $("#entry-duedate").val(this.selected.getDuedate());
        $("#entry-status").val(this.selected.status);
        $("#op-entry-delete").removeClass('disabled');
    };
}
