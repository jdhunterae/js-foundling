function showResult(selection) {
    if (selection.length === 0) {
        document.getElementById("livesearch").innerHTML = "Please enter a search term";
        document.getElementById("livesearch").style.border = "0px";
        return;
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            document.getElementById("livesearch").innerHTML = request.responseText;
            document.getElementById("livesearch").style.border = "1px solid #A5ACB2";
        }
    };

    request.open("GET", "php/livesearch.php?q=" + selection, true);
    request.send();
}
