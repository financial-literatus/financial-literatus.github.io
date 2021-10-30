import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../reducers";
import { updateDescription } from "../actions/showcaseActions";

import ReactHtmlParser from "react-html-parser";

import { MajorsGraph } from "./jobGraphsComponents/MajorsGraph";
import { SkillsGraph } from "./jobGraphsComponents/SkillsGraph";

import NumberFormat from "react-number-format";


/**
 * Job component. The right part of the showcase page. 
 * Includes job's name (label), average wage, description and graphs.
 * 
 * @returns a page that represents description of the job as a JSX element.
 */
export function Job(): JSX.Element {
  const dispatch = useDispatch();
  

  // Updatable elements
  const label = useTypedSelector((state) => state.showcase.label);
  const average_wage = useTypedSelector((state) => state.showcase.average_wage);
  const description = useTypedSelector((state) => state.showcase.description);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axios = require("axios");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cheerio = require("cheerio");

  useEffect(() => {
    updateJobDescription();

    /**
     * Updates the job description when invoked by new label of the job.
     */
    async function updateJobDescription() {
      // Obtain a new link
      const url = await getUrlByName();

      // Get data from the link
      const $ = await fetchURL(url);

      // Get the description part from the data
      let newDescription = $(".section-description").html();
      if (newDescription != null)
        newDescription = newDescription.replaceAll(
          // eslint-disable-next-line quotes
          'href="/',
          // eslint-disable-next-line quotes
          'href="https://datausa.io/'
        );

      // Set new description
      dispatch(updateDescription(newDescription));
    }


    /** 
     * Returns URL based on the current job label.
     *
     * @returns URL
     */
    async function getUrlByName() {
      let str = label;
        
      str = str.replaceAll(" &", "");
      str = str.replaceAll(",", "");
      str = str.replaceAll(" (Legacy)", "");
      str = str.replaceAll(" ", "-");
      str = str.replaceAll("/", "");
      str = str.toLowerCase();

      return "https://datausa.io/profile/soc/" + str;
    }

    /**
     * Obtains data from the given URL by sending a simple send request.
     *
     * @param URL
     * @returns Cherrio component with the page received
     */
    async function fetchURL(url: string) {
      const { data } = await axios.get(url);
      return cheerio.load(data);
    }
  });
  
  return (
    <div className="ContainerJob">
      <h1>{label}</h1>
      <h2>Average income (2019): <NumberFormat value={average_wage} displayType={"text"} thousandSeparator={true} prefix={"$"}/></h2>
      <h1 className="Description-title"> Description</h1>
      <div className="FirstRowContainer">
        <div className="Description">{ReactHtmlParser(description)}</div>
        <div className="MajorContainer">
          <MajorsGraph/>
        </div>
      </div>
      <SkillsGraph/>
        <h5 className="Job-data-source">All data source: <a href="https://datausa.io/" target="_blank">https://datausa.io/</a></h5>
    </div>
  );
}
