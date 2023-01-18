var pub;
var selected;
fetch("./publication.json")
  .then((response) => response.json())
  .then((data) => {
    pub = data;
    //selected = data.articles.slice(0, 4);
    selected = chooseSelectedPapers(data.articles);
    showInfo(data.articles, "allPaperBody");
  });

//----- all paper show info------//
function showInfo(data, tableBodyId) {
  //console.table(data.articles);
  var articles = data;
  var body = document.getElementById(tableBodyId);
  var node = document.getElementById(tableBodyId);
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
  for (let i = 0; i < articles.length; i++) {
    let tr = body.insertRow(-1);
    tr.setAttribute("role", "row");
    let td1 = tr.insertCell(-1);
    let td2 = tr.insertCell(-1);
    let td3 = tr.insertCell(-1);
    if (i % 2 == 0) {
      tr.setAttribute("class", "even");
    } else {
      tr.setAttribute("class", "odd");
    }
    var h3 = document.createElement("h4");
    var p = document.createElement("p");
    var p1 = document.createElement("p");

    h3.innerHTML = articles[i]["title"];
    p.innerHTML = articles[i]["authors"];
    p1.innerHTML = articles[i]["publication"];
    td3.appendChild(h3);
    td3.appendChild(p);
    td3.appendChild(p1);
    td1.innerHTML = articles[i]["year"];
    td2.innerHTML = articles[i]["cited_by"]["value"];
  }
}
//---- sort cite value and year -------//
function sortCiteBy(pub, tableBodyId) {
  if (tableBodyId == "allPaperBody") {
    headerId = "cite";
    var data = pub.articles;
  } else {
    headerId = "cite2";
    var data = pub;
  }
  var t = document.getElementById(headerId);
  var des = t.getAttribute("value");
  if (des == "des") {
    var sortedData = data.sort((a, b) => {
      if (a["cited_by"]["value"] < b["cited_by"]["value"]) {
        return -1;
      }
    });
    des = "inc";
  } else {
    var sortedData = data.sort((a, b) => {
      if (a["cited_by"]["value"] > b["cited_by"]["value"]) {
        return -1;
      }
    });
    des = "des";
  }
  let btnSend = document.querySelector("#" + headerId);
  if (btnSend) {
    btnSend.setAttribute("value", des);
  }
  showInfo(sortedData, tableBodyId);
}

function sortYear(pub, tableBodyId) {
  if (tableBodyId == "allPaperBody") {
    headerId = "year";
    var data = pub.articles;
  } else {
    headerId = "year2";
    var data = pub;
  }
  var t = document.getElementById(headerId);
  var des = t.getAttribute("value");
  if (des == "des") {
    var sortedData = data.sort((a, b) => {
      if (a["year"] < b["year"]) {
        return -1;
      }
    });
    des = "inc";
  } else {
    var sortedData = data.sort((a, b) => {
      if (a["year"] > b["year"]) {
        return -1;
      }
    });
    des = "des";
  }
  let btnSend = document.querySelector("#" + headerId);
  if (btnSend) {
    btnSend.setAttribute("value", des);
  }
  showInfo(sortedData, tableBodyId);
}
//------ sort selected papers-------=//
function sortSelectedPapers(selected) {
  data = selected;
  showInfo(data, "selectedPapers");
}
function showAllpapers(pub) {
  data = pub.articles;
  showInfo(data, "allPaperBody");
}
function chooseSelectedPapers(data) {
  var index = 0;
  var selectedPapers = [];
  for (let k = 0; k < data.length; k++) {
    var yearvalue = data[k]["year"];
    var citeValue = data[k]["cited_by"]["value"];
    if (citeValue >= 20 || yearvalue >= 2022) {
      selectedPapers[index] = data[k];
      index++;
    }
  }
  return selectedPapers;
}
