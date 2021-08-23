import { AutoComplete, Form, Input} from "antd";
import { useDispatch } from "react-redux";
import {updateHelperContent } from "../../actions/simulationActions";
import JobsList from "../../assets/JobList.json";
import JobListElement from "../../types/jobListElement";
import OccupationHelperList from "../../assets/OccupationHelperList.json";
import SearchJob from "../../assets/icons/search-job.svg"
import { jobTooltip } from "../../constants/Tooltips";
import { JobMessage } from "../../constants/SimHelperContent";

interface SimJobProps {
  onJobChange: any,
  name: string,
}
/**
 * This is a react function component for occupation. 
 * @param props are question string and dispatch function
 * @returns a JSX Element that represents part of a form for asking user's occupation
 */
export const Occupation: React.FC<SimJobProps> = ({onJobChange, name}) => {

  const dispatch = useDispatch();

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
      required 
      tooltip = {jobTooltip}
      name={[name, "description"]}
    >
      <AutoComplete
        allowClear
        style={{ width: 200 }}
        options={JobsList.filter((job) => {if (job.average_wage !== "Unknown") return job }) as JobListElement[]}
        onChange={onJobChange}
        placeholder="Type your occupation here"
        filterOption={(inputValue, option) =>
          option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        notFoundContent="Data not found"
    />
    </Form.Item>
    <Form.Item
      noStyle
      shouldUpdate
    >
      {({getFieldValue}) =>
        getFieldValue(name)?.description !== undefined? (
          <Form.Item
            name={[name, "earnings"]}
            label="Job Earnings"
          >
            <Input/>
          </Form.Item>
        ): null
      }
    </Form.Item>
  </div>
  )
};
