import React from "react";
import "./style.css";
export default class GridItem extends React.Component {
  constructor(props) {
    super(props);
  }
  clickFn = () => {
    this.props.playerClickCB(this.props.rowIdx, this.props.colIdx);
  };
  render() {
    return (
      <div className="grid-item" onClick={this.clickFn}>
        {this.props.value}
      </div>
    );
  }
}
