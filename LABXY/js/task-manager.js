/**********************************************************************
 ***   Task Manager Object file for HTML/JavaScript Application     ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   03/24/2014                                          ***
 **********************************************************************/

function TaskManager() {
  STORAGE = window.localStorage;
  SORT_KEYS = ["", "id", "name", "duedate", "status"];
  SORT_BY_ID = 1;
  SORT_BY_NAME = 2;
  SORT_BY_DUEDATE = 3;
  SORT_BY_STATUS = 4;

  this.tasks = [];
  this.selected = new Task();
  this.sortIndex = SORT_BY_ID;
  this.filters = [];

  this.selectTask = function(task_id) {
    if (this.selected.id === task_id) {
      this.deselectTask();
    } else {
      this.selected.id = task_id;
      this.selected.load();

      $("#form-header").text("Edit Task");
      this.selected.fillForm();

      $(".task-panel").each(function() {
        $(this).removeClass("active-task");
        if (parseInt($(this).data("task-id")) === task_id) {
          $(this).addClass("active-task");
        }
      });
    }
  };
  this.deselectTask = function() {
    this.selected = new Task();
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
      this.tasks[i].display();
    }
  };

  this.loadSelected = function() {};
  this.storeSelected = function() {};

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
      this.tasks[i].store();
    }
  };

  this.changeSort = function(newIndex) {
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
      case SORT_BY_ID:
      default:
        this.sortIndex = SORT_BY_ID;
        break;
    }

    if (newIndex < 0) {
      this.sortIndex = this.sortIndex * -1;
    }
  };
  this.sort = function(param) {
    var sorted = this.filter(),
      msg, key;

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
      if (typeof param === typeof[]) {
        this.setFilter(param);
      } else {
        this.toggleFilter(param);
      }
    }

    this.tasks = this.loadAll();

    for (i = 0; i < this.tasks.length; i += 1) {
      if (this.filters.indexOf(this.tasks[i].status) === -1) {
        filtered.push(this.tasks[i]);
      }
    }

    this.tasks = filtered;

    return this.tasks;
  };

  this.setFilter = function(options) {
    var i;
    this.filters = [];
    for (i = 0; i < options.length; i += 1) {
      this.filters.push(options[i]);
    }
  };
  this.toggleFilter = function(option) {
    if (this.filters.indexOf(option) !== -1) {
      this.filters.pop(this.filters.indexOf(option));
    } else {
      this.filters.push(option);
    }
  };
}
