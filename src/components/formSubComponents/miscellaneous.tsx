import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Space, InputNumber, Tooltip } from "antd";
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import { inputNumberFormat, inputNumberParser } from "./regex";
import { useDispatch } from "react-redux";
import { updateHelperContent } from "../../actions/simulationActions";
import { IHelperContentElement } from "../../types/helperContentElement";
import MiscHelperList from "../../assets/MiscHelperList.json";
import Categories from "../../assets/icons/categories.svg";
import { useTypedSelector } from "../../reducers";

/**
 * 
 * @returns a JSX.Element that represents a form list
 */
export const Mischellaneous:React.FC = () => {
    const dispatch = useDispatch();

    // description for essentials and other categories
    const message = "Other categories such as food, entertainment, online shopping and etc. can relatively "
    + "drain your wallet. Check out the following links to learn more about those costs."
    
    // misc state
    const miscState = useTypedSelector(state=>state.simulation.mischellaneous); 

    // content for mischellaneous
    const miscContent: IHelperContentElement = {
        description: {
            message: message,
            img: Categories
        },
        links: MiscHelperList,
    }
    
    return (
        <div onClick={() => dispatch(updateHelperContent(miscContent))}>
            <h2>
                <Tooltip
                    placement="rightTop"
                    title="Here you can enter other expenses that we did not cover
                    in our form above.">
                    Essentials and Other Categories <QuestionCircleOutlined/>
                </Tooltip>
            </h2>
            <Form.List name="Mischellaneous">
                {(fields, { add, remove }) => {
                    console.log("Mischellaneous fields:", JSON.stringify(fields));
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
                                    name={[name, "expense"]}
                                    fieldKey={[fieldKey, "expense"]}
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
        </div>
    );
};
