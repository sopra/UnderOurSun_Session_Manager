# UnderOurSun Session Manager

## プロジェクト概要
ボードゲームのシナリオをカード形式で逐次表示するWebアプリケーション。
ユーザーは物理的なボードゲームを進行しながら、アプリ上でストーリーカードを1枚ずつ表示し、セッションを管理できます。

## 技術スタック
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API / Zustand（必要に応じて）
- **Database**: 未定（将来的にSupabase/Firebase/PostgreSQLを検討）
- **Deployment**: Vercel

## ディレクトリ構成
```
/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx            # ホームページ
│   │   ├── sessions/           # セッション管理ページ
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx    # セッション詳細・カード表示
│   │   │   └── new/
│   │   │       └── page.tsx    # 新規セッション作成
│   │   └── api/                # API Routes
│   │       └── sessions/
│   ├── components/             # Reactコンポーネント
│   │   ├── ui/                 # 汎用UIコンポーネント
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Modal.tsx
│   │   ├── session/            # セッション関連コンポーネント
│   │   │   ├── CardDisplay.tsx
│   │   │   ├── SessionList.tsx
│   │   │   └── SessionForm.tsx
│   │   └── layout/             # レイアウトコンポーネント
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── types/                  # TypeScript型定義
│   │   ├── session.ts
│   │   └── card.ts
│   ├── lib/                    # ユーティリティ・ヘルパー
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── hooks/                  # カスタムフック
│   │   └── useSession.ts
│   └── styles/                 # グローバルスタイル
│       └── globals.css
├── public/                     # 静的ファイル
├── .claude/                    # Claudeプロジェクト設定
├── CLAUDE.md                   # このファイル
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## データモデル

### Session（セッション）
```typescript
interface Session {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  currentCardIndex: number;
  cards: Card[];
}
```

### Card（カード）
```typescript
interface Card {
  id: string;
  sessionId: string;
  order: number;
  type: 'setup' | 'story' | 'event';
  content: {
    title: string;
    story?: string;              // ストーリー概要
    components?: string[];       // 準備するコンポーネント
    setupSteps?: string[];       // セットアップ手順
    winCondition?: string;       // クリア条件
    loseCondition?: string;      // ゲームオーバー条件
    nextCondition?: string;      // 次のカードを引く条件
  };
}
```

## コア機能要件

### MVP（最小実行可能製品）
1. **セッション管理**
   - セッション一覧表示
   - 新規セッション作成（タイトル・説明のみ）
   - セッション削除

2. **カード表示機能**
   - 現在のカードを全画面表示
   - 「次のカードを引く」ボタン
   - 進行状況表示（X枚目/全Y枚）
   - セットアップカード（1枚目）の特別表示

3. **データ永続化**
   - 初期段階はローカルストレージ
   - セッション状態の保存・復元

### 将来的な拡張機能
- ユーザー認証・マルチユーザー対応
- カードエディター（セッション作成・編集UI）
- シナリオの共有機能
- 画像・アイコンのアップロード
- 履歴・統計機能

## コーディング規約

### TypeScript
- 厳格な型定義を使用（`strict: true`）
- `any`型の使用は原則禁止
- インターフェースは`types/`ディレクトリに集約
- Enumよりもユニオン型を優先

### React/Next.js
- **サーバーコンポーネント優先**（'use client'は必要な場合のみ）
- コンポーネントは関数コンポーネントのみ
- propsは分割代入で受け取る
- カスタムフックは`use`プレフィックス
- ファイル名はPascalCase（コンポーネント）、camelCase（ユーティリティ）

### スタイリング
- Tailwind CSSのユーティリティクラスを使用
- カスタムCSSは最小限に
- レスポンシブデザイン必須（mobile-first）
- ダークモード対応は後回し

### 命名規則
- 変数・関数: camelCase
- コンポーネント: PascalCase
- 定数: UPPER_SNAKE_CASE
- 型・インターフェース: PascalCase
- ファイル名: コンポーネントはPascalCase、その他はkebab-case

## 開発フロー

### 1. タスク開始時
- TodoWriteツールでタスクを計画・分解
- 関連ファイルを確認（Read/Grep）
- 既存のパターン・規約に従う

### 2. 実装時
- 小さな変更から始める
- 1つの機能を完成させてからコミット
- TypeScriptの型エラーは即座に修正
- セキュリティ脆弱性（XSS、インジェクション等）に注意

### 3. コードレビュー
- 3ファイル以上、または100行以上の変更後は`code-reviewer`エージェントを起動
- セキュリティ関連ファイル変更時は`security-auditor`エージェントを起動

### 4. テスト
- 実装後は必ず動作確認
- エッジケースを考慮
- エラーハンドリングを適切に実装

## セキュリティガイドライン
- ユーザー入力は必ずバリデーション
- XSS対策（dangerouslySetInnerHTML使用禁止）
- 機密情報は環境変数で管理
- API Routesには適切な認証・認可を実装

## パフォーマンス最適化
- 画像は`next/image`を使用
- 動的インポートでコード分割
- 不要な再レンダリングを避ける（useMemo、useCallback）
- Server Componentsを活用してクライアントJSを最小化

## Git運用
- コミットメッセージは明確に（日本語可）
- 機能ごとにコミット
- main/masterへの直接pushは避ける（ブランチ戦略は後で決定）

## 優先順位
1. **Phase 1（現在）**: プロジェクトセットアップ、基本構造構築
2. **Phase 2**: セッション一覧・カード表示機能（ローカルストレージ）
3. **Phase 3**: セッション作成・編集機能
4. **Phase 4**: データベース統合・認証機能

## 注意事項
- エージェントは必要に応じて並列実行
- ファイル作成は必要最小限に、既存ファイルの編集を優先
- 絵文字は明示的な要求がない限り使用しない
- コミットメッセージには自動的に`🤖 Generated with Claude Code`を含める

## 参考リンク
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
