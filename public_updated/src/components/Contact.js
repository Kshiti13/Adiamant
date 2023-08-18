
import React from 'react';

const Contact = () => {
  return (

    <div class="section-1 wf-section">
      <div class="close-menu">
        <div class="container w-container">

          <section style={{ textAlign: 'center', padding: '140px 70px', color: 'white', backgroundColor: '#111827' }}>
            <div style={{ textAlign: 'center' }}>
              <div class="center">
                <h1 class="text-3xl sm:text-4xl mb-4 font-bold text-light-900 light:text-neutral-50">
                  Contact
                </h1>
              </div>
              Welcome to Adiamant 369, your go-to destination for innovative IT services! 🚀
              <br />
              <br />
              We know how crucial it is to have a seamless experience while reaching out to us. That's why our contact page is designed with YOU in mind. Whether you're an IT enthusiast or a corporate pro seeking learning resources, we're here to support you every step of the way.
              <br />
              <br />
              Got a quick question or prefer chatting online? No worries! Shoot us an email at admin@adiamant.in, and our team will be ready to assist you promptly.
              <br />
              <br />
              If you're looking for a more direct and immediate response, give us a buzz on +8197545763 during our defined hours. We're thrilled to connect with you!
              <br />
              <br />
              For those who want to dive deeper or have specific requests, our specialized contact form is just what you need. Share your name, email, and message - we'll make sure it lands in the right hands, no matter the topic!
              <br />
              <br />
              At Adiamant 369, we believe in open communication and fruitful collaboration. Your inquiries are valuable to us, so don't hesitate to get in touch!
              <br />
              <br />
              We're proudly based in Yelahanka New Town, Bangalore, Karnataka, India - 560064.
              <br />
              <br />
              Let's embark on this IT journey together! 💻📚
              <br />
              <br />
              <div class="center">
                <h1 class="text-3xl sm:text-4xl mb-4 font-bold text-neutral-900 dark:text-neutral-50">
                  Form
                </h1>
                <p style={{ fontStyle: 'italic' }}>
                  Any complaints, messages, technical issues, etc.
                </p>
                <br />
              </div>
              <form id="contactForm">
                <label>
                  Name *
                </label>
                <input class="form-control" minlength="5" name="name" placeholder="John Doe" required="required" style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', color: 'black' }} type="text" />
                <br />
                <br />
                <label>
                  Email *
                </label>
                <input class="form-control" minlength="5" name="email" placeholder="jdoe62@gmail.com" required="required" style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', color: 'black' }} type="email" />
                <br />
                <br />
                <label>
                  Phone Number *
                </label>
                <input class="form-control" name="phonenumber" pattern="[(][0-9]{3}[)]\s[0-9]{3}[-][0-9]{4}" placeholder="(647) 123-4567" required="required" style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', color: 'black' }} type="tel" />
                <br />
                <br />
                <label>
                  Subject *
                </label>
                <input class="form-control" minlength="5" name="subject" placeholder="Hello Adiamant 369!" required="required" style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', color: 'black' }} type="text" />
                <br />
                <br />
                <label>
                  Message *
                </label>
                <textarea class="form-control" id="message" minlength="5" name="message" placeholder="Please add a tool for recognizing AI-written content." required="required" rows="8" style={{ width: '80%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', color: 'black' }}></textarea>
                <br />
                <br />
                <button id="submitMessageButton" name="submit" required="required" style={{ backgroundColor: '#705cf6', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit">
                  Submit Message
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>



  );
};

export default Contact;
