
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Globe, FileText, Check, AlertTriangle, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Regulation {
  name: string;
  description: string;
  critical: boolean;
  officialLink?: string;
  extendedDescription?: string;
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
          critical: true,
          officialLink: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52021PC0206",
          extendedDescription: "The EU AI Act establishes a comprehensive regulatory framework for artificial intelligence systems. It categorizes AI applications into different risk levels (unacceptable risk, high risk, limited risk, and minimal risk) with specific compliance requirements for each category to ensure AI is safe, transparent, and respects fundamental rights."
        },
        { 
          name: "GDPR", 
          description: "Data protection and privacy regulations that impact how AI systems can collect, process, and store personal data.", 
          critical: true,
          officialLink: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679",
          extendedDescription: "The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy that applies to all organizations processing personal data of EU residents. For AI systems, GDPR imposes specific requirements on automated decision-making, requiring transparency, lawful basis for processing, and protection of individuals' rights."
        },
        { 
          name: "Digital Services Act", 
          description: "New rules for online platforms, establishing transparency and accountability for digital services.", 
          critical: false,
          officialLink: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52020PC0825",
          extendedDescription: "The Digital Services Act (DSA) is part of the EU digital strategy that updates the e-Commerce Directive. It establishes a new accountability framework for online platforms, particularly for content moderation, algorithmic transparency, and systemic risks. AI systems that moderate content or make decisions about information presented to users are particularly impacted."
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
          critical: true,
          officialLink: "https://www.nist.gov/system/files/documents/2021/09/22/AI-RMF-Preliminary-Report.pdf",
          extendedDescription: "The NIST AI Risk Management Framework provides a voluntary, risk-based approach for managing AI technologies. It helps organizations identify, assess, and reduce risks associated with the design, development, use, and evaluation of AI products, services, and systems."
        },
        { 
          name: "Algorithmic Accountability Act", 
          description: "Proposed legislation requiring companies to assess and address the impacts of their automated decision systems.", 
          critical: false,
          officialLink: "https://www.congress.gov/bill/117th-congress/house-bill/2231",
          extendedDescription: "The Algorithmic Accountability Act is proposed U.S. legislation that would require companies to conduct impact assessments of automated decision systems. The bill aims to increase transparency of algorithmic systems and ensure they don't result in inaccurate, unfair, biased, or discriminatory decisions."
        },
        { 
          name: "California CPRA", 
          description: "Enhanced privacy regulations that affect AI systems processing personal data of California residents.", 
          critical: true,
          officialLink: "https://oag.ca.gov/privacy/ccpa",
          extendedDescription: "The California Privacy Rights Act (CPRA) expands the California Consumer Privacy Act (CCPA) with additional privacy protections. For AI systems, it includes specific provisions about automated decision-making, profiling, and the right to opt out of the sale or sharing of personal information for targeted advertising."
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
          critical: true,
          officialLink: "https://www.indiacode.nic.in/handle/123456789/2063",
          extendedDescription: "The Digital Personal Data Protection (DPDP) Act 2023 is India's comprehensive data protection law. It establishes rules for processing personal data of Indian residents, requiring consent, purpose limitation, data minimization, and security safeguards - all especially relevant for AI systems that process personal information."
        },
        { 
          name: "NITI Aayog Responsible AI Guidelines", 
          description: "Framework for responsible AI development emphasizing ethics, fairness, and accountability.", 
          critical: false,
          officialLink: "https://niti.gov.in/sites/default/files/2020-06/Responsible-AI-Book.pdf",
          extendedDescription: "NITI Aayog's Responsible AI Guidelines provide a framework for the ethical development and deployment of AI in India. The guidelines emphasize principles such as fairness, reliability, safety, privacy and security, inclusivity, transparency, and accountability to ensure AI benefits society while minimizing harm."
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
          critical: true,
          officialLink: "https://www.parl.ca/DocumentViewer/en/44-1/bill/C-27/first-reading",
          extendedDescription: "The Artificial Intelligence and Data Act (AIDA) is part of Bill C-27 in Canada that establishes rules for the design, development, and deployment of high-impact AI systems. It requires risk assessments, mitigation measures, monitoring for harm, and transparency in automated decision systems."
        },
        { 
          name: "PIPEDA", 
          description: "Privacy regulations affecting how AI systems can collect, use, and disclose personal information.", 
          critical: true,
          officialLink: "https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/pipeda/",
          extendedDescription: "The Personal Information Protection and Electronic Documents Act (PIPEDA) is Canada's federal privacy law governing how private sector organizations collect, use, and disclose personal information. For AI systems, PIPEDA requires informed consent, purpose limitation, and imposes restrictions on automated decision-making."
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
          critical: false,
          officialLink: "https://www.imda.gov.sg/infocomm-and-media-news/2020/01/ai-governance-framework",
          extendedDescription: "Singapore's Model AI Governance Framework provides detailed guidance to help organizations implement responsible AI governance practices. The framework focuses on four key areas: internal governance structures and measures, determining AI decision-making models, operations management, and stakeholder interaction and communication."
        },
        { 
          name: "Personal Data Protection Act (PDPA)", 
          description: "Regulations governing the collection, use, and disclosure of personal data by AI systems.", 
          critical: true,
          officialLink: "https://sso.agc.gov.sg/Acts/PDPA2012",
          extendedDescription: "Singapore's Personal Data Protection Act (PDPA) establishes rules governing the collection, use, disclosure and care of personal data. For AI systems, it requires consent for data collection and processing, purpose limitation, and reasonable security arrangements to protect personal data."
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
          critical: true,
          officialLink: "https://www.oecd.org/going-digital/ai/principles/",
          extendedDescription: "The OECD AI Principles, adopted by OECD member countries in May 2019, promote artificial intelligence that is innovative and trustworthy and that respects human rights and democratic values. They include principles for responsible stewardship of trustworthy AI and recommendations for national policies and international cooperation."
        },
        { 
          name: "UNESCO AI Ethics Recommendation", 
          description: "The first global standard-setting framework to address the ethics of artificial intelligence.", 
          critical: false,
          officialLink: "https://en.unesco.org/artificial-intelligence/ethics",
          extendedDescription: "UNESCO's Recommendation on the Ethics of Artificial Intelligence is the first global normative instrument that provides a comprehensive framework for ethical AI governance. It outlines principles including human dignity, human rights protection, environment sustainability, transparency, fairness, privacy, and human oversight."
        },
        { 
          name: "ISO/IEC 23894", 
          description: "International standard providing guidelines for AI risk management.", 
          critical: true,
          officialLink: "https://www.iso.org/standard/77304.html",
          extendedDescription: "ISO/IEC 23894 provides guidelines for AI risk management within the broader ISO 31000 risk management framework. It helps organizations identify, assess, and treat risks related to the development and use of AI systems, focusing on impacts to individuals, organizations, and society."
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
                  <div className="flex-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <h4 className="font-medium text-sm flex items-center cursor-pointer text-primary hover:underline">
                          {regulation.name}
                          {regulation.critical && (
                            <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs">
                              Critical
                            </span>
                          )}
                        </h4>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>{regulation.name}</DialogTitle>
                          <DialogDescription>
                            {regulation.critical ? "Critical regulation for compliance" : "Recommended regulation"}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-sm text-gray-700 mb-4">{regulation.extendedDescription}</p>
                          <div className="flex justify-end">
                            <Button
                              variant="outline"
                              className="mr-2"
                              onClick={() => window.open(regulation.officialLink, '_blank', 'noopener,noreferrer')}
                            >
                              View Official Document <ExternalLink className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <p className="text-sm text-gray-600 mt-1">{regulation.description}</p>
                    <a 
                      href={regulation.officialLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center mt-2 text-xs font-medium text-primary hover:underline"
                    >
                      Official Document <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
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
