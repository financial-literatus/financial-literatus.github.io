import { Job } from "../components/Job";
import { JobUnloaded } from "../components/JobUnloaded";


import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateLabel, updateWage, updateDescription, updateCode, updateJobVisibility } from "../actions/showcaseActions";

import { SplitPane } from "react-collapse-pane";
import { resizerOptions } from "../assets/ResizerOptions";
import { Menu, Slider, Divider } from "antd";

import "../style/Showcase.css";

import JobList from "../assets/JobList.json";
import JobListElement from "../types/jobListElement"
import { useTypedSelector } from "../reducers";

/**
 * Showcase page component.
 * 
 * @returns the enitre showcase page as a JSX.Element.
 */
export function Showcase(): JSX.Element {
  const dispatch = useDispatch();

  // A variable to keep track of job visibility
  const jobVisibility = useTypedSelector((state) => state.showcase.job_visibility)

  // A variable to keep track of changes in the label filter
  const [filterLabel, setFilterLabel] = useState("");

  // A variable to keep track of changes in the wage filter
  const [filterWage, setFilterWage] = useState(0);
  /**
   * Filters all jobs from the given list. 
   * Each job should be built with JobElement interface
   * 
   * @param JobList 
   * @returns the filtered list of jobs
   */
  function filterJobs(JobList: Array<JobListElement>) {
    return JobList.filter((job) => filterByUserInput(job))
      .sort((job1: JobListElement, job2: JobListElement) => sortByWage(job1, job2))
      .slice(0, 15)
      .map((job: JobListElement) => (
        <Menu.Item
          className="Job-button"
          onClick={() => updateJobDetails(job)}
          key={job.value}
          tabIndex={0}
        >
          {job.value}
        </Menu.Item>
      ));
  }

  /**
   * Check if the job fits the name filter.
   * 
   * @param job - the job to be checked
   * @returns true if job fits, false if job doesn't fit
   */
  function filterByUserInput(job: JobListElement) {
    if (
      job.value.toLowerCase().includes(filterLabel.toLowerCase()) &&
      parseFloat(job.average_wage) >= filterWage
    )
      return true;
    return false;
  }

  /**
   * Check if the job fits the user's preferences based by its average wage.
   * 
   * @param job - the job to be checked
   * @returns true if job fits, false if job doesn't fit
   */
  function sortByWage(job1: JobListElement, job2: JobListElement) {
    return (
      stringToNumber(job1.average_wage) - stringToNumber(job2.average_wage)
    );
  }

  /**
   * Converts a number inside a string to the float number rounded by 2 decimals.
   * 
   * @param str - string that represents a number
   * @returns  float number rounded by 2 decimals
   */
  function stringToNumber(str: string) {
    return Math.round(parseFloat(str) * 100) / 100;
  }

  /**
   * Update the detailes of the job based on the given job.
   * Given job should be built based on the JobElement interface.
   * 
   * @param job 
   */
  function updateJobDetails(job: JobListElement) {
    dispatch(updateLabel(job.value));
    dispatch(updateWage(stringToNumber(job.average_wage)));
    dispatch(updateDescription("<h1>Loading...</h1>"));
    dispatch(updateCode(job.code));
    dispatch(updateJobVisibility("loaded"));
  }

  function project(){
    switch(jobVisibility) {

      case "unloaded":  return <JobUnloaded/>
      case "loaded":  return <Job/>

      default:  return <h1>NO COMPONENT MATCH</h1>
    }
  }

  return (
    <div className="Body">
      <SplitPane
        split="vertical"
        initialSizes={[1, 3]}
        resizerOptions={resizerOptions}
      >
        <div className="Showcase-left">
          <div className="Showcase-left-up">
          <div className="LabelContainerFilter">
            <Divider className="Split" orientation="left">
              Name filter
            </Divider>
            <input
              className="LabelInput"
              type="text"
              autoComplete="off"
              name="filter"
              placeholder="Job name..."
              value={filterLabel}
              onChange={(event) => setFilterLabel(event.target.value)}
            ></input>
          </div>
          <div className="WageContainerFilter">
            <Divider className="Split" orientation="left">
              Wage filter ($)
            </Divider>
            <Slider
              min={0}
              max={200000}
              value={filterWage}
              onChange={(event) => setFilterWage(event)}
            />
          </div>
          </div>
          <Menu mode="inline" theme="light" className="Joblist">
            {filterJobs(JobList)}
          </Menu>
        </div>
        <div className="Showcase-right">
          <div>{ project() }</div>
        </div>
      </SplitPane>
    </div>
  );
}