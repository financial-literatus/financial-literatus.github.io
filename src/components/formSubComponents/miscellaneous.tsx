import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Space, InputNumber} from "antd";
import { MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import { inputNumberFormat, inputNumberParser } from "./regex";
import { useDispatch } from "react-redux";
import { updateHelperContent } from "../../actions/simulationActions";
import { IHelperContentElement } from "../../types/helperContentElement";
import MiscHelperList from "../../assets/MiscHelperList.json";
import Categories from "../../assets/icons/categories.svg";
import { MiscMessage } from "../../constants/SimHelperContent";
import { miscTooltip } from "../../constants/Tooltips";

/**
 * 
 * @returns a JSX.Element that represents a form list
 */
export const Mischellaneous:React.FC = () => {
    const dispatch = useDispatch();

    // content for mischellaneous
    const miscContent: IHelperContentElement = {
        description: {
            message: MiscMessage,
            img: Categories
        },
        links: MiscHelperList,
    }
    
    return (
        <div onClick={() => dispatch(updateHelperContent(miscContent))}>
            <Form.Item
                label="Essentials and Other Categories"
                tooltip={miscTooltip}
            >
                <Form.List
                    name="Mischellaneous"
                >
                    {(fields, { add, remove }) => {
                        // console.log("Mischellaneous fields:", JSON.stringify(fields));
                        return (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, "description"]}
                                        fieldKey={[fieldKey, "description"]}
                                        rules={[{ required: true, message: "Missing description" }]}
                                    >
                                        <Input placeholder="Description"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "inputValue"]}
                                        fieldKey={[fieldKey, "inputValue"]}
                                        rules={[
                                            { required: true},
                                            { type: "number", min: 0, max: 9999} 
                                        ]}
                                    >
                                        <InputNumber 
                                            placeholder="Expense" 
                                            formatter={value => `$ ${value}`.replace(inputNumberFormat, ",")}
                                            parser={value => value !== undefined? parseInt(value.replace(inputNumberParser, "")): 0}
                                            style={{ margin: "0 16px" }}
                        
                                        />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}}
                </Form.List>
            </Form.Item>
        </div>
    );
};
