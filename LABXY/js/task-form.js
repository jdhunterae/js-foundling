/**********************************************************************
 ***   Task Object file for HTML/JavaScript Application             ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   03/24/2014                                          ***
 **********************************************************************/

function TaskForm() {
  this.form = $("#entry-form");
  this.header = $("#form-header");
  this.fields = {
    "id": $("#entry-id"),
    "name": $("#entry-name"),
    "description": $("#entry-description"),
    "duedate": $("#entry-duedate"),
    "status": $("#entry-status")
  };
  this.delbutton = $("#op-entry-delete");
  this.clrbutton = $("#op-entry-clear");
  this.savbutton = $("#op-entry-save");

  this.populate = function(task) {
    var field;

    for (field in this.fields) {
      $(this.fields[field]).val(task[field]);
    }

    if (JSON.stringify(task) !== JSON.stringify(new Task())) {
      $(this.header).text("Edit this Task:");

      $(this.delbutton).removeClass("disabled");
    } else {
      $(this.header).text("Add a New Task:");

      $(this.delbutton).addClass("disabled");
    }
  };

  this.reset = function() {
    this.populate(new Task());
  };
}
