<?php

$xmlDoc = new DOMDocument();
$xmlDoc->load("links.xml");

$x = $xmlDoc->getElementsByTagName("link");

// get the q parameter from URL
$q = $_GET["q"];

// lookup all links from the xml file in the length of $q > 0
if (strlen($q) > 0) {
  $hint = "";
  for ($i = 0; $i < ($x->length); $i += 1) {
    $y = $x->item($i)->getElementsByTagName("title");
    $z = $x->item($i)->getElementsByTagName("url");

    if ($y->item(0)->nodeType == 1) {
      // find a link matching the search text
      if (stristr($y->item(0)->childNodes->item(0)->nodeValue, $q)) {
        $hint = $hint . "<a href='".
        $z->item(0)->childNodes->item(0)->nodeValue.
        "' target='_blank'>".
        $y->item(0)->childNodes->item(0)->nodeValue.
        "</a><br/>";
      }
    }
  }
}

// set output to "no suggestion" if hint is empty
if ($hint == "") {
  $response = "no suggestion";
} else {
  $response = $hint;
}

// output the response
echo $response;
?>