import React from 'react';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-indigo-900 z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl mix-blend-overlay"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
          Pronto para criar seu primeiro funil em minutos?
        </h2>
        <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
          Junte-se a centenas de empresas que já transformaram seus formulários estáticos em máquinas de conversão.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/signup" className="px-8 py-4 bg-white text-primary-900 text-lg font-bold rounded-xl shadow-xl hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-200">
            Começar Grátis Agora
          </Link>
          <Link href="#pricing" className="px-8 py-4 bg-transparent border border-white/30 text-white text-lg font-medium rounded-xl hover:bg-white/10 transition-all duration-200">
            Ver Planos
          </Link>
        </div>
      </div>
    </section>
  );
}
