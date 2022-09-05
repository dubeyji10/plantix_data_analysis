
const productData = 'https://json.extendsclass.com/bin/9af56ef1c572';
const salesOrders = 'https://json.extendsclass.com/bin/d93ba783ac45';
const userLoginFreq = 'https://json.extendsclass.com/bin/0453bef032df';

async function getDataset(url){
    console.log("fetching from url = ",url);
    const response = await fetch(url,{
        method: 'GET'
      });
    return response.json();
}

const productDataGraph = await getDataset(productData);
const salesOrdersGraph = await getDataset(salesOrders);
const userLoginFreqGraph = await getDataset(userLoginFreq);



console.log("product : ",productDataGraph);

console.log("\n sales orders : ",salesOrdersGraph);

console.log("\n user login freq : ",userLoginFreqGraph);

console.log("rendering chart ......");

const salesData = salesOrdersGraph.data;
const usersData = userLoginFreqGraph.data;

let arrayNeeded = [['year','salesOrders','userLogin']];
/*


*/

console.log("array needed :",arrayNeeded);
for(let i=0;i<60;i++){
    console.log('pushing ...',[salesData[i]['year'] ,salesData[i]['count'],usersData[i]['count'] ]);
    arrayNeeded.push([salesData[i]['date'],salesData[i]['count'],parseFloat(usersData[i]['count']/100)]);
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
console.log("\n_________________________\narray needed : ",arrayNeeded);

function drawChart() {
  var data = google.visualization.arrayToDataTable(arrayNeeded);

  var options = {
    responsive:true,
    title: 'sales and user login graph',
    vAxis: {title: 'sales and user logins'},
    hAxis: {title: 'years',},
                        
    explorer: { 
        seriesType: 'bars',
        actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomOut:2,
        maxZoomIn: 4.0
        },
        colors: ['#981B48', '#ECA403'],
        theme:'material',
        series:{
            0: { type: 'line' , lineWidth:4},
            1: { type: 'bars',lineWidth: 1, pointSize: 1 },
        }
    };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

  chart.draw(data, options);
}




const productData2 = productDataGraph.data;
let arrayNeeded2 = [];
arrayNeeded2.push(['product_id' , 'number of sales']);

/*
count: 44
product_id: 11125

*/
productData2.forEach(element => {
    console.log("pushing on array needed 2",element);
    arrayNeeded2.push([`${element['product_id']}` , element['count']]);

});
console.log("\n\n\narray needed2 :",arrayNeeded2);




function drawChart2() {
    var data = google.visualization.arrayToDataTable(arrayNeeded2);
  
    var options = {
      responsive:true,
      title: 'products and their sales',
      hAxis: {title: 'product_id'},
      vAxis: {title: 'sales'},
                          
      explorer: { 
          seriesType: 'bars',
          actions: ['dragToZoom', 'rightClickToReset'],
          axis: 'horizontal',
          keepInBounds: true,
          maxZoomOut:2,
          maxZoomIn: 4.0
          },
          colors: ['#981B48'],
          theme:'material',
          series:{
            0: { type: 'bars',lineWidth: 0.5, pointSize: 1 },
          }
      };
  
    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div2'));
  
    chart.draw(data, options);
  }
  
google.charts.setOnLoadCallback(drawChart2);
console.log("\n_________________________\nrendered product chart");
  
