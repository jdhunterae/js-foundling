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
  list.append($('<li data-filter="0"><a href="#" class="button small secondary filter active">Not Started</a></li>'));
  list.append($('<li data-filter="1"><a href="#" class="button small secondary filter active">In Progress</a></li>'));
  list.append($('<li data-filter="2"><a href="#" class="button small secondary filter active">Completed</a></li>'));

  $(list).find("li").each(function() {
    $(this).click(function(event) {
      filterListener($(this), event);
    });
  });
}

function filterListener(filter, event) {
  $(filter).find("a").toggleClass("active");

  var filter_id = parseInt($(filter).data("filter"), 10);
  manager.filter(filter_id);

  event.stopPropagation();
  event.preventDefault();

  manager.display();
}
