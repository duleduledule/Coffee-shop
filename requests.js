var latitudeandlongitude="asd";//deklaracija kao stringa i globalne promenljive

function locatorquestion(){
       var x = document.getElementById("locator");
	   if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
		} else { 
        x.innerHTML = "I need location permission to help you buddy";
		}
}
function showPosition(position) {
	 var x = document.getElementById("locator");
	x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
	latitudeandlongitude=position.coords.latitude+","+position.coords.longitude;
	//latitudeandlongitude=22.3964+","+114.1095;
	console.log(latitudeandlongitude);
	sortbydistance();
		$(document).ready(function(){		
		$("#locator").fadeOut(0);
		});	
}	  
//$(document).ready(function(){	$("#foursquare").click(function(){});});	
$(document).ready(function(){	
$("#foursquare").click(function(){
if(clicklock==1)
	{
	clicklock=0;// da ne bi mogao ponovo da se klikce
	cleaner();
	setTimeout(sortbytierquery,200);//da bi imao vremena cleaner da isprazni tabelu
	}
});
});

var clientid='CTM0NFGMDWJ5BZZYXURBKSL2STDV02F0OGJXA1KH4MC3PV1N';//staro 'CTM0NFGMDWJ5BZZYXURBKSL2STDV02F0OGJXA1KH4MC3PV1N'
var clientsecret='5XLZITIPEOBFSLTYG3BLED1YTRSFQXAQQMN021Z3E5BGOLU4';//staro '5XLZITIPEOBFSLTYG3BLED1YTRSFQXAQQMN021Z3E5BGOLU4'
var clicklock=1;//zakljucava kliktanje dok radi ucitavanje, default je 0
var radiuspregledanja=1000;//u metrima, idealno da bude vise jer nema mnogo venues u odabranom kriterijumu
function cleaner()
{

	$(document).ready(function(){	
	$("#redjedanslika").attr("src","prazno.png");
	$("#reddvaslika").attr("src","prazno.png");
	$("#redtrislika").attr("src","prazno.png");
	$("#redcetirislika").attr("src","prazno.png");
	$("#redpetslika").attr("src","prazno.png");
	$("#redsestslika").attr("src","prazno.png");
	$("#redsedamslika").attr("src","prazno.png");
	$("#redosamslika").attr("src","prazno.png");
	$("#reddevetslika").attr("src","prazno.png");
	$("#reddesetslika").attr("src","prazno.png");
	$(".redtekst").text("");
	$(".redtekst").css("background-color", "transparent");
	$(".redtekst").css('border', 'none');
	brojac=0;
	brojacredova=1;
	console.log("brojac redova"+brojacredova);
	});
	
}

function sortbytierquery()
{
$(document).ready(function(){		
		 $.ajax({
			url: 'https://api.foursquare.com/v2/venues/search',
			type: 'GET',
			dataType: 'json',
			data: {
					client_id:clientid ,
					client_secret:clientsecret ,
					ll:latitudeandlongitude,
					categoryId: '4bf58dd8d48988d1e0931735',//4d4b7104d754a06370d81259  4bf58dd8d48988d1e0931735
					radius:radiuspregledanja,
					v: '20170801',
					limit: 50
				} ,
			success: function (data, textStatus, xhr) {
				for (x in data.response.venues) {
				//data.response.venues[y].id,data;
				}
					
					for (x in data.response.venues) {
						//console.log(data.response.venues[x].id);//dodeljivanje distanci u niz
						sortbytier(data.response.venues[x].id,data.response.venues[x].location.distance);
					}
					
				},
			error: function (xhr, textStatus, errorThrown) {
				//alert(errorThrown);
			}
		});
	});
}
var pricetier=1;//pocetni cenovni tier, 1-4, kontrolise pozivanje sortbytierquery
function sortbytier(x,y)
{
	var idprodavnice=x;
	var daljina=y;

	//console.log(idprodavnice);
	$(document).ready(function(){
	
	$.ajax({
			url: 'https://api.foursquare.com/v2/venues/'+idprodavnice,
			type: 'GET',
			dataType: 'json',
			data: {
					client_id: clientid,
					client_secret: clientsecret,
					v: '20170801'
				} ,
			success: function (data, textStatus, xhr) {
				//console.log(data);
				//data.response.venue.hours.isOpen=123;
			if (data.response.venue.hours.isOpen == true)
				{
					
					//console.log(data.response.venue.id);
					//console.log(data.response.venue.name);
					//console.log(data.response.venue.hours.isOpen);	
					//console.log(daljina);
					//console.log("price tier:"+data.response.venue.price.tier);
				if (pricetier==1){var kolkoskupo="nizak";}
				if(pricetier==data.response.venue.price.tier)
				{
					if(brojacredova==1){$("#redjedantekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					$("#redjedantekst").css("background-color", "yellow");
					$("#redjedantekst").css('border', '2px solid black'); }
					if(brojacredova==2){$("#reddvatekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					$("#reddvatekst").css("background-color", "yellow");
					$("#reddvatekst").css('border', '2px solid black');}
					if(brojacredova==3){$("#redtritekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					$("#redtritekst").css("background-color", "yellow");
					$("#redtritekst").css('border', '2px solid black');}
					if(brojacredova==4){$("#redcetiritekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					$("#redcetiritekst").css("background-color", "yellow");
					$("#redcetiritekst").css('border', '2px solid black');}
					if(brojacredova==5){$("#redpettekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					$("#redpettekst").css("background-color", "yellow");
					$("#redpettekst").css('border', '2px solid black');}
					if(brojacredova==6){$("#redsesttekst").text(data.response.venue.name+", udaljeno je "+daljina+"metara, cenovni rang je "+kolkoskupo);
					$("#redsesttekst").css("background-color", "yellow");
					$("#redsesttekst").css('border', '2px solid black');}
					if(brojacredova==7){$("#redsedamtekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					$("#redsedamtekst").css("background-color", "yellow");
					$("#redsedamtekst").css('border', '2px solid black');}
					if(brojacredova==8){$("#redosamtekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					$("#redosamtekst").css("background-color", "yellow");
					$("#redosamtekst").css('border', '2px solid black');}
					if(brojacredova==9){$("#reddevettekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					$("#reddevettekst").css("background-color", "yellow");
					$("#reddevettekst").css('border', '2px solid black');}
					if(brojacredova==10){$("#reddesettekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					$("#reddesettekst").css("background-color", "yellow");
					$("#reddesettekst").css('border', '2px solid black');}
					//pricetier++;
					console.log("sort by tier ukupno do sada="+brojac);//da se lakse prati kolko ima rezultata koji zadovoljavaju sve kriterijume
					console.log(brojacredova);
					slike(idprodavnice,brojacredova);
					brojacredova++;
				}
			}
			},
			error: function (xhr, textStatus, errorThrown) {
				//alert(errorThrown);
			}
});
});
}

function sortbydistance(){
	$(document).ready(function(){		
		 $.ajax({
			url: 'https://api.foursquare.com/v2/venues/search',
			type: 'GET',
			dataType: 'json',
			data: {
					client_id:clientid ,
					client_secret:clientsecret ,
					ll:latitudeandlongitude,
					categoryId: '4bf58dd8d48988d1e0931735',//4d4b7104d754a06370d81259  4bf58dd8d48988d1e0931735
					radius:radiuspregledanja,
					v: '20170801',
					limit: 50
				} ,
			success: function (data, textStatus, xhr) {
				
				//var a=JSON.stringify(data);
				//$("#locator").text(a);
				//$("#foursquare").text(data.response.venues[0].name);
			
				var distance = new Array;//niz koji uzima distance iz rezultata
				
				for (x in data.response.venues) {
						distance[x]=data.response.venues[x].location.distance;//dodeljivanje distanci u niz
					}
				distance.sort(function(a, b){return a-b});//sortiranje distanci od najnize vrednosti do najvise
			
				for(x in distance){//krece dupla for petlja, poenta je da izlista najblize prodavnice tako sto ce selektivno pomocu distance niza da izbacuje rezultate
						//console.log(distance[x]);
						for (y in data.response.venues) {
							if(distance[x]==data.response.venues[y].location.distance){
								//console.log(data.response.venues[y].name);
								dalijeotvoreno(data.response.venues[y].id,data.response.venues[y].location.distance);
								}
							}
					}
				},
			error: function (xhr, textStatus, errorThrown) {
				//alert(errorThrown);
			}
		});
	});
}


//////////////////////////////////////////////////////////////////////////////
var brojac=0;//uopsteno pracenje broja rezultata koji odgovaraju kriterijumima
var brojacredova=1;//da prati koji red ima vec popunjen tekst rezultat i da uslovljava da se stavi u sledeci red
function dalijeotvoreno(x,y)
{	
var idprodavnice=x;
var daljina=y;
	//console.log(idprodavnice);
	$(document).ready(function(){
	
	$.ajax({
			url: 'https://api.foursquare.com/v2/venues/'+idprodavnice,
			type: 'GET',
			dataType: 'json',
			data: {
					client_id: clientid,
					client_secret: clientsecret,
					v: '20170801'
				} ,
			success: function (data, textStatus, xhr) {
				//console.log(data);
				//data.response.venue.hours.isOpen=123;
			if (data.response.venue.hours.isOpen == true)
				{
					
					//console.log(data.response.venue.id);
					//console.log(data.response.venue.name);
					//console.log(data.response.venue.hours.isOpen);	
					//console.log(daljina);
					//console.log("price tier:"+data.response.venue.price.tier);
			
					if(brojacredova==1){$("#redjedantekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					$("#redjedantekst").css("background-color", "yellow");
					$("#redjedantekst").css('border', '2px solid black'); }
					if(brojacredova==2){$("#reddvatekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					$("#reddvatekst").css("background-color", "yellow");
					$("#reddvatekst").css('border', '2px solid black');}
					if(brojacredova==3){$("#redtritekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					$("#redtritekst").css("background-color", "yellow");
					$("#redtritekst").css('border', '2px solid black');}
					if(brojacredova==4){$("#redcetiritekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					$("#redcetiritekst").css("background-color", "yellow");
					$("#redcetiritekst").css('border', '2px solid black');}
					if(brojacredova==5){$("#redpettekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					$("#redpettekst").css("background-color", "yellow");
					$("#redpettekst").css('border', '2px solid black');}
					if(brojacredova==6){$("#redsesttekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					$("#redsesttekst").css("background-color", "yellow");
					$("#redsesttekst").css('border', '2px solid black');}
					if(brojacredova==7){$("#redsedamtekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					$("#redsedamtekst").css("background-color", "yellow");
					$("#redsedamtekst").css('border', '2px solid black');}
					if(brojacredova==8){$("#redosamtekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					$("#redosamtekst").css("background-color", "yellow");
					$("#redosamtekst").css('border', '2px solid black');}
					if(brojacredova==9){$("#reddevettekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					$("#reddevettekst").css("background-color", "yellow");
					$("#reddevettekst").css('border', '2px solid black');}
					if(brojacredova==10){$("#reddesettekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					$("#reddesettekst").css("background-color", "yellow");
					$("#reddesettekst").css('border', '2px solid black');}
					brojac++;
					console.log(brojac);//da se lakse prati kolko ima rezultata koji zadovoljavaju sve kriterijume
					slike(idprodavnice,brojacredova);
					brojacredova++;
				}
			},
			error: function (xhr, textStatus, errorThrown) {
				//alert(errorThrown);
			}
});
});
}
///////////////////////////////////////////////////////////////////
function slike(x,y)
{
var idprodavnice=x;	
var brojacredovaslike=y;
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

/*
function sati(x)
{
var idprodavnice=x;
//var daljina=y;
	//console.log(idprodavnice);
	$(document).ready(function(){
	$.ajax({
			url: 'https://api.foursquare.com/v2/venues/'+idprodavnice+'/hours',
			type: 'GET',
			dataType: 'json',
			data: {
					client_id: 'CTM0NFGMDWJ5BZZYXURBKSL2STDV02F0OGJXA1KH4MC3PV1N',
					client_secret: '5XLZITIPEOBFSLTYG3BLED1YTRSFQXAQQMN021Z3E5BGOLU4',
					v: '20170801'
				} ,
			success: function (data, textStatus, xhr) {
				//console.log(data);
				//data.response.venue.hours.isOpen=123;
			
			},
			error: function (xhr, textStatus, errorThrown) {
				//alert(errorThrown);
			}
});
});
}
*/
//$(document).ready(function(){});
/*
 $.ajax({
			url: 'https://api.foursquare.com/v2/venues/search',
			type: 'GET',
			dataType: 'json',
			data: {
					client_id: 'CTM0NFGMDWJ5BZZYXURBKSL2STDV02F0OGJXA1KH4MC3PV1N',
					client_secret: '5XLZITIPEOBFSLTYG3BLED1YTRSFQXAQQMN021Z3E5BGOLU4',
					ll:latitudeandlongitude,
					categoryId: '4bf58dd8d48988d1e0931735',
					radius:1000,
					v: '20170801',
					limit: 50
				} ,
			success: function (data, textStatus, xhr) {},
			error: function (xhr, textStatus, errorThrown) {
				alert(errorThrown);
			}
});
$(document).ready(function(){
 $("#foursquare").click(function(){
 $.getJSON("https://api.foursquare.com/v2/venues/search",
        {
        client_id: 'CTM0NFGMDWJ5BZZYXURBKSL2STDV02F0OGJXA1KH4MC3PV1N',
		client_secret: '5XLZITIPEOBFSLTYG3BLED1YTRSFQXAQQMN021Z3E5BGOLU4',
		ll: '40.7243,-74.0018',
		query: 'coffee',
		v: '20170801',
		limit: 1
		},
        function(data,status){
			
			// var a=JSON.stringify(data);
			var a=JSON.stringify(data);
			$("#locator").text(a);
			var firstobject = JSON.parse(data);
           $("#foursquare").text(firstobject.meta.code);
		   //("Data: " + data + "\nStatus: " + statusresponse.venues.id);
			
		
				alert(status);
			
		});
    });
});
*/