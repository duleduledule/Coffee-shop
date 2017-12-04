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
	//latitudeandlongitude=22.3964+","+114.1095; //hong kong coordinates
	//latitudeandlongitude=40.7128 +","+74.0060;//new york coordinates
	console.log(latitudeandlongitude);
	sortbydistance();
		$(document).ready(function(){		
		$("#locator").fadeOut(0);
		});	
}	  
///////////////////////////////////////////////////////////////////onclick event///////////////////////////////////////////////////////////////////////////////	
var clicklock=1;//zakljucava kliktanje dok radi ucitavanje, default je 1//sprecava da se vise od jednom pokrece sort by tier query
$(document).ready(function(){	
$("#foursquare").click(function(){
if(clicklock==1)
	{
	clicklock=0;// da ne bi mogao ponovo da se klikce
	$("#containerq").animate({left: "100px"},1000);
	$("#container").fadeOut(2000);
	sortbytierquery();//sort by tier, okidac
	}
});
});
//////////////////////////////////////////////////////////////////////promenljive za ajax upit, all queries//////////////////////////////////////////////////////////////////

var clientid='QPFZL50F512S13AP5YK1K22VPEVMXZVCQKZGHZXOQNODQTXU';//staro 'CTM0NFGMDWJ5BZZYXURBKSL2STDV02F0OGJXA1KH4MC3PV1N'
//QPFZL50F512S13AP5YK1K22VPEVMXZVCQKZGHZXOQNODQTXU jos jedan permission
var clientsecret='LHR0TGETPESN5VBQU1T4H1WCGA0A0TGRRJLLBED0W2BWX3UY';//staro '5XLZITIPEOBFSLTYG3BLED1YTRSFQXAQQMN021Z3E5BGOLU4'
//LHR0TGETPESN5VBQU1T4H1WCGA0A0TGRRJLLBED0W2BWX3UY 
var radiuspregledanja=1000;//u metrima, idealno da bude vise jer nema mnogo venues u odabranom kriterijumu
var limit=50;
////////////////////////////////////////////////////////////pocetak sort by price tier query////////////////////////////////////////////////////////////////////
var brojacredovaq=1;//brojac redova za  sort by tier query
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
					limit: limit
				} ,
			success: function (data, textStatus, xhr) {
			setTimeout(rekurzivnopozivanjeq,4000);
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
				if (pricetier==2){var kolkoskupo="srednje";}
				if (pricetier==3){var kolkoskupo="skupo";}
				if (pricetier==4){var kolkoskupo="vrlo skupo";}
				if(pricetier==data.response.venue.price.tier)
				{
					if(brojacredovaq==1){$("#redjedantekstq").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					//$("#redjedantekstq").css("background-color", "yellow");
					$("#redjedantekstq").css('border', '2px solid black'); }
					if(brojacredovaq==2){$("#reddvatekstq").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					//$("#reddvatekstq").css("background-color", "yellow");
					$("#reddvatekstq").css('border', '2px solid black');}
					if(brojacredovaq==3){$("#redtritekstq").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					//$("#redtritekstq").css("background-color", "yellow");
					$("#redtritekstq").css('border', '2px solid black');}
					if(brojacredovaq==4){$("#redcetiritekstq").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					//$("#redcetiritekstq").css("background-color", "yellow");
					$("#redcetiritekstq").css('border', '2px solid black');}
					if(brojacredovaq==5){$("#redpettekstq").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					//$("#redpettekstq").css("background-color", "yellow");
					$("#redpettekstq").css('border', '2px solid black');}
					if(brojacredovaq==6){$("#redsesttekstq").text(data.response.venue.name+", udaljeno je "+daljina+"metara, cenovni rang je "+kolkoskupo);
					//$("#redsesttekstq").css("background-color", "yellow");
					$("#redsesttekstq").css('border', '2px solid black');}
					if(brojacredovaq==7){$("#redsedamtekstq").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					//$("#redsedamtekstq").css("background-color", "yellow");
					$("#redsedamtekstq").css('border', '2px solid black');}
					if(brojacredovaq==8){$("#redosamtekstq").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					//$("#redosamtekstq").css("background-color", "yellow");
					$("#redosamtekstq").css('border', '2px solid black');}
					if(brojacredovaq==9){$("#reddevettekstq").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					//$("#reddevettekstq").css("background-color", "yellow");
					$("#reddevettekstq").css('border', '2px solid black');}
					if(brojacredovaq==10){$("#reddesettekstq").text(data.response.venue.name+", udaljeno je "+daljina+" metara, cenovni rang je "+kolkoskupo);
					//$("#reddesettekstq").css("background-color", "yellow");
					$("#reddesettekstq").css('border', '2px solid black');}
					//pricetier++;
					//console.log("sort by tier ukupno do sada="+brojac);//da se lakse prati kolko ima rezultata koji zadovoljavaju sve kriterijume
					//console.log(brojacredovaq);
					slikeq(idprodavnice,brojacredovaq);
					brojacredovaq++;
				}
			}
			},
			error: function (xhr, textStatus, errorThrown) {
				//alert(errorThrown);
			}
});
});
}
//////////////////////////////////////////////////////////////////////povecava cenovni rang ako je broj rezultata manji od 10/////////////////////////////////////
function rekurzivnopozivanjeq()
{
	//console.log("pozivan, nije prosao if");

	if(brojacredovaq<10 && pricetier<4)
	{
		sortbytierquery();
		pricetier++;
		setTimeout(rekurzivnopozivanjeq,2000);
		console.log("pozivan je rekurzivni pozivac, price tier= "+pricetier);
	
		}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function slikeq(x,y)
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
			if(brojacredovaslike==1){$("#redjedanslikaq").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==2){$("#reddvaslikaq").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==3){$("#redtrislikaq").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==4){$("#redcetirislikaq").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==5){$("#redpetslikaq").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==6){$("#redsestslikaq").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==7){$("#redsedamslikaq").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==8){$("#redosamslikaq").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==9){$("#reddevetslikaq").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);}
			if(brojacredovaslike==10){$("#reddesetslikaq").attr("src",data.response.photos.items[0].prefix+ "100x100"+data.response.photos.items[0].suffix);
		//	clicklock=1;//otkljucava kliktanje da bi sprecilo dok generise stranu da menja css 
			}
			
			},
			error: function (xhr, textStatus, errorThrown) {
				//alert(errorThrown);
			}
			});
});
}
////////////////////////////////////////////////////////////////////////////////////////kraj sortiranja by price tier, pocetak sortiranja po distance///////////////////////////////////////
var brojacredova=1;//da prati koji red ima vec popunjen tekst rezultat i da uslovljava da se stavi u sledeci red
var brojac=0;//uopsteno pracenje broja rezultata koji odgovaraju kriterijumima

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
					limit: limit
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
			//var link = $("<a href='http://juixe.com'>Hello, jQuery!</a>");$('body').append(link);
					if(brojacredova==1){$("#redjedantekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					$("#redjedan").click(function(){window.location="venue.php?id="+data.response.venue.id });
					$("#redjedantekst").css('border', '2px solid black'); }
					if(brojacredova==2){$("#reddvatekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					//$("#reddvatekst").css("background-color", "yellow");
					$("#reddvatekst").css('border', '2px solid black');}
					if(brojacredova==3){$("#redtritekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					//$("#redtritekst").css("background-color", "yellow");
					$("#redtritekst").css('border', '2px solid black');}
					if(brojacredova==4){$("#redcetiritekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					//$("#redcetiritekst").css("background-color", "yellow");
					$("#redcetiritekst").css('border', '2px solid black');}
					if(brojacredova==5){$("#redpettekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					//$("#redpettekst").css("background-color", "yellow");
					$("#redpettekst").css('border', '2px solid black');}
					if(brojacredova==6){$("#redsesttekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					//$("#redsesttekst").css("background-color", "yellow");
					$("#redsesttekst").css('border', '2px solid black');}
					if(brojacredova==7){$("#redsedamtekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					//$("#redsedamtekst").css("background-color", "yellow");
					$("#redsedamtekst").css('border', '2px solid black');}
					if(brojacredova==8){$("#redosamtekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					//$("#redosamtekst").css("background-color", "yellow");
					$("#redosamtekst").css('border', '2px solid black');}
					if(brojacredova==9){$("#reddevettekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					//$("#reddevettekst").css("background-color", "yellow");
					$("#reddevettekst").css('border', '2px solid black');}
					if(brojacredova==10){$("#reddesettekst").text(data.response.venue.name+", udaljeno je "+daljina+" metara");
					//$("#reddesettekst").css("background-color", "yellow");
					$("#reddesettekst").css('border', '2px solid black');}
					brojac++;
					//console.log(brojac);//da se lakse prati kolko ima rezultata koji zadovoljavaju sve kriterijume
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
$('<a>',{
    text:'i am a link',
    href:'http://www.google.com',
    click:function(){}
}).appendTo('#redjedantekst');
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