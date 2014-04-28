/**********************************************************************
 ***   Task Manager Object file for HTML/JavaScript Application     ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   03/24/2014                                          ***
 **********************************************************************/

function TaskManager() {
    "use strict";
    var STORAGE = window.localStorage,
        NEW_ID = -1,
        SORT_KEYS = ["", "id", "name", "duedate", "status"],
        SORT_BY_ID = 1,
        SORT_BY_NAME = 2,
        SORT_BY_DUEDATE = 3,
        SORT_BY_STATUS = 4;

    this.tasks = [];
    this.selected = null;
    this.sortIndex = SORT_BY_ID;
    this.filters = {
        0: false,
        1: false,
        2: false
    };

    this.selectTask = function(task_id) {
        if (this.selected !== null && this.selected.hasId(task_id)) {
            this.deselectTask();
        } else {
            console.log("selecting task...");
            this.selected = new Task();
            this.selected.id = task_id;
            this.selected.load();

            $("#form-header").text("Edit Task");
            this.selected.fillForm();

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

    this.display = function() {
        var i;
        this.sort();

        this.clearDisplay();

        for (i = 0; i < this.tasks.length; i += 1) {
            this.tasks[i].display(this.selected !== null && this.selected.id === this.tasks[i].id);
        }
    };

    this.loadAll = function() {
        var pattern = /TASKS:task-/,
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
        if (STORAGE.getItem("TASKS:order") && STORAGE.getItem("TASKS:order") === newIndex) {
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

        STORAGE.setItem("TASKS:order", this.sortIndex);
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

    this.setFilter = function(options) {
        var i;

        for (i in this.filters) {
            this.filters[i] = false;
        }

        for (i = 0; i < options.length; i += 1) {
            this.filters[options[i]] = true;
        }
    };
    this.toggleFilter = function(option) {
        this.filters[option] = !this.filters[option];
    };

    this.taskClickListener = function(task) {
        if (task === this.selected) {
            this.selected = null;
            this.clearForm();
        } else {
            this.selected = task;
            task.fillForm();
        }
    };

    this.clearForm = function() {
        var empty = new Task({
            id: -1
        });
        empty.fillForm();

        $("#form-header").text("Add a New Task");
        $("#op-entry-delete").addClass("disabled");
    };
}
