declare module 'react-google-recaptcha' {
    import * as React from 'react';
  
    interface ReCAPTCHAProps {
      sitekey: string;
      onChange: (token: string | null) => void;
      onExpired?: () => void;
      onErrored?: () => void;
      size?: 'compact' | 'normal' | 'invisible';
      tabindex?: number;
      theme?: 'dark' | 'light';
      type?: 'image' | 'audio';
      badge?: 'bottomright' | 'bottomleft' | 'inline';
    }
  
    export default class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {}
  }
  