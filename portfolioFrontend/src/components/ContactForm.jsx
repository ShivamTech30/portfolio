import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm, resetFormStatus } from '../store/contactSlice';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.contact);
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      subject: Yup.string()
        .required('Subject is required')
        .min(5, 'Subject must be at least 5 characters'),
      message: Yup.string()
        .required('Message is required')
        .min(10, 'Message must be at least 10 characters')
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(submitContactForm(values));
      
      // Reset form after successful submission
      if (status === 'succeeded') {
        resetForm();
        
        // Reset status after 5 seconds
        setTimeout(() => {
          dispatch(resetFormStatus());
        }, 5000);
      }
    }
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      {status === 'succeeded' ? (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h3>
          <p className="text-slate-600">
            Thank you for reaching out. I'll get back to you as soon as possible.
          </p>
          <button
            type="button"
            className="mt-6 btn-primary"
            onClick={() => dispatch(resetFormStatus())}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`input-field ${
                  formik.touched.name && formik.errors.name ? 'border-red-500' : ''
                }`}
                placeholder="Your name"
                {...formik.getFieldProps('name')}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error-message">{formik.errors.name}</div>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`input-field ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                }`}
                placeholder="Your email"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message">{formik.errors.email}</div>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              className={`input-field ${
                formik.touched.subject && formik.errors.subject ? 'border-red-500' : ''
              }`}
              placeholder="Subject of your message"
              {...formik.getFieldProps('subject')}
            />
            {formik.touched.subject && formik.errors.subject && (
              <div className="error-message">{formik.errors.subject}</div>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className={`input-field resize-none ${
                formik.touched.message && formik.errors.message ? 'border-red-500' : ''
              }`}
              placeholder="Your message"
              {...formik.getFieldProps('message')}
            ></textarea>
            {formik.touched.message && formik.errors.message && (
              <div className="error-message">{formik.errors.message}</div>
            )}
          </div>
          
          {status === 'failed' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-700">Error sending message</h4>
                <p className="text-red-600 text-sm">{error || 'Please try again later.'}</p>
              </div>
            </div>
          )}
          
          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;