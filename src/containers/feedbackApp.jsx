import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import FeedbackItem from '../components/feedbackItem.jsx'
import {
  addComment,
  removeComment,
  initComments,
} from '../actions/feedbackActions'

const FeedbackApp = () => {
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.feedback.messages)
  const cookies = new Cookies()

  const addCommentHandler = () => {
    let title = document.getElementsByName('feedback-title')[0].value
    let message = document.getElementsByName('feedback-message')[0].value
    if (title === '' || message === '') {
      alert('Comment not added, require more data')
      return
    }

    dispatch(addComment({ title, message }))

    document.getElementsByName('feedback-title')[0].value = ''
    document.getElementsByName('feedback-message')[0].value = ''
  }

  const removeCommentHandler = (e) => {
    dispatch(removeComment(e.target.dataset.id))
  }

  useEffect(() => {
    let data = cookies.get('messages')
    if (data === undefined) {
      data = []
    }

    dispatch(initComments(data))
  }, [])

  useEffect(() => {
    cookies.set('messages', messages, { path: '/' })
  }, [messages])

  const items = messages.map((item, index) => (
    <FeedbackItem
      key={index}
      id={item.id}
      title={item.title}
      message={item.text}
      remove={removeCommentHandler}
    />
  ))

  return (
    <div>
      <div className='feedback-container'>{items}</div>
      <form className='row feedback-add-form'>
        <div className='col-xs-12 col-sm-8 col-md-offset-1 col-md-6'>
          <input type='text' name='feedback-title' placeholder='Title' />
          <textarea name='feedback-message' placeholder='Message' />
        </div>
        <div className='col-xs-12 col-sm-4 feedback-btn-container'>
          <h1>Leave us a message</h1>
          <span className='btn feedback-add-btn' onClick={addCommentHandler}>
            <i className='fa fa-plus fa-1x' />
            Add comment
          </span>
        </div>
      </form>
    </div>
  )
}

export default FeedbackApp
