interface FAQItemType {
  q: string;
  a: string;
}

export interface FAQSectionProps {
  faqs: FAQItemType[];
  openFaq: number | null;
  setOpenFaq: (i: number | null) => void;
}

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

export interface FAQProps {
  search: string;
  category: string;
  setSearch: (e: string) => void;
  setCategory: (c: string) => void;
  filteredFaqs: FAQItem[];
  faqOpen: number | null;
  setFaqOpen: (faqOpen: number | null) => void;
}