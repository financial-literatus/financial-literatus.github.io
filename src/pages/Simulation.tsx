import { SplitPane } from "react-collapse-pane";
import {resizerOptions} from "../assets/ResizerOptions";
import "../style/Simulation.css";
import SimReport from "../components/simComponents/SimReport";
import { SimulationForm } from "../components/simComponents/SimForm";
import { SimulationHelper } from "../components/simComponents/SimHelper";

/**
 * 
 * @returns a JSX.Element that represents the simulation page
 */
export default function Simulation(): JSX.Element {

    const initialSizes = [200, 300, 250]

    return (
        <div className="Simulation-Root">
            <SplitPane
                split="vertical"      
                initialSizes={initialSizes}
                resizerOptions={resizerOptions}
            >
                <div className="Sim-left">
                    <SimReport/>
                </div>
                
                <div className="Simulation-middle">
                    <SimulationForm fields={[{name: "nothing"}]}/>
                </div>

                <div className="Simulation-right">
                    <SimulationHelper/>
                </div>
            </SplitPane>
        </div>
    );
}

