
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addParticipate } from '../../actions/PostActions';

class PostItem extends Component{
    onDeleteClick = (event,id) => {
        this.props.deletePost(id);
      }
    onLikeClick = (event,id)=>{
      this.props.addParticipate(id);
    }

    findUserLike = (likes) => {
      const {auth} = this.props;
      if (likes.filter(like => like.user === auth.user.id ).length > 0){
        return true;
      }else{
        return false;
      }
    }
    render(){
        const {auth, post} = this.props;
        return(
            <div className="card card-body mb-1">
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
                  <button
                    onClick={(event) => this.onLikeClick(event,post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames('fas fa-thumbs-up', {
                        'text-info': this.findUserLike(post.participants)
                      })}
                    />
                    <span className="badge badge-light">{post.participants.length}</span>
                  </button>
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
    addParticipate : PropTypes.func.isRequired,
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
      },
      addParticipate : (id) => {
        dispatch(addParticipate(id))
      },
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (PostItem);