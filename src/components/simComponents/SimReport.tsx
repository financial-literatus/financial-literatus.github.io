import { QuestionCircleOutlined } from "@ant-design/icons";
import { ResponsivePie } from "@nivo/pie"
import { Divider, Tooltip } from "antd";
import JobsList from "../../assets/JobList.json";
import { useTypedSelector } from "../../reducers";
import JobListElement from "../../types/jobListElement";
import { IPieChartData} from "../../types/simulationType";

import NumberFormat from "react-number-format";
import { IKeyFieldData } from "../../types/fieldData";

/**
 * This method renders a pie chart
 * @returns JSX.Element that represents a pie chart for simulation
 */
export default function SimReport(): JSX.Element {
    // const dispatch = useDispatch();
    const pieChart = useTypedSelector(state=> state.simulation.InitialNivoPieChartDataArray);

    const NewNivoPieChartDataArray:IPieChartData[] = new Array<IPieChartData>();

    // category
    const job = useTypedSelector(state => state.simulation.job) || undefined;
    const housing_type= useTypedSelector(state => state.simulation.housing.description) || undefined;
    const transportation = useTypedSelector(state => state.simulation.transportation.description) || undefined;
    const health = useTypedSelector(state=> state.simulation.health.description) || undefined;
    const mischellaneous = useTypedSelector(state => state.simulation.mischellaneous);

    // earnings and expenses
    const job_earning = parseInt(findSelectedJobWage(JobsList, job)) || 0;

    // since we collect expenses data for a month, we will multiply by 12 
    // to estimate the yearly expenses
    const housing_expense = 12*useTypedSelector(state => state.simulation.housing.expense) || 0;
    const transportation_expense = 12*useTypedSelector(state => state.simulation.transportation.expense) || 0;
    const health_expense = 12*useTypedSelector(state => state.simulation.health.expense) || 0;
    
    /**
     * calculates the array of expenses from mischellaneous
     * @param _input Array<MischellaneousProps>
     * @returns number - total mischellaneous expense
     */
    function calculateTotalMiscExpense(_input: Array<IKeyFieldData>): number {
        let total = 0;
        
        const temp:number[] = [];

        _input.forEach(item => item != null && temp.push(12*item.expense));
    
        if (!isEmpty(temp)) {
            total = temp.reduce((first, second) => {return first + second});
        }

        return total;
    }
    
    const totalMiscExpense = (mischellaneous !== undefined && !isEmpty(mischellaneous))? calculateTotalMiscExpense(mischellaneous) : 0;

    /**
     * This method finds a wage of the target job 
     * @param JobList Array<JobListElement>
     * @param target string 
     * @returns the wage
     */
    function findSelectedJobWage(JobList: Array<JobListElement>, target: string | undefined): string {
        return JobList.find((job) => job.value === target)?.average_wage || "Target is not found!";
    }
    
    /**
     * This method checks if the new chart data is empty
     * @param array IPieChartData[]
     * @returns true if the array is empty; otherwise, false
     */
    function isEmpty(array: Array<any>): boolean {
        return array.length === 0;
    }

    /**
     * This method calculate the remaining income amount
     * @param income number
     * @param expenses number[]
     * @returns remaining income
     */
    function calculateBalance(
        income:number, 
        ...expenses: number[]): number {
        // calculate the remaining income
        return income-(expenses.reduce((total, next) => total+next,0));
    }

    let remainingIncome = 0
    
    //console.log("job earing", job_earning)
    if (job_earning !== 0) {
        remainingIncome = calculateBalance(
            job_earning, 
            housing_expense, 
            transportation_expense,
            health_expense, 
            totalMiscExpense,
        )
    }

    /**
     * This method adds mischellaneous data to Pie Chart 
     * @param item MischellaneousProps
     */
     function addToChart(item: IKeyFieldData): void {
        const id = item.description || "None";
        const value = 12* item.expense || 0;
        const color = "#ef3b2c";
        NewNivoPieChartDataArray.push({"id": id, "value": value, "color": color});
    }

    // if statements check whether the user has selected each category and 
    // add the data for the pie chart after each category data is updated

    if (job !== undefined) {
        NewNivoPieChartDataArray.push({ "id": "Savings", "value": remainingIncome, "color": "#00bb77"});
    }

    if (housing_type !== undefined) {
        NewNivoPieChartDataArray.push({ "id": housing_type, "value": housing_expense, "color": "#ff2f50"});
    }
    if (transportation !== undefined) {
        NewNivoPieChartDataArray.push({ "id": transportation, "value": transportation_expense, "color": "#d73027"});
    } 

    if (health !== undefined) {
        NewNivoPieChartDataArray.push({ "id": health, "value": health_expense, "color": "#fdae61"});
    }
    
    if (mischellaneous !== undefined) {
        mischellaneous.forEach((item) => item != null && addToChart(item));
    }

    // make sure parent container have a defined height when using
    // responsive component, otherwise height will be 0 and
    // no chart will be rendered.
    // website examples showcase many properties,
    // you'll often use just a few of them.

    // don't delete yet! debugging purpose :)
    // console.log("selected_job", job)
    // console.log("selected housing", housing_type)
    // console.log("sselected_transportation", transportation)
    // console.log("selected misc", mischellaneous)
    // console.log("is new pie chart array empty", isEmpty(NewNivoPieChartDataArray))
    // console.log("new pie chart array data", JSON.stringify(NewNivoPieChartDataArray));
    // console.log("housing expense: ", housing_expense)
    // console.log("commute expense: ", transportation_expense)
    // console.log("health expense: ", health_expense);
    // console.log("total misc expense ", totalMiscExpense);

  // get expenses
  let totalExpense = 0;

  // find total expense
  totalExpense += housing_expense + transportation_expense + health_expense + totalMiscExpense;

  /**
   * This method shows a list of saving areas from Essentials and other categories session
   * 
   * @returns JSX.Element that represents a list
   */
  function findPotentialSavingAreas(value: IKeyFieldData[]) {
    const tempValue = value.filter((item) => checkExpense(item))
    .map((item: IKeyFieldData) => (
    <li>{item.description}</li>
    ))
    if ( tempValue.length === 0 )
        return "-"    
    return tempValue
  }

  /**
   * This method checks whether expense is greater than 100 bucks. 
   * This is a simple way to check for potential savings if the user
   * spends more than an average person (who is knowledgeable about 
   * budget) does. 
   * 
   * *** Future vision ***
   * find a dataset of people who spend their money wisely and 
   * compare that data with the user data to suggest potential 
   * saving areas more efficiently.
   * 
   * @param item MischellaneousProps
   * @returns true if validateMessages greater tham 100 bucks; otherwise, false.
   */
  function checkExpense(item: IKeyFieldData) {
    return item?.expense > 100;
  }

    return (
        <div>
            <h2 className="Sim-Summary-Heading">Report</h2> 
            <div className="Sim-Pie-Chart">
                <ResponsivePie
                    valueFormat=">$,"
                    data={ isEmpty(NewNivoPieChartDataArray)? pieChart: NewNivoPieChartDataArray}
                    margin={{ top: 20, right: 20, bottom: 30, left: 5 }}
                    innerRadius={0.6}
                    padAngle={0.7}
                    cornerRadius={4}
                    colors={{ datum: "data.color"}}
                    activeOuterRadiusOffset={8}
                    enableArcLinkLabels={false}
                    />
                <div className="SavingExpenseLabel">Saving and Expense Chart</div>
            </div>
            <div className="Sim-Balance">
                <Divider  orientation="left" plain><h3>Data</h3></Divider>
                <div className="Sim-Balance-Data">
                    <p className="Sim-Balance-text">Selected job - {job || "Nothing is selected"}</p>
                    <p className="Sim-Balance-text">Annual income - <NumberFormat value={job_earning} displayType={"text"} thousandSeparator={true} prefix={"$"}/></p>
                    <p className="Sim-Balance-text">Monthly expenses - <NumberFormat value={Math.floor(totalExpense/12)} displayType={"text"} thousandSeparator={true} prefix={"$"}/></p>
                    <p className="Sim-Balance-text">Annual savings - <span style={{color: remainingIncome >=0 ? "black": "red"}}><NumberFormat value={remainingIncome} displayType={"text"} thousandSeparator={true} prefix={"$"}/></span></p>
                </div> 
                <Divider  orientation="left" plain>
                    <h3>
                        <Tooltip
                            placement="rightTop"
                            title="Sections where monthly expenses are spent over
                            $100 for other categories will appear in this potential saving areas. 
                            (We can also let the user to set a limitation for which money is spent 
                            for those categories)."    
                        > Potential saving areas <QuestionCircleOutlined/> </Tooltip>
                    </h3>
                </Divider>
                <div className="Sim-Balance-Data">
                    {mischellaneous !== undefined && findPotentialSavingAreas(mischellaneous)}
                </div>
            </div> 
        </div>
    )
}