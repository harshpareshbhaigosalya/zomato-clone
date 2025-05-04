// src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import VoiceOrdering from "../components/VoiceOrdering";
import CartDrawer from "../components/CartDrawer";

const HomePage = () => {
  // const [cartItems, setCartItems] = useState([]);
  const [animationPhase, setAnimationPhase] = useState(0);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  useEffect(() => {
    if (animationPhase < 5) {
      const timer = setTimeout(() => {
        setAnimationPhase((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [animationPhase]);

  return (
    <div className="overflow-x-hidden">
      <>
        <Header />
        {/* Your full Zomato UI goes here */}
        {/* You already have this content from previous code */}
      </>
      {/* Add Cart Drawer */}
      <CartDrawer />
      {/* Hero Section with Video Background */}
      <section className="relative h-screen text-white overflow-hidden font-sans">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://media.istockphoto.com/id/606045006/video/lifting-a-piece-of-pizza-off-a-plate.mp4?s=mp4-640x640-is&k=20&c=HzT3tX8veoSHYbzK0KUDeqj0w_kbueCFockfh1SrjEg="
            type="video/mp4"
          />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Centered Content Column (slightly lower than middle) */}
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full px-4">
          <div className="text-center max-w-3xl mx-auto">
            {/* Zomato Title */}
            <h1
              className="text-white text-7xl sm:text-7xl font-extrabold tracking-wide mb-4"
              style={{ fontFamily: "'Gill Sans', sans-serif" }}
            >
              zomato
            </h1>

            {/* Subheading */}
            <h2
              className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Gill Sans', sans-serif" }}
            >
              India’s <span className="text-white">#1</span>
              <br />
              <span className="font-extrabold">food delivery app</span>
            </h2>

            {/* Paragraph */}
            <p className="text-xl sm:text-2xl opacity-90 mb-6">
              Experience fast & easy online ordering
              <br />
              on the Zomato app
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <a href="#" className="block">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-14"
                />
              </a>
              <a href="#" className="block">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="App Store"
                  className="h-14"
                />
              </a>
            </div>
          </div>
        </div>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Try Our Voice Ordering
            </h2>
            <div className="max-w-xl mx-auto">
              <VoiceOrdering onAddToCart={handleAddToCart} />
            </div>
          </div>
        </section>

        {/* Scroll Down Fixed at Bottom Center */}
        <div className="absolute bottom-6 left-[45.5%] transform -translate-x-1/2 flex items-center gap-2 text-white text-xl animate-bounce z-10">
          <p className="font-bold opacity-100">Scroll down</p>
          <i className="fas fa-chevron-down text-white text-xl"></i>
        </div>
      </section>

      <section className="relative min-h-screen bg-white overflow-hidden flex items-center justify-center py-20">
        {/* Decorative Food Images */}
        <img
          src="https://png.pngtree.com/png-vector/20241204/ourmid/pngtree-a-perfect-crispy-fish-burger-for-delightful-meal-png-image_14586321.png"
          alt="Burger"
          className="absolute left-20 top-[298px] w-40 sm:w-48 z-0 rotate-[25deg]"
        />

        {/* Decorative Lines - Left and Right */}
        <img
          src="https://b.zmtcdn.com/data/o2_assets/901001826baf04838b1bf505176ff0b11742453501.png"
          alt="Line Left"
          className="absolute left-8  transform -translate-y-2  sm:w-100 z-0"
        />

        <img
          src="https://b.zmtcdn.com/data/o2_assets/70b50e1a48a82437bfa2bed925b862701742892555.png"
          alt="Tulsi"
          className="absolute left-60 top-12 w-20 sm:w-12 z-0"
        />
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/023/886/964/small_2x/tomato-sliced-for-food-advertising-design-png.png"
          alt="Tomato"
          className="absolute left-8  top-[498px] w-10 sm:w-10 z-0"
        />
        <img
          src="https://t3.ftcdn.net/jpg/06/16/85/60/360_F_616856040_zCvPMQkPFOWsVb3Hxo7mQUYzlzciFCZs.png"
          alt="Momo"
          className="absolute right-14 top-20 w-48 sm:w-52 z-0"
        />
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/023/886/964/small_2x/tomato-sliced-for-food-advertising-design-png.png"
          alt="Tomato2"
          className="absolute right-14 top-52 w-8 sm:w-8 z-0"
        />
        <img
          src="https://www.freeiconspng.com/uploads/pizza-png-20.png"
          alt="Pizza"
          className="absolute right-10 bottom-8 w-32 sm:w-40 z-0"
        />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#EF4F5F] mb-4">
            Better food for
            <br className="sm:hidden" /> more people
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-base sm:text-lg">
            For over a decade, we’ve enabled our customers to discover new
            tastes, <br className="hidden sm:inline" />
            delivered right to their doorstep
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-10 bg-white rounded-3xl p-12 sm:p-12 shadow-md max-w-4xl mx-auto relative z-12">
            <div className="text-center relative">
              <img
                src="https://b.zmtcdn.com/data/o2_assets/d19ec60986487a77bcb026e5efc3325f1742908200.png"
                alt="Restaurants"
                className="mx-auto mb-2 w-12 sm:w-20"
              />
              <h3 className="text-4xl font-bold text-[#EF4F5F]">3,00,000+</h3>
              <p className="mt-2 text-gray-600">restaurants</p>
            </div>
            <div className="text-center relative">
              <img
                src="https://b.zmtcdn.com/data/o2_assets/e7533c4081d6140da37b9f430cb7b8051743006192.png"
                alt="Cities"
                className="mx-auto mb-2 w-8 sm:w-10"
              />
              <h3 className="text-4xl font-bold text-[#EF4F5F]">800+</h3>
              <p className="mt-2 text-gray-600">cities</p>
            </div>
            <div className="text-center relative">
              <img
                src="https://b.zmtcdn.com/data/o2_assets/713443cc5944ce4284d7e49e75e2aacf1742466222.png"
                alt="Orders"
                className="mx-auto mb-2 w-10 sm:w-14"
              />
              <h3 className="text-4xl font-bold text-[#EF4F5F]">3 billion+</h3>
              <p className="mt-2 text-gray-600">orders delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Waiting for You? */}

      <section id="features" className="py-16 bg-pink-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4 text-red-600">
            What’s waiting for you on the app?
          </h2>
          <p className="text-xl mb-12 text-gray-600">
            Our app is packed with features that enable you to experience food
            delivery like never before
          </p>
          <div class="h-fit w-full overflow-hidden">
            <div class="relative mx-auto  grid aspect-[3/1] w-full grid-cols-6  grid-rows-2 gap-4  md:max-w-screen-md xl:max-w-[1024px] xl:gap-6   ">
              <div class="relative col-span-2 col-start-1 row-span-2 grid  h-full grid-cols-2 grid-rows-2 gap-4 xl:gap-6 ">
                <div class="flex flex-col items-center justify-start pt-2 rounded-2xl xl:rounded-3xl border border-lavenderMist pb-2 shadow-lg 2xl:rounded-[32px] bg-white aspect-[26/29] w-full origin-bottom-right scale-75">
                  <div class="w-full ">
                    <img
                      class="mx-auto h-auto w-full "
                      src="https://b.zmtcdn.com/data/o2_assets/d0f1639403f80f8f2c19e0d538222e661742455804.png"
                      loading="lazy"
                    />
                  </div>
                  <div class="px-2 text-center text-sm my-auto xl:text-lg xl:leading-[24px] font-normal text-darkSlateGrey md:px-4 justify-self-end">
                    Healthy <br />
                  </div>
                </div>
                <div class="flex flex-col items-center justify-start pt-2 rounded-2xl xl:rounded-3xl border border-lavenderMist pb-2 shadow-lg 2xl:rounded-[32px] bg-white aspect-[26/29] w-full origin-bottom-left scale-75 -translate-y-6">
                  <div class="w-full ">
                    <img
                      class="mx-auto h-auto w-full "
                      src="https://b.zmtcdn.com/data/o2_assets/82f145180cd6f920a8a8617dda366a0a1742455963.png"
                      loading="lazy"
                    />
                  </div>
                  <div class="px-2 text-center text-sm my-auto xl:text-lg xl:leading-[24px] font-normal text-darkSlateGrey md:px-4 justify-self-end">
                    Veg Mode <br />
                  </div>
                </div>
                <div class="flex flex-col items-center justify-start rounded-2xl xl:rounded-3xl border border-lavenderMist pb-2 shadow-lg 2xl:rounded-[32px] bg-white aspect-[26/29] w-full origin-top-right scale-75 pt-0 translate-x-6">
                  <div class="w-full ">
                    <img
                      class="mx-auto h-auto w-full "
                      src="https://b.zmtcdn.com/data/o2_assets/5e7aab0f183b36fc12c29279f0cb55181742462245.png"
                      loading="lazy"
                    />
                  </div>
                  <div class="px-2 text-center text-sm my-auto xl:text-lg xl:leading-[24px] font-normal text-darkSlateGrey md:px-4 justify-self-end">
                    Plan <br />a Party
                  </div>
                </div>
                <div class="flex flex-col items-center justify-start pt-2 rounded-2xl xl:rounded-3xl border border-lavenderMist pb-2 shadow-lg 2xl:rounded-[32px] bg-white aspect-[26/29] w-full origin-top-left scale-75 -translate-y-6 translate-x-6">
                  <div class="w-full ">
                    <img
                      class="mx-auto h-auto w-full "
                      src="https://b.zmtcdn.com/data/o2_assets/867f86a10503998e437963bb37c451591742455764.png"
                      loading="lazy"
                    />
                  </div>
                  <div class="px-2 text-center text-sm my-auto xl:text-lg xl:leading-[24px] font-normal text-darkSlateGrey md:px-4 justify-self-end">
                    Gift Cards <br />
                  </div>
                </div>
              </div>
              <div class="relative col-span-2 col-start-3 row-span-2 flex h-full overflow-hidden">
                <div class="h-full w-full flex flex-col items-center justify-end transition-transform duration-700 ease-out translate-y-0">
                  <div class="absolute -bottom-5 left-0 h-full w-full">
                    <img
                      src="https://b.zmtcdn.com/data/o2_assets/3f7e2757e62fd22592b879bd56b666011742294630.png"
                      alt="mobile frame"
                      class="mx-auto h-auto w-[92%]"
                      loading="lazy"
                    />
                  </div>
                  <div class="z-50 mb-6 xl:mb-8 aspect-[8/9] w-1/2 scale-90  ">
                    <div class="flex w-full flex-col items-center justify-start rounded-2xl xl:rounded-3xl border border-lavenderMist pb-2 shadow-lg 2xl:rounded-[32px] bg-white mx-auto aspect-[26/29] pt-4">
                      <div class="w-full ">
                        <img
                          class="mx-auto h-auto w-full "
                          src="https://b.zmtcdn.com/data/o2_assets/85fa7a0c955ba0f8d894b6b68a27cdf81742978539.png"
                          loading="lazy"
                        />
                      </div>
                      <div class="px-2 text-center text-sm my-auto xl:text-lg xl:leading-[24px] font-normal text-darkSlateGrey md:px-4 justify-self-end">
                        Quick <br />
                        delivery
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="relative col-span-2 col-start-5 row-span-2  grid h-full  -translate-x-6 grid-cols-2 grid-rows-2 gap-4 xl:gap-6 ">
                <div class="flex flex-col items-center justify-start pt-2 rounded-2xl xl:rounded-3xl border border-lavenderMist pb-2 shadow-lg 2xl:rounded-[32px] bg-white aspect-[26/29] w-full origin-bottom-right scale-75 -translate-x-6">
                  <div class="w-full ">
                    <img
                      class="mx-auto h-auto w-full "
                      src="https://b.zmtcdn.com/data/o2_assets/6e27c9acde6045c272a28e6eb275727e1742455789.png"
                      loading="lazy"
                    />
                  </div>
                  <div class="px-2 text-center text-sm my-auto xl:text-lg xl:leading-[24px] font-normal text-darkSlateGrey md:px-4 justify-self-end">
                    Gourmet <br />
                  </div>
                </div>
                <div class="flex flex-col items-center justify-start pt-2 rounded-2xl xl:rounded-3xl border border-lavenderMist pb-2 shadow-lg 2xl:rounded-[32px] bg-white aspect-[26/29] w-full origin-bottom-left scale-75 -translate-y-6 -translate-x-6">
                  <div class="w-full ">
                    <img
                      class="mx-auto h-auto w-full "
                      src="https://b.zmtcdn.com/data/o2_assets/813952c961fd13588cb71867d84ea7dc1742455815.png"
                      loading="lazy"
                    />
                  </div>
                  <div class="px-2 text-center text-sm my-auto xl:text-lg xl:leading-[24px] font-normal text-darkSlateGrey md:px-4 justify-self-end">
                    Offers <br />
                  </div>
                </div>
                <div class="flex flex-col items-center justify-start rounded-2xl xl:rounded-3xl border border-lavenderMist pb-2 shadow-lg 2xl:rounded-[32px] bg-white aspect-[26/29] w-full origin-top-right scale-75 pt-0">
                  <div class="w-full ">
                    <img
                      class="mx-auto h-auto w-full "
                      src="https://b.zmtcdn.com/data/o2_assets/06d090307e02772693ac06123b53459b1742455939.png"
                      loading="lazy"
                    />
                  </div>
                  <div class="px-2 text-center text-sm my-auto xl:text-lg xl:leading-[24px] font-normal text-darkSlateGrey md:px-4 justify-self-end">
                    Food on <br />
                    Train
                  </div>
                </div>
                <div class="flex flex-col items-center justify-start pt-2 rounded-2xl xl:rounded-3xl border border-lavenderMist pb-2 shadow-lg 2xl:rounded-[32px] bg-white aspect-[26/29] w-full origin-top-left scale-75 -translate-y-6">
                  <div class="w-full ">
                    <img
                      class="mx-auto h-auto w-full "
                      src="https://b.zmtcdn.com/data/o2_assets/541a9b65443d5d378e1b2d18319663f41742455727.png"
                      loading="lazy"
                    />
                  </div>
                  <div class="px-2 text-center text-sm my-auto xl:text-lg xl:leading-[24px] font-normal text-darkSlateGrey md:px-4 justify-self-end">
                    Homely <br />
                    meals
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Benefits */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-1">zomato</h2>
          <h3 className="text-4xl font-bold mb-2 text-yellow-500">GOLD</h3>
          <p className="mb-6 text-sm">
            India's Top Savings Program for Food Lovers
          </p>

          <div className="text-center mb-6">
            <h4 className="text-lg font-bold mb-4">GOLD BENEFITS</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bag"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </div>
              <div className="text-left">
                <h5 className="font-bold">Free Delivery</h5>
                <p className="text-sm text-gray-300">
                  At all restaurants within 7 km
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-percent"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
              </div>
              <div className="text-left">
                <h5 className="font-bold">Up to 30% extra off</h5>
                <p className="text-sm text-gray-300">
                  At 20,000+ partner restaurants
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Powering India's Changing Lifestyles */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          {/* Eternal Logo and Heading */}
          <div
            className={`mb-16 transition-all duration-1000 ${
              animationPhase >= 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-8"
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://b.zmtcdn.com/data/o2_assets/81ed35564614cbdf5188bb72dc7e57b51739536377.png"
                alt="iternal logo"
                height={2}
              />
              <h1 className="text-4xl font-light tracking-wide text-gray-800 mb-2">
                eternal
              </h1>
              <div className="relative">
                <div className="h-px w-64 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-3 mt-2"></div>
                <h2 className="text-lg font-medium tracking-wider text-gray-500 mb-1">
                  POWERING INDIA'S
                </h2>
                <h3 className="text-lg font-medium tracking-wider text-gray-500">
                  CHANGING LIFESTYLES
                </h3>
                <div className="h-px w-64 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-3"></div>
              </div>
            </div>
          </div>

          {/* Tree Structure with animated elements */}
          <div className="relative max-w-5xl mx-auto h-96 mb-8">
            {/* Main Trunk */}
            <div
              className={`absolute left-1/2 top-0 w-8 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg transform -translate-x-1/2 transition-all duration-1000 shadow-md ${
                animationPhase >= 2 ? "opacity-100 h-32" : "opacity-0 h-0"
              }`}
            ></div>

            {/* Tree Node */}
            <div
              className={`absolute left-1/2 top-32 w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 shadow-lg ${
                animationPhase >= 2
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0"
              }`}
            >
              <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-8 h-8">
                    <path d="M30,50 Q50,20 70,50 Q50,80 30,50" fill="#000" />
                    <path d="M40,50 Q50,35 60,50 Q50,65 40,50" fill="white" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Branches */}
            <div
              className={`absolute top-32 left-1/2 transform -translate-x-1/2 w-4/5 transition-all duration-1500 ${
                animationPhase >= 3 ? "opacity-100" : "opacity-0"
              }`}
            >
              <svg className="w-full" height="200" viewBox="0 0 1000 200">
                {/* Left branches */}
                <path
                  d="M500,0 Q350,50 10,100"
                  fill="none"
                  stroke="url(#branch-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className={`transition-all duration-1500 ${
                    animationPhase >= 3
                      ? "stroke-dashoffset-0"
                      : "stroke-dashoffset-500"
                  }`}
                  strokeDasharray="500"
                  strokeDashoffset={animationPhase >= 3 ? "0" : "500"}
                />

                {/* Right branches */}
                <path
                  d="M500,0 Q650,50 980,100"
                  fill="none"
                  stroke="url(#branch-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className={`transition-all duration-1500 ${
                    animationPhase >= 3
                      ? "stroke-dashoffset-0"
                      : "stroke-dashoffset-500"
                  }`}
                  strokeDasharray="500"
                  strokeDashoffset={animationPhase >= 3 ? "0" : "500"}
                />

                {/* Gradient definition */}
                <defs>
                  <linearGradient
                    id="branch-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#888" />
                    <stop offset="100%" stopColor="#ccc" />
                  </linearGradient>
                </defs>

                {/* Left subbranches */}
                <path
                  d="M10,100 L10,180"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className={`transition-all duration-1500 delay-300 ${
                    animationPhase >= 3
                      ? "stroke-dashoffset-0"
                      : "stroke-dashoffset-100"
                  }`}
                  strokeDasharray="100"
                  strokeDashoffset={animationPhase >= 3 ? "0" : "100"}
                />
                <path
                  d="M350,40 L350,180"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className={`transition-all duration-1500 delay-300 ${
                    animationPhase >= 3
                      ? "stroke-dashoffset-0"
                      : "stroke-dashoffset-100"
                  }`}
                  strokeDasharray="100"
                  strokeDashoffset={animationPhase >= 3 ? "0" : "100"}
                />

                {/* Right subbranches */}
                <path
                  d="M650,40 L650,180"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className={`transition-all duration-1500 delay-300 ${
                    animationPhase >= 3
                      ? "stroke-dashoffset-0"
                      : "stroke-dashoffset-100"
                  }`}
                  strokeDasharray="100"
                  strokeDashoffset={animationPhase >= 3 ? "0" : "100"}
                />
                <path
                  d="M980,100 L980,180"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className={`transition-all duration-1500 delay-300 ${
                    animationPhase >= 3
                      ? "stroke-dashoffset-0"
                      : "stroke-dashoffset-100"
                  }`}
                  strokeDasharray="100"
                  strokeDashoffset={animationPhase >= 3 ? "0" : "100"}
                />

                {/* Branch nodes */}
                <circle
                  cx="10"
                  cy="100"
                  r="8"
                  fill="#888"
                  className={`transition-all duration-1000 ${
                    animationPhase >= 3
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
                  }`}
                />
                <circle
                  cx="350"
                  cy="40"
                  r="8"
                  fill="#888"
                  className={`transition-all duration-1000 ${
                    animationPhase >= 3
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
                  }`}
                />
                <circle
                  cx="650"
                  cy="40"
                  r="8"
                  fill="#888"
                  className={`transition-all duration-1000 ${
                    animationPhase >= 3
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
                  }`}
                />
                <circle
                  cx="980"
                  cy="100"
                  r="8"
                  fill="#888"
                  className={`transition-all duration-1000 ${
                    animationPhase >= 3
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
                  }`}
                />
              </svg>
            </div>
          </div>

          {/* Brand Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto -mt-32">
            {/* Zomato */}
            <div
              className={`transform transition-all duration-1000 ${
                animationPhase >= 4
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                {/* <div className="bg-white rounded-xl shadow-md p-4 mb-4 transform hover:scale-105 transition-all duration-300"> */}
                {/* <div className="bg-red-100 rounded-xl p-3 mb-1"> */}
                <img
                  src="https://b.zmtcdn.com/data/o2_assets/d1eee2be61cf47e2332cb7c49475c0981739777714.png"
                  alt="Zomato Logo"
                  className="w-15 h-15 mx-auto rounded-xl mb-1"
                />
                {/* </div> */}
                {/* </div> */}
                <h4 className="font-bold text-gray-800 mt-2">zomato</h4>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  Get the app now to start ordering your favorite dishes!
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                  Check it out
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Blinkit */}
            <div
              className={`transform transition-all duration-1000 ${
                animationPhase >= 4
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <img
                  src="https://b.zmtcdn.com/data/o2_assets/071cb96db84f20eea3a39804e113bdee1739777655.png"
                  alt="blinkit Logo"
                  className="w-15 h-15 mx-auto rounded-xl mb-1"
                />

                <h4 className="font-bold text-gray-800 mt-2">blinkit</h4>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  Choose from 10,000+ products & get them delivered in minutes
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-yellow-500 hover:text-yellow-600 transition-colors"
                >
                  Check it out
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* District */}
            <div
              className={`transform transition-all duration-1000 ${
                animationPhase >= 4
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <img
                  src="https://b.zmtcdn.com/data/o2_assets/38bf2d77d9391b8b1866e3ae2b5fe19a1739777683.png"
                  alt="district Logo"
                  className="w-15 h-15 mx-auto rounded-xl mb-1"
                />

                <h4 className="font-bold text-gray-800 mt-2">district</h4>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  The best of events, movies, dining, and everything you love!
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-purple-500 hover:text-purple-600 transition-colors"
                >
                  Check it out
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Hyperpure */}
            <div
              className={`transform transition-all duration-1000 ${
                animationPhase >= 4
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <img
                  src="https://b.zmtcdn.com/data/o2_assets/9207cd0fc68c4ac55cfd3bfa00c02a351739777699.png"
                  alt="district Logo"
                  className="w-15 h-15 mx-auto rounded-xl mb-1"
                />
                <h4 className="font-bold text-gray-800 mt-2">hyperpure</h4>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  Offering complete supply chain solution for your restaurant
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  Check it out
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <div class="relative flex size-full w-full items-center justify-evenly gap-7 overflow-hidden px-12 pt-6 lg:pt-8 xl:pt-[60px]">
        <div class="flex flex-col items-center">
          <div>
            <div>
              <div class="mb-2 text-start text-xl font-bold text-zCoal md:text-2xl lg:mb-4 lg:text-3xl xl:text-[40px]">
                Download the app now!
              </div>
              <div class="text-start text-sm font-normal text-comet md:text-base lg:text-xl xl:text-2xl">
                Experience seamless online ordering <br />
                only on the Zomato app
              </div>
            </div>
            <div class="z-50 mt-4 flex max-h-[48px] w-4/5 items-center justify-items-start gap-4 lg:mt-10 xl:max-h-[72px]  2xl:gap-[28px]">
              <a
                href="https://link.zomato.com/xqzv/iwz6g6kg"
                target="_blank"
                class="z-50 size-fit transition-transform duration-200 hover:scale-110"
              >
                <div class="">
                  <img
                    alt="App Download Logo"
                    class="h-12 object-contain md:h-[48px] xl:h-[56px] 2xl:h-[64px]"
                    src="https://b.zmtcdn.com/data/o2_assets/aad864bd17860b27634fe621001c32db1739350431.png"
                    loading="lazy"
                  />
                </div>
              </a>
              <a
                href="https://link.zomato.com/xqzv/xigpfha6"
                target="_blank"
                class="z-50 size-fit transition-transform duration-200 hover:scale-110"
              >
                <div class="">
                  <img
                    alt="App Download Logo"
                    class="h-12 object-contain md:h-[48px] xl:h-[56px] 2xl:h-[64px]"
                    src="https://b.zmtcdn.com/data/o2_assets/df6464de32f4a09262cee301f65aaa661739351256.png"
                    loading="lazy"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="relative z-50 w-1/2 lg:max-w-[348px] xl:max-w-[454px] transition-transform duration-700 ease-out translate-y-0">
          <div class="size-full">
            <img
              src="https://b.zmtcdn.com/data/o2_assets/3f7e2757e62fd22592b879bd56b666011742294630.png"
              loading="lazy"
            />
          </div>
          <div class="absolute left-0 top-0 flex size-full flex-col items-center justify-end gap-5">
            <div class="w-[70%] text-center text-xs font-medium text-comet md:text-sm lg:w-3/5 lg:text-base xl:text-xl">
              Scan the QR code to download the app
            </div>
            <div class="mb-3 flex items-center justify-center xl:mb-12">
              <img
                src="https://b.zmtcdn.com/data/o2_assets/98cc4eba0a6f59e728e5223a70fd39551742471514.png"
                loading="lazy"
                alt="download zomato app"
                class="aspect-square w-1/2"
              />
            </div>
          </div>
        </div>
        <div class="absolute right-[-30%] top-[30%] aspect-square w-[90%]">
          <div class="flex aspect-square w-full items-center justify-center rounded-full border-2 border-red-100">
            <div class="flex aspect-square w-4/5 items-center justify-center rounded-full border-2 border-red-100">
              <div class="flex aspect-square w-3/4 items-center justify-center rounded-full border-2 border-red-100"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div>
              <h4 className="font-bold mb-4">Zomato</h4>
              <ul className="space-y-2 text-gray-600">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Blinkit</h4>
              <ul className="space-y-2 text-gray-600">
                <li>About Blinkit</li>
                <li>Careers</li>
                <li>Partner With Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">District</h4>
              <ul className="space-y-2 text-gray-600">
                <li>About District</li>
                <li>Careers</li>
                <li>Partner With Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Hyperpure</h4>
              <ul className="space-y-2 text-gray-600">
                <li>About Hyperpure</li>
                <li>Careers</li>
                <li>Partner With Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">More</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Privacy</li>
                <li>Security</li>
                <li>Terms of Service</li>
                <li>Help & Support</li>
              </ul>
            </div>
          </div>
          <hr className="my-8" />
          <div className="text-center text-sm text-gray-500">
            By continuing past this page, you agree to our Terms of Service,
            Cookie Policy, Privacy Policy and Content Policies. All trademarks
            are properties of their respective owners.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
