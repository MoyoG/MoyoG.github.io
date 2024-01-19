var pub;
var sorted_featured;
var sorted_patents;
fetch("./publications_2024_01.json")
  .then((response) => response.json())
  .then((data) => {
    pub = data;
    //selected = data.articles.slice(0, 4);
    //sorted_featured = chooseSelectedPapers(data.articles);
    sorted_patents = sortPatents(data.articles);
    sorted_featured = sorted_featured_papers(data.articles);
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
    var a = document.createElement("a");
    var h3 = document.createElement("h4");
    var p = document.createElement("p");
    var p1 = document.createElement("p");

    a.setAttribute("href", articles[i]["link"]);
    a.setAttribute("target", "_blank");
    a.setAttribute("class", "paperTitle");
    h3.innerHTML = articles[i]["title"];
    p.innerHTML = articles[i]["authors"];
    p1.innerHTML = articles[i]["publication"];
    a.appendChild(h3);
    td1.appendChild(a);
    td1.appendChild(p);
    td1.appendChild(p1);
    td3.innerHTML = articles[i]["year"];
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
// function showSelectedPapers(selected) {
//   data = selected;
//   showInfo(data, "selectedPapers");
// }

function showPapers(pub, body_ID) {
  data = pub;
  showInfo(data, body_ID);
}

// function chooseSelectedPapers(data) {
//   var index = 0;
//   var selectedPapers = [];
//   for (let k = 0; k < data.length; k++) {
//     var yearvalue = data[k]["year"];
//     var citeValue = data[k]["cited_by"]["value"];
//     if (citeValue >= 20 || yearvalue >= 2022) {
//       selectedPapers[index] = data[k];
//       index++;
//     }
//   }
//   return selectedPapers;
// }

function sorted_featured_papers(data) {
  var index = 0;
  var featuredPapers = [];
  fetch("./featured_papers_list.txt")
    .then((response) => response.text())
    .then((texts) => {
      lines = texts.split("\n");
      //console.log("lines=", lines.length);
      for (let k = 0; k < data.length; k++) {
        var title = data[k]["title"];
        for (let i = 0; i < lines.length; i++) {
          // console.log("L:", lines[i].toLowerCase());
          // console.log("T:", title.toLowerCase());
          if (lines[i].toLowerCase().match(title.toLowerCase())) {
            featuredPapers[index] = data[k];
            index++;
          }
        }
      }
    });
  //console.log("featured=", featuredPapers.length);
  return featuredPapers;
}

function sortPatents(data) {
  var index = 0;
  var patents = [];
  for (let k = 0; k < data.length; k++) {
    var pubValue = data[k]["publication"];
    if (pubValue != null) {
      let substr = "US Patent";
      let result = pubValue.includes(substr);
      if (result == true) {
        patents[index] = data[k];
        index++;
      }
    }
  }
  return patents;
}

function category(x) {
  if (x == "all-papers") {
    document.getElementById("all-papers").style.display = "inline";
    document.getElementById("featured-papers").style.display = "none";
    document.getElementById("patents").style.display = "none";
  }
  if (x == "featured-papers") {
    document.getElementById("all-papers").style.display = "none";
    document.getElementById("featured-papers").style.display = "inline";
    document.getElementById("patents").style.display = "none";
  }
  if (x == "patents") {
    document.getElementById("all-papers").style.display = "none";
    document.getElementById("featured-papers").style.display = "none";
    document.getElementById("patents").style.display = "inline";
  }
}
