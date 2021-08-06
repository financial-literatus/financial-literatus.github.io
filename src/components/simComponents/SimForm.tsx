import { ArrowUpOutlined, ClearOutlined, QuestionCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { BackTop, Button, Form, message, Space, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { clear, selectHousing, setMischellaneous, save, selectCommuteMode, selectJob, selectHealth} from "../../actions/simulationActions";
import { Health } from "../formSubComponents/health";
import { Housing } from "../formSubComponents/housing";
import { Mischellaneous } from "../formSubComponents/miscellaneous";
import { Occupation } from "../formSubComponents/occupation";
import { Transportation } from "../formSubComponents/transportation";

export interface FormFieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
}

export interface CustomizedSimulationProps {
    //onChange: (fields: FormFieldData[]) => void;
    fields: FormFieldData[];
}

// form input fields validation
const validateMessages = {
    required: "${label} is required!",
    types: {
        number: "${label} is not a valid number!"
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
}

/**
 * 
 * @returns JSX.Element that represents a form
 */
export const SimulationForm: React.FC<CustomizedSimulationProps> = ({fields}): JSX.Element => {
    const dispatch = useDispatch();
    const [form] = Form.useForm(); 

    // console.log("Fields value: ", JSON.stringify(form.getFieldsValue(true)));
    // console.log("is Mischellaneous Field touched? ", form.isFieldTouched("Mischellaneous"));
    // console.log("is Occupation Field touched? ", form.isFieldTouched("occupation"));

    const onClear = () => {
        dispatch(clear());
        form.resetFields();
        message.success("File successfully deleted");
    };

    /**
     * This method saves the user input into local storage.
     * (wants to display error message when the user left empty fields)
     * @param values any
     */
    const onFinish = (values: any) => {
        try {
            dispatch(save());
            message.success("File successfully saved");
        } catch (error) {
            message.error("File save failed");
        }
    };
    

    return (
        <div>
            <h2 className="Lifestyle-title">
                <Tooltip 
                    placement="rightTop"
                    title="Fill out the form below to help you choose lifestyle options"
                >
                    Lifestyle Simulation <QuestionCircleOutlined/>
                </Tooltip>
            </h2>
            <Form 
                name="simulation_global_state"
                form={form}  
                onFinish={onFinish} 
                fields={fields}
                onFieldsChange={(_, allFields) => {
                    //onChange(allFields);
                    console.log("all Fields changes:", JSON.stringify(allFields));
                }}
                onValuesChange={(_, allValues) => {
                    //console.log("all values:", JSON.stringify(allValues));
                    //console.log("mischellaneous data: ", JSON.stringify(allValues["Mischellaneous"]));
                    //console.log("housing data: ", JSON.stringify(allValues["housing"]));
                    dispatch(selectJob(allValues["Occupation"]));
                    dispatch(selectHousing(allValues["Housing"]));
                    dispatch(selectCommuteMode(allValues["Transportation"]));
                    dispatch(setMischellaneous(allValues["Mischellaneous"]));
                    dispatch(selectHealth(allValues["Health"]));
                    //console.log("commute:", JSON.stringify(allValues["transportation"]))
                }}
                validateMessages={validateMessages}
            >
                <div  className = "Form-Components">
                    <Form.Item name="Occupation" rules={[{required: true}]}>
                        <Occupation onChange={onchange} value="sim-job"/>
                    </Form.Item>
                </div>

                <div className = "Form-Components">
                    <Form.Item name="Housing">
                        <Housing onChange={onchange} value="housing"/>
                    </Form.Item>
                </div>
                
                <div className = "Form-Components">
                    <Form.Item name = "Transportation">
                        <Transportation onChange={onchange} value="commute"/>
                    </Form.Item>
                </div>

                <div className = "Form-Components">
                    <Form.Item name="Health">
                        <Health onChange={onchange} value="health"/>
                    </Form.Item>
                </div>

                <div className = "Form-Components">
                    <Mischellaneous/>
                </div>
                
                <BackTop>
                    <ArrowUpOutlined/>
                </BackTop>
                <div className="Sim-buttons">
                    <Space direction="horizontal" style={{float: "right", margin: 8}}>
                        <Form.Item className="Save-Button">
                            <Tooltip title="All simulation data will be saved on local storage" color={"blue"} key={"blue"}>
                                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} shape="round">
                                    Save
                                </Button>
                            </Tooltip>
                        </Form.Item>

                        <Form.Item className="Reset-Button">
                            <Tooltip title="All simulation data will be discarded" color={"red"} key={"red"}>
                                <Button type="primary" htmlType="button" onClick={onClear} danger icon={<ClearOutlined />} shape="round">
                                    Reset
                                </Button>
                            </Tooltip>
                        </Form.Item>
                    </Space>
                    </div>
            </Form>
        </div>
    );
}