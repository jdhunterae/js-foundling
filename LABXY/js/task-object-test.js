/**********************************************************************
 ***   Task Object file for HTML/JavaScript Application             ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   03/24/2014                                          ***
 **********************************************************************/
var samples = [{
  id: 0,
  name: "Zeroth Task",
  description: "A task's description of the things to do to complete that task.",
  duedate: "02/02/2014",
  status: 0
}, {
  id: 1,
  name: "First Task",
  description: "Get a new job.",
  duedate: "05/15/2014",
  status: 1
}, {
  id: 2,
  name: "Second Task",
  description: "Finish task object coding.",
  duedate: "03/22/2014",
  status: 1
}, {
  id: 3,
  name: "Third Task",
  description: "Finish submitting tax documents.",
  duedate: "04/15/2014",
  status: 2
}];

function purgeStorage() {
  var removal = [];
  for (var i in window.localStorage) {
    removal.push(i);
  }

  for (var dex in removal) {
    window.localStorage.removeItem(removal[dex]);
  }
}
module("Task Object");
test("Creation - Empty", function() {
  var task = new Task(),
    empty = {
      id: 0,
      status: 0
    };

  equal(task.id, 0, "Empty constructor should only have 'id' of -1.");
  equal(task.status, 0, "Empty constructor should only have 'status' of 0.");
  equal(JSON.stringify(task), JSON.stringify(empty), "Empty constructor should only have 'id' and 'status' properities.");
});

test("Creation - Partial", function() {
  var part = {
    id: 0,
    name: "New Task",
    status: 0
  }, task = new Task(part);

  for (var i in part) {
    equal(task[i], part[i], "Constructor should assign '" + i + "' to task.");
  }
  equal(JSON.stringify(task), JSON.stringify(part), "Empty constructor should only have 'id' and 'status' properities.");
});

test("Creation - Full", function() {
  var
  full = {
    id: 0,
    name: "New Task",
    description: "New task description",
    duedate: "02/14/2009",
    status: 0
  }, task = new Task(full);

  for (var i in full) {
    equal(task[i], full[i], "Constructor should assign '" + i + "' to task.");
  }
  equal(JSON.stringify(task), JSON.stringify(full), "Empty constructor should only have 'id' and 'status' properities.");
});

test("Storage - Save a task", function() {
  var tasks = [];

  for (var i = 0; i < samples.length; i += 1) {
    tasks[i] = new Task(samples[i]);
  }

  equal(tasks.length, samples.length, "All samples should have loaded into the tasks array.");
  purgeStorage();

  for (var dex in tasks) {
    equal(window.localStorage.getItem("TASKS:task-" + tasks[dex].id), undefined, "The local Storage slot 'task-" + tasks[dex].id + "' is empty");
    tasks[dex].store();
    equal(window.localStorage.getItem("TASKS:task-" + tasks[dex].id), JSON.stringify(tasks[dex]), "Task should be stored in localStorage at address 'TASKS:task-" + tasks[dex].id + "'");
  }
});

test("Storage - Load a task", function() {
  var task;

  for (var i = 0; i < samples.length; i += 1) {
    task = new Task({
      id: i
    });
    task.load();
    equal(JSON.stringify(task), JSON.stringify(samples[i]), "The local Storage slot 'task-" + task.id + "' is loaded");
  }
});
