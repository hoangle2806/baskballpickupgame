import React, {Component} from 'react';
import PostFeed from './PostFeed';
import PostForm from './PostForm';
import PropTypes from 'prop-types';
import {Spinner} from '../../common/Spinner';
import { connect } from 'react-redux';
import {getPosts} from '../../actions/PostActions';
import DisplayMap from '../../components/maps/DisplayMap';


class Posts extends Component{
    componentDidMount(){
        this.props.getPosts();
    }
    render(){
        const {posts,loading} = this.props.posts;
        let postContent;
        if (posts === null || loading){
            postContent = <Spinner />
        } else{
            postContent = <PostFeed posts={posts} />
        }
        return(
            <div className="feed">
                <div className="map">
                    <DisplayMap />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.object.isRequired,
}

const mapStateToProps = (state)=> {
    return {
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: () => {
            dispatch(getPosts())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Posts);