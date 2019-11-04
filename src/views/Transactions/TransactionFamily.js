import React from "react";
import { Pie } from "react-chartjs-2";
import _ from 'lodash';
import { Spinner,Row,Col } from 'reactstrap';

const TransactionFamily = props => {
  let transactions = props.transactions;
  if(!transactions){
    return (<Row style={{textAlign:"center"}}>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
      <Spinner color="primary" style={{width:"100px",height:"100px"}}/>

      </Col>

    </Row>)
  }
  let groupByFamily = _.groupBy(transactions,"header.family_name");
  let labels = [];
  let data = [];
  for(var k in groupByFamily){
    labels.push(k);
    data.push(groupByFamily[k].length)
  } 

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
    
    <div className="chart-wrapper"  >
      <Pie height={100} data={pieData} />
    </div>
  );
};
export default TransactionFamily;
