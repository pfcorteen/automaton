import * as React from "react";
import { Colours, IChoice } from "./Models";

export class ColourChoiceControls extends React.Component<IChoice, {}> {
  cntnr: HTMLDivElement;
  colourChoice: HTMLElement;
  constructor(props: IChoice) {
    super(props);
    this.colourChoice = document.getElementById('colour-choice');
  }
  componentWillMount() {
    this.colourChoice.setAttribute('style', 'display: none')
  }
  componentWillReceiveProps(nextProps: IChoice) {
	  const targetCell = nextProps.target,
				  width: number = targetCell.clientWidth,
				  height: number = targetCell.clientHeight,
					centerY: number = targetCell.offsetTop + (height / 2),
					centerX: number = targetCell.offsetLeft + (width / 2);
	  this.colourChoice.style.display = 'block';
    this.colourChoice.style.position = 'fixed';
	  this.colourChoice.style.top = centerY + 'px';
	  this.colourChoice.style.left = centerX + 'px';
  }
  handleClick = (e: Event): void => {
    let de = e.target as HTMLElement,
        newColour = de.className[0];
    this.props.handleChoice(newColour);
    setTimeout(() => this.colourChoice.setAttribute('style', 'display: none') , 0);
  }
  render() {
    const clss = (this.props.target !== null) ? this.props.target.classList[0] : '',
	      line1: JSX.Element[] = [],
        line2: JSX.Element[] = [],
        line3: JSX.Element[] = [];

    // these 27 letters will be used to represent 27 css class rules each with a different background colour
    // - a single letter for a class name
	  Object.keys(Colours).map((colour: string, idx) => {
		  let lineNum = Math.floor((idx + 1) / 9), // 3 rows of 9 Colours: 27 possible states per cell
			    line: JSX.Element[] = (lineNum === 0) ? line1 : (lineNum === 1) ? line2 : line3,
			    style = (colour === clss)
				    ? { border: '1px solid white' }
				    : {};

		  line.push(<div key={colour} className={colour + ' state-cell'} title={Colours[colour]} style={style} onClick={this.handleClick.bind(this)}/>);
	  });
    return (
      <div ref={(ref) => this.cntnr = ref} >
        <div className="line">{ line1 }</div>
        <div className="line">{ line2 }</div>
        <div className="line">{ line3 }</div>
      </div>
    );
  }
}
