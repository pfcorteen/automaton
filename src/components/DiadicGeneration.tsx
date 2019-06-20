import * as React from "react";
import { GenerationBase } from "./GenerationBase";

export class DiadicGeneration extends GenerationBase {
  protected rendering(): JSX.Element[] {
    let cells: string[] = this.props.cells.split(''),
      jsxElms: JSX.Element[] = [];
    const numCells = cells.length,
      lastCell = cells[numCells - 1];
    if (this.props.ordinal % 2) {
      jsxElms.push(<div key={0} className={lastCell + ' halfcell'} />);
      jsxElms = jsxElms.concat(cells.map((colour, idx) =>
        (idx < numCells - 1)
          ? <div key={idx + 1} className={colour + ' cell'} />
          : <div key={idx + 1} className={colour + ' halfcell'} />
      ));
    } else {
      jsxElms = cells.map((colour, idx) => <div key={idx} className={colour + ' cell'} />);
    }
	  return jsxElms;
  }
}