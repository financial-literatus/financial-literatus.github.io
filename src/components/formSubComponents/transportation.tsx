import { Select, InputNumber, Input, Divider, Form} from "antd";
import * as React from "react";
import {
  updateHelperContent,
} from "../../actions/simulationActions";
import { TransportationOptions } from "../../constants/FormOptions";
import { useDispatch } from "react-redux";
import { inputNumberFormat, inputNumberParser } from "./regex";
import CommuteHelperList from "../../assets/CommuteHelperList.json";
import { PlusCircleOutlined } from "@ant-design/icons";
import TransportationIcon from "../../assets/icons/transportation.svg";
import { commuteTooltip } from "../../constants/Tooltips";
import { CommuteMessage } from "../../constants/SimHelperContent";

interface CommuteProps {
    onChange: any,
    name: string,
    expense: number
}

// Option componect from Ant Select
const { Option } = Select;
let index = 0;

/**
 * 
 * @returns JSX.Element that represents a question form 
 */
export const Transportation:React.FC<CommuteProps> = ({onChange, name, expense}) => {
    const dispatch = useDispatch();

    // content of transportation for sim helper
    const transportationContent = {
        description: {
            message: CommuteMessage,
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
            <Form.Item
                label={name}
                tooltip = {commuteTooltip}
                name={[name, "description"]}
            >
                <Select
                    placeholder="Select a transportation mode"
                    style={{ width: 200 }}
                    onChange={onChange}
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
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate
            >
                {({getFieldValue}) => 
                    getFieldValue("Transportation")?.description !== undefined ? (
                        <Form.Item 
                            name={[name, "expense"]}
                            label="Expense"
                        >
                            <InputNumber
                                min={0}
                                max={9999}
                                formatter={value => `$ ${value}`.replace(inputNumberFormat, ",")}
                                parser={value => value !== undefined? parseInt(value.replace(inputNumberParser, "")): 0}
                                style={{ margin: "0 16px" }}
                                value={expense}
                                onChange={onChange}
                            />
                        </Form.Item>
                    ): null
                }

            </Form.Item>

        </div>
    )
};
