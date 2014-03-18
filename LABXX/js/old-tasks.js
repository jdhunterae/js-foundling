/**********************************************************************
 ***   Main Javascript file for HTML/JavaScript Application         ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   02/25/2014                                          ***
 **********************************************************************/
/*jslint browser:true, devel:true, jquery:true*/
var STATUS_ARRAY = ["Not Started", "In Progress", "Completed"],
  ORDER_ARRAY = ["Entry", "Due Date", "Name", "Status"],
  ORDER_KEY = ["id", "duedate", "name", "status"],
  LOCAL = window.localStorage,
  APP_PREFIX = "TASKS:",
  APP_ENTRY = "entry-",
  SAMPLE_TASKS = [{
    id: 0,
    name: "Pick up milk",
    description: "Need to pick up another gallon of milk.",
    duedate: "03-20-2014",
    status: 0
  }, {
    id: 0,
    name: "Create display function",
    description: "Develop a display function to display tasks onto the screen",
    duedate: "03-20-2014",
    status: 1
  }, {
    id: 0,
    name: "Creat filter function",
    description: "Develop filter function to hide/display tasks depending on status",
    duedate: "03-24-2014",
    status: 1
  }, {
    id: 0,
    name: "Create save/edit feature",
    description: "Work on form submission and sending tasks to the localStorage before refreshing lists and filters.",
    duedate: "03-22-2014",
    status: 0
  }],
  localIndex, localOrder;

/**
 * Utility method to change date seperaters from - to /
 **/

function getDisplayDate(inDate) {
  "use strict";

  return inDate.replace(/-/g, "/");
}

/**
 * Pulls all tasks out of localStorage and places them in an array
 **/

function retrieveTasks() {
  "use strict";
  var tasks = [],
    key, i;

  for (i = 0; i < LOCAL.length; i += 1) {
    key = LOCAL.key(i);
    if (key.indexOf(APP_ENTRY) !== -1) {
      tasks.push(JSON.parse(LOCAL.getItem(key)));
    }
  }

  return tasks;
}

/**
 * Sorts tasks by the field selected in the task-order select box
 **/

function populateForm(task) {
  "use strict";
  $("#form-header").text("Edit Task:");

  $("#entry-id").val(task.id);
  $("#task-name").val(task.name);
  $("#task-description").val(task.description);
  $("#task-duedate").val(task.duedate);
  $("#task-status").val(task.status);
}

/**
 * Exports a single task into a list element onto the task-list
 **/

function displayTask(task) {
  "use strict";
  $("#task-list").append(
    $("<li></li>").addClass("row").append(
      $("<div data-task-id=\"" + task.id + "\"></div>").addClass(
        "panel task-panel radius clearfix").append(
        $("<div></div>").addClass("row").append(
          $("<div></div>").addClass("large-8 columns").append(
            $("<h5></h5>").append(
              $("<span></span>").addClass("task-name").text(task.name)
            ).append(
              $("<small data-status-id=\"" + task.status + "\"></small>")
              .addClass("task-status").text(
                " (" + STATUS_ARRAY[task.status] + ")")
            )
          )
        ).append(
          $("<div></div>").addClass(
            "large-4 columns text-right task-duedate").text(
            getDisplayDate(task.duedate))
        )
      )
      .append($("<div></div>").addClass("row").append($("<div></div>").addClass(
        "large-12 columns task-description").text(task.description)))
    )
  );
}

/**
 * Filters tasks by the statuses selected in the buttons
 **/

function filterTasks(tasks) {
  "use strict";
  var includes = [false, false, false];

  $(".filter").each(function() {
    if ($(this).hasClass("active")) {
      includes[parseInt($(this).data("filter"), 10)] = true;
    }
  });

  tasks = tasks.filter(function(el) {
    return includes[parseInt(el.status, 10)];
  });

  return tasks;
}

/**
 * Sorts tasks by the field selected in the task-order select box
 **/

function orderTasks(tasks) {
  "use strict";
  var key = ORDER_KEY[localOrder];

  tasks = tasks.sort(function(a, b) {
    return ((a[key] < b[key]) ? -1 : ((a[key] > b[key]) ? 1 : 0));
  });

  return tasks;
}

/**
 * Refreshes the task-list using the filter and sort functions
 **/

function refreshTaskList() {
  "use strict";
  var tasks = retrieveTasks(),
    i;

  tasks = filterTasks(tasks);
  tasks = orderTasks(tasks);

  $("#task-list").html("");

  for (i = 0; i < tasks.length; i += 1) {
    displayTask(tasks[i]);
  }
}

/**
 * Sends the current task to the localStorage
 **/

function storeTask(task) {
  "use strict";
  if (isNaN(task.id) || task.id === 0) {
    task.id = localIndex;
    localIndex += 1;
    LOCAL.setItem(APP_PREFIX + "index", localIndex);
  }

  LOCAL.setItem(APP_PREFIX + APP_ENTRY + task.id, JSON.stringify(task));
}

/**
 * Pulls a single task out of localStorage by id
 **/

function retrieveTask(taskId) {
  "use strict";
  var task = LOCAL.getItem(APP_PREFIX + APP_ENTRY + taskId);
  task = JSON.parse(task);

  return task;
}

/**
 * Method for monitoring the datepicker modal attached to the duedate
 **/

function dateInputListener(event) {
  "use strict";
  $("#task-duedate").fdatepicker({
    format: "mm-dd-yyyy"
  }).show();

  event.stopPropagation();
}

/**
 * Method for monitoring the order select box to sort the task-list
 **/

function orderChangeListener(event) {
  "use strict";
  localOrder = parseInt($("#task-order").val(), 10);

  LOCAL.setItem(APP_PREFIX + "order", localOrder);

  refreshTaskList();

  event.stopPropagation();
}

/**
 * Method populates Filter buttons from the STATUS_ARRAY
 **/

function initFilterButtons() {
  "use strict";
  var filters = $("#filters").find(".button-group"),
    i;

  filters.html("");

  for (i = 0; i < STATUS_ARRAY.length; i += 1) {
    filters.append(
      '<li><a class="filter button small secondary active" data-filter="' +
      i + '">' + STATUS_ARRAY[i] + '</a></li>');
  }
}

/**
 * Method populates order select-box from the ORDER_ARRAY
 **/

function initOrderSelect() {
  "use strict";
  var i;

  for (i = 0; i < ORDER_ARRAY.length; i += 1) {
    $("#task-order").append('<option value="' + i + '">' + ORDER_ARRAY[i] +
      '</option>');
  }
}

/**
 * Method populates task status select box from the STATUS_ARRAY
 **/

function initStatusOptions() {
  "use strict";
  var select = $("#task-status"),
    i;

  select.html("");

  for (i = 0; i < STATUS_ARRAY.length; i += 1) {
    select.append(
      '<option value="' + i + '">' + STATUS_ARRAY[i] + '</option>');
  }
}

/**
 * Method for monitoring the submit function of the task-form
 **/

function formSubmitListener() {
  "use strict";
  var task;
  // console.log("submitting form...");

  task = {
    id: parseInt($("#entry-id").val(), 10),
    name: $("#task-name").val(),
    description: $("#task-description").val(),
    duedate: $("#task-duedate").val(),
    status: parseInt($("#task-status").val(), 10)
  };

  // console.log(task);
  storeTask(task);
  refreshTaskList();
  $("#task-form")[0].reset();
}

/**
 * Method for monitoring each list item's click function
 **/

function listItemListener(item, event) {
  "use strict";
  var wasActive;
  // console.log("item clicked...");
  wasActive = $(item).find(".task-panel").hasClass("active-task");

  $("#task-list").find(".task-panel").each(function() {
    $(this).removeClass("active-task");
  });

  if (!wasActive) {
    $(item).find(".task-panel").addClass("active-task");

    // populate form from item in storage
    var taskId = parseInt($(item).find(".task-panel").data("task-id"), 10);
    var task = retrieveTask(taskId);
    populateForm(task);
  } else {
    $("#task-form")[0].reset();
  }

  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
}

/**
 * Method for monitoring the reset function of the task-form
 **/

function formResetListener() {
  "use strict";
  var taskId = parseInt($("#entry-id"), 10);
  // console.log("resetting form...");

  if (taskId !== 0) {
    $("#task-list").find(".task-panel").each(function() {
      $(this).removeClass("active-task");
    });
  }

  $("#form-header").text("Add a New Task:");

  $("#entry-id").val(0);
  $("#task-name").val("");
  $("#task-description").val("");
  $("#task-duedate").val("");
  $("#task-status").val(0);
}

/**
 * Method for monitoring the filter buttons and filtering out tasks from the list
 **/

function filterButtonListener(button, event) {
  "use strict";
  $(button).toggleClass("active");

  refreshTaskList();
  event.stopPropagation();
  event.preventDefault();
}

/**
 * Method established the localStorage system and prepares the
 * page's listeners and population
 **/

function initPage() {
  "use strict";
  var i;

  localIndex = parseInt(LOCAL.getItem(APP_PREFIX + "index"), 10);
  localOrder = parseInt(LOCAL.getItem(APP_PREFIX + "order"), 10);

  if (isNaN(localIndex) || localIndex === 0) {
    localIndex = 1;
    LOCAL.setItem(APP_PREFIX + "index", localIndex);

    for (i = 0; i < SAMPLE_TASKS.length; i += 1) {
      storeTask(SAMPLE_TASKS[i]);
    }
  }

  if (isNaN(localOrder)) {
    localOrder = 0;
    LOCAL.setItem(APP_PREFIX + "order", localOrder);
  }

  initFilterButtons();
  initStatusOptions();
  initOrderSelect();

  var tasks = retrieveTasks();
  tasks = filterTasks(tasks);
  tasks = orderTasks(tasks);

  for (i = 0; i < tasks.length; i += 1) {
    displayTask(tasks[i]);
  }

  $("#task-duedate").fdatepicker({
    format: "mm-dd-yyyy"
  });

  $("#duedate-wrapper").bind("click", function(event) {
    dateInputListener(event);

    event.preventDefault();
    event.stopPropagation();
  });

  $("#task-form").bind("submit", function(event) {
    formSubmitListener();

    event.preventDefault();
    event.stopPropagation();
  });
  $("#task-form").bind("reset", function(event) {
    formResetListener(event);

    event.preventDefault();
    event.stopPropagation();
  });

  $("#task-order").bind("change", function(event) {
    orderChangeListener(event);
  });

  $("#filters").find(".filter").each(function() {
    $(this).bind("click", function(event) {
      filterButtonListener(this, event);
    });
  });

  $("#task-list").find("li").each(function() {
    $(this).bind("click", function(event) {
      listItemListener(this, event);
    });
  });
}

/**
 * Method used to instantiate everything after document loads
 **/
$(document).ready(function() {
  "use strict";
  LOCAL.removeItem(APP_PREFIX + "index");
  initPage();
});
