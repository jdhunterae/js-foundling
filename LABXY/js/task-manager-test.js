/**********************************************************************
 ***   Task Object file for HTML/JavaScript Application             ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   03/24/2014                                          ***
 **********************************************************************/
module("Task Manager Object");
test("Load all", function() {
  var manager = new TaskManager(),
    tasks = manager.loadAll(),
    numRecords = 4;

  equal(tasks.length, numRecords, "Length of loaded tasks should be 4.");
});

test("Store all", function() {
  var manager = new TaskManager(),
    tasks = manager.loadAll(),
    numRecords = 4;

  equal(tasks.length, numRecords, "Length of loaded tasks should be 4.");

  purgeStorage();
  equal(window.localStorage.length, 0, "After purging, localStorage should be empty.");

  manager.storeAll();

  equal(window.localStorage.length, numRecords, "After storing tasks, localStorage should have four records again.");
});

test("Sort tasks by id", function() {
  var manager = new TaskManager(),
    tasks = manager.loadAll(),
    i;

  equal(tasks.length, 4, "All tasks present and accounted for after load.");

  tasks = manager.sort(1);
  equal(tasks.length, 4, "All tasks present and accounted for after sort.");

  // ascending
  for (i = 0; i < tasks.length; i += 1) {
    if (i === 0) {
      ok(tasks[0].id === tasks[i].id, "First task is the same as lowest id task.");
    } else {
      ok(tasks[0].id < tasks[i].id, "First task id is lower than following task ids.");
    }
  }

  tasks = manager.sort(-1);
  equal(tasks.length, 4, "All tasks present and accounted for after sort.");

  // descending
  for (i = 0; i < tasks.length; i += 1) {
    if (i === 0) {
      ok(tasks[0].id === tasks[i].id, "First task is the same as greatest id task.");
    } else {
      ok(tasks[0].id > tasks[i].id, "First task id is greater than following task ids.");
    }
  }
});

test("Sort tasks by status", function() {
  var manager = new TaskManager(),
    tasks = manager.loadAll(),
    i;

  equal(tasks.length, 4, "All tasks present and accounted for after load.");

  tasks = manager.sort(4);
  equal(tasks.length, 4, "All tasks present and accounted for after sort.");

  // ascending
  for (i = 0; i < tasks.length; i += 1) {
    if (i === 0) {
      ok(tasks[0].status === tasks[i].status, "First task is the same as lowest status task.");
    } else {
      ok(tasks[0].status < tasks[i].status, "First task status is lower than following task statuses.");
    }
  }

  tasks = manager.sort(-4);
  equal(tasks.length, 4, "All tasks present and accounted for after sort.");
  // descending
  for (i = 0; i < tasks.length; i += 1) {
    if (i === 0) {
      ok(tasks[0].status === tasks[i].status, "First task is the same as greatest status task.");
    } else {
      ok(tasks[0].status > tasks[i].status, "First task status is greater than following task statuses.");
    }
  }
});

test("Sort tasks by name", function() {
  var manager = new TaskManager(),
    tasks = manager.loadAll(),
    i;

  equal(tasks.length, 4, "All tasks present and accounted for after load.");

  tasks = manager.sort(2);
  equal(tasks.length, 4, "All tasks present and accounted for after sort.");

  // ascending
  for (i = 0; i < tasks.length; i += 1) {
    if (i === 0) {
      ok(tasks[0].name === tasks[i].name, "First task is the same as lowest name task.");
    } else {
      ok(tasks[0].name < tasks[i].name, "First task name is lower than following task names.");
    }
  }

  tasks = manager.sort(-2);
  equal(tasks.length, 4, "All tasks present and accounted for after sort.");

  // descending
  for (i = 0; i < tasks.length; i += 1) {
    if (i === 0) {
      ok(tasks[0].name === tasks[i].name, "First task is the same as greatest name task.");
    } else {
      ok(tasks[0].name > tasks[i].name, "First task name is greater than following task names.");
    }
  }
});

test("Sort tasks by duedate", function() {
  var manager = new TaskManager(),
    tasks = manager.loadAll(),
    i;

  equal(tasks.length, 4, "All tasks present and accounted for after load.");

  tasks = manager.sort(3);
  equal(tasks.length, 4, "All tasks present and accounted for after sort.");

  // ascending
  for (i = 0; i < tasks.length; i += 1) {
    if (i === 0) {
      ok(tasks[0].duedate === tasks[i].duedate, "First task is the same as lowest duedate task.");
    } else {
      ok(tasks[0].duedate < tasks[i].duedate, "First task duedate is lower than following task duedates.");
    }
  }

  tasks = manager.sort(-3);
  equal(tasks.length, 4, "All tasks present and accounted for after sort.");

  // descending
  for (i = 0; i < tasks.length; i += 1) {
    if (i === 0) {
      ok(tasks[0].duedate === tasks[i].duedate, "First task is the same as greatest duedate task.");
    } else {
      ok(tasks[0].duedate > tasks[i].duedate, "First task duedate is greater than following task duedates.");
    }
  }
});

test("Filter out all completed tasks", function() {
  var manager = new TaskManager(),
    tasks = manager.loadAll(),
    numRecords = 4,
    i;

  equal(tasks.length, numRecords, "Loaded all 4 tasks to begin with.");

  tasks = manager.filter(2);
  // console.log(tasks);
  equal(tasks.length, numRecords - 1, "Filtered out 1 completed task.");

  for (i = 0; i < tasks.length; i += 1) {
    ok(tasks[i].status !== 2, "Task status is not completed");
  }
});

test("Filter out all not started tasks", function() {
  var manager = new TaskManager(),
    tasks = manager.loadAll(),
    numRecords = 4,
    i;

  equal(tasks.length, numRecords, "Loaded all 4 tasks to begin with.");

  tasks = manager.filter(0);
  // console.log(tasks);
  equal(tasks.length, numRecords - 1, "Filtered out 1 not started task.");

  for (i = 0; i < tasks.length; i += 1) {
    ok(tasks[i].status !== 0, "Task status is not completed");
  }
});

test("Filter out all not started and completed tasks", function() {
  var manager = new TaskManager(),
    tasks = manager.loadAll(),
    numRecords = 4,
    i;

  equal(tasks.length, numRecords, "Loaded all 4 tasks to begin with.");

  tasks = manager.filter([0, 2]);
  // console.log(tasks);
  equal(tasks.length, numRecords - 2, "Filtered out 1 not started and 1 completed task.");

  for (i = 0; i < tasks.length; i += 1) {
    ok(tasks[i].status !== 0 && tasks[i].status !== 2, "Task status is in progress.");
  }
});
