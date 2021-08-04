import { CheckOutlined, CloseOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Col, InputNumber, Row, Slider, Switch, Tooltip } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { setHealthExpense, setYesOrNo, updateHelperContent } from "../../actions/simulationActions";
import { useTypedSelector } from "../../reducers/index";
import { inputNumberFormat, inputNumberParser } from "./regex";
import "../../style/Form.css";
import { IHelperContentElement } from "../../types/helperContentElement";
import HealthHelperList from "../../assets/HealthHelperList.json";
import MedicalIcon from "../../assets/icons/medical.svg";

/**
 * This method gets the user's health insurance expense info
 * 
 * @returns JSX.Element that represents a slider and input box for the user to enter expenses
 */
function AskAboutHealth() {
    const dispatch = useDispatch();
    return (
        <div className="Render-Conditionally">
            <label>How much do you spend for {useTypedSelector(state => state.simulation.health.description)} per month?</label>
            <Row>
                <Col span={6}>
                    <Slider 
                        min={0} 
                        max={9999} 
                        value={useTypedSelector(state => state.simulation.health.expense)}
                        onChange={(event) => {
                            if (event != null) {
                                dispatch(setHealthExpense(event));
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
                        value={useTypedSelector(state => state.simulation.health.expense)}
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
 * @param value boolean
 * @returns JSX.Element when the user has health insurance; otherwise, returns null
 */
function RenderConditionally(value: boolean) {
  switch (value) {
    case true:
      return <AskAboutHealth/>;
    default:
      return null;
  }
}

interface HealthProps {
    onChange: any,
    value: any,
}

/**
 * 
 * @returns JSX.Element that represents a question and a switch button
 */
export const Health:React.FC<HealthProps> = () => {

    const dispatch = useDispatch();

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
            <p>Do you have health insurance?</p>
            <div>
                <Row>
                    {/** 
                     * need to make it resizable whenever the screen size is changed 
                     * need to make switch off when reset button is clicked.
                    */}
                    <Col span={5}>
                        <Switch 
                            checkedChildren={<CheckOutlined/>} 
                            unCheckedChildren={<CloseOutlined/>}
                            onClick={() => dispatch(setYesOrNo())}
                        />
                    </Col>
                </Row>
            </div>
            <div>
                {RenderConditionally(useTypedSelector(state => state.simulation.health.haveInsurance))}
            </div>
        </div>
    )
};
