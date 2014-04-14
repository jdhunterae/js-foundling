function ajaxcall() {
  var request = new XMLHttpRequest();

  request.open("GET", "txt/ajax_test.txt", true);

  request.onreadystatechange = function() {
    if (request.status === 4 || request.status === 200) {
      document.getElementById("ajaxbox").innerHTML = request.responseText;
    }
  };

  request.send();
}

function getajax() {
  var request = new XMLHttpRequest();

  request.open("GET", "php/test.php", true);

  request.onreadystatechange = function() {
    if (request.status === 4 || request.status === 200) {
      var response = JSON.parse(request.responseText);
      console.log(response);
      var holder = "";
      for (var item in response) {
        holder += response[item] + "<br/>";
      }

      document.getElementById("ajaxbox-php").innerHTML = holder;
    }
  };

  request.send();
}
