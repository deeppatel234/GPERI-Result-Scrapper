if((window.location.href).indexOf('gtu.ac.in') != -1 && (window.location.href).indexOf('result') != -1)
{
	
	$(document).ready(function() {

		function getServerPayload() {
			var $subjectTables = document.querySelectorAll("#tblMR_DI table.Rgrid")[1];
	
			function getSubjects($table) {
				if (!$table) {
					return {}
				}
				var subjectRow = $table.querySelector('tbody').children;
				var subject = []
				for (row in subjectRow) {
					let subjectColumn = subjectRow[row].children;
					let index = 0;
					var code;
					var temp = {};
					for (col in subjectColumn) {
						if (index == 0) {
							temp['code'] = subjectColumn[col].innerText;
						} else if (index == 1) {
							temp['name'] = subjectColumn[col].innerText;
						}
						
						if (col == 2 && subjectColumn.length === 6 ) {
							continue;
						}

						if (index == 2) {
							let theory = subjectColumn[col].innerText.trim().split(/\s+/);
							temp['theoryese'] = theory[0];
							temp['theorypa'] = theory[1];
							temp['theorytotal'] = theory[2];
						} else if (index == 3) {
							let practical = subjectColumn[col].innerText.trim().split(/\s+/);
							temp['practicalese'] = practical[0];
							temp['practicalpa'] = practical[1];
							temp['practicaltotal'] = practical[2];
						} else if (index == 4) {
							temp['subjectgrade'] = subjectColumn[col].innerText;
						}
						index++;
					}
					if (Object.keys(temp).length !== 0) {
						subject.push(temp);
					}
				}

				return {subject};
			}
	
			function getGrades() {
				var gradeId = {
					'CGPA': 'lblCGPA',
					'CPI': 'lblCPI',
					'Total Backlog': 'lblTotalBack',
					'SPI': 'lblSPI',
					'Current Sem. Backlog': 'lblCUPBack',
				}
				var grades = {};
				for (id in gradeId) {
					if (document.getElementById(gradeId[id])) {
						grades[id] = document.getElementById(gradeId[id]).innerHTML;
					}
				}
				return grades;
			}
	
			function getStudentInfo() {
				var studentInfoId = {
					'name': 'lblName',
					'enroll': 'lblEnrollmentNo',
					'examnumber': 'lblExam',
					'sem': 'lblExamName',
					'branch': 'lblBranchName',
					//'declared_date': 'lblDeclaredOn',
				}
	
				var studentInfo = {};
	
				for ( id in studentInfoId ) {
					studentInfo[id] = document.getElementById(studentInfoId[id]).innerHTML;
				}
	
				return studentInfo;
			}
	
			function getServerCredentials() {
				return {
					password: 'deep@1996',
					username: 'deep'
				}
			}
	
			var serverPayload = {};
	
			Object.assign(serverPayload, getStudentInfo());
			Object.assign(serverPayload, getServerCredentials());
			Object.assign(serverPayload, getGrades());
			Object.assign(serverPayload, getSubjects($subjectTables));
	
			console.log(serverPayload);
			return serverPayload;
		}

		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		var captchaImg = document.getElementsByTagName("img")[3];
		canvas.width = captchaImg.width;
		canvas.height = captchaImg.height;
		context.drawImage(captchaImg, 0, 0 );
		var captchaImgData = context.getImageData(0, 0, captchaImg.width, captchaImg.height);

		for(var y = 0; y < captchaImgData.height; y++){
	     	for(var x = 0; x < captchaImgData.width; x++){
		          var i = (y * 4) * captchaImgData.width + x * 4;
		          var avg = (captchaImgData.data[i] + captchaImgData.data[i + 1] + captchaImgData.data[i + 2]) / 3;
		          captchaImgData.data[i] = avg;
		          captchaImgData.data[i + 1] = avg;
		          captchaImgData.data[i + 2] = avg;
	    	}
		}
		var code = OCRAD(captchaImgData);
		
		code = code.replace(/[^a-zA-Z0-9]/g, '');
		code = code.toUpperCase();
		if(code.length <= 4 && code.length >= 3)
			document.getElementById("CodeNumberTextBox").value = code;
		else
			document.getElementById("CodeNumberTextBox").value = "0000";
		
		var data = getServerPayload();

		if (document.getElementById('txtenroll').value == ""){
			document.getElementById('txtenroll').value = 0;	
		}else{
			if ((document.getElementById("lblmsg") && document.getElementById("lblmsg").innerHTML == "Oppssss! Data not available.") || data["SPI"] != null){
				document.getElementById('txtenroll').value = parseInt(document.getElementById('txtenroll').value) + 1;
				if(data["SPI"] != null){
					console.log(data);
					var localurl = 'http://localhost:3000';
					var serverurl = 'https://shrouded-falls-73362.herokuapp.com/';
					fetch(serverurl, {
						body: JSON.stringify(data),
						headers: {
							'content-type': 'application/json'
						},
						method: 'POST',
					}).then(response => console.log('saved...'))
				}
			}
		}
	    
	    setTimeout(function(){
	    	document.getElementById("btnSearch").click()
	    },5000);
	});
}