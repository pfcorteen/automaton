import * as React from "react";
import { IGenControl } from "./Models"

export class GenerationControls extends React.PureComponent<IGenControl, {}> {
  handleStartStop = (e: Event): void => {
    this.props.onStartStop();
  }
  handleClear = (e: Event): void => {
    this.props.onClear();
  }
  handleRandomize = (e: Event): void => {
    this.props.onRandomize();
  }
  handleSingleCell = (e: Event): void => {
    this.props.onSingleCell();
  }
  handleStepChange = (e: Event): void => {
    const targetElm = e.target as HTMLSelectElement,
      steps = parseInt(targetElm.value);
    this.props.onStepChange(steps);
  }
  render() {
    return (
      <div className="generationControls">
        <div className="heading">Generation Controls</div>
        <select onChange={this.handleStepChange.bind(this)} value={this.props.steps}>
          <option key={0} value="1">1</option>
          <option key={1} value="10">10</option>
          <option key={2} value="50">50</option>
          <option key={3} value="100">100</option>
        </select>
        <button onClick={this.handleStartStop.bind(this)}>Start/Stop/Continue</button>
        <button onClick={this.handleClear.bind(this)}>Clear</button>
        <button onClick={this.handleRandomize.bind(this)}>Randomize</button>
        <button onClick={this.handleSingleCell.bind(this)}>SingleCell</button>
      </div>
    );
  }
}