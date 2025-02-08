const contactFormSchema = {
  name: "contactForm",
  title: "Contact Form",
  type: "document",
  fields: [
    { name: "yourname", title: "Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "subject", title: "Subject", type: "string" },
    { name: "message", title: "Message", type: "text" },
  ],
};

export default contactFormSchema;

