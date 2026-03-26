import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { useRouter } from 'next/router';

// Helper functions for validation
function validateCardNumber(number) {
  const cleanNumber = number.replace(/\D/g, '');
  if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;
  
  let sum = 0;
  let shouldDouble = false;
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function validateCPF(cpf) {
  const cleanCpf = cpf.replace(/\D/g, '');
  return cleanCpf.length === 11;
}

function formatCardNumber(value) {
  const cleanValue = value.replace(/\D/g, '');
  const chunks = cleanValue.match(/.{1,4}/g);
  return chunks ? chunks.join(' ') : value;
}

function formatExpiry(value) {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length >= 3) {
    return `${cleanValue.substring(0, 2)}/${cleanValue.substring(2, 4)}`;
  }
  return cleanValue;
}

function formatCPF(value) {
  const cleanValue = value.replace(/\D/g, '');
  return cleanValue
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .substring(0, 14);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { plan } = router.query;
  
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Credit Card State
  const [ccData, setCcData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  // PIX State
  const [pixData, setPixData] = useState({
    cpf: '',
    name: ''
  });

  const handleCcChange = (e) => {
    let { name, value } = e.target;
    if (name === 'number') value = formatCardNumber(value).substring(0, 19);
    if (name === 'expiry') value = formatExpiry(value).substring(0, 5);
    if (name === 'cvv') value = value.replace(/\D/g, '').substring(0, 4);
    
    setCcData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handlePixChange = (e) => {
    let { name, value } = e.target;
    if (name === 'cpf') value = formatCPF(value);
    
    setPixData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (paymentMethod === 'credit_card') {
      if (!validateCardNumber(ccData.number)) newErrors.number = 'Invalid card number';
      if (!ccData.name) newErrors.name = 'Cardholder name is required';
      if (ccData.expiry.length !== 5) newErrors.expiry = 'Invalid expiry date';
      if (ccData.cvv.length < 3) newErrors.cvv = 'Invalid CVV';
    } else {
      if (!validateCPF(pixData.cpf)) newErrors.cpf = 'Invalid CPF';
      if (!pixData.name) newErrors.name = 'Payer name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call to payment gateway
    setTimeout(() => {
      setIsProcessing(false);
      // Determine success randomly or based on input (assuming success for demo)
      router.push('/payment-success');
    }, 2000);
  };

  const planName = plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : 'Growth';
  const planPrice = plan === 'starter' ? '$29' : plan === 'agency' ? '$199' : '$79';

  return (
    <ProtectedRoute>
      <Head>
        <title>Checkout - struqt</title>
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">Secure Checkout</h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Payment Section */}
              <div className="flex-grow">
                {/* Method Toggle */}
                <div className="bg-white rounded-t-xl shadow-sm border border-gray-200 border-b-0 overflow-hidden flex">
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`flex-1 py-4 font-medium text-sm transition ${paymentMethod === 'credit_card' ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    Credit Card
                  </button>
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`flex-1 py-4 font-medium text-sm transition ${paymentMethod === 'pix' ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    PIX (Brasil)
                  </button>
                </div>

                <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                  <form onSubmit={handleCheckout}>
                    
                    {/* Credit Card Form */}
                    {paymentMethod === 'credit_card' && (
                      <div className="space-y-5 animate-fade-in">
                        {/* Mock Card Preview */}
                        <div className="w-full max-w-sm mx-auto h-48 bg-gradient-to-tr from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 flex flex-col justify-between text-white mb-8 border border-gray-700">
                          <div className="flex justify-between items-center">
                            <div className="w-12 h-8 bg-gray-300 rounded opacity-80 backdrop-blur-sm"></div>
                            <span className="font-bold italic opacity-50">CARD</span>
                          </div>
                          <div>
                            <p className="text-xl tracking-widest font-mono opacity-90">{ccData.number || '•••• •••• •••• ••••'}</p>
                            <div className="flex justify-between mt-4">
                              <p className="font-medium truncate mr-4 uppercase text-sm">{ccData.name || 'YOUR NAME'}</p>
                              <p className="font-mono text-sm">{ccData.expiry || 'MM/YY'}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <input 
                            name="number"
                            type="text" 
                            placeholder="0000 0000 0000 0000"
                            value={ccData.number}
                            onChange={handleCcChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 sm:text-sm ${errors.number ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'}`}
                          />
                          {errors.number && <p className="mt-1 text-xs text-red-500">{errors.number}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                          <input 
                            name="name"
                            type="text" 
                            placeholder="Name exactly as on card"
                            value={ccData.name}
                            onChange={handleCcChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 sm:text-sm ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'}`}
                          />
                          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input 
                              name="expiry"
                              type="text" 
                              placeholder="MM/YY"
                              value={ccData.expiry}
                              onChange={handleCcChange}
                              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 sm:text-sm ${errors.expiry ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'}`}
                            />
                            {errors.expiry && <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input 
                              name="cvv"
                              type="password" 
                              placeholder="123"
                              maxLength="4"
                              value={ccData.cvv}
                              onChange={handleCcChange}
                              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 sm:text-sm ${errors.cvv ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'}`}
                            />
                            {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PIX Form */}
                    {paymentMethod === 'pix' && (
                      <div className="space-y-5 animate-fade-in">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                          <p className="text-sm text-green-800">
                            <strong>10% Discount applied</strong> for PIX payments. A QR Code will be generated after confirming your details.
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input 
                            name="name"
                            type="text" 
                            placeholder="Your full legal name"
                            value={pixData.name}
                            onChange={handlePixChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 sm:text-sm ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'}`}
                          />
                          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                          <input 
                            name="cpf"
                            type="text" 
                            placeholder="000.000.000-00"
                            value={pixData.cpf}
                            onChange={handlePixChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 sm:text-sm ${errors.cpf ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'}`}
                          />
                          {errors.cpf && <p className="mt-1 text-xs text-red-500">{errors.cpf}</p>}
                        </div>
                      </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <button 
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white ${isProcessing ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 hover:-translate-y-0.5'} transition-all`}
                      >
                        {isProcessing 
                          ? 'Processing secure payment...' 
                          : `Pay ${paymentMethod === 'pix' ? 'with PIX' : planPrice + '/mo'}`}
                      </button>
                      <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Guaranteed secure and encrypted checkout
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-28">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                  
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">{planName} Plan</p>
                      <p className="text-sm text-gray-500">Monthly subscription</p>
                    </div>
                    <p className="font-bold text-gray-900">{planPrice}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex text-sm text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Instant access to features
                    </li>
                    <li className="flex text-sm text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Cancel anytime
                    </li>
                  </ul>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <p className="font-medium text-gray-900">Total Due Today</p>
                    <p className="text-2xl font-extrabold text-primary-600">{planPrice}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
