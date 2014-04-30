/**********************************************************************
 ***   Task Manager Object file for HTML/JavaScript Application     ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   04/28/2014                                          ***
 **********************************************************************/

/**
 * TaskManager Object for organizing and manipulating an array of tasks
 *   handles all display features to the webpage and form population and
 *   retrieval.
 */

function TaskManager() {
    "use strict";
    // constants for use to make scripting more 'readable'
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

    // set up all manager attributes
    this.tasks = [];
    this.selected = null;
    this.sortIndex = SORT_BY_ID;
    this.filters = {};
    for (ind in STATUSES) {
        if (STATUSES.hasOwnProperty(ind)) {
            this.filters[ind] = false;
        }
    }

    // method for selecting a task from the page as the 'selected'
    // task for form manipulation. forwards to deselect if task
    // is already selected.
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
    // method for deselecting a task from the page as the 'selected'
    // task for form manipulation.
    this.deselectTask = function() {
        this.selected = null;
        $(".task-panel").each(function() {
            $(this).removeClass("active-task");
        });
        this.clearForm();
    };

    // method for removing all tasks displayed on the page.
    this.clearDisplay = function() {
        $("#task-list").html("");
    };
    // method for displaying all tasks that pass filters and sorting.
    this.displayTasks = function() {
        var i;
        this.sort();
        this.clearDisplay();

        for (i = 0; i < this.tasks.length; i += 1) {
            this.display(this.tasks[i]);
        }
    };
    // method for displaying a single task within the task list on the
    // page.
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

        task_panel = $("<div data-task-id=\"" + task.id + "\"></div>");
        task_panel.addClass('panel task-panel radius clearfix');
        if (isSelected) {
            task_panel.addClass("active-task");
        }
        if (task.status === 2) {
            task_panel.addClass("completed");
        }

        task_panel.append(top_row);
        task_panel.append(bottom_row);

        list_item = $("<li></li>").addClass("row");
        list_item.append(task_panel);
        $("#task-list").append($(list_item));
    };

    // method for retrieving all tasks stored in the localStorage
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
    // method for setting all tasks in the localStorage
    this.storeAll = function() {
        var i;

        for (i in this.tasks) {
            if (this.tasks[i].id !== NEW_ID) {
                this.tasks[i].store();
            }
        }
    };

    // method for setting the sorting index for task display
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
    // method called each time the tasks are displayed to sort the array
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

    // method for setting an array of filter options to true
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
    // method called to turn a specific filter option, on or off
    this.toggleFilter = function(option) {
        this.filters[option] = !this.filters[option];
    };
    // method called each time the tasks are displayed to filter out
    // certain types of tasks from the array
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

    // method attached to the page display to handle task selection/
    // deselection on click.
    this.taskClickListener = function(task) {
        if (task === this.selected) {
            this.selected = null;
            this.clearForm();
        } else {
            this.selected = task;
            this.fillForm();
        }
    };

    // method called to clear all task information from the form
    // and set the form for new task addition.
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
    // method for storing information in the form to an existing or
    // new task in the array.
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
    // method for displaying a selected task's information in the
    // form for editing
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
