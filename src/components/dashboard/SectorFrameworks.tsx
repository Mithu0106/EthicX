
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { BookOpen, ShieldCheck, AlertTriangle } from 'lucide-react';

interface Framework {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface RiskMitigation {
  title: string;
  description: string;
}

interface SectorDetails {
  title: string;
  icon: string;
  description: string;
  frameworks: Framework[];
  riskMitigation: RiskMitigation[];
}

interface SectorFrameworksProps {
  sectorId: string;
}

const SectorFrameworks: React.FC<SectorFrameworksProps> = ({ sectorId }) => {
  const sectorDetails: Record<string, SectorDetails> = {
    "general": {
      title: "General AI Systems 🤖",
      icon: "🤖",
      description: "General purpose AI systems that can be applied across multiple domains",
      frameworks: [
        { 
          name: "OECD AI Principles", 
          description: "International standard for responsible AI development and deployment",
          priority: 'high' 
        },
        { 
          name: "NIST AI Risk Management Framework", 
          description: "Comprehensive approach to identifying and managing AI risks",
          priority: 'high' 
        },
        { 
          name: "ISO/IEC 23894", 
          description: "International standard providing guidelines for AI risk management",
          priority: 'medium' 
        }
      ],
      riskMitigation: [
        {
          title: "Regular Bias Audits",
          description: "Conduct regular audits to detect and eliminate biases in AI systems"
        },
        {
          title: "Documentation & Transparency",
          description: "Maintain detailed documentation about training data, model architecture, and decision-making processes"
        },
        {
          title: "Human Oversight",
          description: "Ensure human supervision for critical AI decisions"
        }
      ]
    },
    "healthcare": {
      title: "Healthcare AI 🏥",
      icon: "🏥",
      description: "AI systems designed for medical diagnosis, treatment planning, and healthcare management",
      frameworks: [
        { 
          name: "EU AI Act (High Risk)", 
          description: "European regulation classifying most healthcare AI as high-risk systems",
          priority: 'high' 
        },
        { 
          name: "HIPAA (US)", 
          description: "Privacy and security regulations for protected health information",
          priority: 'high' 
        },
        { 
          name: "MDR (EU Medical Device Regulation)", 
          description: "Regulatory framework for medical devices including software as medical device",
          priority: 'high' 
        },
        { 
          name: "FDA AI/ML Guidelines", 
          description: "US Food and Drug Administration guidance for AI/ML-based medical devices",
          priority: 'medium' 
        }
      ],
      riskMitigation: [
        {
          title: "Clinical Validation",
          description: "Validate AI outcomes against clinical expertise and established medical practices"
        },
        {
          title: "Protected Health Information Security",
          description: "Implement robust security measures for all patient data"
        },
        {
          title: "Explainability for Medical Decisions",
          description: "Ensure AI decisions can be explained to healthcare providers and patients"
        }
      ]
    },
    "finance": {
      title: "Financial/Fintech AI 💰",
      icon: "💰",
      description: "AI systems for financial analysis, risk assessment, fraud detection, and automated trading",
      frameworks: [
        { 
          name: "EU AI Act (High Risk)", 
          description: "European regulation classifying many financial AI systems as high-risk",
          priority: 'high' 
        },
        { 
          name: "Basel AI Principles", 
          description: "Guidelines for the use of AI in banking and finance",
          priority: 'medium' 
        },
        { 
          name: "FFIEC Guidelines (US)", 
          description: "Federal Financial Institutions Examination Council guidance on AI implementation",
          priority: 'high' 
        },
        { 
          name: "FCA AI Guidance (UK)", 
          description: "Financial Conduct Authority guidance on responsible AI in financial services",
          priority: 'medium' 
        }
      ],
      riskMitigation: [
        {
          title: "Consumer Financial Protection",
          description: "Ensure AI systems don't discriminate based on protected characteristics"
        },
        {
          title: "Model Risk Management",
          description: "Implement robust model governance, validation, and monitoring processes"
        },
        {
          title: "Audit Trails",
          description: "Maintain comprehensive audit trails for all AI-based financial decisions"
        }
      ]
    },
    "government": {
      title: "Government/Public Sector 🏛️",
      icon: "🏛️",
      description: "AI systems used in public services, policy-making, and governmental operations",
      frameworks: [
        { 
          name: "Transparency Requirements (EU)", 
          description: "Requirements for transparency in algorithmic decision-making affecting citizens",
          priority: 'high' 
        },
        { 
          name: "OECD AI Governance in Public Sector", 
          description: "Guidelines for implementing AI in government and public services",
          priority: 'medium' 
        },
        { 
          name: "Responsible AI in India (NITI)", 
          description: "NITI Aayog framework for responsible AI implementation in public services",
          priority: 'medium' 
        }
      ],
      riskMitigation: [
        {
          title: "Public Consultation",
          description: "Engage with citizens and stakeholders when deploying AI in public services"
        },
        {
          title: "Impact Assessments",
          description: "Conduct algorithmic impact assessments before deploying AI systems"
        },
        {
          title: "Oversight Committees",
          description: "Establish independent oversight committees to monitor AI implementations"
        }
      ]
    },
    "education": {
      title: "Education AI 🎓",
      icon: "🎓",
      description: "AI systems for learning management, student assessment, and educational content creation",
      frameworks: [
        { 
          name: "UNESCO AI in Education Ethics", 
          description: "Guidelines for ethical use of AI in educational contexts",
          priority: 'high' 
        },
        { 
          name: "OECD AI Principles", 
          description: "General AI principles adapted to educational contexts",
          priority: 'medium' 
        },
        { 
          name: "GDPR / FERPA (US)", 
          description: "Data privacy regulations protecting student information",
          priority: 'high' 
        }
      ],
      riskMitigation: [
        {
          title: "Student Data Protection",
          description: "Implement strict data protection measures for all student information"
        },
        {
          title: "Pedagogical Validation",
          description: "Ensure AI educational tools are validated by education experts"
        },
        {
          title: "Accessibility",
          description: "Design AI systems to be accessible to students with diverse needs and abilities"
        }
      ]
    }
  };

  const selectedSector = sectorDetails[sectorId] || sectorDetails.general;

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
      <div className="flex items-center mb-3">
        <BookOpen className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-md font-medium">{selectedSector.title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">{selectedSector.description}</p>
      
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="frameworks">
          <AccordionTrigger>
            <div className="flex items-center">
              <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
              <span>Recommended Frameworks</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {selectedSector.frameworks.map((framework, index) => (
                <div key={index} className="flex items-start p-3 bg-white rounded-md border border-gray-100">
                  <div>
                    <h4 className="font-medium text-sm flex items-center">
                      {framework.name}
                      <span className={`ml-2 px-1.5 py-0.5 ${getPriorityStyles(framework.priority)} rounded-full text-xs`}>
                        {framework.priority} priority
                      </span>
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{framework.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="mitigation">
          <AccordionTrigger>
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-primary" />
              <span>Risk Mitigation Strategies</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {selectedSector.riskMitigation.map((strategy, index) => (
                <div key={index} className="p-3 bg-white rounded-md border border-gray-100">
                  <h4 className="font-medium text-sm">{strategy.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{strategy.description}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SectorFrameworks;
