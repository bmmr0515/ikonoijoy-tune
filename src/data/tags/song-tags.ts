export type TagMeta = {
  id: string;
  name: string;
  description: string;
};

export const moodTagMetadata: TagMeta[] = [
  { id: 'playful', name: '遊び心', description: 'いたずらっぽく、無邪気で楽しい気分' },
  { id: 'bittersweet', name: 'ほろ苦い', description: '甘さと切なさが同居する、複雑な感情' },
  { id: 'dramatic', name: 'ドラマチック', description: '劇的で、感情の起伏が激しいストーリー性のある気分' },
  { id: 'dreamy', name: '夢見心地', description: '幻想的で、浮遊感のある心地よい気分' },
  { id: 'rebellious', name: '反抗的', description: '周囲に流されず、自分の芯を貫く強い気持ち' }
];

export const situationTagMetadata: TagMeta[] = [
  { id: 'getting_ready', name: 'お出かけ準備中', description: '服やメイクを選んで、気分を高めている時間' },
  { id: 'train_ride', name: '電車移動中', description: '車窓を眺めながら、音楽に没頭したい移動時間' },
  { id: 'night_walk', name: '夜の散歩', description: '静まりかえった夜の街を、一人で歩く時間' },
  { id: 'after_school', name: '放課後', description: '授業が終わり、開放感や一日の終わりを感じる時間' },
  { id: 'celebration', name: 'お祝い', description: '誕生日や記念日など、特別な日を祝福する場面' },
  { id: 'alone_time', name: 'ひとりの時間', description: '誰にも邪魔されず、静かに自分と向き合う時間' }
];

export const weatherTagMetadata: TagMeta[] = [
  { id: 'clear_night', name: '澄んだ夜空', description: '星や月が綺麗に見える、静かで冷たい夜' },
  { id: 'humid', name: '蒸し暑い', description: '夏の夜や雨上がりのような、湿り気のある空気' },
  { id: 'breezy', name: '風が心地よい', description: '春先や秋口など、爽やかな風を感じる天気' }
];

export const themeTagMetadata: TagMeta[] = [
  { id: 'jealousy', name: '嫉妬・独占欲', description: '他者への羨望や、独占したいという強い愛着' },
  { id: 'longing', name: '憧れ・恋焦がれ', description: '手の届かない存在や、遠くの人を想う気持ち' },
  { id: 'independence', name: '自立・自己主張', description: '他人に頼らず、自分らしく生きるという決意' },
  { id: 'farewell', name: '別れ・旅立ち', description: '新しい道へ進むための、寂しくも前向きな別れ' },
  { id: 'celebration', name: '祝福', description: '大切な人の幸せを心から祝うテーマ' },
  { id: 'identity', name: 'アイデンティティ', description: '自分とは何者か、自己の存在意義を見つめるテーマ' },
  { id: 'promise', name: '約束・誓い', description: '未来への誓いや、解けない固い約束のテーマ' }
];
