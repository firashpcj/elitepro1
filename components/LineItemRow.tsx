import React, { useState, useEffect } from 'react';
import { LineItem } from '../types';
import { Button } from './Button';
import { SparklesIcon, TrashIcon } from './icons/Icons';
import { generateDescription } from '../services/geminiService';

interface LineItemRowProps {
  item: LineItem;
  index: number;
  onChange: (index: number, item: LineItem) => void;
  onRemove: (index: number) => void;
}

export const LineItemRow: React.FC<LineItemRowProps> = ({ item, index, onChange, onRemove }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Trigger the animation shortly after mounting
    const timer = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(index, { ...item, [name]: name === 'description' ? value : parseFloat(value) || 0 });
  };
  
  const handleGenerateDescription = async () => {
    if(!item.description) {
        alert("Please provide a keyword or a brief description to generate content.");
        return;
    }
    setIsGenerating(true);
    try {
        const generatedText = await generateDescription(item.description);
        onChange(index, { ...item, description: generatedText });
    } catch(error) {
        console.error("Error generating description:", error);
        alert("Failed to generate description. Please check your API key and try again.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className={`grid grid-cols-12 gap-2 items-start p-2 rounded-md hover:bg-gray-50 transition-all duration-300 ease-out ${isMounted ? 'opacity-100' : 'opacity-0 -translate-y-2'}`}>
      <div className="col-span-12 md:col-span-6">
        <label className="text-xs text-gray-500">Description</label>
        <div className="relative">
            <textarea
                name="description"
                value={item.description}
                onChange={(e) => onChange(index, { ...item, description: e.target.value })}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm pr-10"
                rows={2}
                placeholder="Product or service"
            />
            <Button
                type="button"
                onClick={handleGenerateDescription}
                className="!p-1 absolute top-1 right-1 h-8 w-8 !rounded-full"
                variant="secondary"
                isLoading={isGenerating}
                title="Generate with AI"
            >
                {!isGenerating && <SparklesIcon className="h-4 w-4 text-primary" />}
            </Button>
        </div>
      </div>
      <div className="col-span-4 md:col-span-2">
        <label className="text-xs text-gray-500">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div className="col-span-4 md:col-span-2">
        <label className="text-xs text-gray-500">Unit Price</label>
        <input
          type="number"
          name="unitPrice"
          value={item.unitPrice}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div className="col-span-4 md:col-span-2 flex items-end h-full">
        <Button type="button" variant="danger" onClick={() => onRemove(index)} className="w-full">
          <TrashIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};