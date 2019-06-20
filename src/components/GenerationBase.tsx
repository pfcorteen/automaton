import * as React from "react";
import { IGeneration } from './Models';
// export interface IGeneration {
//   cells: string;
//   ordinal: number;
//   onFirstGenerationChange: (newColour: string) => void; // only applicable to first generation
// }
export abstract class GenerationBase extends React.PureComponent<IGeneration, {}> {
  updateable: boolean = false;
  // shouldComponentUpdate = (nextProps: IGeneration) => {
  //   return this.updateable; // true only for first generation
  // }
  protected abstract rendering(): JSX.Element[];
	render() {
		const generation = this.rendering();
		return  <div id={this.props.ordinal.toString()} className={'generation'}>
						{
							generation
						}
						</div>
	}
}
