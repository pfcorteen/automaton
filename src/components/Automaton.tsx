import * as React from "react";
import { RuleSetControls } from "./RuleSetControls";
import { GenerationControls } from "./GenerationControls";
import { ConfigurationControls } from "./ConfigurationControls";
import { Ground } from "./Ground";
import { Cookies } from "../utils/Cookies";
import { IConfiguration, IAutomatonState, IRule } from "./Models";
import { Colours } from "./Models";

export class Automaton extends React.Component<{}, IAutomatonState> {
  static DIADIC_DEFAULT_STATE: IAutomatonState = {
    name: 'Diadic default',
    automatonType: 'diadic',
    ruleList: [[ 'az',  'a' ], [ 'aa',  'z' ], [ 'za',  'a' ], [ 'AA',  'z' ]],
    cells: 'a',
    running: false,
    steps: 1,
    clear: false
  };
  static TRIADIC_DEFAULT_STATE: IAutomatonState = {
    name: 'Triadic default',
    automatonType: 'triadic',
    ruleList: [
      [ 'aaa',  'z' ], [ 'aaz',  'z' ], [ 'aza',  'z' ],
      [ 'azz',  'a' ], [ 'zaa',  'a' ], [ 'zaz',  'a' ],
      ['zza',  'a'], ['AAA',  'z']],
    cells: 'a',
    running: false,
    steps: 1,
    clear: false
  };
  static WOLFRAM_PRIMES: IAutomatonState = {
    name: 'Wolfram Primes',
    automatonType: 'triadic',
    ruleList: [
      /* {13,3,13}->12              */[ 'mcm',  'l' ],
      /* {6,_,4]->15                */[ 'fAd',  'o' ],
      /* {10,_,3|11]->15            */[ 'jAc',  'o' ], [ 'jAk',  'o' ],
      /* {13,7,_]->8                */[ 'mgA',  'h' ],
      /* {13,8,7]->13               */[ 'mhg',  'm' ],
      /* {15,8,_]->1                */[ 'ohA',  'a' ],
      /* {8,_,_]->7                 */[ 'hAA',  'g' ],
      /* {15,1,_]->2                */[ 'oaA',  'b' ],
      /* {_,1,_]->1                 */[ 'AaA',  'a' ],
      /* {1,_,_]->8                 */[ 'aAA',  'h' ],
      /* {2|4|5,_,_]->13            */[ 'bAA',  'm' ], [ 'dAA',  'm' ], [ 'eAA',  'm' ],
      /* {15,2,_]->4                */[ 'obA',  'd' ],
      /* {_,4,8]->4                 */[ 'Adh',  'd' ],
      /* {_,4,_]->5                 */[ 'AdA',  'e' ],
      /* {_,5,_]->3                 */[ 'AeA',  'c' ],
      /* {15,3,_]->12               */[ 'ocA',  'l' ],
      /* {_,x:2|3|8,_]->x           */[ 'AbA',  'b' ], [ 'AcA',  'c' ], [ 'AhA',  'h' ],
      /* {_,x:11|12,_]->x-1         */[ 'AkA',  'j' ], [ 'AlA',  'k' ],
      /* {11,_,_]->13               */[ 'kAA',  'm' ],
      /* {13,_,1|2|3|5|6|10|11]->15 */[ 'mAa',  'o' ], [ 'mAb',  'o' ], [ 'mAc',  'o' ], [ 'mAe',  'o' ], [ 'mAf',  'o' ], [ 'mAj',  'o' ], [ 'mAk',  'o' ],
      /* {13,0,8]->15               */[ 'mzh',  'o' ],
      /* {14,_,6|10]->15            */[ 'nAf',  'o' ], [ 'nAj',  'o' ],
      /* {10,0|9|13,6|10]->15       */[ 'jzf',  'o' ], [ 'jzj',  'o' ], [ 'jif',  'o' ], [ 'jij',  'o' ], [ 'jmf',  'o' ], [ 'jmj',  'o' ],
      /* {6,_,6]->0                 */[ 'fAf',  'z' ],
      /* {_,_,10]->9                */[ 'AAj',  'i' ],
      /* {6|10,15,9]->14            */[ 'foi',  'n' ], [ 'joi',  'n' ],
      /* {_,6|10,9|14|15]->10       */[ 'Afi',  'j' ], [ 'Afn',  'j' ], [ 'Afo',  'j' ], [ 'Aji',  'j' ], [ 'Ajn',  'j' ], [ 'Ajo',  'j' ],
      /* {_,6|10,_]->6              */[ 'AfA',  'f' ], [ 'AjA',  'f' ],
      /* {6|10,15,_]->13            */[ 'foA',  'm' ], [ 'joA',  'm' ],
      /* {13|14,_,9|15]->14         */[ 'mAi',  'n' ], [ 'mAo',  'n' ], [ 'nAi',  'n' ], [ 'nAo',  'n' ],
      /* {13|14,_,_]->13            */[ 'mAA',  'm' ], [ 'nAA',  'm' ],
      /* {_,_,15]->15               */[ 'AAo',  'o' ],
      /* {_,_,9|14]->9              */[ 'AAi',  'i' ], [ 'AAn',  'i' ],
      /* {_,_,_]->0                 */[ 'AAA',  'z' ]
    ],
    cells: 'jzdh', // 10,0,4,8
    running: false,
    steps: 1,
    clear: false
  };
  static DEFAULT_STATE: string = 'z';
	static prepareFirstGeneration(cells: string): string {
		const bodyWidth = document.body.clientWidth,
			numCells = Math.floor((bodyWidth - 12) / 12);
		let newCells = '';

		if (numCells > cells.length) {
			const leftPad = Math.floor((numCells - cells.length) / 2),
				rightPad = numCells - cells.length - leftPad;
			newCells = newCells.concat(Array(leftPad).join(Automaton.DEFAULT_STATE));
			newCells = newCells.concat(cells);
			newCells = newCells.concat(Array(rightPad).join(Automaton.DEFAULT_STATE));
		} else {
			newCells = cells;
		}
		return newCells;
	}
	constructor(props: {}) {
    super(props);
    this.state = JSON.parse(JSON.stringify(Automaton.WOLFRAM_PRIMES));
  }
  componentWillMount() {
    let config: IConfiguration = this.state;
    config.cells = Automaton.prepareFirstGeneration(config.cells)
    this.setState(config);
  }
  componentDidUpdate() {
    if (this.state.clear) {
      this.setState({ clear: false });
    }
  }
  handleStartStop = (): void => {
    let toggled = !this.state.running;
    this.setState({ running: toggled });
  }
  handleClear = (): void => {
    this.setState({ running: false, clear: true });
  }
  handleRandomize = (): void => {
    let len = this.state.cells.length,
      allColours = Object.keys(Colours).map((c) => c),
      ruleColours: string[] = [],
      newCells = '',
      idx = 0;
    this.state.ruleList.map((rule) => {
      const [stimulus, result] = rule;
      if (ruleColours.indexOf(result) === -1) {
        ruleColours.push(result);
      }
    });
    for (idx = 0; idx < len; idx += 1) {
      let n = Math.floor(Math.random() * ruleColours.length)
      newCells = newCells.concat(ruleColours[n]);
    }
    this.setState({ cells: newCells });
  }
  handleSingleCell = (): void => {
    let config: IConfiguration = this.state;
    config.cells = Automaton.prepareFirstGeneration('a')
    this.setState(config);
  }
  handleRuleChange = (ruleList: IRule[]): void => {
    const [s, r] = ruleList[ruleList.length - 1];
    Automaton.DEFAULT_STATE = r;
    this.setState({ ruleList: ruleList });
  }
  handleFirstGenerationChange = (newCells: string): void => {
    this.setState({ cells: newCells });
  }
  handleConfigSelection = (config: IConfiguration): void => {
    const
      ruleList = config.ruleList,
      [s, r] = ruleList[ruleList.length - 1];
    Automaton.DEFAULT_STATE = r;
    config.cells = Automaton.prepareFirstGeneration(config.cells)
    this.setState(config);
  }
  handleSave = (name: string): void => {
    let stateString: string,
      newState: IAutomatonState = JSON.parse(JSON.stringify(this.state)),
      expiry = new Date("December 31, 2100"),
      domain = document.domain,
      path = './',
      cells = newState.cells,
      regex = new RegExp('^' + Automaton.DEFAULT_STATE + '*|' + Automaton.DEFAULT_STATE + '*$', 'g');

    newState.cells = cells.replace(regex, '');
    newState.name = name;
    newState.running = false;
    newState.clear = false;
    stateString = JSON.stringify(newState);
    Cookies.setItem(name, stateString, expiry, domain, path, false);
  }
  handleRemove = (name: string): void => {
    Cookies.removeItem(name, document.domain, './');
    this.setState({ name: '' });
  }
  handleStepChange = (steps: number): void => {
    this.setState({ steps: steps });
  }
  render() {
	  return (
      <div className="automaton">
        <ConfigurationControls
          selectedConfigName={this.state.name}
          onConfigSelection={this.handleConfigSelection}
          onSave={this.handleSave}
          onRemove={this.handleRemove} />
        <RuleSetControls
          automatonType={this.state.automatonType}
          ruleList={this.state.ruleList}
          onRuleChange={this.handleRuleChange} />
        <GenerationControls
          steps={this.state.steps}
          onStartStop={this.handleStartStop}
          onClear={this.handleClear}
          onRandomize={this.handleRandomize}
          onStepChange={this.handleStepChange}
          onSingleCell={this.handleSingleCell} />
        <Ground
          automatonType={this.state.automatonType}
          running={this.state.running}
          steps={this.state.steps}
          clear={this.state.clear}
          cells={this.state.cells}
          ruleList={this.state.ruleList}
          onRunEnd={this.handleStartStop}
          onFirstGenerationChange={this.handleFirstGenerationChange} />
      </div>
    );
  }
}
