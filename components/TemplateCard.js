import React from 'react';
import Link from 'next/link';

export default function TemplateCard({ template }) {
  const { theme, niche, title, description, style, preview_elements } = template;
  
  return (
    <div className={`snap-start min-w-[320px] md:min-w-[400px] flex-shrink-0 flex flex-col justify-between ${style.background} ${style.text} ${style.card} hover:scale-[1.02] transition-transform duration-300 cursor-pointer group`}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-bold uppercase tracking-wider opacity-80 py-1 px-2 rounded-md bg-black/10">
            {niche}
          </span>
          <svg className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${theme === 'dark' ? 'text-white' : 'text-primary-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>

        {preview_elements && (
          <div className="space-y-2 mb-6">
            <p className="text-xs font-semibold opacity-70 uppercase">Preview Elements:</p>
            <ul className="space-y-1">
              {preview_elements.map((el, i) => (
                <li key={i} className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-2 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {el}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-500/20">
        <Link href={`/templates/${template.id || 'demo'}`} className={`font-medium text-sm flex items-center ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'} transition-colors`}>
          Use this template
          <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
