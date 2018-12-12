import React, { Component } from 'react';
import { Row, Col, Form, Input, Divider, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { fetchProfile, postProfile, profileUpdate } from '../../redux/actions/';

class SubmissionForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id: '',
            firstname: '',
            lastname: '',
            company: '',
            department: '',
            email: '',
            position: ''
        }
    }

    componentDidMount(){
        this.props.getProfile().then(() => {
            if(this.props.profile.length)
            {
                const { firstname,lastname,company,department,email,position,_id } = this.props.profile[0];
                this.setState({
                    _id,
                    firstname,
                    lastname,
                    company,
                    department,
                    email,
                    position
                });
            }
        });
    }

    updateStateOnInputChange = (e) => this.setState({ [e.target.name]: e.target.value });
    
    sendForm = () => {
        const { _id, ...relevantState } = this.state;
        this.props.saveProfile(relevantState);
    }

    render(){
        return (
            <Spin size="large" spinning={this.props.fetching}>
                <Row align="middle" justify="center" style={{ marginTop: '10px' }}>
                    <Col offset={6} span={12}>
                        <h1 style={{ textAlign: 'center' }}>Submission Form</h1>
                        <Form.Item>
                            <Input 
                                value={this.state.firstname} 
                                addonBefore="First Name" 
                                type="text" 
                                name="firstname" 
                                onChange={this.updateStateOnInputChange} 
                            />
                            <Input 
                                value={this.state.lastname} 
                                addonBefore="Last Name" 
                                type="text" 
                                name="lastname" 
                                onChange={this.updateStateOnInputChange} 
                            />

                            <Divider style={{ height: '10px', marginTop: '0', marginBottom: '0' }} />
                            
                            <Input
                                value={this.state.company} 
                                addonBefore="Company" 
                                type="text" 
                                style={{ marginTop: '5px' }} 
                                name="company" 
                                onChange={this.updateStateOnInputChange}
                            />
                            <Input
                                value={this.state.department} 
                                addonBefore="Department" 
                                type="text" 
                                style={{ marginTop: '2px' }} 
                                name="department" 
                                onChange={this.updateStateOnInputChange}
                            />
                            <Input 
                                value={this.state.position}
                                addonBefore="Position" 
                                type="text" 
                                name="position" 
                                onChange={this.updateStateOnInputChange} 
                            />
                            
                            <Divider style={{ height: '10px', marginTop: '0', marginBottom: '0' }} />
                            
                            <Input
                                value={this.state.email} 
                                addonBefore="Email" 
                                type="email" 
                                style={{ marginTop: '5px' }} 
                                name="email" 
                                onChange={this.updateStateOnInputChange} 
                            />
                            
                            <Divider style={{ height: '10px', marginTop: '5px', marginBottom: '0' }} />
                            
                            <Col offset={11} span={3} style={{ marginTop: '5px' }}>
                                <Button 
                                    block 
                                    type="primary" 
                                    style={{ margin: 'auto' }} 
                                    size="large"
                                    onClick={!this.props.profile.length ? this.sendForm : () => this.props.updateProfile(this.state)}
                                >
                                    {this.props.profile.length ? "Update" : "Save"}
                                </Button>
                            </Col>
                        </Form.Item>
                    </Col>
                </Row>
            </Spin>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        profile: state.profile,
        fetching: state.fetching 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfile: () => dispatch(fetchProfile()),
        saveProfile: data => dispatch(postProfile(data)),
        updateProfile: data => dispatch(profileUpdate(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm);