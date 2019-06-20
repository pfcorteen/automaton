import * as React from "react";
import * as ReactDOM from "react-dom";
import { ColourChoiceControls } from "./ColourChoiceControls";
import { IResultCellStateChange, Colours } from "./Models";

export class ResultCell extends React.PureComponent<IResultCellStateChange, {}> {
  handleResultClick = (event: Event): void => {
	  console.log('handleResultClick');
    ReactDOM.render(
      <ColourChoiceControls target={event.target as HTMLElement} handleChoice={this.handleColourChoice.bind(this)} />,
      document.getElementById('colour-choice'));
  }
  handleColourChoice = (newColour: string): void => {
    if (this.props.colour !== newColour) {
      this.props.onResultCellStateChange (newColour);
    }
  }  
  render() {
    return <div onClick={this.handleResultClick.bind(this)}
                className={this.props.colour + ' result-cell'}
                title={Colours[this.props.colour]} />;
  }
}