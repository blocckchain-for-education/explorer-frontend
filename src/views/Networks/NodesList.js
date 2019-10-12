import React from "react";
import { Progress } from "reactstrap";
const NodesList = props => {
  if(!props.nodes){
    return "loading..."
  }
  return props.nodes.map((node, idx) => {
    let flagClass = "flag-icon flag-icon-" + node.countryFlag + " h4 mb-0";
    return (
      <tr>
        <td className="text-center">
          <div className="avatar">
            <img src={node.image} className="img-avatar" alt="" />
            <span className="avatar-status badge-success"></span>
          </div>
        </td>
        <td>
          <div>{node.name}</div>
          <div className="small text-muted">
            <span></span>
            {node.regiterTime}
          </div>
        </td>
        <td className="text-center">
          <i className={flagClass} title={node.country} id={node.country}></i>
        </td>
        <td>
          <div className="clearfix">
            <div className="float-left">
              <strong>{node.usage} %</strong>
            </div>
            <div className="float-right">
              <small className="text-muted">{node.lastActive}</small>
            </div>
          </div>
          <Progress className="progress-xs" color="success" value={node.usage} />
        </td>
        <td>
          <div className="small text-muted">Last login</div>
          <strong>{node.lastActive}</strong>
        </td>
      </tr>
    );
  });
};
export default NodesList;
