import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Quiz from '../../components/Quiz';
import React from 'react';

const BloatingQuizPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main">
        <Quiz />
      </main>
      <Footer />
    </div>
  );
};

export default BloatingQuizPage;
