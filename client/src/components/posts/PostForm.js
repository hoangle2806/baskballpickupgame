import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import TextFieldGroup from '../../common/TextFieldGroup';
import { addPost } from '../../actions/PostActions';
 
class PostForm extends Component{
    state ={
        text: '',
        location: '',
        avatar: '',
        name:'',
        errors:{}
    }
    onChange = (event) => {
        this.setState({ [event.target.name] : event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {user} = this.props.auth;
        const newPost = {
            text: this.state.text,
            location: this.state.location,
            // avatar: user.avatar,
            // name: user.name,
        }
        this.props.addPost(newPost);
        this.setState({
            text: "",
            location: "",
            // avatar: '',
            // name: '',
        })
    }
    render(){
        const { errors } = this.state;
        return (
            <div className="post-form mb-3">
              <div className="card card-info">
                <div className="card-header bg-info text-white">Post a game</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <TextAreaFieldGroup
                        placeholder="Create a post"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                        error={errors.text}
                      />
                      <TextFieldGroup 
                        placeholder="Location of the game"
                        name='location'
                        value={this.state.location}
                        onChange={this.onChange}
                        error={errors.location}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
        )
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        // errors: state.errors,
        auth : state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPost) => {
            dispatch(addPost(newPost))
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (PostForm);