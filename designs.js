/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/* global google */

// at some place I took my own code from my previous assignment work

function PopularProductStack(mydiv, salereport)
{

var myStackbar = []

var flag;

  salereport.forEach(function (fp) {
       
   if(fp['Bill No'].length < 8 && fp['Bill No'].length >= 1 && !isNaN(fp['Bill No']))
    {
       
        if(fp['Bill No']< 2000)
        {
            flag = "R";
       
        }
         else{
            flag = "W";
        }
   } 
    
    if(flag == "R" && fp['Bill No'].length >= 8 && !isNaN(fp['Bill No'])){
       myStackbar.push({product: fp["Sale's Type"] }) 
       
    }
                
       });
       
      
 
 
 
 var groupByProduct = d3.nest()
        .key(function(d) { return d["product"]; })
        .rollup(function(v) { return v.length; }).entries(myStackbar).sort(function(x, y){
        return d3.descending(x.values, y.values);
        }).slice(0, 20);
 
 
  var MygroupByProduct = groupByProduct.filter(function (fp) {
     return fp["key"] != "";                
       });


 var ValueArray = MygroupByProduct.map(function (d) {
                return d.values;
            });
            
var qtyExtent = d3.extent(d3.values(ValueArray));
    
   

var x_name = MygroupByProduct.map(function (data) {
        return data["key"];
    });


var x = d3.scale.ordinal()
    .domain(x_name)
    .rangeBands([0, 600]);

var y = d3.scale.linear()
    .domain([0,3000])
    .range([400, 0]);
   


var xAxis = d3.svg.axis()
    .scale(x)
   .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select(mydiv).append("svg")
    .attr("width", 725)
    .attr("height", 600);
    
 
svg.append("g")
    .attr("class", "x axis")
   .attr("transform", "translate(75,410)")
   .call(xAxis)
   .selectAll("text")
    .attr("y", 0)
    .attr("x", 7)
    .attr("transform", "rotate(60)")
    .style("text-anchor", "start");

   
    
svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(75,10)")
   .call(yAxis);
   
svg.append("text")
   .attr("text-anchor", "middle")
   .attr("transform", "translate(12,200)rotate(-90)")  
   .text("Number Of Product Sold")
   .attr("font-size","15px");
   
   svg.append("text")
   .attr("text-anchor", "middle")
   .attr("transform", "translate(375,550)")  
   .text("Product Name")
   .attr("font-size","15px"); 
 
var selection = svg.selectAll("rect")
  .data(groupByProduct);

selection.enter().append("rect")
  .attr("x", function(d,i) { return i*30+75; })
  .attr("y", function(d) { return y(d.values)+10; })
  .attr("width", 29)
  .attr("height", function(d) { return 400-y(d.values); })
  .style("fill", "red");
}


function PopularProductStackwho(mydiv, salereport)
{


 var eachsaledata = salereport.filter(function (fp) {
     
     
    if(fp['Bill No'].length >= 8 && !isNaN(fp['Bill No']))
    {
     return true;
    }
                
       });
 
 
 
 var groupByProduct = d3.nest()
        .key(function(d) { return d["Sale's Type"]; })
        .rollup(function(v) { return v.length; }).entries(eachsaledata).sort(function(x, y){
        return d3.descending(x.values, y.values);
        }).slice(0, 20);
 
 
  var MygroupByProduct = groupByProduct.filter(function (fp) {
     return fp["key"] != "";                
       });


 var ValueArray = MygroupByProduct.map(function (d) {
                return d.values;
            });
            
var qtyExtent = d3.extent(d3.values(ValueArray));
    
   

var x_name = MygroupByProduct.map(function (data) {
        return data["key"];
    });


var x = d3.scale.ordinal()
    .domain(x_name)
    .rangeBands([0, 600]);

var y = d3.scale.linear()
    .domain([0,9000])
    .range([400, 0]);
   


var xAxis = d3.svg.axis()
    .scale(x)
   .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select(mydiv).append("svg")
    .attr("width", 725)
    .attr("height", 550);
    
 
svg.append("g")
    .attr("class", "x axis")
   .attr("transform", "translate(75,410)")
   .call(xAxis)
   .selectAll("text")
    .attr("y", 0)
    .attr("x", 7)
    .attr("transform", "rotate(60)")
    .style("text-anchor", "start");

   
    
svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(75,10)")
   .call(yAxis);
   
svg.append("text")
   .attr("text-anchor", "middle")
   .attr("transform", "translate(12,200)rotate(-90)")  
   .text("Number Of Product Sold")
   .attr("font-size","15px");
   
   svg.append("text")
   .attr("text-anchor", "middle")
   .attr("transform", "translate(375,550)")  
   .text("Product Name")
   .attr("font-size","15px"); 
 
var selection = svg.selectAll("rect")
  .data(groupByProduct);

selection.enter().append("rect")
  .attr("x", function(d,i) { return i*30+75; })
  .attr("y", function(d) { return y(d.values)+10; })
  .attr("width", 29)
  .attr("height", function(d) { return 400-y(d.values); })
  .style("fill", "red");
}


function SaleStatics(mydiv, salereport)
{

var optArray = [];
var Mydate;
var Mysale;

var MonthName= ["January","February","March","April","May","June","July","August","September","October","November","December"]
var daysale = salereport.forEach(function (d) {
     
 if(d["Bill No"].indexOf("/201") > 0)
    {
   Mydate = "";
    Mydate = d["Bill No"];  
    }
   
 if(d["SIZE1"] === "Date Total")
    {
       
   Mysale = "";
    Mysale = d["Net Amt"];  
    
  
   var MFdate = Mydate.substring(Mydate.length - 7);
   
   if (MFdate.charAt(0) === '/')
   {
     var  MFdate = '0'.concat(MFdate.slice(1,7));
   }
   
  
    
     optArray.push({ Adate: MFdate , DateSale: Mysale });   
    }

       
});


var MonthSale = d3.nest()
  .key(function(d) { return d.Adate; })
  .rollup(function(v) { return  d3.sum(v, function(d) { return d.DateSale; })  
   }).entries(optArray);
  
 // console.log(MonthSale);
  
  var x_name = MonthSale.map(function (data) {
        return MonthName[Number(data["key"].slice(0,-5)).toString()-1];
    });
     
    
    
   var Mydomain = MonthSale.map(function (data) {
        return data["values"];
    });


var qtyExtent = d3.extent(d3.values(Mydomain));

var x = d3.scale.ordinal()
    .domain(x_name)
    .rangeBands([0, 600]);

var y = d3.scale.linear()
    .domain([0, 3000000])
    .range([350, 0]);
   


var xAxis = d3.svg.axis()
    .scale(x)
   .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select(mydiv).append("svg")
    .attr("width", 650)
    .attr("height", 400);
    
 
svg.append("g")
    .attr("class", "x axis")
   .attr("transform", "translate(50,375)")
   .call(xAxis);
   
   
   
    
svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(50,25)")
   .call(yAxis);
  
  // to draw path : http://vadim.ogievetsky.com/IntroD3/#39
   
  var lineFn = d3.svg.line()
  .x(function(d,i) {return (i*50)+75})
  .y(function(d) {return y(d.values)+25 }) 
   
   svg.append('svg:path')
  .attr('d', lineFn(MonthSale))
  .attr('stroke', 'blue')
  .attr('stroke-width', 1)
  .attr('fill', 'none');
  
  
  svg.selectAll("svg")  
    .data(MonthSale)
    .enter().append("circle")
    .attr("class","dualLineChart-dot1")
    .attr("cx", function(d,i) { return (i*50)+75; })
    .attr("cy", function(d) { return y(d.values)+25; })
    .attr("r", 3.5)
    .style("fill", "blue");
    



}









function MapwithCoustomer(mydiv, geodata, salereport, latlng){
    
  
    
   var AhmedabadGeo = geodata["features"].filter(function (fp) {
     
    return fp["properties"]["varname_3"]==="Ahmadabad city";
                
       });
       
   
      var svg = d3.select(mydiv).append("svg")
    .attr("width", 600)
    .attr("height", 500);
   
    var proj = d3.geo.mercator()
    .scale(120000)
    .rotate( [-80.0200,0] )
    .center([-7.45,23.025])
    .translate([600/2, 500/2]);
   
    // discussed with a friend about using center in projection.

  var path = d3.geo.path()
    .projection(proj);
    
    
    var states = svg.append("g")
    .selectAll("path")
    .data(AhmedabadGeo)
    .enter().append("path")
    .attr("d", path)
    .style("fill", "white")
    .style("stroke", "black");
    
    var nested_data = d3.nest()
.key(function(d) { return d.lat; })
.key(function(d) { return d.long; })
.rollup(function(leaves) { return leaves.length; })
.entries(latlng);

var tip;

  tip = d3.tip().attr('class','d3-tip').html(function(d) {return d.name;});


var shoplocation = [{lng : 72.530147, lat: 23.024398, name: 'shivranjani'},{lng : 72.588242, lat: 23.023194, name: 'manekchowk'}]

 svg.selectAll("circle")
		.data(nested_data)
                .enter()
		.append("circle")
		.attr("cx", function (d) { return  proj([d.values[0].key, d.key])[0] ; })
		.attr("cy", function (d) { return  proj([d.values[0].key, d.key])[1]; })
		.attr("r", function (d) { return  d.values[0].values; })
                .attr("opacity", function (d) { return  7.3/d.values[0].values; })
		.attr("fill", "red");
        
        
     var selection = svg.append("g").selectAll("rect")
    .data(shoplocation) 
    .enter().append("rect")
    .attr("x", function (d,i) { return  proj([d.lng, d.lat])[0] ; })
    .attr("y", function (d,i) { return  proj([d.lng, d.lat])[1] ; })
    .attr("height", "13px")
    .attr("width", "13px")
    .style("fill", "black");
        
        
svg.call(tip);

svg.selectAll('g rect')
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide);
  
 
     var mybar = d3.select("#popularproduct").select("svg");
     
    mybar.selectAll('rect')
    .on("mouseenter", rowMouseEnter)
    .on("mouseout", rowMouseLeave);
    
  var cust = []; 
    var finalArray = [];  
    
    function rowMouseEnter() {
      
  var selectedbar = d3.select(this)

  selectedbar.classed("highlight", true);
      
    
    var MyProduct = selectedbar.datum().key;
      var customerName = "";
    
       var eachbilldata = salereport.forEach(function (f) {
     
    
    if(f['Bill No'].length < 8 && f['Bill No'].length >= 1 && !isNaN(f['Bill No']))
    {
       
     if(f['Bill No']<2000)
        {
            
     customerName = f["Sale's Type"];
    
    }
    else{
     customerName = "";
      
    }
   
    } 
    
    if(f["Sale's Type"] == MyProduct && f['Bill No'].length >= 8 && !isNaN(f['Bill No']) && customerName.length > 1)
    {
     
     cust.push({CustName: customerName});
    }
                
       });
    
    
    
    
 var groupByCust = d3.nest()
        .key(function(d) { return d.CustName; })
        .rollup(function(v) { return v.length; }).entries(cust);


 var finalcomp = groupByCust.forEach(function (f) {
     
     
    var custentry = latlng.filter(function (k) {
        return k.name === f.key;
        });
    
    
    
    if(custentry.length > 0)
        
          
     finalArray.push({lat: custentry[0].lat, long: custentry[0].long, count: f.values });
          
       });

d3.select("#MapCustomer").select("svg").selectAll("circle").remove();

svg.selectAll("circle")
		.data(finalArray)
                .enter()
		.append("circle")
		.attr("cx", function (d) { return  proj([d.long, d.lat])[0] ; })
		.attr("cy", function (d) { return  proj([d.long, d.lat])[1]; })
		.attr("r", function (d) { return  d.count; })
                .attr("opacity", function (d) { return  7.3/d.count; })
		.attr("fill", "red");
                //console.log(finalArray);
            
            
    }
  
  function rowMouseLeave() {
      
      
  var selectedbar = d3.select(this);
    
selectedbar.classed("highlight", false);
finalArray =[];
cust = [];
    
  }

   
 
}



function processData(errors, salereport, geodata, teledir, latlng) {
  PopularProductStack("#popularproduct", salereport);
  
  PopularProductStackwho("#popularproductwho", salereport);
  
  SaleStatics("#saleyearreport", salereport);
  
  MapwithCoustomer("#MapCustomer", geodata, salereport, latlng);
  
}


queue()
  .defer(d3.csv, "salereport.csv")
  .defer(d3.json, "ind_adm3.geojson")
  .defer(d3.csv, "teldircust.csv")
  .defer(d3.json, "latlng.json")
  .await(processData);