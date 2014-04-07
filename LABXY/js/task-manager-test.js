/**********************************************************************
 ***   Task Object file for HTML/JavaScript Application             ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   03/24/2014                                          ***
 **********************************************************************/

test("Task manager - Load all", function() {
  var data = [],
    tasks = [],
    pattern = /TASKS:task-/,
    numRecords = 0,
    i;

  for (i in window.localStorage) {
    if (pattern.test(i)) {
      data.push(JSON.parse(window.localStorage.getItem(i)));
      numRecords += 1;
    }
  }

  tasks = new Array(data.length);

  for (i = 0; i < data.length; i += 1) {
  }

  equal(tasks.length, numRecords, "Length of loaded tasks should be 4.");
});
