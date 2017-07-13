/*
 ===============================================================
 
 Hi! Welcome to my little playground!
 
 My name is Tobias Bogliolo. 'Open source' by default and always 'responsive',
 I'm a publicist, visual designer and frontend developer based in Barcelona.
 
 Here you will find some of my personal experiments. Sometimes usefull,
 sometimes simply for fun. You are free to use them for whatever you want
 but I would appreciate an attribution from my work. I hope you enjoy it.
 
 ===============================================================
 */

//Default values:
var setChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; //Posible chars.
var setLenght = 12; //Output length.
var setNum = 5; //Items length.

//Strings:
var pass = ""; //Password string.
var plainText = ""; //Plain text version.
var textTitle = ""; //Plain text intro.
var fileName = "pass.txt"; //Plain text filename.

//Random password function:
function randString() {
	//Get user values:
	var newChars = $("#new-chars").val();
	var newLenght = $("#new-length").val();
	var newNum = $("#new-num").val();
	//Check valid values:
	if (newChars) {
		setChars = newChars;
	};
	if (newLenght) {
		setLenght = newLenght;
	};
	if (newNum) {
		setNum = newNum;
	};
	//Reset table:
	$("table").empty();
	//Passwords gen:
	for (i=0; i<setNum; i++) {
		//Shuffle chars:
		for(var j = 0; j < setLenght; j++) {
			pass += setChars.charAt(Math.floor(Math.random() * setChars.length));
		};
		//Append items:
		$("table").append("<tr><td>" + parseInt(i+1) + "</td><td>" + pass + "</td><td contenteditable=''>Edit me!</td></tr>");
		//Reset 'pass' string:
		pass = "";
	};
};

//Run password generator:
$(document).ready(function(){
	randString();
});

//Password generator triggers:
$("input").change(function(){
	randString();
});

//Plain text gen:
function toPlain(){
	//Set plain text header:
	textTitle = "\n\n=========================\nRandom password generator\n=========================\n\n"
	//Get raw content:
	tableContent = $("table").html();
	//Remove HTML tags:
	plainText = tableContent.replace(/<tbody>|<\/tbody>|<tr>|<\/td>/g, '').replace(/<\/tr>/g, '\n').replace(/<td>|<td contenteditable="">/g, ' > ');
};

//Download function:
function download() {
	//Get plain text.
	toPlain();
	//Save file:
	var textContent = document.createElement('a');
	textContent.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textTitle+plainText)); //Set content.
	textContent.setAttribute('download', fileName) //set filename.
	textContent.style.display = 'none'
	document.body.appendChild(textContent)
	textContent.click()
	document.body.removeChild(textContent)
};

//Print function:
function printTable(){
	window.print();
}

//Buttons display:
$(".buttons-box").hide(0);
setTimeout(function(){
	$(".buttons-box").fadeIn(300);
}, 5000);
