(()=>{
  function Dashboard(){
    this.chart()
  }

  Dashboard.prototype.chart = function(){

    // chart_bar
    new Chart(document.getElementById('chart_bar'), {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })

    // chart-2
    const data_2 = {
      labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }, {
        label: 'My Second Dataset',
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }]
    }
    const config_2 = {
      type: 'radar',
      data: data_2,
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
    }
    new Chart(document.getElementById('chart_2'), config_2)

    // chart-3
    const actions_3 = [
      {
        name: 'Randomize',
        handler(chart) {
          chart.data.datasets.forEach(dataset => {
            dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
          });
          chart.update();
        }
      },
    ];
    const DATA_COUNT_3 = 7;
    const NUMBER_CFG_3 = {count: DATA_COUNT_3, min: -100, max: 100};

    const labels_3 = ['1','2','3','4','5','6','7']
    const data_3 = {
      labels: labels_3,
      datasets: [
        {
          label: 'Fully Rounded',
          data: [10,100,20,150,30,120,80],
          borderColor: 'red',
          backgroundColor: 'rgba(255,0,0,0.5)',
          borderWidth: 2,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
        },
        {
          label: 'Small Radius',
          data: [100,50,20,90,40,80,60],
          borderColor: 'blue',
          backgroundColor: 'rgba(0,0,255,0.5)',
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        }
      ]
    };
    const config_3 = {
      type: 'bar',
      data: data_3,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart'
          }
        }
      },
    };
    new Chart(document.getElementById("chart_3") , config_3)

    // chart-4
    const data_4 = {
      labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    };
    const config_4 = {
      type: 'polarArea',
      data: data_4,
      options: {}
    };
    new Chart(document.getElementById("chart_4") , config_4)


    // chart-5
    const data_5 = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    const config_5 = {
      type: 'doughnut',
      data: data_5,
    }
    new Chart(document.getElementById("chart_5") , config_5)


    // chart-6
    const labels_6 = ['1','2','3','4','5','6','7']
    const data_6 = {
      labels: labels_6,
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
    const config_6 = {
      type: 'line',
      data: data_6,
    }
    new Chart(document.getElementById("chart_6") , config_6)

    // chart-7
    const DATA_COUNT_7 = 7;
    const NUMBER_CFG_7 = {count: DATA_COUNT_7, min: -100, max: 100};

    const labels_7 = ['1','2','3','4','5','6','7']
    const data_7 = {
      labels: labels_7,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels_7.map(() => {
            return [-50, 30];
          }),
          backgroundColor: 'red',
        },
        {
          label: 'Dataset 2',
          data: labels_7.map(() => {
            return [10, 80];
          }),
          backgroundColor: 'blue',
        },
      ]
    };
    const config_7 = {
      type: 'bar',
      data: data_7,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Floating Bar Chart'
          }
        }
      }
    };
    new Chart(document.getElementById("chart_7") , config_7)

    // chart-8



    // chart-9



  }

  // init()
  // function init(){
  //   const script = document.createElement('script')
  //   script.src = 'https://cdn.jsdelivr.net/npm/chart.js'
  //   script.onload = load
  //   document.querySelector('head').appendChild(script)
  // }

  load()
  // frameworkのpage-load判定処理
  function load(){
    // console.log(window.Main,window.Main.flg_loaded)
    if(window.Main && window.Main.flg_loaded){
      new Dashboard()
    }
    else if(window.loaded_callbacks === null){
      new Dashboard()
    }
    else{
      window.loaded_callbacks.push((()=>{console.log('chart');new Dashboard()}).bind(this))
      // window.addEventListener('DOMContetLoaded' , (()=>{new Dashboard()}).bind(this))
    }
  }

})()