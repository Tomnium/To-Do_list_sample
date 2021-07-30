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
const customEmailCheck = (title) => async value => {
  if (title === "log in") { return undefined }
  try {
    await asyncFunctionDebounced(value)
    return 'This email has already been registered'
  } catch (error) {
    return undefined
  }
}

export const AuthFinalForm = props => {

  const { title, action } = props

  const handleSubmit = (values) => {
    return 1
  }

  return (
    <div className="form-container">
      <Form
        onSubmit={handleSubmit}
        initialValues={{ email: '', password: '' }}

        render={({ form, submitting, pristine, values }) => (
          <form>
            <p className="title">New FORM {title}</p>
            <label>
              Email
              <Field
                name="email"
                validate={
                  composeValidators(required, emailRegEx(values.email), customEmailCheck(title))
                }
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
                validate={composeValidators(required, minLength(4))}
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
            <button className="submit-link" type="submit" disabled={submitting || pristine}>{title}</button>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  )
}