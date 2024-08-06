import Form from "@/components/Form";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { title } from "process";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";


/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = ({ slice }: ContactFormProps): JSX.Element => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LcHxB8qAAAAAPF5lR6u50EmMp-2af2DHpaOgZ04">
      <Form />
    </GoogleReCaptchaProvider>
  );
};

export default ContactForm;
