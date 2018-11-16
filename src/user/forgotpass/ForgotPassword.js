import React, { Component } from 'react';
import {Form,Input,Button} from 'antd';
const FormItem = Form.Item;

class ForgotPassword extends Component{
    constructor(props)
    {
        super();
        this.state = {

        };
    }

    render()
    {
        const WrappedForm = Form.create()(ForgotPasswordForm);

        return(
            <div className="login-container">
                <h1 className="page-title">Forgot Password</h1>
                <div className="login-content">
                    <WrappedForm />
                </div>
            </div>
        );
    }
}

class ForgotPasswordForm extends Component{

    constructor(props)
    {
        super();
        this.state = {

        };
    }

    render()
    {
        return(
           <Form className="login-form">
                <FormItem>
                    <Input
                        name="usernameOrEmail"
                        placeholder = "Username Or Email"
                    />
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large">Submit</Button>
                </FormItem>
           </Form>
        );
    }
}

export default ForgotPassword;