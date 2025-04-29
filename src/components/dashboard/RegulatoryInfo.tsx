
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Globe, FileText, Check, AlertTriangle } from 'lucide-react';

interface Regulation {
  name: string;
  description: string;
  critical: boolean;
}

interface RegulatoryInfoProps {
  geography: string;
}

const RegulatoryInfo: React.FC<RegulatoryInfoProps> = ({ geography }) => {
  const geographyDetails: Record<string, { displayName: string, icon: string, regulations: Regulation[] }> = {
    "eu": {
      displayName: "European Union 🇪🇺",
      icon: "🇪🇺",
      regulations: [
        { 
          name: "EU AI Act", 
          description: "Risk-based classification system for AI applications with varying requirements based on risk level.", 
          critical: true 
        },
        { 
          name: "GDPR", 
          description: "Data protection and privacy regulations that impact how AI systems can collect, process, and store personal data.", 
          critical: true 
        },
        { 
          name: "Digital Services Act", 
          description: "New rules for online platforms, establishing transparency and accountability for digital services.", 
          critical: false 
        }
      ]
    },
    "us": {
      displayName: "United States 🇺🇸",
      icon: "🇺🇸",
      regulations: [
        { 
          name: "NIST AI Risk Management Framework", 
          description: "Voluntary framework to better manage risks to individuals, organizations, and society associated with AI.", 
          critical: true 
        },
        { 
          name: "Algorithmic Accountability Act", 
          description: "Proposed legislation requiring companies to assess and address the impacts of their automated decision systems.", 
          critical: false 
        },
        { 
          name: "California CPRA", 
          description: "Enhanced privacy regulations that affect AI systems processing personal data of California residents.", 
          critical: true 
        }
      ]
    },
    "india": {
      displayName: "India 🇮🇳",
      icon: "🇮🇳",
      regulations: [
        { 
          name: "DPDP Act 2023", 
          description: "India's data protection regulation governing the processing of personal data by AI systems.", 
          critical: true 
        },
        { 
          name: "NITI Aayog Responsible AI Guidelines", 
          description: "Framework for responsible AI development emphasizing ethics, fairness, and accountability.", 
          critical: false 
        }
      ]
    },
    "canada": {
      displayName: "Canada 🇨🇦",
      icon: "🇨🇦",
      regulations: [
        { 
          name: "Artificial Intelligence and Data Act (AIDA)", 
          description: "Framework to regulate international and interprovincial trade in artificial intelligence systems.", 
          critical: true 
        },
        { 
          name: "PIPEDA", 
          description: "Privacy regulations affecting how AI systems can collect, use, and disclose personal information.", 
          critical: true 
        }
      ]
    },
    "singapore": {
      displayName: "Singapore 🇸🇬",
      icon: "🇸🇬",
      regulations: [
        { 
          name: "Model AI Governance Framework", 
          description: "Voluntary framework to guide private sector organizations to deploy AI responsibly.", 
          critical: false 
        },
        { 
          name: "Personal Data Protection Act (PDPA)", 
          description: "Regulations governing the collection, use, and disclosure of personal data by AI systems.", 
          critical: true 
        }
      ]
    },
    "global": {
      displayName: "Global Standards 🌍",
      icon: "🌍",
      regulations: [
        { 
          name: "OECD AI Principles", 
          description: "Principles promoting AI that is innovative, trustworthy, and respects human rights and democratic values.", 
          critical: true 
        },
        { 
          name: "UNESCO AI Ethics Recommendation", 
          description: "The first global standard-setting framework to address the ethics of artificial intelligence.", 
          critical: false 
        },
        { 
          name: "ISO/IEC 23894", 
          description: "International standard providing guidelines for AI risk management.", 
          critical: true 
        }
      ]
    }
  };

  const currentGeography = geographyDetails[geography] || geographyDetails.global;

  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
      <div className="flex items-center mb-3">
        <Globe className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-md font-medium">{currentGeography.displayName} Regulations</h3>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="regulations">
          <AccordionTrigger>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2 text-primary" />
              <span>Applicable Regulations</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {currentGeography.regulations.map((regulation, index) => (
                <div key={index} className="flex items-start p-3 bg-white rounded-md border border-gray-100">
                  {regulation.critical ? (
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="font-medium text-sm">
                      {regulation.name}
                      {regulation.critical && (
                        <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs">
                          Critical
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{regulation.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default RegulatoryInfo;
