import { Select, Col, InputNumber, Row, Slider, Tooltip, Input, Divider} from "antd";
import * as React from "react";
import {
  setCommuteExpense,
  updateHelperContent,
} from "../../actions/simulationActions";
import { useTypedSelector } from "../../reducers/index";
import { TransportationOptions } from "../../helpers/FormOptions";
import { useDispatch } from "react-redux";
// import Select from "react-select";
import { inputNumberFormat, inputNumberParser } from "./regex";
import CommuteHelperList from "../../assets/CommuteHelperList.json";
import { PlusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import TransportationIcon from "../../assets/icons/transportation.svg";


/**
 * This method will be called for all transportation options except for car.
 * 
 * @returns a JSX Element that represents a question and an inbox to enter transportation cost
 */
function AskOtherTransport() {
    const dispatch = useDispatch();

    // user transportation expense
    const expense = useTypedSelector(state => state.simulation.transportation.expense);

    return (
        <div>           
            <label>Enter amount for selected transportation mode: </label>
            <Row>
                <Col span={6}>
                    <Slider 
                        min={0} 
                        max={9999} 
                        value={expense}
                        onChange={(event) => {
                            if (event != null) {
                                dispatch(setCommuteExpense(event))
                            }
                        }}
                    />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={0}
                        max={99999}
                        formatter={value => `$ ${value}`.replace(inputNumberFormat, ",")}
                        parser={value => value !== undefined? parseInt(value.replace(inputNumberParser, "")): 0}
                        style={{ margin: "0 16px" }}
                        value={useTypedSelector(state => state.simulation.transportation.expense)}
                        onChange={(event) => {
                            if (event != null) {
                                dispatch(setCommuteExpense(event))
                            }
                        }}
                    />
                </Col>
            </Row>
        </div>
    )
}

function RenderConditionally(value: string): JSX.Element | null {
    console.log("Transportation selected value: ", value);
    if (value != "None") {
        return <AskOtherTransport/>
    }
        return null;
}

interface CommuteProps {
    onChange: any,
    value: string,
}

// Option componect from Ant Select
const { Option } = Select;
let index = 0;

/**
 * 
 * @returns JSX.Element that represents a question form 
 */
export const Transportation:React.FC<CommuteProps> = ({onChange, value}) => {
    const dispatch = useDispatch();

    // selected transportation option
    const selectedOption:string = useTypedSelector(state => state.simulation.transportation.value) || "None";

    // description for transportation assistant
    const message = "If you want to know how to calculate your commuting costs, make sure to read the article "
    + "from the Balance below.";

    // content of transportation for sim helper
    const transportationContent = {
        description: {
            message: message,
            img: TransportationIcon,
        },
        links: CommuteHelperList
    }

    // get label key values
    const labels = TransportationOptions.map(obj => obj.label);
    
    const [optionState, setOptionState] = React.useState({
        items: labels,
        name: {
            label: "",
            value: "other"
        }
    })

    function onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {items} = optionState;
        setOptionState({
            items: items,
            name: {
                label: event.target.value,
                value: "other"
            }
        })
    }

    function addItem() {
        const {items, name} = optionState;
        setOptionState({
            items: [...items, name.label || `New item ${index++}`],
            name: {
                label: "",
                value: "other"
            },
        })
    }

    return (
        <div onClick={() => dispatch(updateHelperContent(transportationContent))}>
            <h2>
                <Tooltip 
                    placement="rightTop"
                    title="Transportation is another important area where our budget
                    are used. You can learn more details about commuting cost and other
                    interesting article by clicking on this section."
                >
                    Transportation <QuestionCircleOutlined/>
                </Tooltip>
            </h2>
            <p>Select a transportation option below </p>
            <Select 
                allowClear  
                placeholder={"Choose a transportation"}
                style={{ width: 200 }}
                onChange={onChange}
                value={value}
                dropdownRender={menu => (
                    <div>
                        {menu}
                        <Divider style={{ margin: "4px 0" }} />
                        <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
                            <Input style={{ flex: "auto" }} value={optionState.name.label} onChange={onNameChange} />
                            <a
                                style={{ flex: "none", padding: "8px", display: "block", cursor: "pointer" }}
                                onClick={addItem}
                            >
                                <PlusCircleOutlined /> Add item
                            </a>
                        </div>
                    </div>
                    )}
            >
                {optionState.items.map((item) => (
                    <Option key={item} value={item}>{item}</Option>
                ))}
            </Select>
            {RenderConditionally(selectedOption)}
        </div>
    )
};
