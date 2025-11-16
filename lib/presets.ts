import { Session } from '@/types/session';
import { Card, CardType } from '@/types/card';
import { generateId } from './utils';

export function createPresetSessions(): Session[] {
  const now = new Date();

  // プリセット1: 古代遺跡の探索
  const preset1: Session = {
    id: generateId(),
    title: '古代遺跡の探索',
    description: '失われた古代文明の遺跡を探索し、秘宝を見つけ出すシナリオ',
    createdAt: now,
    updatedAt: now,
    currentCardIndex: 0,
    cards: [],
  };

  preset1.cards = [
    {
      id: generateId(),
      sessionId: preset1.id,
      order: 0,
      type: 'setup' as CardType,
      content: {
        title: 'セットアップ',
        story: '探検家たちは、長年探し求めていた古代遺跡の入り口をついに発見した。',
        components: ['メインボード', '探検家コマ', '宝物カード', 'トラップタイル'],
        setupSteps: [
          'メインボードをテーブル中央に配置',
          '各プレイヤーに探検家コマを配布',
          '宝物カードをシャッフルして山札を作成',
          'トラップタイルを裏向きで配置',
        ],
        winCondition: '3つの秘宝を集める',
        loseCondition: 'すべての探検家が倒れる',
        nextCondition: '準備が整ったら、遺跡の入り口へ',
      },
    },
    {
      id: generateId(),
      sessionId: preset1.id,
      order: 1,
      type: 'story' as CardType,
      content: {
        title: '遺跡の入り口',
        story: '古代文字が刻まれた巨大な石の扉が立ちはだかる。',
        nextCondition: '扉のパズルを解いたら次へ',
      },
    },
    {
      id: generateId(),
      sessionId: preset1.id,
      order: 2,
      type: 'event' as CardType,
      content: {
        title: 'トラップの罠',
        story: '床が突然崩れ始める！素早く行動しなければ。',
        nextCondition: 'トラップを回避したら次へ',
      },
    },
  ];

  // プリセット2: 宇宙ステーションの危機
  const preset2: Session = {
    id: generateId(),
    title: '宇宙ステーションの危機',
    description: '故障した宇宙ステーションを修理し、地球への帰還を目指すシナリオ',
    createdAt: now,
    updatedAt: now,
    currentCardIndex: 0,
    cards: [],
  };

  preset2.cards = [
    {
      id: generateId(),
      sessionId: preset2.id,
      order: 0,
      type: 'setup' as CardType,
      content: {
        title: 'セットアップ',
        story: '宇宙ステーションに謎の故障が発生。クルーは緊急事態に直面している。',
        components: ['ステーションボード', 'クルーコマ', '修理パーツカード', '酸素トークン'],
        setupSteps: [
          'ステーションボードを展開',
          'クルーコマを各セクションに配置',
          '修理パーツカードをシャッフル',
          '酸素トークンを初期値に設定',
        ],
        winCondition: 'すべてのシステムを修理して地球に帰還',
        loseCondition: '酸素が0になる、または重要システムが3つ以上故障',
        nextCondition: '配置完了後、緊急警報が鳴り響く',
      },
    },
    {
      id: generateId(),
      sessionId: preset2.id,
      order: 1,
      type: 'story' as CardType,
      content: {
        title: '緊急警報',
        story: '生命維持システムに異常が検知された。',
        nextCondition: '対応策を決定したら次へ',
      },
    },
  ];

  // プリセット3: 魔法学園の試験
  const preset3: Session = {
    id: generateId(),
    title: '魔法学園の試験',
    description: '魔法学園の最終試験に挑戦し、一人前の魔法使いを目指すシナリオ',
    createdAt: now,
    updatedAt: now,
    currentCardIndex: 0,
    cards: [],
  };

  preset3.cards = [
    {
      id: generateId(),
      sessionId: preset3.id,
      order: 0,
      type: 'setup' as CardType,
      content: {
        title: 'セットアップ',
        story: '魔法学園の最終試験の日。生徒たちは緊張の面持ちで試験会場に集まった。',
        components: ['学園ボード', '生徒コマ', '魔法カード', '成績トークン'],
        setupSteps: [
          '学園ボードを配置',
          '各プレイヤーに生徒コマと初期魔法カードを配布',
          '成績トークンを0点に設定',
          '試験課題カードを準備',
        ],
        winCondition: '100点以上を獲得する',
        loseCondition: '3回以上失敗する',
        nextCondition: '試験官が登場したら開始',
      },
    },
    {
      id: generateId(),
      sessionId: preset3.id,
      order: 1,
      type: 'story' as CardType,
      content: {
        title: '第一試験',
        story: '基礎魔法の実技試験が始まる。',
        nextCondition: '試験に合格したら次へ',
      },
    },
  ];

  // プリセット4: 謎の島からの脱出
  const preset4: Session = {
    id: generateId(),
    title: '謎の島からの脱出',
    description: '遭難した無人島から脱出するサバイバルシナリオ',
    createdAt: now,
    updatedAt: now,
    currentCardIndex: 0,
    cards: [],
  };

  preset4.cards = [
    {
      id: generateId(),
      sessionId: preset4.id,
      order: 0,
      type: 'setup' as CardType,
      content: {
        title: 'セットアップ',
        story: '嵐で船が難破し、見知らぬ島に漂着してしまった。',
        components: ['島マップ', 'サバイバーコマ', '資源カード', '体力トークン'],
        setupSteps: [
          '島マップを展開',
          'サバイバーコマを海岸に配置',
          '資源カードをシャッフル',
          '各プレイヤーの体力を最大値に設定',
        ],
        winCondition: '脱出用のいかだを完成させる',
        loseCondition: 'すべてのプレイヤーの体力が0になる',
        nextCondition: '周囲を調査し始める',
      },
    },
    {
      id: generateId(),
      sessionId: preset4.id,
      order: 1,
      type: 'event' as CardType,
      content: {
        title: '食料の探索',
        story: '空腹を満たすため、食料を探さなければならない。',
        nextCondition: '食料を確保したら次へ',
      },
    },
  ];

  // プリセット5: タイムトラベルの修正
  const preset5: Session = {
    id: generateId(),
    title: 'タイムトラベルの修正',
    description: '歴史の矛盾を修正し、正しいタイムラインに戻すシナリオ',
    createdAt: now,
    updatedAt: now,
    currentCardIndex: 0,
    cards: [],
  };

  preset5.cards = [
    {
      id: generateId(),
      sessionId: preset5.id,
      order: 0,
      type: 'setup' as CardType,
      content: {
        title: 'セットアップ',
        story: 'タイムマシンの故障により、歴史に矛盾が生じてしまった。',
        components: ['タイムラインボード', 'タイムトラベラーコマ', '歴史イベントカード', '矛盾トークン'],
        setupSteps: [
          'タイムラインボードを時系列順に配置',
          'タイムトラベラーコマを現代に配置',
          '歴史イベントカードを時代ごとに分類',
          '矛盾トークンを該当する時代に配置',
        ],
        winCondition: 'すべての矛盾を修正する',
        loseCondition: '矛盾が5つ以上蓄積する',
        nextCondition: '最初の矛盾を発見したら',
      },
    },
    {
      id: generateId(),
      sessionId: preset5.id,
      order: 1,
      type: 'story' as CardType,
      content: {
        title: '古代エジプトの異変',
        story: '古代エジプトにあるはずのないテクノロジーが発見された。',
        nextCondition: '原因を特定したら次へ',
      },
    },
  ];

  // プリセット6: 幽霊屋敷の調査
  const preset6: Session = {
    id: generateId(),
    title: '幽霊屋敷の調査',
    description: '呪われた屋敷の謎を解き明かすホラーミステリーシナリオ',
    createdAt: now,
    updatedAt: now,
    currentCardIndex: 0,
    cards: [],
  };

  preset6.cards = [
    {
      id: generateId(),
      sessionId: preset6.id,
      order: 0,
      type: 'setup' as CardType,
      content: {
        title: 'セットアップ',
        story: '古い洋館に足を踏み入れた瞬間、背後で扉が音を立てて閉まった。',
        components: ['屋敷マップ', '調査員コマ', '手がかりカード', '恐怖トークン'],
        setupSteps: [
          '屋敷マップを部屋ごとに配置',
          '調査員コマをエントランスに配置',
          '手がかりカードを各部屋に裏向きで配置',
          '恐怖トークンを0に設定',
        ],
        winCondition: '屋敷の謎を解明して脱出する',
        loseCondition: '恐怖トークンが10以上になる',
        nextCondition: '調査を開始する',
      },
    },
    {
      id: generateId(),
      sessionId: preset6.id,
      order: 1,
      type: 'event' as CardType,
      content: {
        title: '不気味な物音',
        story: '2階から奇妙な物音が聞こえてくる。',
        nextCondition: '音の原因を調べたら次へ',
      },
    },
  ];

  return [preset1, preset2, preset3, preset4, preset5, preset6];
}
