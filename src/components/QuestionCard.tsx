'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import OptionCard from './OptionCard';
import { Question, membersByGroup } from '../data/questions';
import { getLiveWeather } from '../utils/tuneEngine';

interface QuestionCardProps {
  question: Question;
  selectedOption: string | undefined;
  selectedGroup?: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
}

export default function QuestionCard({
  question,
  selectedOption,
  selectedGroup = 'all',
  onSelect,
  onNext,
  onBack,
  isFirst,
}: QuestionCardProps) {
  // Weather API states
  const [showManualWeather, setShowManualWeather] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  // Reset weather manual trigger on question change
  useEffect(() => {
    setShowManualWeather(false);
    setWeatherError('');
  }, [question.id]);

  // GPS geolocation handler
  const handleGPSWeather = () => {
    if (!navigator.geolocation) {
      setWeatherError('お使いのブラウザは位置情報に対応していません。');
      setShowManualWeather(true);
      return;
    }

    setWeatherLoading(true);
    setWeatherError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const matchedWeather = await getLiveWeather(latitude, longitude);
          onSelect(matchedWeather);
          setWeatherLoading(false);
          // Auto advance after brief delay to let user see selection
          setTimeout(() => {
            onNext();
          }, 600);
        } catch (error) {
          console.error(error);
          setWeatherError('天気の取得に失敗しました。手動で選択してください。');
          setWeatherLoading(false);
          setShowManualWeather(true);
        }
      },
      (error) => {
        console.error(error);
        setWeatherError('位置情報の取得が許可されませんでした。手動で選択してください。');
        setWeatherLoading(false);
        setShowManualWeather(true);
      },
      { timeout: 10000 }
    );
  };

  // Build grid options or single options list
  const renderOptions = () => {
    // 1. Weather API screen
    if (question.type === 'weather-api') {
      if (!showManualWeather && !selectedOption) {
        return (
          <div className="w-full flex flex-col gap-6 px-2 py-4">
            <div className="p-5 rounded-2xl bg-white/70 border border-[rgba(80,84,120,0.08)] flex flex-col gap-3.5 text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#93C5FD]/10 text-[#93C5FD] flex items-center justify-center mx-auto">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#171725] font-semibold mb-1">今いる場所の天気を、選曲の参考にします。</p>
                <p className="text-[10px] text-[#6E7180] leading-relaxed">
                  位置情報は現在地の天気取得にのみ使用し、サーバーへの保存や個人情報の収集は一切行いません。
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGPSWeather}
                disabled={weatherLoading}
                className="w-full h-13 rounded-full bg-gradient-to-r from-[#93C5FD] to-[#B9A7FF] text-white text-sm font-semibold shadow-[0_6px_15px_-4px_rgba(147,197,253,0.4)] flex items-center justify-center gap-2 smooth-transition disabled:opacity-50 cursor-pointer"
              >
                {weatherLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    現在地から取得中...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    現在地の天気を使う
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowManualWeather(true)}
                disabled={weatherLoading}
                className="w-full h-13 rounded-full bg-white/80 border border-[rgba(80,84,120,0.12)] text-[#171725] text-sm font-semibold flex items-center justify-center gap-2 smooth-transition cursor-pointer"
              >
                自分で天気を選ぶ
              </motion.button>
            </div>

            {weatherError && (
              <p className="text-[10px] text-red-400 font-medium text-center">{weatherError}</p>
            )}
          </div>
        );
      }

      // Manual weather selection list
      return (
        <div className="grid grid-cols-2 gap-3 w-full">
          {question.options.map((opt) => (
            <OptionCard
              key={opt.value}
              label={opt.label}
              isSelected={selectedOption === opt.value}
              iconName={opt.iconName}
              layoutType="grid"
              onClick={() => onSelect(opt.value)}
            />
          ))}
          {/* Back to GPS button */}
          <div className="col-span-2 mt-2">
            <button
              onClick={() => setShowManualWeather(false)}
              className="text-[11px] text-[#B9A7FF] hover:underline mx-auto block font-semibold"
            >
              &larr; 位置情報を使う画面に戻る
            </button>
          </div>
        </div>
      );
    }

    // 2. Member selection (needs group filter)
    if (question.type === 'member-select') {
      // Find members based on group. If 'all', we combine all members or prompt to pick a group.
      const groupsToFetch = selectedGroup === 'all' ? ['love', 'me', 'joy'] : [selectedGroup];
      const membersList: string[] = [];
      groupsToFetch.forEach((g) => {
        membersList.push(...((membersByGroup as any)[g] || []));
      });

      // Sort alphabetically or keep original order
      return (
        <div className="w-full flex flex-col gap-4">
          {/* Default Skip / Match Priority options */}
          <div className="grid grid-cols-2 gap-3">
            <OptionCard
              label="推しメンは選ばない"
              subLabel="ランダムに相性を優先"
              isSelected={selectedOption === 'none'}
              onClick={() => onSelect('none')}
              layoutType="list"
            />
            <OptionCard
              label="曲との相性を優先"
              subLabel="今の気分に寄り添う"
              isSelected={selectedOption === 'priority'}
              onClick={() => onSelect('priority')}
              layoutType="list"
            />
          </div>

          <div className="text-[10px] font-semibold text-[#6E7180] tracking-wider uppercase border-b border-[rgba(80,84,120,0.06)] pb-1 mt-2">
            メンバーを選択 ({selectedGroup === 'all' ? '全員' : selectedGroup.toUpperCase()})
          </div>

          {/* Member Name Chips */}
          <div className="flex flex-wrap gap-2.5 justify-center py-2 max-h-[220px] overflow-y-auto px-1">
            {membersList.map((m) => {
              const isSelected = selectedOption === m;
              // Circle avatar icon with initials
              const initial = m.substring(0, 1);

              return (
                <motion.button
                  key={m}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelect(m)}
                  className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 smooth-transition cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#B9A7FF]/15 to-[#93C5FD]/15 border-[#B9A7FF] text-[#171725] font-semibold'
                      : 'bg-white/60 border-[rgba(80,84,120,0.12)] text-[#6E7180] hover:border-[#B9A7FF]/30'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      isSelected
                        ? 'bg-gradient-to-tr from-[#B9A7FF] to-[#93C5FD] text-white'
                        : 'bg-slate-100 text-[#6E7180]'
                    } smooth-transition`}
                  >
                    {initial}
                  </div>
                  {m}
                </motion.button>
              );
            })}
          </div>
        </div>
      );
    }

    // 3. Regular select or grid lists
    const isGrid = question.type === 'grid';
    return (
      <div className={isGrid ? 'grid grid-cols-2 gap-3 w-full' : 'flex flex-col gap-3 w-full'}>
        {question.options.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            subLabel={opt.subLabel}
            isSelected={selectedOption === opt.value}
            iconName={opt.iconName}
            layoutType={isGrid ? 'grid' : 'list'}
            onClick={() => onSelect(opt.value)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between px-6 py-6 overflow-y-auto">
      {/* Question headers */}
      <div className="mb-6">
        <h2 className="text-[20px] font-semibold text-[#171725] leading-normal tracking-wide mb-2">
          {question.question}
        </h2>
        {question.subText && (
          <p className="text-xs text-[#6E7180] leading-relaxed">
            {question.subText}
          </p>
        )}
      </div>

      {/* Answer selection rendering */}
      <div className="flex-1 flex items-center justify-center w-full">
        {renderOptions()}
      </div>

      {/* Footer action buttons */}
      <div className="mt-8 pt-4 border-t border-[rgba(80,84,120,0.06)] flex items-center justify-between gap-4">
        {/* Back control */}
        <button
          onClick={onBack}
          disabled={isFirst}
          className={`flex items-center gap-1.5 text-xs font-semibold smooth-transition px-2 py-2 rounded-lg cursor-pointer ${
            isFirst
              ? 'opacity-0 pointer-events-none'
              : 'text-[#6E7180] hover:text-[#171725] active:translate-x-[-2px]'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          戻る
        </button>

        {/* Next step controls (Disabled for weather API until choice is selected) */}
        {question.type !== 'weather-api' || selectedOption || showManualWeather ? (
          <motion.button
            whileHover={{ scale: selectedOption ? 1.02 : 1 }}
            whileTap={{ scale: selectedOption ? 0.98 : 1 }}
            onClick={onNext}
            disabled={!selectedOption}
            className={`h-11 px-5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm smooth-transition cursor-pointer ${
              selectedOption
                ? 'bg-[#171725] text-white hover:bg-black/90'
                : 'bg-slate-100 text-[#6E7180]/60 pointer-events-none'
            }`}
          >
            次へ進む
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        ) : (
          <div className="h-11" /> /* spacing placeholder */
        )}
      </div>
    </div>
  );
}
