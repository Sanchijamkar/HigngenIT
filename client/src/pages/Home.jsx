import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; // Include Autoplay
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (currentUser) {
      navigate('/');
    } else {
      navigate('/sign-up');
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-[75vh] w-full">
        {/* Slideshow in the background */}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }} // Slides auto-run every second
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]} // Added Autoplay module
          className="absolute inset-0 w-full h-full z-0"
        >
          <SwiperSlide>
            <img
              src="https://img.freepik.com/premium-photo/woman-using-laptops-computer-show-privacy-lock-icon-virtual-screen-interfaces_339391-28619.jpg?w=996"
              alt="Learning Coding"
              className="object-cover w-full h-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://img.freepik.com/free-photo/woman-is-looking-computer-screen-with-lot-data_1258-296276.jpg?t=st=1728106194~exp=1728109794~hmac=c520e4a3041b325342bf0e3ff235237701f0675ae6f328d1c2c089bca48dd7b3&w=996"
              alt="Programming"
              className="object-cover w-full h-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://img.freepik.com/free-photo/website-hosting-concept-with-circuits_23-2149406782.jpg?t=st=1728106253~exp=1728109853~hmac=50fa8036b3d685f34c8b0001eb802663034dad10213a62fc293345d482ffba34&w=996"
              alt="Interactive Coding"
              className="object-cover w-full h-full"
            />
          </SwiperSlide><SwiperSlide>
            <img
              src="https://img.freepik.com/premium-photo/purple-digital-binary-data-computer-screen-background-ar-21-job-id-99bcabe6d21049a3b3759e658b7ffc43_941600-133420.jpg?w=996"
              alt="Interactive Coding"
              className="object-cover w-full h-full"
            />
          </SwiperSlide>
        </Swiper>

        {/* Text overlay (fixed and stable) */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
          <h1 className="text-6xl font-bold mb-4">Welcome to HighGenIT</h1>
          <p className="text-2xl mb-8 text-center px-4">
            Learn coding with interactive tutorials, quizzes, and real-time code practice.
          </p>
          <button
            onClick={handleButtonClick}
            className="bg-white text-blue-600 px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 text-lg"
          >
            Get Started
          </button>
        </div>

        {/* Dark overlay to improve text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-5"></div>
      </section>      

      {/* Stats Section */}
      <section className="container mx-auto py-20 px-5 text-center bg-blue-50">
        <h2 className="text-4xl font-bold mb-10">HighGenIT by the Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="p-6">
            <h3 className="text-5xl font-bold text-blue-600">11+</h3>
            <p className="text-xl">Years Experience</p>
          </div>
          <div className="p-6">
            <h3 className="text-5xl font-bold text-blue-600">3000+</h3>
            <p className="text-xl">Students Trained</p>
          </div>
          <div className="p-6">
            <h3 className="text-5xl font-bold text-blue-600">100+</h3>
            <p className="text-xl">Students Placed</p>
          </div>
          <div className="p-6">
            <h3 className="text-5xl font-bold text-blue-600">99%</h3>
            <p className="text-xl">Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* Why EduCode Section with Improved Images */}
      <section className="container mx-auto py-20 px-5">
        <h2 className="text-4xl font-bold text-center mb-10">Why HighGenIT?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <img
              src="https://img.freepik.com/free-photo/programming-background-collage_23-2149901779.jpg?t=st=1728104332~exp=1728107932~hmac=ea33d8e612d2b194bd5d4b1ddca8158158fa256a1d181a5920e1157f08696fa7&w=996"
              alt="Interactive IDE"
              className="w-full h-44 mx-auto mb-4 rounded-lg"
            />
            <h3 className="text-2xl font-semibold mb-4">Interactive IDE</h3>
            <p className="text-gray-600">
              Practice coding in real-time with support for multiple programming languages.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <img
              src="https://img.freepik.com/free-photo/programming-background-collage_23-2149901771.jpg?t=st=1728104382~exp=1728107982~hmac=2d74e9bc834c69c80b15cc4cbe21a4db8870b27ec529fd146450cb3ebd912618&w=996"
              alt="Courses & Tutorials"
              className="w-full h-44 mx-auto mb-4 rounded-lg"
            />
            <h3 className="text-2xl font-semibold mb-4">Courses & Tutorials</h3>
            <p className="text-gray-600">
              Learn with our step-by-step tutorials and solve coding challenges.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <img
              src="https://img.freepik.com/free-photo/programming-background-collage_23-2149901774.jpg?t=st=1728107251~exp=1728110851~hmac=4733ddb48e434878020426403ebd76f70fe3ac69b0940014477b1c28c20928dc&w=996"
              alt="Quizzes & Games"
              className="w-full h-44 mx-auto mb-4 rounded-lg"
            />
            <h3 className="text-2xl font-semibold mb-4">Quizzes & Games</h3>
            <p className="text-gray-600">
              Improve your coding skills with interactive quizzes and fun coding games.
            </p>
          </div>
        </div>
      </section>

      {/* Add another image between sections */}
      <section className="container mx-auto py-10">
        <img
          src="https://img.freepik.com/free-photo/programming-background-collage_23-2149901789.jpg?t=st=1728105153~exp=1728108753~hmac=2af7e15f5a58d5a569d2cc862c472b23a4a4338f3bfd0eef52c78ba4fdea9978&w=996"
          alt="Coding Lifestyle"
          className="object-cover w-full h-96 rounded-lg shadow-md"
        />
      </section>

      {/* Courses Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-10">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Beginner's Guide to Frontend Technologies</h3>
              <p className="text-gray-600 mb-4">Learn the basics of  Frontend Technologies and start building projects in no time.</p>
              <Link to="/courses/python" className="text-blue-600 font-semibold hover:underline">
                Learn More
              </Link>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Advanced Java</h3>
              <p className="text-gray-600 mb-4">Deep dive into Java with advanced java projects and problem-solving challenges.</p>
              <Link to="/courses/c" className="text-blue-600 font-semibold hover:underline">
                Learn More
              </Link>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Backend Technologies Unlocked</h3>
              <p className="text-gray-600 mb-4">Harness Backend Technologies features for creating fast, efficient software.</p>
              <Link to="/courses/cpp" className="text-blue-600 font-semibold hover:underline">
                Learn More
              </Link>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Build your caree with Java</h3>
              <p className="text-gray-600 mb-4">Build fast, efficient software to improve your skill set to the maximum.</p>
              <Link to="/courses/java" className="text-blue-600 font-semibold hover:underline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-10">What Our Learners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg shadow-lg bg-white">
              <p className="text-gray-600 mb-4">"HighGenIT helped me transition from a complete beginner to a confident coder!"</p>
              <h4 className="font-semibold text-xl">- Sanchi</h4>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-white">
              <p className="text-gray-600 mb-4">"The tutorials and quizzes made learning to code fun and engaging."</p>
              <h4 className="font-semibold text-xl">- Swapanil</h4>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-white">
              <p className="text-gray-600 mb-4">"HighGenIT's real-time IDE is perfect for practicing coding while learning!"</p>
              <h4 className="font-semibold text-xl">- Tejas</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-300 text-white py-20 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6">Start Your Coding Journey Today!</h2>
          <p className="text-xl mb-8">Join thousands of learners and improve your coding skills with HighGenIT.</p>
          <button
            onClick={handleButtonClick}
            className="bg-white text-blue-600 px-8 py-4 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
          >
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-400 text-white py-6 text-center">
        <p>&copy; 2024 HighGenIT. Empowering the next generation of coders.</p>
      </footer>
    </div>
  );
}
