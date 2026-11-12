import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  TrendingUp, 
  Bot, 
  User, 
  ShieldCheck, 
  Building2, 
  Tractor,
  DollarSign
} from 'lucide-react';
import { Language } from '../types';

interface AIAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface Message {
  role: 'assistant' | 'user';
  text: string;
  time: string;
}

export const AIAdvisorModal: React.FC<AIAdvisorModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  const isBn = language === 'bn';

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: isBn 
        ? 'আসসালামু আলাইকুম! আমি AgroLink AI মার্কেট ইন্টেলিজেন্স অ্যাসিস্ট্যান্ট। আজ আপনাকে পাইকারি বাজার দর, রেস্তোরাঁর বাল্ক বাজেট পরিকল্পনা, বা কৃষকের ফসল বিক্রির উপযুক্ত সময়ে কীভাবে সাহায্য করতে পারি?'
        : 'Welcome! I am your AgroLink AI Market Intelligence Advisor. How can I help you today with wholesale mandi indices, restaurant procurement budgets, or farm-gate pricing?',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const promptSuggestions = [
    {
      labelBn: 'আলু ও পেঁয়াজের আজকের পাইকারি দর কত?',
      labelEn: 'Today\'s wholesale potato & onion rates?',
      responseBn: 'আজকের লাইভ ইনডেক্স অনুযায়ী: বগুড়ার ডায়মন্ড আলু আড়ত রেট ৳২৮-৳৩২/কেজি এবং পাবনার দেশি পেঁয়াজ ৳৬৫-৳৭০/কেজি। AgroLink এ সরাসরি কৃষকের কাছ থেকে ২০+ কেজি অর্ডারে আপনি যথাক্রমে ৳৩৪ ও ৳৭৪ দরে ফ্রেশ কোল্ড-চেইন ডেলিভারি পাবেন।'
    },
    {
      labelBn: '২০০ জনের বিয়ে/রেস্তোরাঁর সবজি কোটেশন প্ল্যান',
      labelEn: 'Vegetable procurement plan for 200 guests',
      responseBn: '২০০ জনের কাচ্চি ও ভোজের আয়োজনে আনুমানিক প্রয়োজন: ডায়মন্ড আলু ৫০ কেজি (৳১,৭০০), দেশি পেঁয়াজ ৩০ কেজি (৳২,২২০), কাঁচা মরিচ ৩ কেজি (৳২৩৪), শসা ১৫ কেজি (৳৬০০)। AgroLink এর B2B বাল্ক হাব থেকে সম্পূর্ণ লট এক ক্লিকে কোটেশন প্রিন্ট করে ৭-দিন ক্রেডিটে অর্ডার করতে পারেন।'
    },
    {
      labelBn: 'কৃষক হিসেবে আমার আলু কি এখন বিক্রি করা উচিত?',
      labelEn: 'Should I sell my potato stock now or wait?',
      responseBn: 'বর্তমানে বগুড়া কোল্ড স্টোরেজগুলোতে আগমন স্থিতিশীল। আগামী দুই সপ্তাহে কারওয়ান বাজার ও ঢাকার চাহিদায় ২.৫% ঊর্ধ্বগতি দেখা যাচ্ছে। এখনই ৫০% স্টক AgroLink B2B পোর্টালে ৳৩২ দরে লিস্টিং করে বাকি অংশ কোল্ড চেইনে রাখা লাভজনক কৌশল।'
    }
  ];

  const handleSendMessage = (textToSend?: string) => {
    const q = textToSend || inputPrompt;
    if (!q.trim()) return;

    const userMsg: Message = {
      role: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      // Find matching suggestion or generate smart response
      const matched = promptSuggestions.find(s => s.labelBn.includes(q) || s.labelEn.toLowerCase().includes(q.toLowerCase()));
      const replyText = matched 
        ? (isBn ? matched.responseBn : matched.responseBn)
        : (isBn 
            ? `আপনার প্রশ্ন "${q}" এর জন্য AgroLink AI রিয়েল-টাইম মার্কেট ডেটা ও আড়ত রেট বিশ্লেষণ করেছে। বর্তমান উত্তরবঙ্গের জেলাগুলোতে উৎপাদন ভালো এবং ৪% স্বচ্ছ প্ল্যাটফর্ম চার্জের কারণে মধ্যস্বত্বভোগীদের তুলনায় আপনি সর্বোচ্চ সাশ্রয় পাবেন। বিস্তারিত সহায়তার জন্য আমাদের কৃষি হেল্পলাইনেও যোগাযোগ করতে পারেন।`
            : `Analyzing query "${q}" across Bogura & Dinajpur agricultural mandi data. Our 4% zero-intermediary supply chain guarantees direct farm gate savings and verified Grade-A quality.`);

      setMessages(prev => [...prev, {
        role: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full h-[600px] shadow-2xl border border-slate-200 text-slate-900 flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">
                  {isBn ? 'AgroLink AI কৃষি ও মার্কেট অ্যাডভাইজর' : 'AgroLink AI Market Intelligence'}
                </h3>
                <span className="px-2 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-[10px] font-bold">
                  v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                {isBn ? 'আড়ত মূল্য বিশ্লেষণ • রেস্তোরাঁ বাল্ক বাজেট • কৃষক প্রাইস গাইড' : 'Live Mandi Analytics & Institutional Agri Guidance'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat History Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50">
          {messages.map((m, idx) => (
            <div 
              key={idx}
              className={`flex items-start gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-800 text-emerald-200 flex items-center justify-center shrink-0 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div 
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-emerald-700 text-white rounded-tr-xs shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-xs'
                }`}
              >
                <p>{m.text}</p>
                <span className={`text-[10px] block text-right mt-1.5 ${
                  m.role === 'user' ? 'text-emerald-200' : 'text-slate-400'
                }`}>
                  {m.time}
                </span>
              </div>

              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 flex items-center justify-center shrink-0 text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Bot className="w-4 h-4 text-emerald-700 animate-pulse" />
              <span>{isBn ? 'এআই উত্তর তৈরি করছে...' : 'AgroLink AI is generating response...'}</span>
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">
            {isBn ? 'দ্রুত পরামর্শ:' : 'Suggestions:'}
          </span>
          {promptSuggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(isBn ? s.labelBn : s.labelEn)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 whitespace-nowrap transition-all"
            >
              {isBn ? s.labelBn : s.labelEn}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isBn ? 'আপনার কৃষি বা মার্কেট প্রশ্ন লিখুন...' : 'Ask about mandi pricing, bulk orders, crop harvest...'}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm text-slate-900 focus:outline-emerald-500 focus:bg-white"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputPrompt.trim()}
            className="w-10 h-10 rounded-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white flex items-center justify-center transition-colors shrink-0 shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
