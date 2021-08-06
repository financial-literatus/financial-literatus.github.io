import { Form, Col, InputNumber, Row, Slider, Select, Tooltip, Divider, Input} from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { setHousingExpense, updateHelperContent } from "../../actions/simulationActions";
import { HousingOptions } from "../../helpers/FormOptions";
import { useTypedSelector } from "../../reducers/index";
import { inputNumberFormat, inputNumberParser } from "./regex";
import HousingHelperList from "../../assets/HousingHelperList.json"
import "../../style/Form.css"
import { IHelperContentElement } from "../../types/helperContentElement";
import { PlusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import FindingHouse from "../../assets/icons/finding.svg";
/**
 * This method will be called when the user selects one of the housing options
 * 
 * @returns a JSX element that represents an additional question to get the user housing expense
 */
function AskAboutHousing(): JSX.Element {
    const dispatch = useDispatch();

    // to keep track of the housing expense state
    const expense = useTypedSelector(state=>state.simulation.housing.expense);

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
                            dispatch(setHousingExpense(event));
                        }
                    }}
                />
            </Col>
            <Col span={4}>
                <Form.Item>
                    <InputNumber
                        min={0}
                        max={9999}
                        formatter={value => `$ ${value}`.replace(inputNumberFormat, ",")}
                        parser={value => value !== undefined? parseInt(value.replace(inputNumberParser, "")): 0}
                        style={{ margin: "0 16px" }}
                        value={expense}
                        onChange={(event) => {
                            if (event != null) {
                                dispatch(setHousingExpense(event));
                            }
                        }}
                    />
                </Form.Item>
            </Col>
        </Row>
        </div>
    );
}

/**
 * This method checks the optionId to render different components
 * @param value string | undefined
 * @returns JSX Element or null
 */
function RenderConditionally(value: string | undefined) {
    if (value !== undefined) {
        return <AskAboutHousing />;
    }
        return null;
}

interface HousingProps {
    onChange: any,
    value: any,
}

// Option componect from Ant Select
const { Option } = Select;
let index = 0;

/**
 * This is a sub-component that represents Housing
 * @returns a JSX Element that represents a question and a dropdown 
 */

export const Housing:React.FC<HousingProps> = ({onChange, value}): JSX.Element => {
    const dispatch = useDispatch();

    // housing selected option
    const selectedOption:string | undefined = useTypedSelector(state => state.simulation.housing.description);

    // description for housing
    const message = "Planning to buy a house or rent with a roommate? Whatever you are doing, the below "
    + " are a few places you might want to look at first."

    // content of housing for sim helper
    const housingContent:IHelperContentElement = {
        description: {
            message: message,
            img: FindingHouse
        },
        links: HousingHelperList
    }

    // get label key values from HousingOptions.json
    const labels = HousingOptions.map(obj => obj.label);

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

    return (
        <div onClick={() => dispatch(updateHelperContent(housingContent))}>
            <h2>
                <Tooltip 
                    placement="rightTop"
                    title="Housing is one of the key area where we think is the most of 
                    the budget is spent. You can learn more information about housing 
                    prices, rent prices and mortage by clicking on this section.">
                    Housing <QuestionCircleOutlined/>
                </Tooltip>
            </h2>
            <p>Select a housing option below </p>
            <Select
                allowClear
                style={{ width: 200 }}
                placeholder="Select a housing option"
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