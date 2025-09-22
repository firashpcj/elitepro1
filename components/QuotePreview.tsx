import React from 'react';
import { Quote, CompanyProfile, QuoteTemplate } from '../types';
import { StandardTemplate } from './templates/StandardTemplate';
import { CorporateTemplate } from './templates/CorporateTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';

interface QuotePreviewProps {
  quote: Quote;
  company: CompanyProfile;
}

export const QuotePreview: React.FC<QuotePreviewProps> = ({ quote, company }) => {
  switch (quote.template) {
    case QuoteTemplate.CORPORATE:
      return <CorporateTemplate quote={quote} company={company} />;
    case QuoteTemplate.CREATIVE:
      return <CreativeTemplate quote={quote} company={company} />;
    case QuoteTemplate.STANDARD:
    default:
      return <StandardTemplate quote={quote} company={company} />;
  }
};