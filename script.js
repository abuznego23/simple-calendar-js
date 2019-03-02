var today = new Date();
var current_month = today.getMonth();
var current_year = today.getFullYear();
window.onload = function(){
	displayCalendar(current_month, current_year);
}
function displayCalendar(month, year){ 
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	document.getElementById("current-month-year").innerHTML = months[month] + " " + year;
	var first_day = new Date(year, month, 1);
	var weekday_start = first_day.getDay();
	var tbody = document.getElementById("calendar-body");
	tbody.innerHTML = "" ;
	date = 1;
	for(var row = 0; row < 6; row++){
		var tr = document.createElement('tr');
		for(var cell = 0; cell < 7; cell++){
			if(row==0 && cell< weekday_start){
				var td = document.createElement('td');
				td.appendChild(document.createTextNode(""));
			}else if(date > getDaysInMonth(month, year)){
				break;
			}else{
				var td = document.createElement('td');
				var full_date = new Date(year, month, date);
				if(date == today.getDate() && year == today.getFullYear() && month == today.getMonth()){
					td.className += "today ";
				}
				if(Math.round(Math.abs(today.getTime() - full_date.getTime()) / (1000 * 60 * 60 * 24)) < 90) {
					td.className += "clickable";
				}
				td.appendChild(document.createTextNode(date));
				date++;
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
}
function getDaysInMonth(month, year){
	return 32 - new Date(year, month, 32).getDate();
}
function prevMonth(){
	current_year = (current_month === 0) ? current_year - 1 : current_year;
    current_month = (current_month === 0) ? 11 : current_month - 1;
    displayCalendar(current_month, current_year);
}
function nextMonth(){
	current_year = (current_month === 11) ? current_year + 1 : current_year;
    current_month = (current_month + 1) % 12;
    displayCalendar(current_month, current_year);
}
document.addEventListener('click', function (event) {
	var span = document.getElementsByClassName("close")[0];
	var modal = document.getElementById('alert-modal');
	var modal_paragraph = document.getElementById('modal-text');

	if(!event.target.matches('td.clickable')) return;
	event.preventDefault();
	day_clicked = Number(event.target.innerHTML);
	modal_paragraph.textContent = "You clicked on " + (current_month+1) + "/" + day_clicked + "/" + current_year + "!"
	modal.style.display = "block";
	span.onclick = function() {
	  modal.style.display = "none";
	}
}, false);