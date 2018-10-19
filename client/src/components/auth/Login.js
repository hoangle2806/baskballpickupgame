import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../../common/TextFieldGroup';
import DisplayMap from '../../components/maps/DisplayMap';

class Login extends Component{
    state = {
        email: '',
        password: '',
        errors: {}
    }

    componentDidMount(){
      // Check if we login
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard');
      }
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.auth.isAuthenticated){
        this.props.history.push('/dashboard');
      }
      if(nextProps.errors){
        this.setState({ errors: nextProps.errors})
      }
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    onSubmit = (event) => {
        event.preventDefault();
        const login = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(login);
    }
    render(){
        const { errors } = this.state;
        return(
            <div className="login">
            <DisplayMap />
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Ballers sign in here</p>
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup 
                      placeholder ="Email Address"
                      name='email'
                      type='email'
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.password}
                    />

                    <TextFieldGroup 
                      placeholder ="Password"
                      name='password'
                      type='password'
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                    
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

Login.propTypes = {
  loginUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>{
  return {
    auth: state.auth,
    errors: state.errors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser : (login) =>{
      dispatch(loginUser(login))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);