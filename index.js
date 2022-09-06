
const productData = 'https://json.extendsclass.com/bin/9af56ef1c572';
const salesOrders = 'https://json.extendsclass.com/bin/d93ba783ac45';
const userLoginFreq = 'https://json.extendsclass.com/bin/0453bef032df';
var colorsArray = [
  "#0048BA","#B0BF1A","#7CB9E8","#F5F5DC","#B284BE","#CC0033","#FF9900","#A6D608","#5D8AA8",
  "#98777B","#72A0C1","#AF002A","#FD5800","#DF6124","#00CCFF","#F07427","#FFA089","#E56024","#9F00FF",
  "#FFE302","#CEFF00","#34B233","#004242",
  "#A4F4F9","#7C98AB","#645452","#F5DEB3","#FFFFFF","#F5F5F5","#A2ADD0","#D470A2","#FF43A4","#FC6C85",
  "#FD5800","#A75502","#722F37","#673147","#FF007C","#A0E6FF","#56887D","#C9A0DC","#C19A6B","#738678",
  "#0F4D92","#1C2841","#FFFF00","#FCE883",
  "#F0F8FF","#84DE02","#E32636","#C46210","#EFDECD","#E52B50","#9F2B68","#F19CBB","#AB274F","#D3212D",
  "#3B7A57","#00C4B0","#FFBF00","#FF7E00","#FF033E","#9966CC","#A4C639","#F2F3F4","#CD9575","#665D1E",
  "#915C83","#841B2D","#FF9900","#A6D608","#00CC33","#B80CE3",
  "#FF5F00","#FFA000","#CC00FF","#FF006C","#F70D1A",
  "#DF6124","#00CCFF","#F07427","#FFA089","#FAEBD7","#008000","#8DB600","#FBCEB1",
  "#00FFFF","#7FFFD4","#D0FF14","#4B5320",
  "#3B444B","#8F9779","#98777B",
  "#BCD4E6","#9F8170","#FA6E79","#F5F5DC","#2E5894","#9C2542","#E88E5A",
  "#40826D","#009698","#7C9ED9","#CC9900","#922724","#9F1D35","#DA1D81","#00AAEE",
  "#00CC33","#B80CE3","#FF5F00","#FFA000","#CC00FF","#FF006C","#F70D1A"
  ,"#EFCC00"
];

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
    arrayNeeded.push([salesData[i]['date'],salesData[i]['count'],parseFloat(usersData[i]['count'])]);
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
console.log("\n_________________________\narray needed : ",arrayNeeded);

function drawChart() {
  var data = google.visualization.arrayToDataTable(arrayNeeded);

  var options = {
    responsive:true,
    title: 'sales and user login graph',
    vAxes: {
      0: {
          title: 'sales axis'
      },
      1: {
          title: 'user login axis'
      }
    },
    hAxis: {title: "years" , direction:-1, slantedText:true, slantedTextAngle:90 },
                        
    explorer: { 
        seriesType: 'bars',
        bars: 'vertical' , // Required for Material Bar Charts.
        actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomOut:2,
        maxZoomIn: 4.0
        },
        colors: ['#981B48', '#ECA403'],
        theme:'material',
        series:{
            0: { type: 'line' , lineWidth:4 , targetAxisIndex: 0},
            1: { type: 'bars',lineWidth: 1, pointSize: 1 , targetAxisIndex: 1 },
        }
    };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

  chart.draw(data, options);
}




const productData2 = productDataGraph.data;
let arrayNeeded2 = [];
arrayNeeded2.push(['product_id' , 'number of sales' , {role:'style'}]);

/*
count: 44
product_id: 11125

*/
let colorCount = 0;
productData2.forEach(element => {
  if(element.count>90){
    colorCount+=1;
    arrayNeeded2.push([`${element['product_id']}` , element['count'] , `color: ${colorsArray[colorCount]}`]);
  }
});
console.log("\n\n\narray needed2 :",arrayNeeded2);




function drawChart2() {
    var data = google.visualization.arrayToDataTable(arrayNeeded2);
  
    var options = {
      responsive:true,
      title: 'top product id and their sales',
      hAxis: {title: "product_id" , direction:-1, slantedText:true, slantedTextAngle:90 },
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
  
