import React, { useState, useCallback } from 'react';
import { FarmerInput, PredictionResult, View, Language } from './types';
import { getFarmingAdvice } from './services/geminiService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FarmerInputForm from './components/FarmerInputForm';
import Dashboard from './components/Dashboard';
import Spinner from './components/Spinner';
import MarketInfo from './components/MarketInfo';
import Reports from './components/Reports';
import LandMaintenance from './components/LandMaintenance';
import Loans from './components/Loans';
import Chatbot from './components/Chatbot';
import { translations } from './lib/translations';

const App: React.FC = () => {
  const [view, setView] = useState<View>('input');
  const [farmerInput, setFarmerInput] = useState<FarmerInput | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const t = useCallback((key: keyof typeof translations['en']) => {
    return translations[language][key] || translations['en'][key];
  }, [language]);

  const handleGetAdvice = useCallback(async (input: FarmerInput) => {
    setIsLoading(true);
    setError(null);
    setFarmerInput(input);
    try {
      const result = await getFarmingAdvice(input, language);
      setPredictionResult(result);
      setView('dashboard');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setView('input');
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Spinner />
          <p className="mt-4 text-lg text-brand-green-800">{t('analyzingData')}</p>
        </div>
      );
    }

    switch (view) {
      case 'dashboard':
        return predictionResult && farmerInput ? <Dashboard result={predictionResult} input={farmerInput} t={t} /> : <FarmerInputForm onSubmit={handleGetAdvice} t={t} language={language} />;
      case 'maintenance':
        return predictionResult ? <LandMaintenance result={predictionResult} t={t} /> : <p className="text-center p-8">{t('generatePredictionFirst')}</p>;
      case 'market':
        return <MarketInfo t={t} />;
      case 'reports':
        return predictionResult ? <Reports result={predictionResult} t={t} /> : <p className="text-center p-8">{t('generatePredictionFirst')}</p>;
      case 'loans':
        return predictionResult && farmerInput ? <Loans input={farmerInput} result={predictionResult} language={language} t={t} /> : <p className="text-center p-8">{t('generatePredictionFirst')}</p>;
      case 'input':
      default:
        return <FarmerInputForm onSubmit={handleGetAdvice} error={error} t={t} language={language} />;
    }
  };

  return (
    <div className="flex h-screen bg-brand-green-50 text-gray-800">
      <Sidebar activeView={view} setView={setView} t={t} onStartChat={() => setIsChatOpen(true)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header language={language} setLanguage={setLanguage} t={t} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-green-50 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
      <Chatbot 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        language={language}
        t={t}
      />
    </div>
  );
};

export default App;