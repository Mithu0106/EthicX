
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Shield, CheckCircle, Globe, Lightbulb, Target, RefreshCw } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Hero section */}
          <div className="text-center mb-16">
            <h1 className="heading-xl mb-6">About EthicX</h1>
            <p className="paragraph max-w-3xl mx-auto">
              EthicX is an advanced AI compliance and ethics evaluation platform designed to ensure 
              and monitor the adherence of AI Systems to regulatory, ethical and operational standards 
              tailored to user needs and deployment geography. It evolves with emerging regulations 
              helping organizations mitigate potential risks. Targeted at developers and organisations 
              building AI-based products, EthicX automates evaluations and monitoring, bridging the gap 
              between AI innovation and ethical accountability.
            </p>
          </div>
          
          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Regulatory Compliance",
                description: "Monitor and maintain compliance with evolving AI regulations across different jurisdictions."
              },
              {
                icon: <Globe className="h-6 w-6" />,
                title: "Geography-Based Standards",
                description: "Apply specific regulatory frameworks based on your deployment regions and target markets."
              },
              {
                icon: <CheckCircle className="h-6 w-6" />,
                title: "Automated Evaluation",
                description: "Streamline compliance processes with automated scanning and assessment tools."
              },
              {
                icon: <Lightbulb className="h-6 w-6" />,
                title: "Ethical Analysis",
                description: "Identify and address potential ethical concerns before they become public issues."
              },
              {
                icon: <Target className="h-6 w-6" />,
                title: "Developer-Focused",
                description: "Built specifically for AI developers and organizations creating AI-powered products."
              },
              {
                icon: <RefreshCw className="h-6 w-6" />,
                title: "Continuous Monitoring",
                description: "Ongoing assessment ensures compliance even as your AI systems evolve."
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="glass-card p-6 flex flex-col h-full"
              >
                <div className="p-3 rounded-full bg-blue-50 w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 flex-grow">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Vision section */}
          <div className="glass-card p-8 md:p-12 mb-16">
            <h2 className="heading-lg mb-6 text-center">Our Vision</h2>
            <div className="max-w-3xl mx-auto">
              <p className="paragraph mb-4">
                In an era where AI systems are increasingly integrated into critical aspects of society,
                ensuring these systems operate ethically and in compliance with regulations has never been more important.
              </p>
              <p className="paragraph mb-4">
                EthicX was founded with a clear mission: to bridge the gap between rapid AI innovation
                and the ethical and regulatory standards needed to ensure these technologies benefit humanity.
              </p>
              <p className="paragraph">
                We believe that compliance should not hinder innovation but rather guide it. By providing
                tools that make compliance accessible and manageable, we help organizations build AI systems
                that are not just powerful, but also responsible and trustworthy.
              </p>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="text-center">
            <h2 className="heading-md mb-4">Ready to ensure your AI systems meet ethical and regulatory standards?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <a href="/dashboard" className="btn-primary">Start Evaluating Now</a>
              <a href="#" className="btn-secondary">Contact Our Team</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
