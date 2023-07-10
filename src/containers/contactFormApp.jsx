import { useDispatch, useSelector } from 'react-redux'
import { changeFieldValue } from '../actions/contactFormActions'

const ContactFromApp = () => {
  const dispatch = useDispatch()
  const nameField = useSelector((state) => state.contactForm.nameField)
  const emailField = useSelector((state) => state.contactForm.emailField)
  const messageField = useSelector((state) => state.contactForm.messageField)

  const changeFieldHandler = (e) => {
    dispatch(changeFieldValue({ text: e.target.value, type: e.target.name }))
  }

  const handlerSubmit = (e) => {
    e.preventDefault()

    if (
      nameField.valid &&
      nameField.text &&
      emailField.valid &&
      emailField.text &&
      messageField.valid &&
      messageField.text
    ) {
      alert('Success, data sent to the server!')
    } else {
      alert('Fail, data not valid or field is empty!')
    }
  }

  return (
    <form className='contact-form' onSubmit={handlerSubmit}>
      <span
        className='error'
        style={{ display: nameField.valid ? 'none' : '' }}
      >
        Invalid characters at name field
      </span>
      <input
        type='text'
        name='name'
        value={nameField.text || ''}
        onChange={changeFieldHandler}
        placeholder='Name'
      />
      <span
        className='error'
        style={{ display: emailField.valid ? 'none' : '' }}
      >
        Invalid characters at email field
      </span>
      <input
        type='text'
        name='email'
        value={emailField.text}
        onChange={changeFieldHandler}
        placeholder='Email'
      />
      <span
        className='error'
        style={{ display: messageField.valid ? 'none' : '' }}
      >
        Too short message (at least 20 characters)
      </span>
      <textarea
        className='message'
        name='message'
        value={messageField.text}
        onChange={changeFieldHandler}
        placeholder='Message'
      />
      <button type='submit' className='btn contact-form-btn'>
        Send request
      </button>
    </form>
  )
}

export default ContactFromApp
