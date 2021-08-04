import axios, { AxiosResponse } from "axios"
import { useTypedSelector } from "../../reducers";
import { useEffect } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { updateSkillsGraph } from "../../actions/showcaseActions";

import { GraphItemElement } from  "../../types/graphItemElement"
import { ResponsiveBar } from "@nivo/bar"
 

/**
 * Skill graph that represents top 10 skills for the job.
 * 
 * @returns a bar graph with top 10 skills and their values.
 */
export function SkillsGraph (): JSX.Element {
    const dispatch = useDispatch();
       
    const SkillsArray = useTypedSelector((state) => state.showcase.skills_array)
    const code = useTypedSelector((state) => state.showcase.job_code)

    useEffect(()=>{

        //Link with data needed to built the graph
        const url = `https://ruby.datausa.io/api/data?measure=LV%20Value,RCA&PUMS%20Occupation=${code}&drilldowns=Skill%20Element&parents=true`
        if (code != "0"){
            loadBubbleGraph(url)
        }
        interface SkillsJSON {
            data:   [
                {
                "ID Skill Element Group":    string;
                "Skill Element Group":       string;
                "ID Skill Element":          string;
                "Workforce Status":          string;
                "Skill Element":             string;
                "ID Year":                   number;
                "Year":                      string;
                "ID Major Occupation Group": string;
                "Major Occupation Group":    string;
                "ID Minor Occupation Group": string;
                "Minor Occupation Group":    string;
                "ID Broad Occupation":       string;
                "Broad Occupation":          string;
                "LV Value":                  number;
                "RCA":                       number;
                "PUMS Occupation":           string;
                "ID PUMS Occupation":        string;
                "Slug PUMS Occupation":      string;
                }
            ];
            source: {
                measures:      string[];
                annotations:   {
                    source_name:        string;
                    source_description: string;
                    dataset_name:       string;
                    dataset_link:       string;
                    subtopic:           string;
                    table_id:           string;
                    topic:              string;
                    hidden_measures:    string;
                };
                name:          string;
                substitutions: unknown[];
            };
        }    
    
        /**
         * Obtains data for the  graph based on the provided link.
         * 
         * @param url - link used to send get request and obtain data.
         */
        async function loadBubbleGraph(url: string){
            //Get data by sending a get request
            await axios.get(url).then((response: AxiosResponse<SkillsJSON>) => {
                let array: Array<GraphItemElement> = []
                let year = 0;
                let firstRun = true;
                // For each item in the list of recieved data push the data we need to 
                // the temporary bubble array
                for(let i = 0; i <= response.data.data.length; i++){
                    const result = response.data.data[i]
                    if (result != null) {
                     
                        if (firstRun == true){
                            year = result["ID Year"]
                            firstRun = false
                        }
                        if (result["ID Year"] == year){
                        const skill: string = result["Skill Element"];
                        const value: number = result["LV Value"]
                        const el: GraphItemElement = {
                            name: skill,
                            value: value*100
                        }
                        array.push(el)
                        }
                    } 
                }
                // Sort and slice temporary array of data elements
                if (array.length != 0){
                    array = array.sort((el1: GraphItemElement, el2: GraphItemElement) => sortByNumber(el1, el2))
                    array = array.slice(0,10)
                }
                else
                    array.push({ name: "No data provided",  value: 404})
            
                // Update the real array
                setTimeout(function(){ set(array) }, 500)
            })

            /**
             * A function that sets array of GraphItemElements to the graph
             * 
             * @param array - array of GraphItemElements
             */
            function set(array: Array<GraphItemElement>){            
                dispatch(updateSkillsGraph(array));
            }
        }

        function sortByNumber(el1: GraphItemElement, el2: GraphItemElement) {
            return (
            el2.value - el1.value
            );
        }
    })
  
    return (
        <div>
            <div className="Skills-chart-container">
            <ResponsiveBar
                data={SkillsArray}
                keys={["value"]}
                indexBy="name"
                layout="horizontal"
                margin={{ top: 50, right: 200, bottom: 50, left: 135 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={{ scheme: "nivo" }}
                defs={[
                    {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "#38bcb2",
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "#eed312",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
    
                borderColor={{ from: "color", modifiers: [ [ "darker", 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [ [ "darker", 1.6 ] ] }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: "left-to-right",
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
             />
            </div>
            <h2 className="Most-common-skills">Top 10 skills</h2>
        </div>
        ) 
}