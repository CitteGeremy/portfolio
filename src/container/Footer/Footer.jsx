import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';


const Footer = () => {

  const form = useRef();
  const [msgsent, setMsgSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_4ob85f8', 'template_08tzpc8', form.current, 'lciNlBCz-_cRWAhKF')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      }
    );
    e.target.reset();
    setMsgSent(true);
  };

/*
  const [formData, setFormData] = useState({name:'', email: '', message: ''})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const {name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }

    client.create(contact)
    .then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    })
  }
  */

  return (
    <>
    <h2 className='head-text'>Contactez-Moi</h2>
    <div className='text-deco'></div>

    <div className='app__footer-cards'>
      <div className='app__footer-card'>
        <img src={images.gmail} alt="email" />
        <a href='mailto:cittegeremy@gmail.com' className='p-text'>cittegeremy@gmail.com</a>
      </div>
      <div className='app__footer-card'>
        <img src={images.mobile} alt="mobile" />
        <a href='tel: +330665570331' className='p-text'>(+33) 6.65.57.03.31</a>
      </div>
    </div>

    {!msgsent ?

<form ref={form} onSubmit={sendEmail} className='app__footer-form app__flex'>
      <div className='app__flex'>
        <input className='p-text' type='text' placeholder='Votre Nom' name='user_name' required />
      </div>
      <div className='app__flex'>
        <input className='p-text' type='email' placeholder='Votre Email' name='user_email' required />
      </div>
      <div>
        <textarea
        className='p-text'
        placeholder='Votre message'
        name='message'
        required
        />
      </div>
      {/*<button type='button' className='p-text' onClick={handleSubmit}>{loading ? 'Envoi en cours' : 'Envoyer'}</button>*/}
      <input type='submit' className='p-text send_button' value='Envoyer'/>
    </form>
    : <div>
      <h3 className='head-text'>Merci d'être entré en contact avec moi</h3>
    </div>

    }
    </>
  )
}

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__thirdbg');