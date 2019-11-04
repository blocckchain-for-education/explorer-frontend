import React, { Component } from "react";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { Spinner,Row,Col } from 'reactstrap';
import { Pie } from "react-chartjs-2";

const brandInfo = getStyle("--info");
function random(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min);
}
  
var data1 = [];


for (var i = 0; i <= 100; i++) {
  data1.push(random(50, 200));
}
  

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
    let indices  = this.props.indices
    if(!this.props.indices){
      return (<Row style={{textAlign:"center"}}>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
      <Spinner color="primary" style={{width:"100px",height:"100px"}}/>

      </Col>

    </Row>)
    }
    let labels = [];
    let data = [];
    var other = 0;
    for (var key in indices) {
      if (indices.hasOwnProperty(key) && indices[key].total.docs.count>1000 ) {
        labels.push(key);
        data.push(indices[key].total.docs.count)
      }else{
        other +=indices[key].total.docs.count;
      }
  }
    labels.push("Other");
    data.push(other);
    let pieData = {
      labels:labels,
      datasets:[
        {
          data:data,
          backgroundColor: ['#FF6384','#4BC0C0','#FFCE56','#E7E9ED','#36A2EB',],
          hoverBackgroundColor: ['#FF6384','#4BC0C0','#FFCE56','#E7E9ED','#36A2EB',]
        }
      ]
    }
    return (
      <div
        className="chart-wrapper"
        style={{ height: 200 + "px", marginTop: 40 + "px" }}
      >
         <Pie height={100} data={pieData} />
      </div>
    );
  }
}

export default TPS24h;
