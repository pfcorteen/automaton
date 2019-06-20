export type AutomatonType = 'diadic' | 'triadic';

export type StimulusPart = 'LeftPart' | 'CenterPart' | 'RightPart';	// just don't use CenterPart if in diadic mode

export type RulePriority = 'Higher' | 'Stationary' | 'Lower';
export interface IColours {
	[key: string]: string;
}
export interface IChoice {
	target: HTMLElement;
	handleChoice: (newColour: string) => void;
}

export const Colours: IColours = {
	'a':'Black',
	'b':'DarkBlue',
	'c':'Blue',
	'd':'DarkSlateGray',
	'e':'Teal',
	'f':'DodgerBlue',
	'g':'Green',
	'h':'LightSeaGreen',
	'i':'Turquoise',
	'j':'Indigo',
	'k':'Maroon',
	'l':'DarkViolet',
	'm':'SaddleBrown',
	'n':'RosyBrown',
	'o':'MediumPurple',
	'p':'LimeGreen',
	'q':'GreenYellow',
	'r':'PaleTurquoise',
	's':'Red',
	't':'MediumVioletRed',
	'u':'Magenta',
	'v':'Salmon',
	'w':'Orange',
	'x':'Violet',
	'y':'Yellow',
	'z':'LightGoldenrodYellow',
	'A':'White'
}

export type IRule = [string, string];

export interface IRuleComponent {
	automatonType: AutomatonType;
	rule: IRule,
	selected: boolean,
	onRulePriorityChange: (rule: IRule, priorityChange: RulePriority) => void;
	onStimulusCellChange: (currentRule: string, newRule: string) => void;
	onResultCellChange: (currentRule: string, newRule: string) => void;
	onSelection: (rule: IRule, selected: boolean) => void;
}

export interface IRuleList {
	automatonType: AutomatonType;
	ruleList: IRule[];
	onRuleChange: (ruleList: IRule[]) => void;
}

export interface IConfiguration {
	name: string;
	automatonType: AutomatonType;
	ruleList: IRule[];
	cells: string;
}

export interface IAutomatonState extends IConfiguration {
	running: boolean;
	steps: number;
	clear: boolean;
}

export interface IConfigControl {
	selectedConfigName: string;
	onConfigSelection: (config: IConfiguration) => void;
	onSave: (name: string) => void;
	onRemove: (name: string) => void;
}

export interface IConfigState {
	options: JSX.Element[];
}

export interface IGeneration {
  cells: string;
  ordinal: number;
  onFirstGenerationChange: (newColour: string) => void; // only applicable to first generation
}

export interface IGround {
	automatonType: AutomatonType;
	running: boolean;
	steps: number;
	cells: string;
	ruleList: IRule[];
	onRunEnd: () => void;
	onFirstGenerationChange: (newCells: string) => void;
	clear: boolean;
}

export interface IGroundState {
	generations: JSX.Element[];
	prevProps: IGround;
}

export interface IGenControl {
	steps: number;
	onStartStop: () => void;
	onClear: () => void;
	onRandomize: () => void;
	onSingleCell: () => void;
	onStepChange: (steps: number) => void;
}

export interface IStimulusCellStateChange {
	colour: string;
	onStimulusCellStateChange: (newColour: string, stimulusPart: StimulusPart) => void;
	stimulusPart: StimulusPart;
}

export interface IResultCellStateChange {
	colour: string;
	onResultCellStateChange: (newColour: string) => void;
}
