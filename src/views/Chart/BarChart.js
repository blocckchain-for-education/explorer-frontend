import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import {Card, Spinner,Row,Col, CardBody } from 'reactstrap';
import agent from "../../agent";
import _ from 'lodash';


const PieChart = props => {
    let transactions = props.transactions;
    if(!transactions) {
      return (
        <Card>
            <CardBody>
                <Row style={{textAlign:"center"}}>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Spinner color="primary" style={{width:"100px",height:"100px"}}/>
                    </Col>
                </Row>
            </CardBody>
        </Card>
      )
    }

    let groupByFamily = _.groupBy(transactions,"header.family_name");
    let labels = [];
    let data = [];
    for ( var k in groupByFamily ) {
      labels.push(k);
      data.push(groupByFamily[k].length)
    } 
  
    let barData =  {
                labels: labels,
                datasets: [
                    {
                    label: "Total transactions",
                    data: data,
                    backgroundColor: [
                        "rgba(255, 134,159,0.4)",
                        "rgba(98,  182, 239,0.4)",
                        "rgba(255, 218, 128,0.4)",
                        "rgba(113, 205, 205,0.4)",
                        "rgba(170, 128, 252,0.4)",
                        "rgba(255, 177, 101,0.4)"
                    ],
                    borderWidth: 2,
                    borderColor: [
                        "rgba(255, 134, 159, 1)",
                        "rgba(98,  182, 239, 1)",
                        "rgba(255, 218, 128, 1)",
                        "rgba(113, 205, 205, 1)",
                        "rgba(170, 128, 252, 1)",
                        "rgba(255, 177, 101, 1)"
                    ]
                    }
                ]
            }

        let barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                {
                    barPercentage: 1,
                    gridLines: {
                      display: true,
                      color: "rgba(0, 0, 0, 0.1)"
                    }
                }
                ],
                yAxes: [
                {
                    gridLines: {
                      display: true,
                      color: "rgba(0, 0, 0, 0.1)"
                    },
                    ticks: {
                      beginAtZero: true
                    }
                }
                ]
            }
        }

    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <div className="chart-wrapper"  >
              <Bar height={100} data={barData} options={barChartOptions} />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  };
export default PieChart;
  