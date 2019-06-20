import * as React from "react";
import { GenerationBase, IGeneration } from "./GenerationBase";
import { FirstGenerationCell } from "./FirstGenerationCell";

export class FirstGeneration extends GenerationBase {
  constructor(props: IGeneration) {
    super(props);
    this.updateable = true;
  }
  handleColourChoice = (newColour: string, idx: number): void => {
    let newCells = this.props.cells;
    if (newColour !== 'A') {
      newCells = newCells.substr(0, idx) + newColour + newCells.substr(idx + 1);
      if (this.props.cells !== newCells) {
        this.props.onFirstGenerationChange (newCells);    
      }      
    }
  }
	protected rendering() {
  	const gen = this.props.cells.split('').map((colour, idx) =>
		  <FirstGenerationCell key={idx} idx={idx} colour={colour} onColourChoice={this.handleColourChoice} />
	  );
		return gen;
	}
}