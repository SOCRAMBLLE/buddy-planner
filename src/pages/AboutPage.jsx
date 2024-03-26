import PageMotion from "../components/PageMotion";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <PageMotion>
      <h1 className="page--title">About Paw Planner</h1>
      <section className="about-page--container">
        <h3>Our Mission</h3>
        <p>
          At Paw Planner, we believe that every pet deserves the utmost care and
          attention. Our mission is to simplify the lives of pet owners by
          providing a comprehensive, easy-to-use platform for managing all
          aspects of pet care from daily routines to veterinary appointments.
          With Paw Planner, we aim to ensure that no detail in your pet’s care
          is overlooked, making pet ownership a joy rather than a chore.
        </p>
        <h3>Our Vision</h3>
        <p>
          Our vision is to become the go-to digital assistant for pet parents
          worldwide. We envision a community where managing pet care tasks is
          seamless, intuitive, and integrated into every pet owner&apos;s
          lifestyle. By harnessing the power of technology, we aspire to foster
          a world where every pet is happy, healthy, and well-cared for.
        </p>
        <h3>Features</h3>
        <p>
          Paw Planner offers a wide range of features designed to cater to all
          your pet care needs:
        </p>
        <ul>
          <li>
            <strong>Veterinary</strong> Tracker: Keep track of upcoming vet
            visits and store important health records, all in one place.
          </li>
          <li>
            <strong>Nutrition Manager:</strong> Monitor your pet&apos;s diet,
            track daily feeding, and manage food and supplement inventories.
          </li>
          <li>
            <strong>Expense Tracker:</strong> Manage and monitor your
            pet-related expenses, from food to vet bills.
          </li>
          <li>
            <strong>Customizable Profiles:</strong> Create personalized profiles
            for each of your pets, including details about their breed, age, and
            unique care requirements.
          </li>
        </ul>
        <p>
          <strong>Built with Love and Care.</strong>
          <br />
          Paw Planner was created by a team of pet lovers who understand the
          challenges and joys of pet ownership. We&apos;ve poured our hearts
          into developing a tool that not only meets the practical needs of pet
          parents but also enriches the lives of our beloved animals. Our
          platform is designed to be inclusive, catering to the diverse needs of
          all types of pets, from the smallest fish to the largest dogs.
        </p>
        <h3>Join Our Community</h3>
        <p>
          We are more than just an app; we are a community of pet enthusiasts
          committed to making pet care easier and more enjoyable. Join us on our
          journey to create happier homes for pets and their families.
          <br />
          <br />
          For feedback, suggestions, or stories about how Paw Planner has made a
          difference in your pet&apos;s life, please contact us at
          [contact@pawplanner.com]. Your insights are invaluable as we continue
          to grow and improve.
          <br />
          <br />
          Together, let&apos;s make every day better for our pets.
        </p>
      </section>
    </PageMotion>
  );
};

export default AboutPage;
