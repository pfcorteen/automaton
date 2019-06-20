import * as React from "react";
import { Automaton } from "./Automaton"
import { Cookies } from "../utils/Cookies";
import { IConfiguration, IConfigControl, IConfigState } from "./Models";

export class ConfigurationControls extends React.PureComponent<IConfigControl, IConfigState> {
  input: HTMLInputElement;
  populateDataList = (): void => {
    let keys = Cookies.keys(),
        options = [ <option key={0} value={"Wolfram Primes"}>Wolfram Primes</option>,
                    <option key={1} value={"Diadic default"}>Diadic default</option>,
                    <option key={2} value={"Triadic default"}>Triadic default</option>
                  ];
    for (let idx = 0; idx < keys.length; idx += 1){
      const k = keys[idx];
      options.push(<option key={idx + 3} value={ k }>{ k }</option>);
    }
    this.setState({ options: options });
  }
  componentWillReceiveProps = (nextProps: IConfigControl, nextState: IConfigState) => {
    this.populateDataList();
  }
  componentWillMount = () => {
    this.populateDataList();
  }
  componentDidUpdate = (prevProps: IConfigControl, prevState: IConfigState) => {
    this.input.value = this.props.selectedConfigName;
  }
  componentDidMount = () => {
    this.input.value = this.props.selectedConfigName;
  }
  handleConfigSelection = (e: Event): void => {
    let configs: string[] = Cookies.keys(),
        config: IConfiguration,
        targetElm = e.target as HTMLInputElement,
        name = targetElm.value;
    if (name === 'Wolfram Primes') {
      config = JSON.parse(JSON.stringify(Automaton.WOLFRAM_PRIMES));
    } else if (name === 'Diadic default') {
      config = JSON.parse(JSON.stringify(Automaton.DIADIC_DEFAULT_STATE));
    } else if (name === 'Triadic default') {
      config = JSON.parse(JSON.stringify(Automaton.TRIADIC_DEFAULT_STATE));
    } else if (configs.indexOf(name) !== -1) {
      config = JSON.parse(Cookies.getItem(name)) as IConfiguration;
    }
    config && this.props.onConfigSelection(config);
  }
  handleSave = (): void => {
    let name = this.input.value;
    this.props.onSave(name);
  }
  handleRemove() {
    let name = this.input.value;
    this.props.onRemove(name);
  }
  render() {
    return (
      <div className="configurationControls">
      <div>Configuration Controls</div>
          <input type={"text"} name={"config"} ref={(ref) => this.input = ref} title={"Enter a new name to save or select a configuration name from the list to retrieve."}
                  list={"configList"} autoComplete={"on"} onChange={this.handleConfigSelection.bind(this)}>
          </input>
          <datalist id={"configList"}>
            {this.state.options}
          </datalist>
          <button onClick={this.handleSave.bind(this)}>Save</button>
          <button onClick={this.handleRemove.bind(this)}>Remove</button>
      </div>
    );
  }
}
