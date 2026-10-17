import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    title: 'Construtor de Leads',
    description: 'Crie experiências interativas com lógica condicional',
    route: '/builder',
    icon: (
      <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    title: 'Qualificação de Leads',
    description: 'Segmente automaticamente usuários com base nas respostas',
    route: '/qualification',
    icon: (
      <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    title: 'Dashboard de Performance',
    description: 'Acompanhe métricas e conversões em tempo real',
    route: '/dashboard',
    icon: (
      <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
];

export default function Features() {
  const router = useRouter();
  const { user } = useAuth();
  
  const handleNavigation = (route) => {
    const isAuthenticated = !!user;
    if (isAuthenticated) {
      router.push(route);
    } else {
      router.push(`/login?redirect=${route}`);
    }
  };

  return (
    <section id="features" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm">Posicionamento</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Mais do que formulários. Um sistema de crescimento.
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            O struqt transforma visitantes em leads qualificados e leads em oportunidades reais, com dados e automação integrados.
          </p>
        </div>

        <div className="mt-10">
          <div className="flex flex-wrap -mx-4 gap-y-10 justify-center">
            {features.map((feature, index) => (
              <div key={index} className="w-full lg:w-1/3 px-4 flex">
                <div 
                  onClick={() => handleNavigation(feature.route)}
                  className="glass-card flex-1 p-8 text-left group hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer rounded-2xl flex flex-col"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary-100/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                  <button className="mt-6 text-primary-600 font-medium text-left group-hover:text-primary-700 transition-colors flex items-center">
                    Acessar ferramenta 
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
