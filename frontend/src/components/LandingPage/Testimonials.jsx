// Testimonials.jsx
import { useState, useEffect, useRef } from "react";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    company: "TechNova",
    logo: "https://logo.clearbit.com/techcrunch.com?size=150", // Tech-related logo
    text: "Connectify has completely transformed how we find top talent. The AI-powered resume builder and job-matching system are game changers!",
    author: "Sarah Thompson",
    position: "Talent Acquisition Lead",
  },
  {
    id: 2,
    company: "CodeCrafters",
    logo: "https://logo.clearbit.com/github.com?size=150", // Developer platform logo
    text: "The built-in coding platform has made our hiring process seamless. We can assess candidates in real-time and hire the best talent efficiently.",
    author: "Michael Evans",
    position: "CTO",
  },
  {
    id: 3,
    company: "InnovateX",
    logo: "https://logo.clearbit.com/ibm.com?size=150", // Tech company logo
    text: "Connectify bridges the gap between students and industry professionals. The mentorship and networking features have helped many of our employees grow.",
    author: "Jessica Reed",
    position: "HR Manager",
  },
  {
    id: 4,
    company: "DevSolutions",
    logo: "https://logo.clearbit.com/digitalocean.com?size=150", // Dev company logo
    text: "We love how easy it is to post job openings and connect with top-ranked students. The AI-powered candidate suggestions save us a lot of time!",
    author: "Daniel Cooper",
    position: "Hiring Manager",
  },
  {
    id: 5,
    company: "NextGen Startups",
    logo: "https://logo.clearbit.com/ycombinator.com?size=150", // Startup-related logo
    text: "Connectify is an incredible platform for students looking to enter the tech industry. The interactive learning modules and hackathons are top-notch!",
    author: "Emma Williams",
    position: "Startup Founder",
  },
  {
    id: 6,
    company: "AlphaTech",
    logo: "https://logo.clearbit.com/heroku.com?size=150", // Tech platform logo
    text: "As a startup, we were able to find highly skilled developers through Connectify's job board. The platform's easy-to-use interface was key to our hiring success.",
    author: "Chris Johnson",
    position: "CEO",
  },
  {
    id: 7,
    company: "FutureWorks",
    logo: "https://logo.clearbit.com/slack.com?size=150", // Workspace-related logo
    text: "The hackathons hosted by Connectify have allowed our interns to gain valuable experience and exposure. This has been essential in our hiring process.",
    author: "Rachel Adams",
    position: "Internship Program Manager",
  },
  {
    id: 8,
    company: "CodePioneers",
    logo: "https://logo.clearbit.com/stackoverflow.com?size=150", // Developer community logo
    text: "The mentorship features on Connectify are a fantastic way for our junior developers to receive guidance from experienced professionals in the field.",
    author: "James Parker",
    position: "Lead Developer",
  },
  {
    id: 9,
    company: "CloudTech Solutions",
    logo: "https://logo.clearbit.com/aws.amazon.com?size=150", // Cloud company logo
    text: "Connectify has allowed us to engage with a vibrant community of talented developers. The platform's networking opportunities have helped us expand our reach.",
    author: "Olivia Martinez",
    position: "Business Development Manager",
  },
  {
    id: 10,
    company: "TechHub",
    logo: "https://logo.clearbit.com/atlassian.com?size=150", // Tech tools logo
    text: "We've been able to streamline our recruitment process through Connectify's powerful tools. The AI-driven recommendations for top candidates are incredibly accurate.",
    author: "Ethan Clark",
    position: "Head of HR",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  // Auto scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update scroll position when activeIndex changes
  useEffect(() => {
    if (carouselRef.current) {
      const scrollPosition =
        activeIndex * (carouselRef.current.offsetWidth / 1.5);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <div id="testimonials" className="specify-testimonial-container">
      <div className="specify-testimonial-header">
        <h2 className="specify-testimonial-title">
          Empowering Students & Employers
        </h2>
        <p className="specify-testimonial-subtitle">
          Discover how Connectify is bridging the gap between talented learners
          and forward-thinking companies. Start building the future today.
        </p>
      </div>

      <div className="specify-testimonial-carousel-wrapper">
        <div className="specify-testimonial-carousel" ref={carouselRef}>
          {testimonials.map((testimonial) => (
            <div
              key={`specify-testimonial-${testimonial.id}`}
              className="specify-testimonial-card"
            >
              {testimonial.logo && (
                <div className="specify-testimonial-logo">
                  <img
                    src={testimonial.logo}
                    alt={`${testimonial.company} logo`}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/150x50?text=${testimonial.company}`;
                    }}
                  />
                </div>
              )}
              <p className="specify-testimonial-text">"{testimonial.text}"</p>
              <div className="specify-testimonial-author">
                <div className="specify-testimonial-avatar">
                  <img
                    src={`https://i.pravatar.cc/150?img=${testimonial.id}`}
                    alt={testimonial.author}
                  />
                </div>
                <div className="specify-testimonial-author-info">
                  <p className="specify-testimonial-author-name">
                    {testimonial.author}
                  </p>
                  <p className="specify-testimonial-author-position">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="specify-testimonial-indicators">
        {testimonials.map((_, index) => (
          <button
            key={`specify-indicator-${index}`}
            className={`specify-testimonial-indicator ${
              index === activeIndex ? "specify-active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
