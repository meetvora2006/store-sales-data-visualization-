//Reffrence : http://stackoverflow.com/questions/11792916/over-query-limit-in-google-maps-api-v3-how-do-i-pause-delay-in-javascript-to-sl
var MyLatLong = [];
geocoder = new google.maps.Geocoder();

function Geocode(address,custname) {
     
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
           
            MyLatLong.push({name: custname, lat: results[0].geometry.location.lat() , long: results[0].geometry.location.lng()})
            
           console.log(JSON.stringify(MyLatLong));

        } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {    
            setTimeout(function() {
                Geocode(address,custname);
            }, 200);
        } else {
            alert("Geocode was not successful for the following reason:" 
                  + status);
        }
    });
    
    
   
}



function MapwithCoustomer(mydivd, teledir){
    
     
    var Ahmedabadcity = teledir.filter(function (fp) {   
    return fp.City ==="AHMEDABAD";               
       });
       
     var oprationalarray = [];  
     
   
   
        var Addressdirectory = Ahmedabadcity.forEach(function (d) {
            
          
            if (d.Address.substring(d.Address.length-1) == "," )
            {
//                console.log()
                var str = d.Address.substring(0,d.Address.length-1);
            }
            else
                
            {
                 var str = d.Address;
            }
           
           if (d.Address1.substring(d.Address1.length-1) == "," )
            {
                var str1 = d.Address1.substring(0,d.Address1.length-1);
            }
            else
                
            {
                 var str1 = d.Address1;
            }
            
            if (d.Address2.substring(d.Address2.length-1) == "," )
            {
                var str2 = d.Address2.substring(0,d.Address2.length-1);
            }
            else
                
            {
                 var str2 = d.Address2;
            }
            
            
            
     var MyAddress = str+","+str1+","+str2+",AHMEDABAD";
            
     var CustName= d.NAME;
            // to get lat long from address : http://stackoverflow.com/questions/9805529/geocoding-api-over-query-limit 

               Geocode(MyAddress,CustName);  
     
       
        });



}


function processData(errors, teledir) {
  
  MapwithCoustomer("#MapCustomer", teledir);
  
}


queue()
  .defer(d3.csv, "teldircust.csv")
  .await(processData);