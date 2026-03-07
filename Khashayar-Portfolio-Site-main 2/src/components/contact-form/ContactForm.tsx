import { useRef, useState } from 'react';
import styled from 'styled-components';
import { isValidEmail } from '@/utils/validateEmail';
import { motion } from 'framer-motion';

const ContactForm = styled(motion.form)<{
  $isSubmitted: boolean;
  $visibility: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 0;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  pointer-events: ${(props) => (props.$isSubmitted ? `none` : `auto`)};
  visibility: ${(props) => (props.$visibility ? `visible` : `hidden`)};
`;

const EmailInput = styled.input`
  width: calc(100% - 2.2em);
  overflow: hidden;
  font-size: 1.2em;
  padding: 0.8em;
  margin: 0.5em 0;
  font-family: Secondary;
  color: #000;
  border: 1px solid #000;
  border-radius: 8px;
  background-color: transparent;
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #555;
    opacity: 1;
  }

  &:focus {
    border-color: #107379;
  }
`;

const SendButton = styled(motion.button)`
  text-align: center;
  cursor: pointer;
  font-family: Primary;
  font-size: 1.2em;
  padding: 0.8em 1.5em;
  background-color: #107379;
  color: #fff;
  border: 1px solid #107379;
  border-radius: 8px;
  margin-top: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #107379;
  }
`;

const SubscriberMessage = styled.textarea`
  width: calc(100% - 2.2em);
  overflow: hidden;
  font-size: 1.2em;
  padding: 0.8em;
  margin: 0.5em 0;
  font-family: Secondary;
  color: #000;
  border: 1px solid #000;
  border-radius: 8px;
  background-color: transparent;
  resize: vertical;
  min-height: 120px;
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #555;
    opacity: 1;
  }

  &:focus {
    border-color: #107379;
  }
`;

const ConfirmationText = styled(motion.div)`
  font-size: 2em;
  font-family: Primary;
  text-align: center;
  color: #000;
  padding: 2rem;
`;

const ButtonFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default function ContactSection({ enable }: { enable: boolean }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const confirmationMessage: any = useRef();
  const contactForm: any = useRef();
  const emailRef: any = useRef(``);
  const messageRef: any = useRef(``);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(`email`, emailRef.current.value);
    formData.append(`message`, messageRef.current.value);

    const email = formData.get(`email`);
    if (isValidEmail(email === null ? `` : email.toString())) {
      setIsSubmitted(true);
      const request = new Request(`/api/sendgrid/mail`, {
        method: `POST`,
        body: formData,
      });
      await fetch(request);
    }
  };

  if (isSubmitted) {
    return (
      <ConfirmationText
        ref={confirmationMessage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        We&lsquo;ll talk soon!
      </ConfirmationText>
    );
  }

  return (
    <ContactForm
      ref={contactForm}
      $visibility={enable}
      $isSubmitted={isSubmitted}
      onSubmit={handleSubmit}
    >
      <EmailInput
        ref={emailRef}
        name="email"
        placeholder="Your Email..."
        required
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
      />
      <SubscriberMessage
        ref={messageRef}
        name="message"
        placeholder="Your Message..."
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
      />
      <ButtonFlexContainer>
        <SendButton>SEND</SendButton>
      </ButtonFlexContainer>
    </ContactForm>
  );
}
