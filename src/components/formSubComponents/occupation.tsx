import { AutoComplete, Form, InputNumber} from "antd";
import { useDispatch } from "react-redux";
import {updateHelperContent } from "../../actions/simulationActions";
import JobsList from "../../assets/JobList.json";
import JobListElement from "../../types/jobListElement";
import OccupationHelperList from "../../assets/OccupationHelperList.json";
import SearchJob from "../../assets/icons/search-job.svg"
import { jobTooltip } from "../../constants/Tooltips";
import { JobMessage } from "../../constants/SimHelperContent";
import { inputNumberFormat, inputNumberParser } from "./regex";
import { IFormItemProps } from "../../types/simulationType";

/**
 * This is a react function component for occupation. 
 * @param props are question string and dispatch function
 * @returns a JSX Element that represents part of a form for asking user's occupation
 */
export const Occupation: React.FC<IFormItemProps> = ({name, inputValue, handleChange}) => {

  const dispatch = useDispatch();

  // unknown wage filtered list
  const filteredList = JobsList.filter((job) => job.average_wage !== "Unknown" && job) as JobListElement[];

  // content inside simulation assistant for occupation
  const occupationContent = {
    description: {
      message: JobMessage,
      img: SearchJob,
    },
    links: OccupationHelperList,
  }

  return (
  <div onClick={() => dispatch(updateHelperContent(occupationContent))}>
    <Form.Item
      label={name} 
      rules={[{required: true}]} 
      tooltip = {jobTooltip}
      name={[name, "description"]}
    >
      <AutoComplete
        allowClear
        style={{ width: 200 }}
        options={filteredList}
        onChange={handleChange}
        placeholder="Type your occupation here"
        filterOption={(inputValue, option) =>
          option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
    />
    </Form.Item>
    <Form.Item
      noStyle
      shouldUpdate
    >
      {({getFieldValue}) =>
        getFieldValue(name)?.description !== undefined && 
        filteredList.findIndex((job) => job.value === getFieldValue(name)?.description) === -1
        ? (
          <Form.Item
            name={[name, "inputValue"]}
            label="Job Earnings"
          >
            <InputNumber
              formatter={value => `$ ${value}`.replace(inputNumberFormat, ",")}
              parser={value => value !== undefined? parseInt(value.replace(inputNumberParser, "")): 0}
              style={{ margin: "0 16px" }}
              value={inputValue}
            />
          </Form.Item>
        ): null
      }
    </Form.Item>
  </div>
  )
};
