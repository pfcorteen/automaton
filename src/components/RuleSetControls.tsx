import * as React from "react";
import { Automaton } from "./Automaton";
import { Rule } from "./Rule";
import { IRuleList, IRule, RulePriority } from "./Models";

export class RuleSetControls extends React.Component<IRuleList, {selectedIdx: number | null}> {
	constructor(props) {
		super(props);
		this.state = {selectedIdx: null};
	}
  allowRuleChange = (currentRuleIndex: number, proposedRule: IRule): boolean => {
    const [proposedStimulus, proposedResult] = proposedRule;
    let ruleList = (this.props as IRuleList).ruleList;
    for (let idx = 0; idx < ruleList.length; idx += 1) {
      const [stimulus, result] = ruleList[idx];
      if (idx !== currentRuleIndex && stimulus === proposedStimulus) {
          return false;
      }
    }
    return true;
  }
  handleStimulusCellChange = (currentStimulus: string, proposedStimulus: string) => {
    let ruleList = (this.props as IRuleList).ruleList,
      idx: number;
    for (idx = 0; idx < ruleList.length; idx += 1) {
      const [stimulus, result] = ruleList[idx];
      if (stimulus === currentStimulus) {
        break;
      }
    }
    let [stimulus, result] = ruleList[idx];
    if (this.allowRuleChange(idx, [proposedStimulus, result] )) {
      if ((this.props.automatonType === 'diadic' && stimulus === 'AA') || stimulus === 'AAA') {
        ruleList.push([(this.props.automatonType === 'diadic') ? 'AA' : 'AAA', Automaton.DEFAULT_STATE ]);
      }
      ruleList[idx] = [proposedStimulus, result];
      this.props.onRuleChange(ruleList);
    }
  }
  handleResultCellChange = (currentStimulus: string, proposedResult: string) => {
    let ruleList = (this.props as IRuleList).ruleList,
      idx;

    for (idx = 0; idx < ruleList.length; idx += 1) {
      const [stimulus, result] = ruleList[idx];
      if (stimulus === currentStimulus) {
        break;
      }
    }
    let [stimulus, result] = ruleList[idx];
    if (this.allowRuleChange(idx, [stimulus, proposedResult ])) {
      if (proposedResult === 'A') {
        if (ruleList.length === 1) {
          ruleList.push([(this.props.automatonType === 'diadic') ? 'AA' : 'AAA', Automaton.DEFAULT_STATE ]);
        }
        ruleList.splice(idx, 1);
      } else {
        ruleList[idx] = [stimulus, proposedResult];
      }
      this.props.onRuleChange(ruleList);
    }
  }
  handleRulePriorityChange = (rule: IRule, priorityChange: RulePriority): void => {
		let ruleList = (this.props as IRuleList).ruleList,
			idx = ruleList.findIndex((r) => { return r === rule; }),
			nidx = (priorityChange === 'Higher') ? idx - 1 : idx + 1,
			temp = ruleList[nidx],
			defaultStimulus = (this.props.automatonType === 'diadic') ? 'AA' : 'AAA';

		if ((nidx >= 0) && (temp[0] !== defaultStimulus)) {
			ruleList[nidx] = rule;
			ruleList[idx] = temp;
			this.setState({selectedIdx: nidx});
			this.props.onRuleChange(ruleList);
		}
	}
	handleSelection = (rule: IRule, selected: boolean): void => {
		let ruleList = (this.props as IRuleList).ruleList,
			idx = ruleList.findIndex((r) => { return r === rule; }),
			sIdx = (selected) ? idx : null;
		this.setState({selectedIdx: sIdx});
	}
  render() {
    return (
      <div className="rules">
      {
        (this.props as IRuleList).ruleList.map((rule, idx): JSX.Element => {
          return (
            <Rule key={idx}
                  automatonType={this.props.automatonType}
		              rule={rule}
                  selected={(idx === this.state.selectedIdx)}
		              onStimulusCellChange={this.handleStimulusCellChange}
		              onResultCellChange={this.handleResultCellChange}
                  onRulePriorityChange={this.handleRulePriorityChange}
                  onSelection={this.handleSelection}/>
          )
        })
      }
      </div>
    );
  }
}
