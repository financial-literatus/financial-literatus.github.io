
import { useTypedSelector } from "../reducers";
import { toggleWelcomeVisibility } from "../actions/mainActions";
import { useDispatch } from "react-redux";

import { Button, Modal } from "antd";

import Logo from "../assets/icons/knowledge.svg";
import Labs from "../assets/icons/labs-text-color.svg";




import "../style/Welcome.css";

/**
 * Welcome page element component.
 * 
 * @returns the enitre welcome page component as a JSX.Element.
 */
export function Welcome(): JSX.Element {
    const dispatch = useDispatch()

     // Visibility of welcome page
    const welcomeVisibility = useTypedSelector((state) => state.main.welcome_page_open);

    function handleOk(){
        dispatch(toggleWelcomeVisibility(false))
    }

    return (
        <>
         <Modal
         
            title="Welcome to Financial Literatus" 
            centered={true}
            visible={welcomeVisibility} 
            width={1200}
            okButtonProps={{ ghost: true }}
            onCancel={handleOk}
            footer={[
                <Button key="continue" type="primary" onClick={handleOk}>
                  Continue
                </Button>
              ]}
        >
            <div className="Container-modal">
                <img
                    className="Logo-welcome"
                    src={Logo}
                    alt="Logo"
                ></img>
                <div className="Description-welcome">
                    <div className="Descripntion-welcome-container-q">
                        <ul className="Description-welcome-q" >
                            <h3>Do you have problems with budget planning?</h3>
                        </ul>
                        <ul className="Description-welcome-q" >
                            <h3>Do you need help with finding your personal career path?</h3>
                        </ul>
                        <ul className="Description-welcome-q" >
                            <h3>Do you want to become financially literate?</h3>
                        </ul>
                    </div>
                    <h2 className="Description-welcome-place">
                            You are at the right place!
                        </h2>
                    <p className="Description-welcome-text">
                        The goal of this website is to increase your financial literacy, 
                        to provide you a solution for budget planning,
                        and to help you with finding the lifestyle that fits your needs.
                    </p>
                </div>
                <div className="Developers-mentor-repository">
                    <h3>Developers</h3>
                    <ul>
                        <li>Aleksandr Molchagin</li>
                        <li>Zwea Htet</li>
                    </ul>
                    <h3>Mentor</h3>
                    <ul>
                        <li>Joe Wandyez</li>
                    </ul>
                    <h3>Project Repository</h3>
                    <a type="link" target="_blank" href="https://github.com/financial-literatus/financial-literatus.github.io" >https://github.com/financial-literatus/</a>
                    <a target="_blank" href="https://labs.codeday.org">
                        <img
                            className="Labs-welcome"
                            src={Labs}
                            alt="Logo"
                        >
                        </img>
                    </a>
                </div>
            </div>
         </Modal>
        </>
    );
}
