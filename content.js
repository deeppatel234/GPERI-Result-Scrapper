
if((window.location.href).indexOf('gtu.ac.in') != -1 && (window.location.href).indexOf('result') != -1)
{
	
	$(document).ready(function() {

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
		console.log(code);
		if(code.length <= 4 && code.length >= 3)
		    $("#CodeNumberTextBox").val(code);
		else
			$("#CodeNumberTextBox").val("0000");
		
		var table = $(".Rgrid")[1];
		var data = {};

		_.each($(table).find("tr"),function(TR){
			var td = $(TR).find('td');
			var values = [];
			
			if(td.length == 15){
				_.each(td.slice(1),function(TD){
					var abc = $(TD).html().trim();
					try{
						if($(abc).find("td").length == 0){
							if(abc.length > 0){
								values.push(abc);
							}
						}
					}catch(e){
						if(abc.indexOf("&amp;") != -1){
							values.push(abc.replace("&amp;","and"));
						}
					}
				});
				data[$(td[0]).html().trim()] = values;
			}
		});

		table = $(".Rgrid")[2];
		_.each($(table).find("tr"),function(TR){
			var td = $(TR).find('td');
			_.each(td,function(TD){
				var title = $(TD).html().trim();
				title = title.substring(0,title.indexOf(':'));
				var point = $($(TD).find('.csstotal')).html();
				data[title] = point;
			});
		});

		
		var sem = $("#lblExamName").html().trim();
		var branch = $("#lblBranchName").html().trim();

		var enroll = $("#txtenroll").val().trim();
		
		data["enroll"] = enroll;
		data["sem"] = sem;
		data["branch"] = branch;
		data["name"] = $('#lblName').html().trim();
		data["examnumber"] = $('#lblExam').html().trim();

		if($("#txtenroll").val() == ""){
			$("#txtenroll").val(parseInt("0"));		
		}else{
			if($("#lblmsg").html() == "Oppssss! Data not available." || data["SPI"] != null){
				$("#txtenroll").val(parseInt(enroll) + 1);
				if(data["SPI"] != null){
					console.log(data);
					$.ajax({
				        url: 'http://localhost:3000',
				        type: 'POST',
				        dataType: 'json',
				        success: function (data) {
				            console.log(data);
				        },
				        data: data
				    });
				}
			}
		}
	    
	    setTimeout(function(){
	    	document.getElementById("btnSearch").click()
	    },5000);
	});
}