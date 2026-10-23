import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { HiCheckCircle, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Footer.scss';

const EMAIL_SERVICE_ID = 'service_4ob85f8';
const EMAIL_TEMPLATE_ID = 'template_08tzpc8';
const EMAIL_PUBLIC_KEY = 'lciNlBCz-_cRWAhKF';

const Footer = () => {
  const form = useRef(null);
  const [status, setStatus] = useState('idle');

  const sendEmail = async (event) => {
    event.preventDefault();
    setStatus('sending');

    try {
      await emailjs.sendForm(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, form.current, EMAIL_PUBLIC_KEY);
      form.current.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <h2 className="head-text">Contactez-<span>moi</span></h2>
      <div className="text-deco" />
      <p className="section-intro contact-intro">
        Un projet ou une question ? Écrivez-moi, je vous répondrai avec plaisir.
      </p>

      <div className="app__footer-cards">
        <a className="app__footer-card" href="mailto:cittegeremy@gmail.com">
          <HiOutlineMail className="contact-icon" aria-hidden="true" />
          <span>
            <small>Email</small>
            cittegeremy@gmail.com
          </span>
        </a>
        <a className="app__footer-card" href="tel:+33665570331">
          <HiOutlinePhone className="contact-icon" aria-hidden="true" />
          <span>
            <small>Téléphone</small>
            +33 6 65 57 03 31
          </span>
        </a>
      </div>

      <form ref={form} onSubmit={sendEmail} className="app__footer-form app__flex">
        <label>
          <span className="visually-hidden">Votre nom</span>
          <input className="p-text" type="text" placeholder="Votre nom" name="user_name" autoComplete="name" required />
        </label>
        <label>
          <span className="visually-hidden">Votre email</span>
          <input className="p-text" type="email" placeholder="Votre email" name="user_email" autoComplete="email" required />
        </label>
        <label>
          <span className="visually-hidden">Votre message</span>
          <textarea className="p-text" placeholder="Votre message" name="message" required />
        </label>

        <button type="submit" className="send_button" disabled={status === 'sending'}>
          {status === 'sending' ? 'Envoi en cours…' : 'Envoyer'}
        </button>

        <p className={['form-status', 'form-status--' + status].join(' ')} aria-live="polite">
          {status === 'success' && (
            <><HiCheckCircle aria-hidden="true" /> Merci, votre message a bien été envoyé.</>
          )}
          {status === 'error' && (
            'Une erreur est survenue. Vous pouvez me contacter directement par email.'
          )}
        </p>
      </form>
    </>
  );
};

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__thirdbg');
