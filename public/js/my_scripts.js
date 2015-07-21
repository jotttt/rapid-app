//Disable javascript linting for jquery variables
/*jshint -W117 */

$(document).ready(function () {

	//_______________FUNCTIONS _________________________

	//INITIALIZE PRETTY CHECKBOXES
	function initCheckboxes(){
		var chkbx = function() {
			$('#wrapper').find('input').iCheck({
				checkboxClass: 'icheckbox_square-cherry',
				radioClass: 'iradio_square-cherry',
				increaseArea: '20%' // optional
			});
		};
		chkbx();
	} //end initCheckboxes

	//DISPLAY RAPID APP DATA
	function getRapidAppData(){
		$.getJSON("js/json/rapid_data.json", function(rapid_json) {
			var output = "<table class='table table-striped table-bordered table-hover table-rapid'><thead><tr><th>Nimi</th><th>R</th><th>A</th><th>P</th><th>I</th><th>D</th></tr></thead><tbody>";
			for (var i in rapid_json.rapid_users) {
				output+="<tr><td width='60%'><input type='text' value='" + rapid_json.rapid_users[i].rapid_name + "' class='rapid-name awesomplete' list='mylist'> <a class='fa fa-remove remove-rapid-user'></td><td width='8%'><input type='checkbox' class='rapid-r rapid-chkbx'" + rapid_json.rapid_users[i].rapid_r + "></td><td width='8%'><input type='checkbox' class='rapid-a rapid-chkbx'" + rapid_json.rapid_users[i].rapid_a + "></td><td width='8%'><input type='checkbox' class='rapid-p rapid-chkbx'" + rapid_json.rapid_users[i].rapid_p + "></td><td width='8%'><input type='checkbox' class='rapid-i rapid-chkbx'" + rapid_json.rapid_users[i].rapid_i + "></td><td width='8%'><input type='checkbox' class='rapid-d rapid-chkbx'" + rapid_json.rapid_users[i].rapid_d + "></td></tr>";
			}
			output+="</tbody><tfoot><tr><th>Nimi</th><th>R</th><th>A</th><th>P</th><th>I</th><th>D</th></tr></tfoot></table>";

			document.getElementById("rapid-users-placeholder").innerHTML=output;

			initCheckboxes();
		});
	} //end getRapidAppData

	//UPDATE RAPID APP DATA
	function postRapidAppData(){
		//DECLARE INPUT OBJECT THAT WILL BE SENT TO FILE ON DATA UPDATE
		var input = {"rapid_users":[{}]};
		//DECLARE USER COUNTER
		var num = 0;
		//DECLARE ARRAYS FOR PAGE DATA COLLECTION
		var usrs = [];
		var r= [];
		var a = [];
		var p = [];
		var i = [];
		var d = [];
		//COLLECT CURRENT RAPID APP DATA ON PAGE TO ARRAYS
		$('.table-rapid input').each(function() {
			if ($(this).hasClass("rapid-name")) {
				usrs.push($(this).val());
				//GET THE NUMBER OF USERS IN APP
				num++;
			}
			else if ($(this).hasClass("rapid-r")) {
				if ($(this).is(".rapid-r:checked")) {
					r.push("checked");
				}
				else {
					r.push("");
				}
			}
			else if ($(this).hasClass("rapid-a")) {
				if ($(this).is(".rapid-a:checked")) {
					a.push("checked");
				}
				else {
					a.push("");
				}
			}
			else if ($(this).hasClass("rapid-p")) {
				if ($(this).is(".rapid-p:checked")) {
					p.push("checked");
				}
				else {
					p.push("");
				}
			}
			else if ($(this).hasClass("rapid-i")) {
				if ($(this).is(".rapid-i:checked")) {
					i.push("checked");
				}
				else {
					i.push("");
				}
			}
			else if ($(this).hasClass("rapid-d")) {
				if ($(this).is(".rapid-d:checked")) {
					d.push("checked");
				}
				else {
					d.push("");
				}
			}
		});
		//LOAD DATA FROM ARRAYS TO INPUT OBJECT
		for(var j = 0; j < num; j++) {
			input.rapid_users[j] = {rapid_name:  String(usrs[j])};
			input.rapid_users[j].rapid_r = r[j];
			input.rapid_users[j].rapid_a = a[j];
			input.rapid_users[j].rapid_p = p[j];
			input.rapid_users[j].rapid_i = i[j];
			input.rapid_users[j].rapid_d = d[j];
		}
		$.post("js/write_rapid_app_data.php", {json : JSON.stringify(input)});
		//LOG THE JSON OBJRCT TO CONSOLE FOR DEBUGGING
		//console.log(JSON.stringify(input));
	} //end postRapidAppData

	//ADD USER TO RAPID APP
	function addUserToRapidApp(){
		$(".table-rapid tbody tr:last").after("<tr><td width='60%'><input type='text' value='Isik' class='rapid-name awesomplete' list='mylist'> <a class='fa fa-remove remove-rapid-user'></td><td width='8%'><input type='checkbox' class='rapid-r rapid-chkbx'></td><td width='8%'><input type='checkbox' class='rapid-a rapid-chkbx'></td><td width='8%'><input type='checkbox' class='rapid-p rapid-chkbx'></td><td width='8%'><input type='checkbox' class='rapid-i rapid-chkbx'></td><td width='8%'><input type='checkbox' class='rapid-d rapid-chkbx'></td></tr>");
		//make the added row fade in
		$(".table-rapid tbody tr:last").hide().fadeIn();
		initCheckboxes();
	} //end addUserToRapidApp

	//________________EVENTS________________________________

	//FETCH AND DISPLAY RAPID APP DATA
	getRapidAppData();

	//SEND CURRENT APP STATE WHEN VARIOUS THINGS HAPPEN
	$("#rapid-update").click(function(){
		postRapidAppData();
	});
	$(document).on("blur", ".rapid-name", function() {
		postRapidAppData();
	});
	$(document).on("change", ".rapid-chkbx", function() {
		console.log("tere");
	});

	//ADD NEW USER TO RAPID TABLE WHEN BUTTON IS PRESSED
	$("#add-rapid-user").click(function() {
		addUserToRapidApp();
		setTimeout(postRapidAppData, 1000);
	});

	//REMOVE USER FROM RAPID TABLE UPDATE THE DATA
	$(document).on("click", ".remove-rapid-user", function() {
		$(this).parent().parent().fadeOut("normal", function() {
			$(this).remove();
		});
		 setTimeout(postRapidAppData, 1000);
	});

});
