import { ClearOutlined, QuestionCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, message, Space, Tooltip } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clear, updateHousing, updateMischellaneous, save, updateTransportation, updateJob, updateHealth} from "../../actions/simulationActions";
import { useTypedSelector } from "../../reducers";
import { IFormField } from "../../types/fieldData";
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

    // get each form component state
    const selectedJob: IFormField | undefined = useTypedSelector(state=>state.simulation.job);
    const selectedHouseOption: IFormField | undefined = useTypedSelector(state => state.simulation.housing);
    const selectedCommuteOption: IFormField | undefined = useTypedSelector(state => state.simulation.transportation);
    const selectedHealthOption: IFormField | undefined = useTypedSelector(state=>state.simulation.health);
    const selectedMisc:IFormField[] | undefined = useTypedSelector(state=>state.simulation.mischellaneous);

    useEffect(() => {
        form.setFieldsValue({
            Occupation: selectedJob,
            Housing: selectedHouseOption,
            Transportation: selectedCommuteOption,
            Health: selectedHealthOption,
            Mischellaneous: selectedMisc
        })
    }, [dispatch, form, selectedJob, selectedHouseOption, selectedCommuteOption, selectedHealthOption, selectedMisc]);

    /**
     * clear local storage and reset the form fields to initial states
     */
    const onClear = async () => {
        form.resetFields();
        dispatch(clear());
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

    /**
     * shows an error message when the user try to save an empty form
     * @param errorInfo 
     */
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
        message.error("File save Failed")
    }

    // listen to each form fiedl value change
    const handleChange = (value: any,) => {
        console.log("handle change: ", JSON.stringify(value));
    }

    // hanlde form field value change
    const handleValuesChange = (values: any) => {
        
        if (form.isFieldTouched("Occupation")) {
            dispatch(updateJob(values["Occupation"]));
        }
        
        if (form.isFieldTouched("Housing")) {
            dispatch(updateHousing(values["Housing"]));
            console.log("getFieldValue", form.getFieldValue("Housing"));
        }

        if (form.isFieldTouched("Transportation")) {
            dispatch(updateTransportation(values["Transportation"]));
        }

        if (form.isFieldTouched("Health")) {
            dispatch(updateHealth(values["Health"]));
        }

        if (form.isFieldTouched("Mischellaneous")) {
            dispatch(updateMischellaneous(values["Mischellaneous"]));
        }
    }

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
                layout="vertical"
                name="simulation_global_state"
                form={form}  
                fields={fields}
                onValuesChange={(_, allValues) => {
                    console.log("all values:", JSON.stringify(allValues));
                    handleValuesChange(allValues);
                }}
                validateMessages={validateMessages}
                onFinish={onFinish} 
                onFinishFailed={onFinishFailed}
            >
                <div  className = "Form-Components">
                    <Occupation onJobChange={handleChange} name="Occupation"/>
                </div>

                <div className = "Form-Components">
                    <Housing handleChange={handleChange} name="Housing" expense={selectedHouseOption?.expense}/>
                </div>
                
                <div className = "Form-Components">
                    <Transportation onChange={handleChange} name="Transportation" expense={selectedCommuteOption?.expense}/>
                </div>

                <div className = "Form-Components">
                    <Health onChange={handleChange} name="Health" expense={selectedHealthOption?.expense}/>
                </div>

                <div className = "Form-Components">
                    <Mischellaneous/>
                </div>
                
                <div className="Sim-buttons">
                    <Space direction="horizontal" style={{float: "right", margin: 8}}>
                        <Form.Item className="Save-Button">
                            <Tooltip title="All simulation data will be saved on local storage" color={"blue"} key={"blue"}>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    icon={<SaveOutlined />} 
                                    shape="round"
                                >
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