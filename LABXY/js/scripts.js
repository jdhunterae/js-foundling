/**********************************************************************
 ***   Main Javascript file for HTML/JavaScript Application         ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   02/25/2014                                          ***
 **********************************************************************/

var manager = new TaskManager(),
    samples = [{
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
initPage();

function refreshDisplay() {
    manager.display();

    $("#task-list").find(".task-panel").each(function() {
        $(this).click(function() {
            console.log("clicked a task: " + $(this).data("task-id"));

            manager.selectTask($(this).data("task-id"));
        });
    });
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

    $(filter).find("a").blur();

    refreshDisplay();
}

function setSortOptions() {
    var keys = ["none", "id", "name", "duedate", "status"],
        selector = $("#task-order");

    $(selector).html("");

    $.each(keys, function(ind, text) {
        selector.append(
            $("<option></option>").val(ind).html(text)
        );
    });

    $(selector).change(function(event) {
        sortListener($(this), event);
    });
}

function sortListener(selector, event) {
    if ($(selector).val() !== 0) {
        console.log("sorting by: " + $(selector).val());
        manager.changeSort($(selector).val());

        refreshDisplay();
    }
}

function setDuedateListener() {
    $("#duedate-wrapper").bind("click", function(event) {
        dateInputListener(event);

        event.preventDefault();
        event.stopPropagation();
    });
}

/**
 * Method for monitoring the datepicker modal attached to the duedate
 **/

function dateInputListener(event) {
    "use strict";
    $("#entry-duedate").fdatepicker({
        format: "mm-dd-yyyy"
    }).show();

    event.stopPropagation();
}

function initPage() {
    if (window.localStorage.getItem("TASKS:index") === null) {
        purgeStorage();

        window.localStorage.setItem("TASKS:order", 1);

        for (var dex in samples) {
            var task = new Task(samples[dex]);
            task.store();
        }
    }
    setFilterOptions();
    setSortOptions();
    setDuedateListener();
    initForm();

    refreshDisplay();
}

function purgeStorage() {
    var removal = [];
    for (var i in window.localStorage) {
        if (/TASKS:/.test(i)) {
            removal.push(i);
        }
    }

    for (var dex in removal) {
        window.localStorage.removeItem(removal[dex]);
    }
}

function initForm() {
    $("#entry-form").submit(function(event) {
        saveForm();

        event.preventDefault();
        event.stopPropagation();
    });
    $("#entry-form").bind("reset", function(event) {
        resetForm();

        event.preventDefault();
        event.stopPropagation();
    });
    $("#op-entry-delete").click(function(event) {
        deleteForm();

        event.preventDefault();
        event.stopPropagation();
    });

    resetForm();
}

function saveForm() {
    var task = new Task();
    task.storeForm();
    refreshDisplay();
    manager.clearForm();
}

function resetForm() {
    manager.clearForm();
    manager.deselectTask();
    refreshDisplay();
}

function deleteForm() {
    if (!($("#op-entry-delete").hasClass('disabled')) && $("#entry-id").val() !== -1) {
        if (confirm("Are you sure you want to delete this task?")) {
            var task = new Task();
            task.id = parseInt($("#entry-id").val(), 10);
            task.load();
            task.delete();

            manager.clearForm();
            refreshDisplay();
        }
    }
}
