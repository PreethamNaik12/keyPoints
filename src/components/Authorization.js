import React from 'react';
import Login from "./Login";
import Signup from "./Signup";
import { Tabs, Button } from '@geist-ui/core';
import { UserCheck, UserPlus } from '@geist-ui/icons'

const Authorization = () => {
    return (
        <>
            <Tabs initialValue="1" align="center" leftSpace={5}>
                <Tabs.Item label={<>Login</>} value="1">
                    <Login />
                </Tabs.Item>
                <Tabs.Item label={<>Sign Up</>} value="2">
                    <Signup />
                </Tabs.Item>
            </Tabs>
        </>
    )
}

export default Authorization