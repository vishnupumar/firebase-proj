import React, { useState } from "react";
import 'react-phone-number-input/style.css'
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input'
import { Button ,Alert, Form } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const PhoneSignUp = () => {
    const [number , setNumber] = useState("");
    const [error, setError] = useState("");
    const [otp , setOtp] = useState("");
    const [flag , setFlag] = useState(false);
    const [confirmObj, setConfirmObj] = useState("");
    const { setUpRecaptha } = useUserAuth();
    const navigate = useNavigate();
    const getOtp = async (e) =>{
        e.preventDefault();
        setError("");
        if(number === "" || number === undefined){
            return setError("Please enter a valid Phone Number!")
        }
        try{
            const response = await setUpRecaptha(number);
            setConfirmObj(response);
            setFlag(true);
            console.log(response)
        }catch (err){
            setError(err.message)
        }
        console.log(number)
    }

    const verifyOtp = async (e) => {
        e.preventDefault();
        console.log(otp);
        if(otp === "" || otp === null) return;
        try{
            setError("")
            await confirmObj.confirm(otp);
            navigate("/home");
        }catch (err){
            setError(err.message)
        }
    };
    return (
        <>
        <div className="p-4 box">
          <h2 className="mb-3">Firebase Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={getOtp} style={{display: !flag ? "block" : "none"}} >
            <Form.Group className="mb-3" controlId="formBasicPhoneOtp">
              <PhoneInput 
                    defaultCountry="IN"
                    placeholder= "Enter phone number"
                    value={ number } 
                    onChange={ setNumber } 
                    />
                    <hr />
                    <div id="recaptcha-container" />
            </Form.Group>
                <div className="button-right">
                    <Link to="/">
                          <Button variant="secondary">Cancel</Button>                       
                    </Link>
                    &nbsp;
                    <Button type="submit" variant="primary" >Send OTP</Button>
                </div>
            </Form>

            <Form onSubmit={verifyOtp} style={{display: flag ? "block" : "none"}}>
            <Form.Group className="mb-3" controlId="formBasicVerifyOtp">
              <Form.Control type="text"
                            placeholder="Enter OTP"
                            onChange={(e)=>setOtp(e.target.value)}
                 />
              
            </Form.Group>
                <div className="button-right">
                    <Link to="/">
                          <Button variant="secondary">Cancel</Button>                       
                    </Link>
                    &nbsp;
                    <Button type="submit" variant="primary" >Verify OTP</Button>
                </div>
            </Form>
            </div>
            </>
    )
};

export default PhoneSignUp;