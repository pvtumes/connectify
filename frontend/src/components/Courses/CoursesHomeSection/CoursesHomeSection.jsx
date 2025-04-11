import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./CoursesHomeSection.css";

// Sample data for courses

 const popularCourses = [
  {
    id: 1,
    title: "Advanced Web Development with React",
    instructor: "Sarah Johnson",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Master React hooks, context API, and advanced state management techniques to build modern web applications."
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    instructor: "Michael Chen",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Learn the core concepts of data science including statistics, machine learning, and data visualization."
  },
  {
    id: 3,
    title: "UX/UI Design Masterclass",
    instructor: "Emma Rodriguez",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "From wireframing to prototyping, learn how to create intuitive and beautiful user interfaces."
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    instructor: "James Wilson",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Develop comprehensive digital marketing campaigns across social media, SEO, and content marketing."
  }
];

// Sample data for course categories
const categories = [
  { id: 1, name: "Development", icon: "💻" },
  { id: 2, name: "Business", icon: "📊" },
  { id: 3, name: "Design", icon: "🎨" },
  { id: 4, name: "Marketing", icon: "📱" },
  { id: 5, name: "Photography", icon: "📷" },
  { id: 6, name: "Music", icon: "🎵" },
  { id: 7, name: "Data Science", icon: "📈" },
  { id: 8, name: "Personal Development", icon: "🧠" },
];

// Sample data for Why Learn With Us section
const features = [
  {
    id: 1,
    title: "Hands-on Projects",
    description: "Apply your knowledge with real-world projects",
    icon: "🛠️",
  },
  {
    id: 2,
    title: "Expert Instructors",
    description: "Learn from industry professionals",
    icon: "👨‍🏫",
  },
  {
    id: 3,
    title: "Flexible Learning",
    description: "Study at your own pace, anytime, anywhere",
    icon: "⏱️",
  },
  {
    id: 4,
    title: "Certificate on Completion",
    description: "Earn recognized certificates to boost your resume",
    icon: "🎓",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    transition: { duration: 0.3 },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  hover: {
    scale: 1.1,
    backgroundColor: "#5038bc",
    color: "#ffffff",
    transition: { duration: 0.2 },
  },
};

// Animation hook for sections
const AnimatedSection = ({ children, className, variants, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

function CoursesHomeSection() {
  return (
    <div className="Courses-home-section-container">
      <div className="connectify-homepage">
        {/* Hero Banner Section */}
        <section className="connectify-hero">
          <div className="connectify-hero__content">
            <AnimatedSection
              className="connectify-hero__text-container"
              variants={fadeInUp}
            >
              <h1 className="connectify-hero__title">
                Explore Top Courses on Connectify
              </h1>
              <p className="connectify-hero__subtitle">
                Learn from the best. Anytime. Anywhere.
              </p>
              <motion.button
                className="connectify-button connectify-button--primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse All Courses
              </motion.button>
            </AnimatedSection>

            <AnimatedSection
              className="connectify-hero__image-container"
              variants={fadeInUp}
              delay={0.2}
            >
              <motion.img
                src="https://img.freepik.com/free-vector/online-education-concept-illustration_114360-5594.jpg"
                alt="Student learning on laptop"
                className="connectify-hero__image"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </AnimatedSection>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className="connectify-courses">
          <AnimatedSection variants={fadeInUp}>
            <h2 className="connectify-section-title">Popular Courses</h2>
            <p className="connectify-section-subtitle">
              Discover our most loved courses chosen by thousands of students
            </p>
          </AnimatedSection>

          <motion.div
            className="connectify-courses__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {popularCourses.map((course) => (
              <motion.div
                key={course.id}
                className="connectify-course-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="connectify-course-card__image-container">
                  <img
                    src={course.image}
                    alt={`${course.title} course thumbnail`}
                    className="connectify-course-card__image"
                  />
                </div>
                <div className="connectify-course-card__content">
                  <h3 className="connectify-course-card__title">
                    {course.title}
                  </h3>
                  <p className="connectify-course-card__instructor">
                    {course.instructor}
                  </p>
                  <div className="connectify-course-card__rating">
                    <span className="connectify-course-card__stars">
                      {"★".repeat(Math.floor(course.rating))}
                      {course.rating % 1 !== 0 && "½"}
                      {"☆".repeat(5 - Math.ceil(course.rating))}
                    </span>
                    <span className="connectify-course-card__rating-number">
                      {course.rating}
                    </span>
                  </div>
                  <motion.button
                    className="connectify-button connectify-button--secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Course Categories Section */}
        <section className="connectify-categories">
          <AnimatedSection variants={fadeInUp}>
            <h2 className="connectify-section-title">Course Categories</h2>
            <p className="connectify-section-subtitle">
              Browse through our diverse range of educational categories
            </p>
          </AnimatedSection>

          <motion.div
            className="connectify-categories__container"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                className="connectify-category-tag"
                variants={categoryVariants}
                whileHover="hover"
              >
                <span className="connectify-category-tag__icon">
                  {category.icon}
                </span>
                <span className="connectify-category-tag__name">
                  {category.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Why Learn With Us Section */}
        <section className="connectify-features">
          <AnimatedSection variants={fadeInUp}>
            <h2 className="connectify-section-title">
              Why Learn With Connectify
            </h2>
            <p className="connectify-section-subtitle">
              We're dedicated to providing the best learning experience
            </p>
          </AnimatedSection>

          <motion.div
            className="connectify-features__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className="connectify-feature-card"
                variants={fadeInUp}
              >
                <div className="connectify-feature-card__icon">
                  {feature.icon}
                </div>
                <h3 className="connectify-feature-card__title">
                  {feature.title}
                </h3>
                <p className="connectify-feature-card__description">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Action Block Section */}
        <AnimatedSection className="connectify-cta" variants={fadeInUp}>
          <div className="connectify-cta__content">
            <h2 className="connectify-cta__title">Not sure where to start?</h2>
            <p className="connectify-cta__subtitle">
              Take a quick quiz to get personalized course recommendations
            </p>
            <motion.button
              className="connectify-button connectify-button--accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Take a Quick Quiz
            </motion.button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default CoursesHomeSection;
