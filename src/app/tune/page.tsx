'use client';

import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/AppHeader';
import BottomNavigation from '../../components/BottomNavigation';
import TuneCourseCard from '../../components/TuneCourseCard';
import ProgressBar from '../../components/ProgressBar';
import QuestionCard from '../../components/QuestionCard';
import LoadingTuneAnimation from '../../components/LoadingTuneAnimation';
import TuneResultCard from '../../components/TuneResultCard';
import PlaylistResultCard from '../../components/PlaylistResultCard';
import { questionsData } from '../../data/questions';
import { Song, songs } from '../../data/songs';
import { QuizAnswers, PlaylistResult, matchSingleSong, generatePlaylist, calculateScores, isMoodAnswer } from '../../utils/tuneEngine';
import { getProductionApprovedSongIds } from '../../utils/approvedSongs';

type Step = 'course' | 'quiz' | 'loading' | 'result';

export default function TunePage() {
  // Navigation states
  const [step, setStep] = useState<Step>('course');
  const [courseType, setCourseType] = useState<'quick' | 'detailed' | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  
  // Data states
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [resultSong, setResultSong] = useState<Song | null>(null);
  const [resultPlaylist, setResultPlaylist] = useState<PlaylistResult | null>(null);
  const [excludeSongIds, setExcludeSongIds] = useState<string[]>([]);
  const [reviewedSongIds, setReviewedSongIds] = useState<string[]>(() => {
    if (process.env.NODE_ENV === 'production') {
      return getProductionApprovedSongIds();
    }
    return [];
  });

  // Fetch verified reviews on mount to dynamically update verification state in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    fetch('/api/dev/song-review')
      .then(res => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data: any[]) => {
        const reviewedIds = data.filter((r: any) => r.reviewed).map((r: any) => r.songId);
        setReviewedSongIds(reviewedIds);
      })
      .catch(() => {
        setReviewedSongIds(getProductionApprovedSongIds());
      });
  }, []);

  // Load questions based on chosen course
  const questions = courseType ? questionsData[courseType] : [];
  const currentQuestion = questions[currentIdx];

  // Auto diagnostic query trigger (similar song check)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const auto = params.get('auto');
      const songId = params.get('songId');
      if (auto === 'true' && songId) {
        const targetSong = songs.find(s => s.id === songId);
        if (targetSong) {
          const rawMood = targetSong.tags.moods[0];
          const validatedMood = isMoodAnswer(rawMood) ? rawMood : undefined;

          const mockAnswers: QuizAnswers = {
            group: targetSong.group,
            mood: validatedMood,
            scene: targetSong.tags.situations[0] || 'commute',
            weather: targetSong.tags.weather[0] || 'sunny',
            timeOfDay: targetSong.tags.timeOfDay[0] || 'daytime',
            season: targetSong.tags.seasons[0] || 'all_seasons',
            proposalType: 'single'
          };
          setAnswers(mockAnswers);
          setStep('loading');
          window.history.replaceState({}, '', '/tune');
        }
      }
    }
  }, []);

  // Loader transition trigger
  useEffect(() => {
    if (step === 'loading') {
      const timer = setTimeout(() => {
        // Read recent history from localStorage
        let history: string[] = [];
        if (typeof window !== 'undefined') {
          try {
            const histData = localStorage.getItem('ikonoijoy-tune-history');
            history = histData ? JSON.parse(histData) : [];
          } catch (e) {
            console.error(e);
          }
        }

        // Run match calculations
        if (answers.proposalType === 'playlist') {
          const playlist = generatePlaylist(answers, history, reviewedSongIds);
          setResultPlaylist(playlist);

          // Save playlist tracks to history
          if (typeof window !== 'undefined') {
            try {
              const matchedIds = playlist.tracks.map(t => t.song.id);
              const filtered = history.filter(id => !matchedIds.includes(id));
              const updated = [...matchedIds, ...filtered].slice(0, 3);
              localStorage.setItem('ikonoijoy-tune-history', JSON.stringify(updated));
            } catch (e) {
              console.error(e);
            }
          }
        } else {
          const song = matchSingleSong(answers, history, reviewedSongIds);
          setResultSong(song);

          // Save matched song to history
          if (typeof window !== 'undefined') {
            try {
              const filtered = history.filter(id => id !== song.id);
              const updated = [song.id, ...filtered].slice(0, 3);
              localStorage.setItem('ikonoijoy-tune-history', JSON.stringify(updated));
            } catch (e) {
              console.error(e);
            }
          }
        }
        setStep('result');
      }, 2500); // 2.5 seconds loading state

      return () => clearTimeout(timer);
    }
  }, [step, answers]);

  // Answer handler
  const handleSelectOption = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Finished all questions, enter analysis mode
      setStep('loading');
    }
  };

  const handleBack = () => {
    if (step === 'quiz') {
      if (currentIdx > 0) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        // Go back to course selector
        setStep('course');
        setCourseType(null);
        setAnswers({});
      }
    } else if (step === 'result') {
      // Reset diagnostic state
      handleReset();
    }
  };

  const handleSelectCourse = (type: 'quick' | 'detailed') => {
    setCourseType(type);
    setCurrentIdx(0);
    setAnswers({});
    setStep('quiz');
  };

  const handleReset = () => {
    setStep('course');
    setCourseType(null);
    setCurrentIdx(0);
    setAnswers({});
    setResultSong(null);
    setResultPlaylist(null);
    setExcludeSongIds([]);
  };

  const handleNextSong = (prevSongId: string) => {
    let history: string[] = [];
    if (typeof window !== 'undefined') {
      try {
        const histData = localStorage.getItem('ikonoijoy-tune-history');
        history = histData ? JSON.parse(histData) : [];
      } catch (e) {
        console.error(e);
      }
    }

    const nextExcludes = [...excludeSongIds, prevSongId];
    setExcludeSongIds(nextExcludes);

    const list = calculateScores(answers, history, reviewedSongIds);
    const filtered = list.filter((s: Song) => s.enabled && !nextExcludes.includes(s.id));

    if (filtered.length > 0) {
      setResultSong(filtered[0]);
    } else {
      // Loop back if no other matching candidate left
      setExcludeSongIds([]);
      const reFiltered = list.filter((s: Song) => s.enabled && s.id !== prevSongId);
      if (reFiltered.length > 0) {
        setResultSong(reFiltered[0]);
      }
    }
  };

  // Header Back Button overrides
  const handleHeaderBack = () => {
    if (step === 'quiz') {
      handleBack();
    } else if (step === 'loading') {
      // Do nothing, analysis in progress
    } else if (step === 'result') {
      handleReset();
    } else {
      // Standard router back from course select
      window.history.back();
    }
  };

  return (
    <>
      {/* Header with reactive back action */}
      <AppHeader
        showBack={step !== 'course'}
        onBackClick={handleHeaderBack}
      />

      <main className="flex-1 flex flex-col justify-start overflow-y-auto pb-24">
        {/* Step 1: Course Selection */}
        {step === 'course' && (
          <div className="px-6 py-8 flex flex-col gap-6">
            <div className="text-center mb-2">
              <span className="text-[10px] tracking-[0.25em] font-title font-bold text-[#B9A7FF] uppercase">
                Choose Your Course
              </span>
              <h2 className="text-lg font-bold text-[#171725] tracking-wide mt-2">
                どのくらい、今の気分を教えてもらいますか。
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <TuneCourseCard
                type="quick"
                title="30秒TUNE"
                description="今の気分と過ごし方から、シンプルかつスピーディにお手軽な一曲を選びます。"
                duration="約4問"
                isSelected={courseType === 'quick'}
                onClick={() => handleSelectCourse('quick')}
              />

              <TuneCourseCard
                type="detailed"
                title="じっくりTUNE"
                description="天気、時間帯、さらに推しメン情報まで含めて、じっくり今のあなたに合う曲を多角的に選びます。"
                duration="約8問"
                isSelected={courseType === 'detailed'}
                onClick={() => handleSelectCourse('detailed')}
              />
            </div>
          </div>
        )}

        {/* Step 2: Quiz Flow */}
        {step === 'quiz' && currentQuestion && (
          <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-6 py-4 flex flex-col justify-between">
            <ProgressBar current={currentIdx + 1} total={questions.length} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-6 w-full">
              {/* Left/Center Column: Quiz Questions & Choices */}
              <div className="lg:col-span-2 w-full">
                <QuestionCard
                  question={currentQuestion}
                  selectedOption={answers[currentQuestion.id as keyof QuizAnswers] as string}
                  selectedGroup={answers.group}
                  onSelect={handleSelectOption}
                  onNext={handleNext}
                  onBack={handleBack}
                  isFirst={currentIdx === 0}
                />
              </div>

              {/* Right Column: Progress & Current Parameters (Hidden on Mobile) */}
              <div className="hidden lg:flex flex-col gap-6 bg-white/70 backdrop-blur-md rounded-3xl border border-[rgba(80,84,120,0.12)] p-6 shadow-sm">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#6E7180] tracking-widest uppercase">TUNING PROGRESS</span>
                  <span className="text-xs font-bold text-indigo-500">
                    {currentIdx + 1} / {questions.length} 問
                  </span>
                </div>

                {/* Progress Details */}
                <div className="flex flex-col gap-1.5">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Course Type</div>
                  <div className="text-xs font-bold text-slate-700">
                    {courseType === 'quick' ? '⚡ 30秒TUNE' : '🔮 じっくりTUNE'}
                  </div>
                </div>

                {/* Live parameters list */}
                <div className="flex flex-col gap-3">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Selected Tuning Deck</div>
                  <div className="flex flex-col gap-2 bg-[#F8F9FD]/50 rounded-2xl p-4 border border-slate-50 text-xs">
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-100/50 last:border-0">
                      <span className="text-slate-500">タイプ:</span>
                      <span className="font-bold text-slate-700">{answers.proposalType === 'playlist' ? '💽 プレイリスト' : '💿 一曲のみ'}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-100/50 last:border-0">
                      <span className="text-slate-500">グループ:</span>
                      <span className="font-bold text-slate-700">
                        {answers.group === 'all' ? '全員' : 
                         answers.group === 'love' ? '＝LOVE' : 
                         answers.group === 'me' ? '≠ME' : 
                         answers.group === 'joy' ? '≒JOY' : '未選択'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-100/50 last:border-0">
                      <span className="text-slate-500">気分 (Vibe):</span>
                      <span className="font-bold text-slate-700">{answers.mood ? `✨ ${answers.mood}` : '未選択'}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-100/50 last:border-0">
                      <span className="text-slate-500">場面 (Scene):</span>
                      <span className="font-bold text-slate-700">{answers.scene ? `🚗 ${answers.scene}` : '未選択'}</span>
                    </div>
                    {courseType === 'detailed' && (
                      <>
                        <div className="flex justify-between items-center py-1.5 border-b border-slate-100/50 last:border-0">
                          <span className="text-slate-500">時間帯:</span>
                          <span className="font-bold text-slate-700">{answers.timeOfDay ? `⏰ ${answers.timeOfDay}` : '未選択'}</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-slate-100/50 last:border-0">
                          <span className="text-slate-500">天気:</span>
                          <span className="font-bold text-slate-700">{answers.weather ? `⛅ ${answers.weather}` : '未選択'}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-100 pt-3">
                  回答した条件はリアルタイムで推薦ロジックに反映され、最終的なマッチング精度を最適化します。
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Loading transition */}
        {step === 'loading' && <LoadingTuneAnimation />}

        {/* Step 4: Diagnostic Results */}
        {step === 'result' && (
          <div className="w-full">
            {answers.proposalType === 'playlist' && resultPlaylist ? (
              <PlaylistResultCard
                playlist={resultPlaylist}
                answers={answers}
                onReset={handleReset}
              />
            ) : (
              resultSong && (
                <TuneResultCard
                  song={resultSong}
                  answers={answers}
                  onReset={handleReset}
                  onNextSong={handleNextSong}
                />
              )
            )}
          </div>
        )}
      </main>

      {/* Navigation (Hidden during loading and quiz steps to keep user focused) */}
      {step !== 'quiz' && step !== 'loading' && <BottomNavigation />}
    </>
  );
}
