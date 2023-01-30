import React, { useEffect, useState } from "react";
import { TextField, Card, CardContent, Button, InputAdornment, Typography } from "@mui/material";
import "./App.css"
import {ViewState} from "./ViewState.js"
import { LoadingButton } from '@mui/lab';

export function FancyForm() {
    const [ethAddressState, setEthAddressState] = useState(ViewState.EMPTY)
    const [amountToSendState, setAmountToSendState] = useState(ViewState.EMPTY)
    const [otpState, setOtpState] = useState(ViewState.EMPTY)
    const [shouldEnableButtonState, setShouldEnableButtonState] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setShouldEnableButtonState(
            (ethAddressState === ViewState.SUCCESS) &&
            (amountToSendState === ViewState.SUCCESS) &&
            (otpState === ViewState.SUCCESS)
        )
    })

    function validateEthAddress(ethAddress) {
        if (ethAddress == "") {
            setEthAddressState(ViewState.EMPTY)
            return
        }
        const regex = /^0x[a-fA-F0-9]{40}$/;
        if (!regex.test(ethAddress)) {
            setEthAddressState(ViewState.ERROR)
            return
        }
        setEthAddressState(ViewState.SUCCESS)
    }

    function validateAmountToSend(amountToSend) {
        if (amountToSend == '') {
            setAmountToSendState(ViewState.EMPTY)
            return
        }
        if (parseInt(amountToSend) <= 0) {
            setAmountToSendState(ViewState.ERROR)
            return
        }
        setAmountToSendState(ViewState.SUCCESS)
    } 

    function validateOTPAuthentication(otp) {
        if (otp == "") {
            setOtpState(ViewState.EMPTY)
            return
        }
        const regex = /^\d{6}$/;
        if (!regex.test(otp)) {
            setOtpState(ViewState.ERROR)
            return
        }
        setOtpState(ViewState.SUCCESS)
    }

    function handleSubmit() {
        setIsLoading(true)
        sleep(1000).then(() => {
            setIsLoading(false)
            alert("Transaction Submitted")
        })
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        <Card sx={{p:5, width:"25%", marginTop:30}}>
            <CardContent>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Typography variant="h5">Send ETH to your desired address</Typography>
                    <TextField
                        color="primary"
                        sx={{marginTop: 5}}
                        required label="ETH Destination Address" 
                        variant="standard" 
                        onChange={event => validateEthAddress(event.target.value)}
                        error={ethAddressState === ViewState.ERROR}
                        helperText={ethAddressState === ViewState.ERROR ? 'Invalid Ethereum address' : ''}
                        />
                    <TextField 
                        color="primary"
                        sx={{marginTop: 5}}
                        type="number" 
                        required 
                        label="Amount to send"
                        onChange={event => validateAmountToSend(event.target.value)} 
                        error={amountToSendState === ViewState.ERROR}
                        helperText={amountToSendState === ViewState.ERROR ? 'Amount to send should be greater than 0' : ''}
                        variant="standard" InputProps={{
                        endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
                    }}/>
                    <TextField
                        color="primary" 
                        sx={{marginTop: 5}}
                        required
                        label="OTP Authentication" 
                        onChange={event => validateOTPAuthentication(event.target.value)} 
                        error={otpState === ViewState.ERROR}
                        helperText={otpState === ViewState.ERROR ? 'OTP should be 6 digits' : ''}
                        variant="standard" 
                        />
                    <LoadingButton 
                        sx={{marginTop: 5}} 
                        disabled={!shouldEnableButtonState}
                        loading={isLoading}
                        variant="contained"
                        onClick={() => {
                            handleSubmit()
                          }}
                        >
                        Send
                    </LoadingButton>
                </div>
            </CardContent>
        </Card>
    )
}