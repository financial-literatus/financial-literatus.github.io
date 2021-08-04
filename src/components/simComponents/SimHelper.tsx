import { QuestionCircleOutlined } from "@ant-design/icons";
import { Divider, Space, Tooltip, Typography } from "antd"
import { useTypedSelector } from "../../reducers";

/**
 * 
 * @returns JSX.Element that represents a helper
 */
export const SimulationHelper: React.FC = (): JSX.Element => {

    // get contents from each form component
    const message = useTypedSelector(state=>state.simulation.helperContent.description.message);
    const flaticon = useTypedSelector(state=>state.simulation.helperContent.description.img);
    const links = useTypedSelector(state=>state.simulation.helperContent.links);

    return (
        <div className="Sim-Helper">
            <div className="Sim-Helper-Heading">
                <h2>
                    <Tooltip 
                        placement="rightTop" 
                        title="This is a simulation assistant, where you can find more 
                        information about expenses for each specific category.
                        Click on each section on the form to activate the simulation
                        assistant."
                    >
                        Simulation Assistant <QuestionCircleOutlined/>
                    </Tooltip>
                </h2>
            </div>
            <div className="Container-Helper-main">
                <div className="Sim-Helper-Icons">
                    <img className="flaticon" alt ="image" src={flaticon}></img>
                </div>
                <div className="Sim-Helper-Message">
                    <p>{message}</p>
                </div>
            
                <div>
                    <Divider orientation="left" plain><h3>Useful Sites</h3></Divider>
                    <div className="Sim-Helper-Cards">
                        <Space split={<Divider type="vertical"/>} wrap>
                            {links?.filter((item) => item.type==="site")
                            .map((item, index) => (
                                <Typography.Link key={index} href={item.url} target="_blank" rel="noreferrer noopener">{item.source}</Typography.Link>
                            )) || "-"
                            } 
                        </Space>    
                    </div>
                    <Divider  orientation="left" plain><h3>Articles</h3></Divider>
                    <div className="Sim-Helper-Cards">
                        <Space split={<Divider type="vertical"/>} wrap>
                            {links?.filter((item) => item.type==="article")
                            .map((item, index) => (
                                <Typography.Link key={index} href={item.url} target="_blank" rel="noreferrer noopener">{item.source}</Typography.Link>
                            )) || "-"
                            } 
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    )
}