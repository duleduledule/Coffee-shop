var clientid='QPFZL50F512S13AP5YK1K22VPEVMXZVCQKZGHZXOQNODQTXU';//staro 'CTM0NFGMDWJ5BZZYXURBKSL2STDV02F0OGJXA1KH4MC3PV1N'
//QPFZL50F512S13AP5YK1K22VPEVMXZVCQKZGHZXOQNODQTXU jos jedan permission
var clientsecret='LHR0TGETPESN5VBQU1T4H1WCGA0A0TGRRJLLBED0W2BWX3UY';//staro '5XLZITIPEOBFSLTYG3BLED1YTRSFQXAQQMN021Z3E5BGOLU4'
//LHR0TGETPESN5VBQU1T4H1WCGA0A0TGRRJLLBED0W2BWX3UY 
function slike(x)
{
var idprodavnice=x;	
var brojacredovaslike=111;
//console.log(idprodavnice);
	$(document).ready(function(){
	
	$.ajax({
			url: 'https://api.foursquare.com/v2/venues/'+idprodavnice+'/photos',
			type: 'GET',
			dataType: 'json',
			data: {
					client_id: clientid,
					client_secret: clientsecret,
					v: '20170801',
					limit: 1
				} ,
			success: function (data, textStatus, xhr) {	
			for (x in data.response.photos.items){
				console.log(data.response.photos.items.photos[x].prefix+ "original" +data.response.photos.items[x].suffix);
				
			}
			if(brojacredovaslike==1){$("#redjedanslika").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==2){$("#reddvaslika").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==3){$("#redtrislika").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==4){$("#redcetirislika").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==5){$("#redpetslika").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==6){$("#redsestslika").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==7){$("#redsedamslika").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==8){$("#redosamslika").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==9){$("#reddevetslika").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==10){$("#reddesetslika").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);
		//	clicklock=1;//otkljucava kliktanje da bi sprecilo dok generise stranu da menja css 
			}
			
			},
			error: function (xhr, textStatus, errorThrown) {
				//alert(errorThrown);
			}
			});
});
}