
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIEvaluation from '@/components/evaluation/AIEvaluation';

const EvaluationPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <AIEvaluation />
      </main>
      <Footer />
    </div>
  );
};

export default EvaluationPage;
