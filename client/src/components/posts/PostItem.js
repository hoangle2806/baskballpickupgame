
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost } from '../../actions/PostActions';

class PostItem extends Component{
    onDeleteClick(id) {
        this.props.deletePost(id);
      }
    render(){
        const {auth, post} = this.props;
        return(
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img
                      className="rounded-circle d-none d-md-block"
                      alt=""
                    />
                  </a>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{post.text} at {post.location}</p>
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