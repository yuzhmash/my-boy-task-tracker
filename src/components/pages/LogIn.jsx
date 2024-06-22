import Form from "../form/Form"

import "./LogIn.sass"

import Tom from "./Tom.svg"
import kot from "./kot.svg"
import logo from "./logo.svg"

const LogIn = ({title}) => {
    return (
        <div className="container">
            <div className="logIn">
                <div className="logIn__logo"><img src={logo} alt="logo" /><div>MYBOY</div></div>
                
                <div className="logIn__wrapper">
                    <div>
                    <div className="logIn__title">{title}</div>
                        <Form btnsName={title} />
                        <a className="logIn__reset-password">Forgot your password?</a>
                        <div className="logIn__privacy">By continuing with Google, Apple, or Email, you agree to MyBoy's <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>.</div>
                        <div className="logIn__create-acc">Don’t have an account? <a href="">Sign up</a></div>
                    </div>
                    <div>
                        <img src={Tom} alt="toms img" />
                        <img src={kot} alt="kots img" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn;