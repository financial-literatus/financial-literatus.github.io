
import { useTypedSelector } from "../reducers";
import { toggleSettingsVisibility } from "../actions/mainActions";
import { useDispatch } from "react-redux";

import { Drawer, Upload, Button, message } from "antd";
import { UploadOutlined, ExportOutlined, FireOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";

import { clear, loadFromLocalStorage } from "../actions/simulationActions";

import "../style/Settings.css";
import { updateCompletedArticles } from "../actions/educationActions";

/**
 * Settings element component.
 * 
 * @returns the enitre settings component as a JSX.Element.
 */
export function Settings(): JSX.Element {
    const dispatch = useDispatch();

    // Visibility of settings menu
    const settingsVisibility = useTypedSelector((state) => state.main.settings_open);

    /**
     * Closes the settings menu.
     * 
     */
    function onClose(){
      dispatch(toggleSettingsVisibility(false))
    }

    /**
     * Export all the content of the local storage to "settings.data"
     * coded as plain text in "utf-8" 
     * 
     */
    function exportLocalStorageToFile() {
        const data: string = JSON.stringify(localStorage)
        try {
            const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "settings.data");
            message.success("File successfully exported");
        } catch(error) {
            message.error("File export failed.");
        }
    }

    /**
     * Function that updates all reducers based on the localstorage content.
     * 
     */
    function updateReducers(){
      dispatch(loadFromLocalStorage())
    }

    const props = {
      name: "file",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-text",
      },

      // Using the right type (UploadChangeParam<UploadFile<Blob>>) breaks the code 
      onChange(info: any) {

        //When the file is uploaded
        if (info.file.status === "done") {
          const reader = new FileReader();
          reader.readAsText(info.fileList[0].originFileObj, "utf-8");
          reader.onload = function (evt) {
              try {
                const str = evt.target?.result?.toString() ?? ""
                const data = JSON.parse(str);
                Object.keys(data).forEach(function (k) {
                    localStorage.setItem(k, data[k]);
                });
                updateReducers()
                message.success(`${info.file.name} imported successfully`);
              } catch(error){
                message.error(`${info.file.name} file upload failed.`);
              }
          }
          reader.onerror = function () {
            message.error(`${info.file.name} file upload failed.`);
          }
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      progress: {
        strokeColor: {
          "0%": "#108ee9",
          "100%": "#87d068",
        },
        strokeWidth: 3,
        format: (percent: number | undefined) => { 
          if (typeof percent !== "undefined") 
          return `${ parseFloat(percent.toFixed(2))}%`},
      },
    };

    function resetSimulation(){
      dispatch(clear());
      message.success("Simulation was successfully reset");
    }

    function resetEducation(){
      const tempArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
      dispatch(updateCompletedArticles(tempArray))
      message.success("Education was successfully reset");
    }

    return (
        <>
        <Drawer
            title="Settings"
            placement="right"
            closable={true}
            onClose={onClose}
            visible={settingsVisibility}
            width="35%"
        >
        <p className="Description-long">
          All the progress is stored in the browser's local
          storage and will remain there until your browser cash is cleared. 
          To prevent the loss of progress, you may export the data and import 
          it either on this or any other computer. In addition, you can reset all the progress.
        </p>
        <h4 className="Description-short">You may export or import the data below</h4>
        <div className="Container-buttons">
            <Button id="export" onClick={exportLocalStorageToFile} icon={<ExportOutlined /> }>Export</Button>
            <Upload id="import" {...props} maxCount={1}>
                <Button icon={<UploadOutlined />}>Import</Button>
            </Upload>   
        </div>
        <p className="Description-long">
        </p>
        <h4 className="Description-short">You may reset your progress below</h4>
        <div className="Container-reset">
            <Button id="resetEducation" onClick={resetEducation} icon={<FireOutlined />}>Reset Education</Button>
            <Button id="resetSimulation" onClick={resetSimulation} icon={<FireOutlined />}>Reset Simulation</Button>
        </div>
        </Drawer>
        </>
    );
}
