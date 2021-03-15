
function show(x){
	let q=document.getElementById(x)
	q.style.display="block";
}
function hide(x){
	let q=document.getElementById(x)
	q.style.display="none";
}

function togglePopup(x){
  document.getElementById(x).classList.toggle("active");
}

var objPeople =[
					{
						username:"munkhjargal",
						password:"1234"
					},
					{
						username:"munkh",
						password:"12"
					},
					{
						username:"ganzo",
						password:"1234"
					}
				]

function getInfo(){
	var q=false;
	var username =document.getElementById("username").value
	var password =document.getElementById("password").value
	for (i=0; i<objPeople.length;i++){
		if(username == objPeople[i].username && password == objPeople[i].password){
			console.log(username+" "+"is logged in");
			togglePopup('add');
			togglePopup('DOI');
			q=true;
		}
  	}
	if(q==false){
		alert ("password or username wrong");
	}
}	

function check(){
	var tex = document.getElementById("tex").value;
	var even = document.getElementById("even");
	var odd = document.getElementById("odd");
	var IF = document.getElementById("IF").value;
	if (tex == ''){
		alert("please enter bib")
	}
	if (IF == ''){
		alert("please enter IF");
	}
	if (even.checked == false && odd.checked == false){
		alert("choose background color white and gray");
	}
	if (even.checked == true && odd.checked == true){
		alert("Please select only one");
	}

	if (even.checked == true && IF !='' && tex !=''){
		togglePopup('DOI');
		backg="even";
		tbladd();
		tex.innerHTML='';

	}
	if (odd.checked == true && IF !='' && tex !=''){
		togglePopup('DOI');
		backg="odd";
		tbladd();
		tex.innerHTML='';
	}
}

function tbladd(){
	var tex = document.getElementById("tex").value;
	var IF = document.getElementById("IF").value;
	var type = document.getElementById("type").value;	
	var res = tex.split(",");
	year='';
	title='';
	author='';
	url='';
	vol='';	
	pages='';
	doi='';
	
	for (i=0; i<res.length;i++){
		w=res[i].split("=");
		q=w[0].split(" ");
		if (q[2] == `year`){
			year=w[1];
		}
		if (q[2]=="title"){
			title=w[1];
		}
		if (q[2]=="author"){
			author=w[1];
		}
		if (q[2]=="url"){
			url=w[1];
		}
		if (q[2]=="volume"){
			vol=w[1];
		}
		if (q[2]=="pages"){
			pages=w[1];
		}
		if (q[2]=="doi"){
			doi=w[1];
		}
	}
	doi=doi.split("{")[1].split("}")[0];
	url=url.split("{")[1].split("}")[0];
	year=year.split("{")[1].split("}")[0];
	bib='';
	for(i=0; i<res.length;i++){
		if(i == 0){
		bib+=res[i];}
		if (i >0){
			bib+="<br>"+res[i];
		}						
	}
	author= author.split("{")[1].split("}")[0];
	tit=author.split("and");
	console.log(tit)
	author='';
	for(i=0;i<tit.length;i++){
		if (tit[i] == 'Munkhjargal Gochoo ' || tit[i] == 'M. Gochoo ' || tit[i] == ' Munkhjargal Gochoo ' || tit[i] == ' M. Gochoo '){
			author+=" "+"<strong>"+tit[i]+"</strong>,";
			continue;
		}
		if (i<tit.length-1){
			author+=" "+tit[i]+",";
		}
		if (i ==tit.length-1){
			author+="and "+tit[i];
		}
	}
	/*
	console.log("length="+res.length)
	title=res[9].split("{")[1].split("}")[0];
	author=res[8].split("{")[1].split("}")[0];
	year=res[3].split("{")[1].split("}")[0];
	url=res[2].split("{")[1].split("}")[0];
	*/
	let table = document.querySelector('table');
	tempelate=`	
		<tr role="row" class=`+backg+`>
		<td class="sorting_2">`+year+`</td>
		<td class="sorting_1">`+type+`</td>
		<td>
			"`+author+`"
			“`+title+`(`+IF+`)["
			<a title="This article online" target="_blank" href="`+url+`">link</a>"] ["

			<a class="biblink" onclick="togglePopup('`+doi+`')">bib</a>"]
			<div class="popup" id="`+doi+`">
				<div class="overlay-pub"></div>
				<div class="content-pub">
					<div class="close-btn" onclick="togglePopup('`+doi+`')">&times;</div>

						<p>`+bib+`</p>
				</div>
			</div>
		</td>
	</tr>`
table.innerHTML +=tempelate;
}