import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

const brandInfo = getStyle("--info");
function random(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min);
}
  
var data1 = [];


for (var i = 0; i <= 100; i++) {
  data1.push(random(50, 200));
}
  
const tps24hOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: "index",
    position: "nearest",
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return {
          backgroundColor:
            chart.data.datasets[tooltipItem.datasetIndex].borderColor
        };
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

class TPS24h extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: null,
      tps24h: {
        labels: ["","","","","","","","","","","","","","","","","","","","","",""],
        datasets: [
          {
            label: "TPS",
            backgroundColor: hexToRgba(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data: data1
          }
        ]
      }
    };
  }
  componentDidMount() {
  
  }

  render() {
    return (
      <div
        className="chart-wrapper"
        style={{ height: 300 + "px", marginTop: 40 + "px" }}
      >
        <Line data={this.state.tps24h} options={tps24hOpts} height={300} />
      </div>
    );
  }
}

export default TPS24h;
