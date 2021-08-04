import JobLogo from "../assets/icons/job.svg"


/**
 * Unloaded job component.
 * Represents the right part of the showcase when the job is not loaded.
 * 
 * @returns a page that represents description of the unloaded job as a JSX element.
 */
export function JobUnloaded(): JSX.Element {
  
  return (
    <div className="Unloaded-job-container">
        <h1 className="Unloaded-job-text">Choose a job at the left panel</h1>
        <img
            className="Unloaded-job-logo"
            src={JobLogo}
            alt="Unloaded job"
          ></img>
    </div>
  );
}
