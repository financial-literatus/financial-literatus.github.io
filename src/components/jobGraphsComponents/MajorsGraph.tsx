import axios, { AxiosResponse } from "axios"
import { useTypedSelector } from "../../reducers";
import { useEffect } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { updateMajorsGraph } from "../../actions/showcaseActions";

import { ResponsiveCirclePacking } from '@nivo/circle-packing'

import { GraphItemElement } from "../../types/graphItemElement";

/**
 * Majors graph that represents the most popular majors for specific job.
 * Bigger bubble - more popular major.
 * 
 * @returns a bubble graph of majors.
 */
export function MajorsGraph(): JSX.Element {
    const dispatch = useDispatch();
       
    const MajorsArray = useTypedSelector((state) => state.showcase.majors_array)
    const code = useTypedSelector((state) => state.showcase.job_code)
    
    useEffect(()=>{

        //Link with data needed to built the graph
        const url = `https://ruby.datausa.io/api/data?PUMS Occupation=${code}&drilldowns=CIP2&measures=Total Population,Total Population MOE Appx,yocpop RCA,Record%20Count&Record%20Count>=5&Workforce Status=true&Degree=21`

        if (code != "0"){
            loadBubbleGraph(url)
        }

        interface MajorsJSON {
            data:   [
                {
                "ID Year":                   number;
                "Year":                      string;
                "ID Workforce Status":       boolean;
                "Workforce Status":          string;
                "ID Degree":                 number;
                "Degree":                    string;
                "Total Population":          number;
                "Total Population MOE Appx": number;
                "yocpop RCA":                number;
                "Record Count":              number;
                "PUMS Occupation":           string;
                "ID PUMS Occupation":        string;
                "Slug PUMS Occupation":      string;
                "CIP2":                      string;
                "ID CIP2":                   string;
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
         * Obtains data for the bubble graph based on the provided link.
         * 
         * @param url - link used to send get request and obtain data.
         */
        async function loadBubbleGraph(url: string){
            //Get data by sending a get request
            await axios.get(url).then((response: AxiosResponse<MajorsJSON>) => {
                console.log(response.data.data.length)
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
                        const major: string = result["CIP2"];
                        const population: number = result["Total Population"]
                        const el: GraphItemElement = {
                            name: major,
                            value: population,
                        }
                        array.push(el)
                        }
                    } 
                }
                // Sort and slice temporary bubble array
                if (array.length != 0){
                    array = array.sort((el1: GraphItemElement, el2: GraphItemElement) => sortByNumber(el1, el2))
                    array = array.slice(0,10)
                }
                else
                    array.push({ name: "No data provided",  value: 404})
            
                // Update the real array
                set(array)
            })

            /**
             * A function that sets array of GraphItemElements to the graph
             * 
             * @param array - array of GraphItemElements
             */
            function set(array: Array<GraphItemElement>){            
                dispatch(updateMajorsGraph(array));
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
            <div className="Bubble-chart-container">
            <ResponsiveCirclePacking
                data={MajorsArray}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                id="name"
                colors={{ scheme: "spectral" }}
                colorBy="id"
                childColor={{ from: "color", modifiers: [ [ "brighter", 0.4 ] ] }}
                padding={1}
                leavesOnly={true}
                enableLabels={true}
                label="value"
                borderWidth={2}
                labelTextColor={{ from: "color", modifiers: [ [ "darker", 2.4 ] ] }}
                borderColor={{ from: "color", modifiers: [ [ "darker", 0.3 ] ] }}
                animate={true}
            />
            </div>
            <h2 className="Most-common-majors">Most common majors</h2>
        </div>
        ) 
}