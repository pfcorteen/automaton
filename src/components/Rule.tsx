import * as React from "react";
import { RulePriority, IRuleComponent, StimulusPart} from "./Models";
import { StimulusCell } from "./StimulusCell";
import { ResultCell } from "./ResultCell";

export class Rule extends React.Component<IRuleComponent, {}> {
	static DiadicStimulusPart: StimulusPart[] = ['LeftPart', 'RightPart'];
	static TriadicStimulusPart: StimulusPart[] = ['LeftPart', 'CenterPart', 'RightPart'];
	public ruleDiv: HTMLDivElement;
	// private priority: RulePriority = 'Stationary';
	// private lastmouseX: number;
	// private lastmouseY: number;
	constructor(props) {
		super(props);
		this.state = {selected: false};
	}
	handleStimulusCellStateChange = (newColour: string, stimulusPart: StimulusPart) => {
		let [stimulus, result] = this.props.rule,
			newStimulus = (stimulusPart === 'CenterPart')
				? stimulus[0] + newColour + stimulus[2]
				: (this.props.automatonType === 'diadic')
					? (stimulusPart === 'LeftPart')
						? newColour + stimulus[1]
						: stimulus[0] + newColour
					: (stimulusPart === 'RightPart')
						? stimulus[0] + stimulus[1] + newColour
						: newColour + stimulus[1] + stimulus[2];
		this.props.onStimulusCellChange(stimulus, newStimulus);
	}
	handleResultCellStateChange = (newColour: string) => {
		const [stimulus, result] = this.props.rule;
		this.props.onResultCellChange(stimulus, newColour);
	}
	handleRuleMouseDown = (event: MouseEvent): void => {
		console.log('Rule.handleResultMouseDown');
		const mouseup = this.handleRuleMouseUp,
					mouseout = this.handleRuleMouseOut,
					rulediv = this.ruleDiv,
					rule = this.props.rule,
					defaultStimulus = (this.props.automatonType === 'diadic') ? 'AA' : 'AAA';
		if (rule[0] !== defaultStimulus) {
			rulediv.addEventListener('mouseout', mouseout);
			rulediv.addEventListener('mouseup', mouseup);
			// this.priority = 'Stationary';
			// this.lastmouseX = event.clientX;
			// this.lastmouseY = event.clientY;
			this.props.onSelection(this.props.rule, true);
		}
	}
	handleRuleMouseUp = (event: MouseEvent): void => {
		console.log('Rule.handleResultMouseUp');
		const mouseout = this.handleRuleMouseOut,
			mouseup = this.handleRuleMouseUp,
			ruleDiv = this.ruleDiv;
		ruleDiv.removeEventListener('mouseout', mouseout);
		ruleDiv.removeEventListener('mouseup', mouseup);
		// this.priority = 'Stationary';
		this.props.onSelection(this.props.rule, false);
	}
	handleRuleMouseOut = (event: MouseEvent): void => {

		console.log('Rule.handleRuleMouseOut\n - clientX: ' + event.clientX + ', clientY: ' + event.clientY);
		if (event.currentTarget === event.target){
			const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect(),
						bottom = rect.bottom,
						top = rect.top,
						left = rect.left,
						right = rect.right,
						ruleDiv = this.ruleDiv,
						rule = this.props.rule,
						mouseout = this.handleRuleMouseOut,
						mouseup = this.handleRuleMouseUp,
						x = event.clientX,
						y = event.clientY;
			ruleDiv.removeEventListener('mouseout', mouseout);
			ruleDiv.removeEventListener('mouseup', mouseup);

			if ((y >= top && y <= bottom)){
				let priority: RulePriority = (x <= left) ? 'Higher' : (x >= right) ? 'Lower' : 'Stationary';
					this.props.onRulePriorityChange(rule, priority);
			}
		}
	}
	render() {
		const [stimulus, result] = this.props.rule,
				clist = (this.props.selected) ? 'rule dragging' : 'rule',
				stimulusTypes = (this.props.automatonType === 'diadic')
					? Rule.DiadicStimulusPart
					: Rule.TriadicStimulusPart;
		return (
			<div className={clist}
					id={this.props.rule.toString()}
					onMouseDown={this.handleRuleMouseDown.bind(this)}
					ref={(div) => { this.ruleDiv = div; }}>
				<div className="stimulus-row">
					{
						stimulusTypes.map((part, idx) =>
							<StimulusCell
									key={idx}
									colour={stimulus.charAt(idx)}
									onStimulusCellStateChange={this.handleStimulusCellStateChange}
									stimulusPart={part} />
						)
					}
				</div>
				<div className="result-row">
					<ResultCell colour={result} onResultCellStateChange={this.handleResultCellStateChange}/>
				</div>
			</div>
		);
	}
}
