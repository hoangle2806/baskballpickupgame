

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../actions/profileActions';
import {Spinner} from '../../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import ProfileDisplay from './ProfileDisplay';
import DisplayProfile from '../profiles/DisplayProfile';

class Dashboard extends Component{
    componentDidMount(){
        this.props.getCurrentProfile();
    }

    onDeleteClick = (event) =>{
        this.props.deleteAccount()
    }
    render(){
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        console.log(user);
        let dashboardContent;
        if(profile === null || loading){
            dashboardContent = <Spinner />
        } else{
            // Check if logged in user has profile data
            if(Object.keys(profile).length > 0){
                dashboardContent =(
                    <div>
                    <p className="lead text-muted"> Welcome <Link to='/dashboard'>{ user.name }</Link></p>
                    <ProfileActions />
                    {/* <ProfileDisplay userdata={ profile }/> */}
                    <DisplayProfile userdata={ profile } userImage={ user }/>
                    <div style={{ marginBottom: '60px' }} />
                    <button onClick={this.onDeleteClick} className="btn btn-danger">Delete My Account</button>
                    </div>
                )
            } else {
                // User is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted"> Welcome { user.name }</p>
                        <p> You have not yer seat up profile</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info"> Create Profile</Link>
                    </div>
                )
            }
        }
        return(
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        profile : state.profile,
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getCurrentProfile : () => {
            dispatch(getCurrentProfile())
        },
        deleteAccount : () =>{
            dispatch(deleteAccount())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Dashboard);