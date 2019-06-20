import * as React from "react";
import * as ReactDOM from "react-dom";
import { Colours } from "./Models";
import { ColourChoiceControls } from "./ColourChoiceControls";

export interface IResultCellStateChange {
  idx: number;
  colour: string;
  onColourChoice: (newColour: string, idx: number) => void;
}
export class FirstGenerationCell extends React.PureComponent<IResultCellStateChange, {}> {
  handleClick = (event: Event): void => {
    ReactDOM.render(<ColourChoiceControls target={event.target as HTMLElement} handleChoice={this.handleColourChoice} />,
      document.getElementById('colour-choice'));
  }
  handleColourChoice = (newColour: string): void => {
    if (this.props.colour !== newColour) {
      this.props.onColourChoice (newColour, this.props.idx);    
    }
  }  
  render() {
    return <div onClick={this.handleClick.bind(this)} className={this.props.colour + ' cell'}  title={Colours[this.props.colour]}/>
  }
}