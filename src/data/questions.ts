export interface QuestionOption {
  value: string;
  label: string;
  subLabel?: string;
  iconName?: string; // used to display simple lucide icons dynamically
}

export interface Question {
  id: string;
  question: string;
  subText?: string;
  type: 'select' | 'grid' | 'weather-api' | 'member-select' | 'button-toggle';
  options: QuestionOption[];
  isOptional?: boolean;
}

export const membersByGroup = {
  love: [
    '大谷映美里', '大場花菜', '音嶋莉沙', '齋藤樹愛羅', 
    '佐々木舞香', '高松瞳', '瀧脇笙古', '野口衣織', 
    '諸橋沙夏', '山本杏奈'
  ],
  me: [
    '尾木波菜', '落合希来里', '蟹沢萌子', '河口夏音', 
    '川中子奈月心', '櫻井もも', '菅波美玲', '鈴木瞳美', 
    '谷崎早耶', '冨田菜々風', '永田詩央里', '本田珠由記'
  ],
  joy: [
    '逢田珠里依', '天野香乃愛', '市原愛弓', '江角怜音', 
    '大信田美月', '大西葵', '小澤愛実', '高橋舞', 
    '藤沢莉子', '村山結香', '山野愛月'
  ]
};

export const questionsData: Record<string, Question[]> = {
  quick: [
    {
      id: 'mood',
      question: '今の気分は？',
      subText: '直感でいちばん近いものを選んでください。',
      type: 'grid',
      options: [
        { value: 'energetic', label: '元気になりたい', subLabel: '少し気分を上げたいです。', iconName: 'Sun' },
        { value: 'hype', label: '高まりたい', subLabel: 'ライブ前のような熱がほしいです。', iconName: 'Flame' },
        { value: 'calm', label: '落ち着きたい', subLabel: 'ゆっくり呼吸を整えたいです。', iconName: 'Compass' },
        { value: 'sad', label: '泣きたい', subLabel: '感情を我慢せずに浸りたいです。', iconName: 'CloudRain' },
        { value: 'romantic', label: '恋を感じたい', subLabel: '甘さや切なさに触れたいです。', iconName: 'Heart' },
        { value: 'cute', label: 'かわいい世界に浸りたい', subLabel: 'あざとかわいい世界に浸りたいです。', iconName: 'Smile' },
        { value: 'playful', label: '楽しく遊びたい', subLabel: '遊び心のあるポップな曲が聴きたいです。', iconName: 'Sparkles' },
        { value: 'support', label: '背中を押してほしい', subLabel: 'あと少し前に進みたいです。', iconName: 'Wind' }
      ]
    },
    {
      id: 'scene',
      question: '今は何をしていますか？',
      subText: '曲を聴くシチュエーションを教えてください。',
      type: 'grid',
      options: [
        { value: 'home', label: '部屋でゆっくり', subLabel: '一人のリラックスタイム。', iconName: 'Home' },
        { value: 'commute', label: '移動中', subLabel: '通勤や通学の電車・徒歩で。', iconName: 'Navigation' },
        { value: 'study', label: '作業・勉強中', subLabel: '集中したい時や作業用。', iconName: 'BookOpen' },
        { value: 'drive', label: 'ドライブ・散歩', subLabel: '心地よく動きながら。', iconName: 'Car' },
        { value: 'live', label: 'ライブ前・テンションUP', subLabel: '気持ちを盛り上げたい。', iconName: 'Music' },
        { value: 'sleep', label: '眠る前', subLabel: '一日の終わりに。', iconName: 'Moon' }
      ]
    },
    {
      id: 'group',
      question: '聴きたいグループは？',
      subText: '今日のおすすめはどのグループから選びましょう。',
      type: 'select',
      options: [
        { value: 'all', label: 'すべてのグループ', subLabel: '＝LOVE, ≠ME, ≒JOYから選びます。' },
        { value: 'love', label: '＝LOVE', subLabel: 'ソフトピンクとラベンダーの色彩。' },
        { value: 'me', label: '≠ME', subLabel: 'スカイブルーとシルバーの爽風。' },
        { value: 'joy', label: '≒JOY', subLabel: 'ミントと淡いイエローの眩しさ。' }
      ]
    },
    {
      id: 'proposalType',
      question: '提案のスタイルは？',
      subText: '一曲かプレイリストか選択してください。',
      type: 'select',
      options: [
        { value: 'single', label: '運命の一曲を提案する', subLabel: '今のあなたに最も似合う一曲を選びます。' },
        { value: 'playlist', label: 'プレイリストを提案する', subLabel: 'ストーリー性のある数曲のプレイリストを作ります。' }
      ]
    }
  ],
  detailed: [
    {
      id: 'mood',
      question: '今の気分は？',
      subText: '直感でいちばん近いものを選んでください。',
      type: 'grid',
      options: [
        { value: 'energetic', label: '元気になりたい', subLabel: '少し気分を上げたいです。', iconName: 'Sun' },
        { value: 'hype', label: '高まりたい', subLabel: 'ライブ前のような熱がほしいです。', iconName: 'Flame' },
        { value: 'calm', label: '落ち着きたい', subLabel: 'ゆっくり呼吸を整えたいです。', iconName: 'Compass' },
        { value: 'sad', label: '泣きたい', subLabel: '感情を我慢せずに浸りたいです。', iconName: 'CloudRain' },
        { value: 'romantic', label: '恋を感じたい', subLabel: '甘さや切なさに触れたいです。', iconName: 'Heart' },
        { value: 'cute', label: 'かわいい世界に浸りたい', subLabel: 'あざとかわいい世界に浸りたいです。', iconName: 'Smile' },
        { value: 'playful', label: '楽しく遊びたい', subLabel: '遊び心のあるポップな曲が聴きたいです。', iconName: 'Sparkles' },
        { value: 'support', label: '背中を押してほしい', subLabel: 'あと少し前に進みたいです。', iconName: 'Wind' }
      ]
    },
    {
      id: 'scene',
      question: '今は何をしていますか？',
      subText: '曲を聴くシチューションを教えてください。',
      type: 'grid',
      options: [
        { value: 'home', label: '部屋でゆっくり', subLabel: '一人のリラックスタイム。', iconName: 'Home' },
        { value: 'commute', label: '移動中', subLabel: '通勤や通学の電車・徒歩で。', iconName: 'Navigation' },
        { value: 'study', label: '作業・勉強中', subLabel: '集中したい時や作業用。', iconName: 'BookOpen' },
        { value: 'drive', label: 'ドライブ・散歩', subLabel: '心地よく動きながら。', iconName: 'Car' },
        { value: 'live', label: 'ライブ前・テンションUP', subLabel: '気持ちを盛り上げたい。', iconName: 'Music' },
        { value: 'sleep', label: '眠る前', subLabel: '一日の終わりに。', iconName: 'Moon' }
      ]
    },
    {
      id: 'timeOfDay',
      question: '時間帯を教えてください。',
      subText: '時間帯の空気感に合わせて選曲します。',
      type: 'grid',
      options: [
        { value: 'morning', label: '朝', subLabel: '新しい始まりに (5:00 - 11:00)', iconName: 'Sunrise' },
        { value: 'afternoon', label: '昼', subLabel: '明るい日差しの中で (11:00 - 16:00)', iconName: 'SunDim' },
        { value: 'evening', label: '夕方', subLabel: '放課後から夜に変わる頃 (16:00 - 19:00)', iconName: 'Sunset' },
        { value: 'night', label: '夜・深夜', subLabel: '一人のきらめく時間 (19:00 - 5:00)', iconName: 'MoonStar' }
      ]
    },
    {
      id: 'weather',
      question: '天気の状況は？',
      subText: '位置情報から自動取得するか、手動で選択できます。',
      type: 'weather-api',
      options: [
        { value: 'sunny', label: '晴れ', iconName: 'Sun' },
        { value: 'cloudy', label: '曇り', iconName: 'Cloud' },
        { value: 'rainy', label: '雨', iconName: 'CloudRain' },
        { value: 'snowy', label: '雪', iconName: 'CloudSnow' },
        { value: 'hot', label: '暑い日', iconName: 'ThermometerSun' },
        { value: 'cold', label: '寒い日', iconName: 'ThermometerSnowflake' }
      ]
    },
    {
      id: 'group',
      question: '対象のグループは？',
      subText: 'お好みのグループを選択してください。',
      type: 'select',
      options: [
        { value: 'all', label: 'すべてのグループ', subLabel: '＝LOVE, ≠ME, ≒JOYから選びます。' },
        { value: 'love', label: '＝LOVE', subLabel: 'イコラブメンバーから探します。' },
        { value: 'me', label: '≠ME', subLabel: 'ノイミーメンバーから探します。' },
        { value: 'joy', label: '≒JOY', subLabel: 'ニアジョイメンバーから探します。' }
      ]
    },
    {
      id: 'member',
      question: '推しメンはいますか？',
      subText: '推しメンがセンターまたは主要な楽曲を優先できます。',
      type: 'member-select',
      options: [] // dynamically populated based on group selection
    },
    {
      id: 'energy',
      question: '曲のテンション（エネルギー）は？',
      subText: '曲の激しさやテンポの好みを教えてください。',
      type: 'select',
      options: [
        { value: 'any', label: 'どちらでも', subLabel: 'テンポを問わず曲を選びます。' },
        { value: 'high', label: 'アップテンポ / 激しめ', subLabel: '元気が出る曲、情熱的な曲。' },
        { value: 'low', label: 'ミディアム / スローテンポ', subLabel: '穏やかな曲、切ないバラード。' }
      ]
    },
    {
      id: 'proposalType',
      question: '提案のスタイルは？',
      subText: '一曲かプレイリストか選択してください。',
      type: 'select',
      options: [
        { value: 'single', label: '運命の一曲を提案する', subLabel: '今のあなたに最も似合う一曲を選びます。' },
        { value: 'playlist', label: 'プレイリストを提案する', subLabel: 'ストーリー性のある数曲のプレイリストを作ります。' }
      ]
    }
  ]
};
