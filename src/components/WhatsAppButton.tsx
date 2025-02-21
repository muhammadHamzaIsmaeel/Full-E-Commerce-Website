import Image from 'next/image';

interface WhatsAppButtonProps {
  phoneNumber: string; // Your WhatsApp Business number (without + or leading zeros)
  message?: string;    // Optional pre-filled message
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message = "Hello, I have a question!" }) => {

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000, // Ensure it's on top of other content
      }}
      aria-label="Chat with us on WhatsApp"
    >
      <div
        style={{
          backgroundColor: '#FFFFFF', // WhatsApp green
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Image
          src="/whatsapp.png" // Replace with your WhatsApp logo image
          alt="WhatsApp"
          width={36}
          height={36}
        />
      </div>
    </a>
  );
};

export default WhatsAppButton;