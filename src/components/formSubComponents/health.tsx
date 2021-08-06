import { PlusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Col, Divider, Form, Input, InputNumber, Row, Select, Slider, Tooltip } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { setHealthExpense, updateHelperContent } from "../../actions/simulationActions";
import { useTypedSelector } from "../../reducers/index";
import { inputNumberFormat, inputNumberParser } from "./regex";
import "../../style/Form.css";
import { IHelperContentElement } from "../../types/helperContentElement";
import HealthHelperList from "../../assets/HealthHelperList.json";
import MedicalIcon from "../../assets/icons/medical.svg";
import { HealthOptions } from "../../helpers/FormOptions";

/**
 * This method gets the user's health insurance expense info
 * 
 * @returns JSX.Element that represents a slider and input box for the user to enter expenses
 */
function AskAboutHealth() {
    const dispatch = useDispatch();

    // to keep track of the health expense state
    const expense = useTypedSelector(state=>state.simulation.health.expense);

    return (
        <div className="Render-Conditionally">
            <label>How much do you spend per month?</label>
            <Row>
                <Col span={6}>
                    <Slider 
                        min={0} 
                        max={9999} 
                        value={expense}
                        onChange={(event) => {
                            if (event != null) {
                                dispatch(setHealthExpense(event));
                            }
                        }}
                    />
                </Col>
                <Col span={4}>
                    <InputNumber
                        name="healthExpenseInput"
                        min={0}
                        max={99999}
                        formatter={value => `$ ${value}`.replace(inputNumberFormat, ",")}
                        parser={value => value !== undefined? parseInt(value.replace(inputNumberParser, "")): 0}
                        style={{ margin: "0 16px" }}
                        value={expense}
                        onChange={(event) => {
                            if (event != null) {
                                dispatch(setHealthExpense(event));
                            }
                        }}
                    />
                </Col>
            </Row>
        </div>
    );
}

/**
 * This method calls AskAboutHealth if conditions are met.
 * 
 * @param value string | undefined
 * @returns JSX.Element when the user has health insurance; otherwise, returns null
 */
function RenderConditionally(value: string | undefined) {
    if (value !== undefined) {
        return <AskAboutHealth />;
    }
        return null;
}

interface HealthProps {
    onChange: any,
    value: any,
}

// Option componect from Ant Select
const { Option } = Select;
let index = 0;


/**
 * This is a sub-component that represents Health
 * @returns JSX.Element that represents a question and a dropdown
 */
export const Health:React.FC<HealthProps> = ({onChange}) => {

    const dispatch = useDispatch();

    // health selected option
    const selectedOption: string | undefined = useTypedSelector(state=>state.simulation.health.description);

    // description for health assistant
    const message = "Refer to the links below to estimate your healthcare cost."

    // content for health resources
    const healthContent: IHelperContentElement = {
        description: {
            message: message,
            img: MedicalIcon,
        },
        links: HealthHelperList
    }

    // get label key values from HousingOptions.json
    const labels = HealthOptions.map(obj => obj.label);

    // initialize the option state
    const [optionState, setOptionState] = React.useState({
        items: labels,
        name: {
            label: "",
            value: "other"
        }
    })

    /**
     * This method listens for the user input change for custom dropdown
     * @param event React.ChangeEvent<HTMLInputElement>
     */
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

    /**
     * adds the user custom option into the optionState, but 
     * this does not update our HousingOpitions.json
     */
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
        
    return(
        <div onClick={() => dispatch(updateHelperContent(healthContent))}>
            <h2>
                <Tooltip 
                    placement="rightTop"
                    title="Health is also another main area that our budget
                    is spent. You can learn more information about health insurance
                    plans and cost by clicking on this section."
                >
                    Health <QuestionCircleOutlined/>
                </Tooltip>
            </h2>
            <p>Please enter or select a type of health care provider or insurance below</p>
                <Select
                    allowClear
                    style={{ width: 200 }}
                    placeholder="Select a option"
                    onChange={onChange}
                    value={selectedOption || undefined}
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
