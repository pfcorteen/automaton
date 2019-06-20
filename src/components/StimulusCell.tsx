import * as React from "react";
import * as ReactDOM from "react-dom";
import { ColourChoiceControls } from "./ColourChoiceControls";
import { Colours, StimulusPart, IStimulusCellStateChange } from "./Models";

export class StimulusCell extends React.Component<IStimulusCellStateChange, {}> {
  handleStimulusClick = (event: Event): void => {
    ReactDOM.render(<ColourChoiceControls target={event.target as HTMLElement} handleChoice={this.handleColourChoice} />,
      document.getElementById('colour-choice'));
  }
  handleColourChoice = (newColour: string): void => {
    if (this.props.colour !== newColour) {
      this.props.onStimulusCellStateChange(newColour, this.props.stimulusPart);
    }
  }
  render() {
    return <div onClick={this.handleStimulusClick.bind(this)}
                className={this.props.colour + ' stimulus-cell'}
                title={Colours[this.props.colour]} />;
  }
}
