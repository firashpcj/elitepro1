import React, { useEffect } from 'react';
import { CompanyProfile, Quote, LineItem, QuoteTemplate } from '../types';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from './Button';
import { LineItemRow } from './LineItemRow';
import { formatCurrency } from '../utils/helpers';
import { PlusIcon } from './icons/Icons';

interface QuoteFormProps {
  profiles: CompanyProfile[];
  quote: Quote;
  onQuoteChange: (quote: Quote) => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ profiles, quote, onQuoteChange }) => {

  useEffect(() => {
    if (profiles.length > 0 && !quote.companyProfileId) {
      onQuoteChange({ ...quote, companyProfileId: profiles[0].id });
    }
  }, [profiles, quote.companyProfileId, onQuoteChange, quote]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onQuoteChange({ ...quote, [name]: name === 'vatRate' ? parseFloat(value) || 0 : value });
  };

  const handleLineItemChange = (index: number, updatedItem: LineItem) => {
    const newLineItems = [...quote.lineItems];
    newLineItems[index] = updatedItem;
    onQuoteChange({ ...quote, lineItems: newLineItems });
  };

  const addLineItem = () => {
    onQuoteChange({
      ...quote,
      lineItems: [...quote.lineItems, { id: new Date().toISOString(), description: '', quantity: 1, unitPrice: 0 }],
    });
  };

  const removeLineItem = (index: number) => {
    const newLineItems = quote.lineItems.filter((_, i) => i !== index);
    onQuoteChange({ ...quote, lineItems: newLineItems });
  };

  const setTemplate = (template: QuoteTemplate) => {
    onQuoteChange({ ...quote, template });
  };

  const subtotal = quote.lineItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const vatAmount = subtotal * (quote.vatRate / 100);
  const grandTotal = subtotal + vatAmount;

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Quote Details</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="companyProfileId" className="block text-sm font-medium text-gray-700">Company Profile</label>
          <select id="companyProfileId" name="companyProfileId" value={quote.companyProfileId} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md" required>
            <option value="" disabled>Select a profile</option>
            {profiles.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quote Design</label>
          <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
            {Object.values(QuoteTemplate).map(template => (
              <button
                key={template}
                type="button"
                onClick={() => setTemplate(template)}
                className={`w-full px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  quote.template === template
                    ? 'bg-primary text-white shadow'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                aria-pressed={quote.template === template}
              >
                {template}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Quote Number" id="quoteNumber" name="quoteNumber" value={quote.quoteNumber} onChange={handleChange} required/>
            <Input label="Date" id="date" name="date" type="date" value={quote.date} onChange={handleChange} required/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
                <Input label="Customer Name" id="customerName" name="customerName" value={quote.customerName} onChange={handleChange} required/>
            </div>
            <div className="md:col-span-1">
                <Input label="Validity" id="validity" name="validity" value={quote.validity} onChange={handleChange} />
            </div>
            <div className="md:col-span-1">
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
                <select id="currency" name="currency" value={quote.currency} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md" required>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>JPY</option>
                    <option>CAD</option>
                    <option>AUD</option>
                    <option>SAR</option>
                </select>
            </div>
        </div>

        <Textarea label="Subject" id="subject" name="subject" value={quote.subject} onChange={handleChange} required/>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-700">Line Items</h3>
        {quote.lineItems.map((item, index) => (
          <LineItemRow
            key={item.id}
            item={item}
            index={index}
            onChange={handleLineItemChange}
            onRemove={removeLineItem}
          />
        ))}
        <Button type="button" variant="secondary" onClick={addLineItem}>
          <PlusIcon className="h-5 w-5 mr-2" /> Add Item
        </Button>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-3 text-right font-medium">Subtotal:</div>
            <div className="text-right">{formatCurrency(subtotal, quote.currency)}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-3 text-right font-medium flex items-center justify-end">
                VAT @ 
                <input type="number" name="vatRate" value={quote.vatRate} onChange={handleChange} className="w-16 mx-2 text-right border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"/>
                 %:
            </div>
            <div className="text-right">{formatCurrency(vatAmount, quote.currency)}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center font-bold text-lg text-primary">
            <div className="md:col-span-3 text-right">Grand Total:</div>
            <div className="text-right">{formatCurrency(grandTotal, quote.currency)}</div>
        </div>
      </div>
    </form>
  );
};