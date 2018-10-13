
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';
// import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
// import InputGroup from '../../common/InputGroup';
import SelectListGroup from '../../common/SelectListGroup';
import {createProfile,getCurrentProfile} from '../../actions/profileActions';

class EditProfile extends Component{
    state = {
        handle: "",
        location: "",
        experience:"",
        errors: {}
    }

    componentDidMount(){
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors){
            this.setState({ errors : nextProps.errors})
        }

        if (nextProps.profile.profile){
            const oldProfile = nextProps.profile.profile

            // Set component field state
            this.setState({
                handle: oldProfile.handle,
                location: oldProfile.location,
                experience: oldProfile.experience,
            })
        }
    }

    onChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    onSubmit = (event) =>{
        event.preventDefault()
        const newProfile = {
            handle: this.state.handle,
            location: this.state.location,
            experience: this.state.experience
        }
        this.props.createProfile(newProfile,this.props.history);
    }
    render(){
        const {errors} = this.state;

        // Select options for experience:
        const options = [
            {label: "Casual", value: "Casual"},
            {label: "Play Every week", value: "Play Every week"},
            {label: "Like to compete", value: "Like to compete"},
            {label: "Get ready for tournament", value: "Get ready for tournament"},
        ]
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Edit Profile</h1>
                        <small className="d-block pb-3">* = required fields</small>
                        <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                        placeholder="* Profile Handle"
                        name="handle"
                        value={this.state.handle}
                        onChange={this.onChange}
                        error={errors.handle}
                        info="A unique handle for your profile, be fun and creative :)"
                        />
                        <TextFieldGroup
                        placeholder="* Your prefered location"
                        name="location"
                        value={this.state.location}
                        onChange={this.onChange}
                        error={errors.location}
                        info="Where do you want to play ?"
                        />
                        <SelectListGroup
                        name="experience"
                        value={this.state.experience}
                        options={options}
                        onChange={this.onChange}
                        error={errors.experience}
                        info="Feel free to evaluate your skill"
                        />
                        <input
                          type="submit"
                          value="Submit"
                          className="btn btn-info btn-block mt-4"
                        />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        errors: state.errors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        createProfile : (data,history)=>{
            dispatch(createProfile(data,history))
        },
        getCurrentProfile: ()=>{
            dispatch(getCurrentProfile())
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withRouter(EditProfile));