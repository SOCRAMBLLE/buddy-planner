import { Link } from "react-router-dom";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <>
      <h1 className="page--title">Contact Us</h1>
      <section className="contact-page--container">
        <p>
          We&apos;re here to help and answer any questions you might have. We
          look forward to hearing from you!
        </p>
        <h3>Get in Touch</h3>
        <p>
          For general inquiries, support, or feedback, please don&apos;t
          hesitate to reach out to us. Our team is dedicated to providing the
          support you need to make the most out of Paw Planner.
        </p>
        <h3>Email Us</h3>
        <p>
          Have questions or need assistance? Send us an email, and we&apos;ll
          get back to you as soon as possible.
        </p>
        <h3>Contribute</h3>
        <p>
          Paw Planner is an open-source project, and we welcome contributions
          from developers and enthusiasts alike. Whether it&apos;s reporting
          bugs, requesting features, or contributing to the code, your input is
          invaluable in making Paw Planner the best it can be.
        </p>
        <h3>GitHub</h3>
        <p>
          Visit our GitHub repository to view the source code, contribute, or
          check out the latest development updates.
        </p>
        <Link className="github--link">👨‍💻 Paw Planner GitHub Repository</Link>
        <h3>Stay Connected</h3>
        <p>
          Follow us on GitHub to stay up-to-date with the latest releases,
          features, and updates. Your support and feedback help us grow and
          improve, and we&apos;re excited to see how you use Paw Planner to make
          your pet care journey easier.
        </p>
      </section>
    </>
  );
};

export default ContactPage;
