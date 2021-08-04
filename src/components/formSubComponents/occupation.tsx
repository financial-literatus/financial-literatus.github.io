import { AutoComplete, Tooltip} from "antd";
import { useDispatch } from "react-redux";
import {updateHelperContent } from "../../actions/simulationActions";
import JobsList from "../../assets/JobList.json";
import JobListElement from "../../types/jobListElement";
import OccupationHelperList from "../../assets/OccupationHelperList.json";
import { QuestionCircleOutlined } from "@ant-design/icons";
import SearchJob from "../../assets/icons/search-job.svg"

interface SimJobProps {
  onChange: any,
  value: any,
}
/**
 * This is a react function component for occupation. 
 * @param props are question string and dispatch function
 * @returns a JSX Element that represents part of a form for asking user's occupation
 */
export const Occupation: React.FC<SimJobProps> = ({onChange, value, ...props}) => {

  const dispatch = useDispatch();

  const message = "Finding a career and choosing one that fits your needs " 
  + "and social life are not very easy tasks. To help you with your career goals, "
  + "we collected and displayed a few useful resources and public data from various sites below."

  // content inside simulation assistant for occupation
  const occupationContent = {
    description: {
      message: message,
      img: SearchJob,
    },
    links: OccupationHelperList,
  }

  return (
  <div onClick={() => dispatch(updateHelperContent(occupationContent))}>
      <h2>
        <Tooltip 
          title="Choosing one of the career options will generate job earnings.
          To learn details about a career, you can search it under the showcase 
          page. You can also click this section and simulation assistant will 
          give you links to resources, where our data are referenced from." 
          placement="rightTop"
        >
          Occupation <QuestionCircleOutlined/>
        </Tooltip>
      </h2>  
      <p>Select a career option below</p>
      <AutoComplete
        allowClear
        style={{ width: 200 }}
        options={JobsList.filter((job) => {if (job.average_wage != "Unknown") return job }) as JobListElement[]}
        onChange={onChange}
        value={value}
        placeholder="Type your occupation here"
        filterOption={(inputValue, option) =>
          option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        notFoundContent="Data not found"
      />
  </div>
  )
};
