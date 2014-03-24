/**********************************************************************
 ***   Task Object file for HTML/JavaScript Application             ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   03/24/2014                                          ***
 **********************************************************************/
var DEVEL = true,
  RUN_INIT_TEST = false,
  RUN_STORE_TEST = false,
  RUN_LOAD_TEST = false,
  RUN_PARSE_JSON_TEST = true,
  RUN_DISPLAY_TEST = false,
  RUN_FILL_FORM_TEST = false;

function Task(id, name, description, duedate, status) {
  var STORAGE = window.localStorage,
    PREFIX = "TASKS:",
    STATUSES = ["Not Started", "In Progress", "Completed"];

  this.id = parseInt(id, 10);
  this.name = name;
  this.description = description;
  this.duedate = duedate;
  this.status = parseInt(status, 10);

  this.store = function() {
    var json = JSON.stringify(this);
    console.log(json);
    STORAGE.setItem(PREFIX + "task-" + this.id, json);
  };
  this.load = function() {
    var json = JSON.stringify(this),
      data, prop;
    console.log("Before load: " + json);
    if (isNaN(this.id)) {
      console.log("no id to load task by.");
      return;
    }

    data = STORAGE.getItem(PREFIX + "task-" + this.id);
    data = JSON.parse(data);

    for (prop in data) {
      if (data.hasOwnProperty(prop)) {
        this[prop] = data[prop];
      }
    }

    json = JSON.stringify(this);
    console.log("After load: " + json);
  };

  this.parse = function(data) {
    var json = JSON.stringify(this),
      prop;

    console.log("Before load: " + json);

    data = JSON.parse(data);

    for (prop in data) {
      if (data.hasOwnProperty(prop)) {
        this[prop] = data[prop];
      }
    }

    json = JSON.stringify(this);
    console.log("After load: " + json);
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

  this.display = function() {
    var name_div, desc_div, stat_div, name_wrap, name_col, date_col, task_panel, top_row, bottom_row, list_item;
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

    task_panel = $("<div data-task-id=\"" + this.id + "\"></div>").addClass("panel task-panel radius clearfix");
    task_panel.append(top_row);
    task_panel.append(bottom_row);

    list_item = $("<li></li>").addClass("row");
    list_item.append(task_panel);

    $("#task-list").append($(list_item));
  };

  this.fillForm = function() {
    var index;
    $("#task-status").html("");
    for (index in STATUSES) {
      if (!isNaN(index)) {
        $("#task-status").append(new Option(STATUSES[index], index));
      }
    }

    $("#task-name").val(this.name);
    $("#task-description").val(this.description);
    $("#task-duedate").val(this.duedate);
    $("#task-status").val(this.status);
  };
}




if (DEVEL) {
  var task, tasks;

  if (RUN_INIT_TEST) {
    console.log("Checking task's initialization functionality.");
    task = new Task();
    console.log(JSON.stringify(task));
    task = new Task("0", "New Task");
    console.log(JSON.stringify(task));
    task = new Task("0", "New Task", "A task's description of things to do.");
    console.log(JSON.stringify(task));
    task = new Task("0", "New Task", "A task's description of things to do.", "02/02/2014");
    console.log(JSON.stringify(task));
    task = new Task("0", "New Task", "A task's description of things to do.", "02/02/2014", "1");
    console.log(JSON.stringify(task));
  }
  if (RUN_STORE_TEST) {
    console.log("Checking task's storage functionality.");
    task = new Task("0", "Zeroth Task", "A task's description of things to do.", "02/02/2014", "1");
    task.store();
    task = new Task("1", "First Task", "Get a new job.", "05/15/2014", "1");
    task.store();
    task = new Task("2", "Second Task", "Finish task object coding.", "03/22/2014", "1");
    task.store();
    task = new Task("3", "Third Task", "Finish submitting tax documents.", "04/15/2014", "2");
    task.store();
  }
  if (RUN_LOAD_TEST) {
    console.log("Checking task's retrieval functionality.");
    task = new Task(0);
    task.load();
    task.id += 1;
    task.load();
    task.id += 1;
    task.load();
    task.id += 1;
    task.load();
  }
  if (RUN_PARSE_JSON_TEST) {
    var pattern = /TASKS:task-/,
      i, j;
    tasks = [];

    console.log("Checking task's json parsing functionality.");
    for (i in window.localStorage) {
      if (pattern.test(i)) {
        tasks[j] = new Task();
        tasks[j].parse(window.localStorage.getItem(i));

        tasks[j].display();
      }
    }
  }
  if (RUN_DISPLAY_TEST) {
    var i;
    console.log("Checking task's display functionality.");
    tasks = [];
    for (i = 0; i < 4; i += 1) {
      tasks[i] = new Task(i);
      tasks[i].load();
      tasks[i].display();
    }
  }
  if (RUN_FILL_FORM_TEST) {
    console.log("Checking task's form propagation functionality.");

    task = new Task(1);
    task.load();

    task.fillForm();
  }
}
