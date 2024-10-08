import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LuToggleLeft } from "react-icons/lu";
import { LuToggleRight } from "react-icons/lu";
import { themeActions } from "./store/Theme";
import { FaYoutube, FaInstagram, FaSpotify } from "react-icons/fa";
import img1 from "../assets/img1.png";

const HomePage = () => {
  const theme = useSelector((state) => state.themeUse.isDarkMode);
  const dispatch = useDispatch();

  const themeHandle = (event) => {
    event.preventDefault();
    dispatch(themeActions.toggleTheme());
  };

  return (
    <>
      <div
        className={`min-h-screen ${
          theme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        } transition-colors duration-300 relative`}
        style={{
          backgroundImage:
            // "url(https://images.unsplash.com/photo-1606938704652-3e588c2c9fd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80)",
          //  "url(https://www.istockphoto.com/photo/education-expense-or-student-loan-for-post-secondary-education-concept-dollar-bag-gm1058274784-282827853?utm_campaign=srp_photos_bottom&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fpersonal-expense&utm_medium=affiliate&utm_source=unsplash&utm_term=personal+expense%3A%3A%3A)",
          "url(https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          // "url(https://media.licdn.com/dms/image/v2/D4D12AQHRD4rEB3EV7A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1688214456846?e=1729123200&v=beta&t=kHYz4B4ClQX24YZ5PbhY9cIdTEnP_16OGrB3KtwvWgo)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={`absolute bg-gradient-to-r ${
            theme ? "from-gray-900 to-gray-500" : "from-gray-300 to-gray-50"
          } opacity-75 inset-0 z-0`}
        >
          <div className="flex justify-center m-6">
            <div>
              <h2 className="text-4xl font-bold">
                Make your budget natural and effective by choosing Your App 
              </h2>
              <p className="mt-4">
                The money you make is a symbol of the value you create
              </p>

              <div className="mt-6 max-w-md text-center w-6">
                <button
                  onClick={themeHandle}
                  className={`flex items-center justify-center w-10 h-10 rounded-full mb-3 ${
                    theme ? "bg-gray-700" : "bg-gray-300"
                  }`}
                >
                  {theme ? (
                    <LuToggleRight className="text-white" />
                  ) : (
                    <LuToggleLeft className="text-black" />
                  )}
                </button>
              </div>

              <a
                href="https://www.instagram.com/vinay_pandey_9826/"
                className={`text-3xl ${theme ? "bg-gray-700" : "bg-gray-300"}`}
              >
                {theme ? (
                  <FaInstagram className="text-white" />
                ) : (
                  <FaInstagram className="text-black" />
                )}
              </a>

              <a
                href="https://www.youtube.com"
                className={`text-3xl ${theme ? "bg-gray-700" : "bg-gray-300"}`}
              >
                {theme ? (
                  <FaYoutube className="text-white" />
                ) : (
                  <FaYoutube className="text-black" />
                )}
              </a>

              <a
                href="https://www.spotify.com"
                className={`text-3xl ${theme ? "bg-gray-700" : "bg-gray-300"}`}
              >
                {theme ? (
                  <FaSpotify className="text-white" />
                ) : (
                  <FaSpotify className="text-black" />
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
