
import React, { useState } from "react";
import "./FAQ.css";

const FAQs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleFAQClick = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
    { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "" },
    { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "" },
    { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "" },
    { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "" }
  ];

  return (
    <div className="faqs-container">
      <h2>FAQs</h2>
      <p className="faqs-subtitle">Find answers in our FAQs or contact our support for personalized assistance.</p>
      
      {faqData.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-header" onClick={() => handleFAQClick(index)}>
            <h3>{faq.question}</h3>
            <span className="faq-icon">{openFAQ === index ? "▲" : "▼"}</span>
          </div>
          {openFAQ === index && (
            <div className="faq-body">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}

      <p className="view-more">View More FAQs ▼</p>

      <div className="contact-section">
        <h3>Didn't find an answer?</h3>
        <p>Reach out to us, we are ready to answer your questions</p>
        <button className="contact-button">Contact ITSA</button>
      </div>
    </div>
  );
};

export default FAQs;
