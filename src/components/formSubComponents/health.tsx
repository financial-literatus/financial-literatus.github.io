import { PlusCircleOutlined} from "@ant-design/icons";
import { Divider, Form, Input, InputNumber, Select } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { updateHelperContent } from "../../actions/simulationActions";
import { inputNumberFormat, inputNumberParser } from "./regex";
import "../../style/Form.css";
import { IHelperContentElement } from "../../types/helperContentElement";
import HealthHelperList from "../../assets/HealthHelperList.json";
import MedicalIcon from "../../assets/icons/medical.svg";
import { HealthOptions } from "../../constants/FormOptions";
import { healthTooltip } from "../../constants/Tooltips";
import { HealthMessage } from "../../constants/SimHelperContent";
import { IFormItemProps } from "../../types/simulationType";


// Option componect from Ant Select
const { Option } = Select;
let index = 0;


/**
 * This is a sub-component that represents Health
 * @returns JSX.Element that represents a question and a dropdown
 */
export const Health:React.FC<IFormItemProps> = ({name, inputValue, handleChange}):JSX.Element => {

    const dispatch = useDispatch();

    // content for health resources
    const healthContent: IHelperContentElement = {
        description: {
            message: HealthMessage,
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
            <Form.Item
                label={name}
                tooltip= {healthTooltip}
                name={[name, "description"]}   
            >
                <Select
                    style={{ width: 200 }}
                    placeholder="Select a housing option"
                    onChange={handleChange}
                    dropdownRender={menu => (
                    <div>
                        {menu}
                        <Divider style={{ margin: "4px 0" }} />
                        <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
                            <Input style={{ flex: "auto" }} value={optionState.name.label} onChange={onNameChange} />
                            <button
                                style={{ flex: "none", padding: "8px", display: "block", cursor: "pointer" }}
                                onClick={addItem}
                            >
                                <PlusCircleOutlined /> Add item
                            </button>
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
                    getFieldValue(name)?.description !== undefined ? (
                        <Form.Item 
                            name={[name, "inputValue"]}
                            label="Expense"
                        >
                            <InputNumber
                                min={0}
                                max={9999}
                                formatter={value => `$ ${value}`.replace(inputNumberFormat, ",")}
                                parser={value => value !== undefined? parseInt(value.replace(inputNumberParser, "")): 0}
                                style={{ margin: "0 16px" }}
                                value={inputValue || undefined}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    ): null
                }
            </Form.Item>
        </div>
    )
};
