import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {listPostDetails, updatePost} from '../actions/postActions';
import {POST_UPDATE_RESET} from '../constants/postConstants';

const PostEditScreen = ({match, history}) => {
  const postId = match.params.id;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [descriptionDetails, setDescriptionDetails] = useState('');
  const [timeToRead, setTimeToRead] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const postDetails = useSelector((state) => state.postDetails);
  const {loading, error, post} = postDetails;

  const postUpdate = useSelector((state) => state.postUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = postUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({type: POST_UPDATE_RESET});
      history.push('/admin/postlist');
    } else {
      if (!post.name || post._id !== postId) {
        dispatch(listPostDetails(postId));
      } else {
        setName(post.name);
        setImage(post.image);
        setCategory(post.category);
        setDescription(post.description);
        setImages(post.images);
        setDescriptionDetails(post.descriptionDetails);
        setTimeToRead(post.timeToRead);
      }
    }
  }, [dispatch, history, postId, post, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const {data} = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePost({
        _id: postId,
        name,
        image,
        category,
        description,
        images,
        descriptionDetails,
        timeToRead,
      })
    );
  };

  return (
    <>
      <Link to='/admin/postlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Post</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                size='lg'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='images'>
              <Form.Label>Your Second Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={images}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='descriptionDetails'>
              <Form.Label>Description Details</Form.Label>
              <Form.Control
                as='textarea'
                size='lg'
                placeholder='Enter description Detials'
                value={descriptionDetails}
                onChange={(e) => setDescriptionDetails(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Time To Read</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Reading Time'
                value={timeToRead}
                onChange={(e) => setTimeToRead(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default PostEditScreen;
