
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost } from '../../actions/PostActions';

class PostItem extends Component{
    onDeleteClick = (event,id) => {
        this.props.deletePost(id);
      }
    render(){
        const {auth, post} = this.props;
        return(
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-1">
                  <a href="/dashboard">
                    <img
                      src={post.avatar}
                      className="rounded-circle d-none d-md-block avatar-image"
                      alt=""
                    />
                  </a>
                </div>
                <div className="col-md-3">
                  <p className="lead">{post.name} : {post.text} at {post.location}</p>
                  {post.user === auth.user.id ? (
                  <button
                    onClick={(event) => this.onDeleteClick(event,post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
                </div>
              </div>
            </div>
        )
    }
}

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return{
        auth : state.auth,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
      deletePost: (id) => {
        dispatch(deletePost(id))
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (PostItem);