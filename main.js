var items;
var val;
var xhttp,xfhttp ;
const listt = [];

function getIssues() {
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = showRes;

  xhttp.open("GET", "https://api.github.com/repos/walmartlabs/thorax/issues", false);
  xhttp.send();
}
function showRes() {
    if(xhttp.readyState == 4 && xhttp.status == 200) {
      var items=JSON.parse(xhttp.responseText);
	  myFunction(items);
    }
}

function myFunction(arr) {
    listt.push(arr);
	console.log(listt)
}

function loadDetails(i) {
 xfhttp = new XMLHttpRequest();

xfhttp.onreadystatechange = showDetails;

xfhttp.open("GET",i, true);
xfhttp.send();
}

function showDetails() {
if(xfhttp.readyState == 4 && xfhttp.status == 200) {
      var i =JSON.parse(xfhttp.responseText);
      var output='<hr>';
 
  output+='<div class="row"><div class="col-sm-3"></div>';
  output+='<p>Details of Issue number: '+i.number+'</b><br/></p>';
        output+='<div class="col-sm-9">';
var user = i.user;
output+='<p><img src="'+user.avatar_url+'" width="80" height="60" alt="Cinque Terre"> &thinsp;&thinsp;Username:<b> '+user.login+'</b><br/></p>';
        output+='<p>Id:<b> '+i.id+'</b><br/></p>';
output+='<p>Title:<b> '+i.title+'</b><br/></p>';
output+='<p>Issue number:<b> '+i.number+'</b><br/></p>';
output+='<p>State:<b> '+i.state+'</b><br/></p>';
output+='<p>Created Date:<b> '+i.created_at+'</b><br/></p>';
        output+='<hr></div></div>';
document.getElementById("list").innerHTML=output;
}
}

function getData(){
	getIssues();
	const urlData = [];
	for(i of listt[0]){
		var output1 = i.url;
		urlData.push(output1);
	}
return urlData;
}

const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = 10;


function DisplayList (items, wrapper, rows_per_page, page,count) {
	wrapper.innerHTML = "";
	page--;
    var output='<hr>';
	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedItems = items.slice(start, end); //url
	
	for (let i = 0; i < paginatedItems.length; i++) {
		let item = paginatedItems[i]; //url
       output+=' <button type="button" class="btn btn-success" onclick="loadDetails(\''+item+'\')" >Click for more details</button></p>';
	   if(count == 1){
		   output+='<div class="row"><div class="col-sm-3"></div>';
           output+='<div class="col-sm-9"><p>Title:<b> '+listt[0][i].title+'</b>';
           output+='<p>Issue number:<b> '+listt[0][i].number+'</b><br/></p>';
		   output+='<p>State:<b> '+listt[0][i].state+'</b><br/></p>';
           output+='<hr></div></div>';
		  
	   }else if(count == 2){
		   output+='<div class="row"><div class="col-sm-3"></div>';
           output+='<div class="col-sm-9"><p>Title:<b> '+listt[0][i+10].title+'</b>';
           output+='<p>Issue number:<b> '+listt[0][i+10].number+'</b><br/></p>';
		   output+='<p>State:<b> '+listt[0][i+10].state+'</b><br/></p>';
           output+='<hr></div></div>';
	   }else{
		   output+='<div class="row"><div class="col-sm-3"></div>';
           output+='<div class="col-sm-9"><p>Title:<b> '+listt[0][i+20].title+'</b>';
           output+='<p>Issue number:<b> '+listt[0][i+20].number+'</b><br/></p>';
		   output+='<p>State:<b> '+listt[0][i+20].state+'</b><br/></p>';
           output+='<hr></div></div>';
		   
	   }
	   
	}
	document.getElementById("list").innerHTML=output;
}

function SetupPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = "";
	let page_count = Math.ceil(items.length / rows_per_page);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}

function PaginationButton (page, items) {
	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;
		let count = page;
		DisplayList(items, list_element, rows, current_page,count);
        count++;
		let current_btn = document.querySelector('.pagenumbers button.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
	});

	return button;
}

DisplayList(getData(), list_element, rows, current_page);
SetupPagination(getData(), pagination_element, rows);
