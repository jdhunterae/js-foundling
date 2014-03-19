/**********************************************************************
 ***   Task Object file for HTML/JavaScript Application             ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   02/25/2014                                          ***
 **********************************************************************/

var STATUSES = ["Not Started", "In Progress", "Completed"],
  ORDERS = [{
    key: "id",
    display: "Entry"
  }, {
    key: "duedate",
    display: "Due Date"
  }, {
    key: "name",
    display: "Name"
  }, {
    key: "status",
    display: "Status"
  }],
  SAMPLES = [{
    id: 0,
    name: "Pick up milk",
    description: "Need to pick up another gallon of milk.",
    duedate: "03-20-2014",
    status: 2
  }, {
    id: 0,
    name: "Create display function",
    description: "Develop a display function to display tasks onto the page.",
    duedate: "03-20-2014",
    status: 0
  }, {
    id: 0,
    name: "Create filter function",
    description: "Develop a filter function to sort and hide/display tasks depending on status.",
    duedate: "03-20-2014",
    status: 0
  }, {
    id: 0,
    name: "Create save/edit feature",
    description: "Work on the form submission function to send tasks to the localStorage.",
    duedate: "03-20-2014",
    status: 0
  }];

function Task(name, description, dueDate, status) {
  this.name = name;
  this.description = description;
  this.dueDate = dueDate;
  this.status = status;

  this.setName = function(name) {
    this.name = name;
  };
  this.setDescription = function(description) {
    this.description = description;
  };
  this.setDueDate = function(duedate) {
    this.dueDate = duedate;
  };
  this.setStatus = function(status) {
    this.status = status;
  };

  this.getName = function() {
    return this.name;
  };
  this.getDescription = function() {
    return this.description;
  };
  this.getDueDate = function() {
    return this.dueDate;
  };
  this.getDisplayDate = function() {
    return this.dueDate.replace(/-/g, "/");
  };
  this.getStatus = function() {
    return this.status;
  };
}
