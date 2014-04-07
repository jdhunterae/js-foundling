/**********************************************************************
 ***   Main Javascript file for HTML/JavaScript Application         ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   02/25/2014                                          ***
 **********************************************************************/

var manager = new TaskManager();
manager.display();
setFilterOptions();

function setSortOptions() {

}

function setFilterOptions() {
  var list = $("#filters").find(".button-bar").find(".button-group");
  list.append($('<li><a href="#" class="button small secondary filter active">Not Started</a></li>'));
  list.append($('<li><a href="#" class="button small secondary filter active">In Progress</a></li>'));
  list.append($('<li><a href="#" class="button small secondary filter active">Completed</a></li>'));


}
