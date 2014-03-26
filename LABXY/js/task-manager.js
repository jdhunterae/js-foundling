var DEVEL = true,
  RUN_INIT_TEST = false,
  RUN_STORE_TEST = false,
  RUN_LOAD_TEST = false,
  RUN_PARSE_JSON_TEST = true,
  RUN_DISPLAY_TEST = false,
  RUN_FILL_FORM_TEST = true;

function TaskManager() {
  STORAGE = window.localStorage;

  this.tasks = [];
  this.selected = new Task();

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

  this.display = function() {};

  this.loadSelected = function() {};
  this.storeSelected = function() {};

  this.loadAll = function() {
    var pattern = /TASKS:task-/,
      i, j;
    this.tasks = [];

    for (i in STORAGE) {
      if (pattern.test(i)) {
        this.tasks[j] = new Task();
        this.tasks[j].parse(STORAGE.getItem(i));
      }
    }

    this.display();
  };
  this.storeAll = function() {
    var task;
    for (task in this.tasks) {
      task.store();
    }
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
