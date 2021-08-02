import React from 'react'
import './AuthForm.css'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'
import Axios from '../../axios'
const debounce = require('debounce-promise')

const apiCALL = (email) => {
  return Axios.post(`/auth/check-email`, { email: email.trim() })
}

const debounceFUNCTION = debounce(apiCALL, 500)

export const AuthFinalForm = props => {

  const history = useHistory()
  const dispatch = useDispatch()

  const { title, action } = props

  const onSubmit = (values) => {
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

        render={({ handleSubmit, form, submitting, pristine, values, validating }) => (
          <form onSubmit={handleSubmit}>
            <p className="title">{title}</p>
            <label>
              Email
              <Field
                name="email"
                validate={async (email) => {
                  if (!email) {
                    return "Required field"
                  } else if (!/\S+@\S+\.\S+/.test(email)) {
                    return "Input correct email"
                  } else {
                    try {
                      if (title === "log in") { return undefined }
                      await debounceFUNCTION(email)
                      return "This email address has already been registered"
                    } catch {
                      return undefined
                    }
                  }
                }}
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
                validate={(password) => {
                  if (!password) {
                    return "Required field"
                  } else if (password.length < 4) {
                    return "Minimal length is 4 symbols"
                  }
                }}
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
            {
              title === 'log in' ?
                <p className="link-text">Don't have an account? <Link className="link" to="sign-up">Sign Up</Link></p> :
                <p className="link-text">Already have an account? <Link className="link" to="log-in">Log In</Link></p>
            }
            <button className="submit-link" type="submit" disabled={submitting || validating} >{title}</button>
          </form>
        )
        }
      />
    </div>
  )
}