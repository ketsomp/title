// AboutPage.jsx
import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
<div className="about-page">
      <div className="about-description">
        <h2>About title</h2>
        <p>
          One day, a certain brilliant developer of title was sitting around twiddling his thumbs when an ingenious idea, like a powerful stroke of lightning from Zeus, struck him. He thought, "Hey! Why don't I make a React app that functions as a media planner to help the average consumer curate their ideal fiction consumption experience?"
        </p>
        <p>
          title was made for average Joes, like you and me, to brush past the mundane days of Googling "top funny tv shows" online. It curates media based on your tastes, bringing you content that aligns with what we know you'll like! There will never be a dull moment when you have a title account!
        </p>
      </div>

      <div className="banner-section">

        <div className="banner banner1">
        <div className='banner1-image'></div>
          <div className="banner-content">
            <h3><strong>Aniket Sompura</strong></h3>
            <h4>SRN: PES1UG23CS074</h4>
            <h4>CSE 2nd Year, Section-B</h4>
            <p>Aniket is a weird man with good anime taste. He plays basketball and plays slightly too many games.</p>
          </div>
        </div>

        <div className="banner banner2">
        <div className='banner2-image'></div>
          <div className="banner-content">
          <h3><strong>Amshul Ninan Varikatakutty</strong></h3>
            <h4>SRN: PES1UG23CS066</h4>
            <h4>CSE 2nd Year, Section-B</h4>
            <p>Amshul is a man with good taste in cars. But he's a real one, and motivated and carried the team to success.</p>
          </div>
        </div>

        <div className="banner banner3">
        <div className='banner3-image'></div>
          <div className="banner-content">
          <h3><strong>Aniruddha Budihal</strong></h3>
            <h4>SRN: PES1UG23CS076</h4>
            <h4>CSE 2nd Year, Section-B</h4>
            <p>Well known among badminton and LEGO circles. His thirst for knowledge and desire to learn new technologies fired up the group and was our burning spirit.</p>
          </div>
        </div>

        <div className="banner banner4">
        <div className='banner4-image'></div>
          <div className="banner-content">
          <h3><strong>Amogh Varsh CR</strong></h3>
            <h4>SRN: PES1UG23CS062</h4>
            <h4>CSE 2nd Year, Section-B</h4>
            <p>Class CR. Lowkey a normie but plays nerd games too. Has too many friends. Tbh idk what he did so I don't have much to write here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;