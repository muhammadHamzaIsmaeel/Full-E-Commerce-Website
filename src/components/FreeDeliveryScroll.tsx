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
  ];

  const renderMessages = () => {
    // Repeat the messages twice to ensure seamless looping
    const repeatedMessages = [...messages, ...messages];

    return repeatedMessages.map((message, index) => (
      <p key={index} className="inline-block text-2xl md:text-3xl text-white mx-12">
        {message}
      </p>
    ));
  };

  return (
    <div className="md:py-6 py-4 overflow-hidden bg-gradient-to-r from-yellow-700 to-yellow-900">

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
            animation: scroll 240s linear infinite; /* Increased duration to 240s */
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