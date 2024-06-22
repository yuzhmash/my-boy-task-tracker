import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup"
import { v4 as uuidv4 } from 'uuid';

import MyBoyService from "../../service/MyBoyService";
import { fetchLogIn } from "../pages/LogInSlice";
import Spinner from "../spinner/Spinner";

import "./Form.sass"

const Form = ({btnsName}) => {

    const [error, setError] = useState("")

    const {logInLoadingStatus} = useSelector(state => state.logIn)

    const {setUpData} = MyBoyService()

    const dispatch = useDispatch()
    const unikId = uuidv4()

    const logInUser = () => {

    }

    const signUpUser = () => {

    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                    .email("Invalid email address")
                    .required("Required field!"),
            password: Yup.string()
                    .required("Required field!"),
        }),
        onSubmit: (values, {resetForm}) => {
            console.log(values)
            dispatch(fetchLogIn(values.email))
                .then(({payload}) => {
                    console.log(values.password);
                    if (!payload.length ||
                         payload.map(({password}) => password)[0] !== values.password) {
                        setError("this email or password is incorrect")
                    } else {
                        resetForm()
                        setError("")
                    }
                })
                // .then(({payload}) => {
                //     if (payload.length) {
                //         setError("already registered")
                //     } else {
                //         setError("")
                //         setUpData({...values, id: unikId})
                //         resetForm()
                //     }
                // })
        }
    })

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <input  
                className="form__input"
                id="email"
                name="email"
                placeholder="Email Enter your email..."
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}/>
            {formik.errors.email && formik.touched.email && (<div className="error">{formik.errors.email}</div>)}
            <input     
                className="form__input"                
                id="password"
                name="password"
                placeholder="Password Enter your password..." 
                type="text" 
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}  />
            {formik.errors.password && formik.touched.password && (<div className="error">{formik.errors.password}</div>)}
            {!error.length ? null : <div className="error">{error}</div>}
            {logInLoadingStatus === "loading" ? <Spinner/> : null}
            <button type="submit">{btnsName}</button>
        </form>
    )

}

export default Form;