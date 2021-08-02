import React from 'react'
import './AuthForm.css'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'
import Axios from '../../axios'
import _ from 'lodash'
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const required = value => (value ? undefined : 'Required')

const minLength = min => value =>
  value.length >= min ? undefined : `Length should be greater than ${min}`

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const emailRegEx = () => value => (/\S+@\S+\.\S+/.test(value) ? undefined : 'Enter correct email')

const asyncFunction = (value) => Axios.post(`/auth/check-email`, { email: value.trim() })

const asyncFunctionDebounced = AwesomeDebouncePromise(asyncFunction, 1000);
const customEmailCheck = async (title, value) => {
  if (title === "log in") { return undefined }
  try {
    await asyncFunctionDebounced(value)
    return {email:'This email has already been registered'}
  } catch (error) {
    return undefined
  }
}

export const AuthFinalForm = props => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { title, action } = props

  console.log(action);

  const onSubmit = (values) => {
    // alert({...values})
    dispatch(action(values.email, values.password)).then(() => {
      history.push('/tasks')
    }).catch(err => {
      const message = err?.response?.data?.message;
      alert(message)
    })
  }

  return (
    <div className="form-container">
      <Form
        onSubmit={onSubmit}
        initialValues={{ email: '', password: '' }}
        validate={async values =>{
          const errors = {}
          if(!values.email){
            errors.email = "Required field"
          } else if(!/\S+@\S+\.\S+/.test(values.email)){
            errors.email = "Enter correct email"
          }
          if(!values.password){
            errors.password = "Required field"
          } else if(values.password.length < 4){
            errors.password = `Length should be greater than 4`
          }
          return Object.keys(errors).length?errors:(await customEmailCheck(title, values.email))
        }}
        render={({ handleSubmit, form, submitting, pristine, values, validating }) => (
          <form onSubmit={handleSubmit}>
            <p className="title">{title}</p>
            <label>
              Email
              <Field
                name="email"
              >
                {({ input, meta }) => (
                  <><input
                    type="email"
                    placeholder="Email"
                    {...input}
                  />
                    {meta.error && meta.touched && <span className="error-message">{meta.error}</span>}</>
                )}
              </Field>

            </label>
            <label>
              <span>Password</span>
              <Field
                name="password"
              >
                {({ input, meta }) => (
                  <><input
                    {...input}
                    type="password"
                    placeholder="Password"
                  />
                    {meta.error && meta.touched && <span className="error-message">{meta.error}</span>}</>
                )}
              </Field>
            </label>
            {title === 'log in' ?
              <p className="link-text">Don't have an account? <Link className="link" to="sign-up">Sign Up</Link></p> :
              <p className="link-text">Already have an account? <Link className="link" to="log-in">Log In</Link></p>
            }
            <button className="submit-link" type="submit" disabled={submitting} >{title}</button>
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      />
    </div>
  )
}