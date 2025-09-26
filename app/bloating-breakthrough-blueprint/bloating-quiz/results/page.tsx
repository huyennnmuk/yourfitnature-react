import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import QuizResults from '../../../components/QuizResults';
import React, { Suspense } from 'react';
 
const BloatingQuizResultsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main">
        <Suspense fallback={<div>Loading...</div>}>
          <QuizResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default BloatingQuizResultsPage;
