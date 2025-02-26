import React from 'react';

const Bannerfree: React.FC = () => {
  const messages = [
    "Exclusive Seasonal Picks ",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks ",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks ",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks ",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks ",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
    "Exclusive Seasonal Picks",
    "Enjoy Free Delivery On All Orders",
    "Enjoy Free Delivery",
  ];

  const renderMessages = () => {
    // Repeat the messages twice to ensure seamless looping
    const repeatedMessages = [...messages, ...messages];

    return repeatedMessages.map((message, index) => (
      <p key={index} className="inline-block text-3xl text-white mx-12">
        {message}
      </p>
    ));
  };

  return (
    <div className="py-10 overflow-hidden bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]">

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .scrolling-wrapper {
            display: inline-block;
            white-space: nowrap;
            animation: scroll 20s linear infinite;
          }
        `}
      </style>
      <div className="scrolling-wrapper">
        {renderMessages()}
      </div>
    </div>
  );
};

export default Bannerfree;