import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import './Home.css';
class Home extends Component{
    
    render()
    {
        return (
            
            <div className="tile-gutter">
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <Link to="/profile"><div className="gutter-box">Personal Details</div></Link>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Link to="/attendance"><div className="gutter-box">Attendance</div></Link>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Link to="/appraisal"><div className="gutter-box">Appraisal</div></Link>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Link to="/careerProfile"><div className="gutter-box">Career Profile</div></Link>
                    </Col>
                </Row >
                <Row gutter={16} style={{marginTop:"32px"}}>
                    <Col className="gutter-row" span={6}>
                        <Link to="/salary"><div className="gutter-box">Salary Details</div></Link>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Link to="/salary"><div className="gutter-box">Leaves </div></Link>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Link to="/salary"><div className="gutter-box">My Performance </div></Link>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Link to="/salary"><div className="gutter-box">My Goalsheet </div></Link>
                    </Col>
                </Row>
            </div>
        );
    }
}
 

export default Home;