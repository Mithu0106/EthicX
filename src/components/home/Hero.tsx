
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Check, BarChart3 } from 'lucide-react';

const Hero = () => {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  return (
    <div className="relative overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white -z-10"></div>
      
      {/* Hero section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-24 md:pb-24 text-center">
        <div className="animate-fade-in">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            AI-Powered Ethics Evaluation
          </span>
          <h1 className="mt-6 heading-xl max-w-4xl mx-auto text-balance">
            Compliance and Ethics for the AI Era
          </h1>
          <p className="mt-6 paragraph max-w-2xl mx-auto">
            EthicX helps organizations assess datasets for ethical standards and regulatory 
            compliance using advanced AI models. Identify data biases, compliance breaches,
            and integrity issues before they become problems.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard" className="btn-primary">
              Start Analyzing
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/dashboard#demo" className="btn-secondary">
              View Demo
            </Link>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { label: 'Compliance Checks', value: '50+' },
            { label: 'Data Processed', value: '500M+' },
            { label: 'Organizations', value: '200+' }
          ].map((stat, idx) => (
            <div 
              key={stat.label}
              ref={el => featureRefs.current[idx] = el}
              className="glass-card px-6 py-8 animate-on-scroll"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <p className="text-4xl font-bold text-primary">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Features section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="heading-lg">Key Features</h2>
          <p className="mt-4 paragraph max-w-2xl mx-auto">
            Our platform provides comprehensive tools to analyze, evaluate, and improve 
            your data's ethical and compliance standards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="h-10 w-10 text-primary" />,
              title: 'Compliance Scoring',
              description: 'Evaluate your datasets against industry standards and regulatory requirements.'
            },
            {
              icon: <BarChart3 className="h-10 w-10 text-primary" />,
              title: 'Data Insights',
              description: 'Identify patterns, biases, and anomalies in your data with advanced AI analysis.'
            },
            {
              icon: <Check className="h-10 w-10 text-primary" />,
              title: 'Automated Reports',
              description: 'Generate detailed compliance reports with actionable recommendations.'
            }
          ].map((feature, idx) => (
            <div 
              key={feature.title}
              ref={el => featureRefs.current[idx + 3] = el}
              className="glass-card px-6 py-8 flex flex-col items-center text-center animate-on-scroll"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="p-3 rounded-full bg-blue-50">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-xl font-medium">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
