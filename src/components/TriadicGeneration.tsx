import * as React from "react";
import { GenerationBase } from "./GenerationBase";

export class TriadicGeneration extends GenerationBase {
  protected rendering(): JSX.Element[] {
    let cells: string[] = this.props.cells.split(''), // turn into an array
        jsxElms = cells.map((colour, idx) => <div key={idx} className={colour + ' cell'} />);
	  return jsxElms;
  }
}