// import get = Reflect.get;
const ApexCharts = require('apexcharts')
function test() {
  function test2() {
    const Chart = require('chart.js');


    const ctx = document.getElementById('myChart');




    const drawChart = () => {
      console.log(customLabels)
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: customLabels,
          datasets: [
            {
              label: '2019',
              data: customData,
              borderColor: '#3B83B2',
              borderWidth: 2,
              lineTension: 0
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            },
          },
          showAllTooltips: true,
          tooltips: {
            custom: function(tooltipModel: any) {
              if (!tooltipModel) return;
              // disable displaying the color box;
              tooltipModel.displayColors = false;
              return `<div>test</div>`;
            },
            callbacks: {
              labelColor: function() {
                return {
                  borderColor: '#000',
                  backgroundColor: '#000'
                };
              },
              labelTextColor: function() {
                return 'red';
              }
            }
          }
        }
      });
    }
  }
}

const localeData = [
  {
    date: '2020-07-24',
    total_orders: '124'
  },
  {
    date: '2020-07-25',
    total_orders: '194'
  },
  {
    date: '2020-07-27',
    total_orders: '25'
  },
  {
    date: '2020-07-28',
    total_orders: '18'
  },
  {
    date: '2020-07-29',
    total_orders: '218'
  },
  {
    date: '2020-07-30',
    total_orders: '98'
  }
];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const customLabels: any = [];
const customData: any = [];
const randomisedData: any = [];
const randomisedLabels: any = [];
const randomisedLocalData: any = [];

const getData = () => {
  localeData.forEach((item) => {
    customLabels.push(formatDate(item.date));
    customData.push(item.total_orders);
  })
}

const getDataRandom = () => {
  let today = new Date();
  let temp: any;
  for (let i = 0; i < 31; i++) {
    today = new Date(today.setDate(today.getDate() - 1));
    randomisedData.push({
      date:`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
      total_orders: Math.floor(Math.random() * 100) + 1
    })
  }
  randomisedData.forEach((item: any) => {
    randomisedLocalData.unshift(item.total_orders);
    randomisedLabels.unshift(formatDate(item.date))
  });
  console.log(randomisedData)
}

const formatDate = (date: string) => {
  return date.split('-')[2];
}

getData();
getDataRandom();

const options = {
  series: [{
    name: "Desktops",
    data: randomisedLocalData
  }],
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    },
    animations: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: 'Product Trends by Month',
    align: 'left'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: randomisedLabels,
  }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();