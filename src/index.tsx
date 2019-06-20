import * as React from "react";
import * as ReactDOM from "react-dom";
import { ColourChoiceControls } from "./components/ColourChoiceControls";
import { Automaton } from "./components/Automaton";
import { Colours } from "./components/Models";

const
  colourChoice = document.getElementById('colour-choice'),
  style = document.createElement('style');
let styles = '';
Object.keys(Colours).map((k) => { styles += '.' + k + '{background-color:' + Colours[k] + '}\n'; });
style.setAttribute('type', 'text/css');
style.innerHTML = styles;
document.head.appendChild(style);

// (function handleAutomatonTypeChange(newtype: AutomatonType) {
//     console.log('index.tsx: handleAutomatonTypeChange: ' + newtype);  ReactDOM.render(
//     <Automaton automatonType={newtype} onAutomatonTypeChange={handleAutomatonTypeChange} />,
//     document.getElementById('automaton')
//   );
// })('diadic');

ReactDOM.render(<Automaton />, document.getElementById('automaton'));

ReactDOM.render(<ColourChoiceControls target={colourChoice} handleChoice={null} />, colourChoice);
