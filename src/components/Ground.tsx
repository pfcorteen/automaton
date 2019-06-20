import * as React from "react";
import { AutomatonType, IGround, IGroundState } from "./Models";
// import { GenerationBase} from "./GenerationBase";
import { FirstGeneration } from "./FirstGeneration";
import { DiadicGeneration } from "./DiadicGeneration";
import { TriadicGeneration } from "./TriadicGeneration";

export class Ground extends React.Component<IGround, IGroundState> {
  static generationBase: JSX.Element;
  static buildGenerationBase(automatonType: AutomatonType) {
    Ground.generationBase = (automatonType === 'diadic')
      ? <DiadicGeneration key={0} ordinal={0} cells={''} onFirstGenerationChange={null} />
      : <TriadicGeneration key={0} ordinal={0} cells={''} onFirstGenerationChange={null} />;
  }
  static * diadicStimulusIterator(cells: string[], ordinal: number): IterableIterator<string> {
    const maxIdx = cells.length - 1;
    for (let idx = 0; idx <= maxIdx; idx += 1) {
      yield ((ordinal % 2)
        ? ((idx === maxIdx)
          ? cells[maxIdx] + cells[0]
	        : cells[idx] + cells[idx + 1])
	      : ((idx === 0)
		      ? cells[maxIdx] + cells[0]
		      : cells[idx - 1] + cells[idx]));
    }
  }
  static * triadicStimulusIterator(cells: string []): IterableIterator<string> {
    const maxIdx = cells.length - 1;
    for (let idx = 0; idx <= maxIdx; idx += 1) {
      yield (idx === 0)
        ? cells[maxIdx] +  cells[idx] + cells[idx + 1]
        : ((idx === maxIdx)
          ? cells[idx - 1] + cells[idx] + cells[0]
          : cells[idx - 1] + cells[idx] + cells[idx + 1]);
    }
  }
  static getDerivedStateFromProps = (props: IGround, state: IGroundState) => {
    const prevProps = state.prevProps;
    if (props.clear !== prevProps.clear) {
      let firstGeneration = state.generations[0];
      return {
        generations: [firstGeneration],
        prevProps: props
      };
    }
    if (prevProps.cells !== props.cells) {
      const handleFirstGenerationChange = (newCells: string): void => {
        props.onFirstGenerationChange(newCells);
      }
      return {
        generations: [<FirstGeneration key={0} cells={props.cells} ordinal={0}  onFirstGenerationChange={handleFirstGenerationChange} />],
        prevProps: props
      };
    }

    if (prevProps.automatonType !== props.automatonType || prevProps.ruleList !== props.ruleList) {
      Ground.buildGenerationBase(props.automatonType);
    }
    return {
      generations: state.generations,
      prevProps: props
    }
  }

  stimulusIterator: (cells: string[], gencount: number) => IterableIterator<string>;
  groundElm: HTMLElement;
  count = 0;

  constructor(props: IGround) {
    super(props);
    const
      automatonType = this.props.automatonType;
    Ground.buildGenerationBase(automatonType);
    this.state = {
      generations: [
        <FirstGeneration key={0} cells={props.cells} ordinal={0} onFirstGenerationChange={this.handleFirstGenerationChange} />
      ],
      prevProps: props
    }
  }

	* generate(ordinal: number): IterableIterator<string> {
    const
      gens = this.state.generations,
      lastCells =  (gens.length) ? gens[gens.length - 1].props.cells : this.props.cells,
			ruleList = this.props.ruleList,
			wildcardRegex = /A/g,
			matchRule = ( cells: string, idx = 0,): string => {
				const
          [stimulus, result] = ruleList[idx],
  				rxp = stimulus.replace(wildcardRegex, '.');
				if (cells.match(rxp)) {
					return result;
				}
				return matchRule(cells, idx + 1);
			};

  	do {
      let
        cells: string[] = lastCells.split(''),
			  newCells: string[] = [];

		  [...this.stimulusIterator(cells, ordinal)].map((s): void => { newCells.push(matchRule(s)); });
		  ordinal = yield newCells.join('');
	  }
	  while (true);
	}
  componentDidMount() {
    this.groundElm.setAttribute('style', 'width: ' + ((this.props.cells.length * 12) + 1) + 'px');
  }
  componentDidUpdate(prevProps: Readonly<IGround>, prevState: Readonly<IGroundState>) {
		if ((!prevProps.running) && this.props.running) {
      const automatonType = this.props.automatonType;
      this.count = 0
      this.stimulusIterator = (automatonType === 'diadic')
        ? Ground.diadicStimulusIterator
        : Ground.triadicStimulusIterator;
      Ground.buildGenerationBase(automatonType);
			this.cycle();
		}
	}
	cycle = (): void => {
		const steps = this.props.steps,
			running = this.props.running,
			generations = this.state.generations,
			generator = this.generate(generations.length);

		let ordinal = generations.length;

		if (running) {
			const newCells = generator.next(ordinal);
			const nextGeneration: JSX.Element =
				React.cloneElement(Ground.generationBase, { key: ordinal, ordinal: ordinal, cells: newCells.value });
			generations.push(nextGeneration);
			this.setState(
				{ generations: generations },
				() => { window.setTimeout(this.cycle, 0) }
			);

			this.count += 1;
			if ((this.count % steps) === 0) {
				this.props.onRunEnd();
			}
		}
	}
	handleFirstGenerationChange = (newCells: string): void => {
    this.props.onFirstGenerationChange(newCells);
  }
  render() {
    return (
      <div ref={(div) => this.groundElm = div} className="ground">
        {this.state.generations}
      </div>
    );
  }
}
