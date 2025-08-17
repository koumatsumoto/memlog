# CLAUDE.md

このファイルは、このリポジトリで Claude Code (claude.ai/code) が作業する際のガイダンスを提供します。

## プロジェクト概要

個人用のメモ管理アプリ。React SPA として構築され、GitHub API と OAuth 認証を通じて GitHub をストレージバックエンドとして使用。Web Share Target API による素早いメモ保存をサポート。

## 開発コマンド

### 必須コマンド

- `npm run dev` - 開発サーバー起動
- `npm run build` - プロダクションビルド（git コミットハッシュとタイムスタンプ付き）
- `npm run test` - Jest でテスト実行
- `npm run lint` - Prettier と ESLint でコード整形（コミット前に必須）
- `npm run format` - コード整形と ESLint 自動修正

### テスト

- テストファイル: `**/*.test.ts`
- Jest + @sucrase/jest-plugin で TypeScript 変換
- 単一テスト実行: `npm test -- --testNamePattern="テスト名"`

## アーキテクチャ

### 技術スタック

- **フロントエンド**: React 18 + TypeScript, Create React App
- **UI ライブラリ**: Chakra UI + Emotion
- **状態管理**: Recoil
- **ストレージ**: @koumatsumoto/github-storage 経由で GitHub リポジトリ
- **認証**: GitHub OAuth
- **フォーム**: Formik + Yup
- **パターンマッチング**: ts-pattern

### 主要コンポーネント構造

- `src/components/App.tsx` - 認証ルーティングロジックを持つメインアプリ
- `src/components/features/` - 機能別コンポーネント（ログイン、メインタブ）
- `src/components/hooks/` - カスタムフック（useAuth、useGitHub 等）
- `src/components/shared/` - 共有ユーティリティ（AppStorage、Toast、Loading）
- `src/components/layouts/` - レイアウトコンポーネント（AppLayout、Header）

### GitHub Storage 連携

- `@koumatsumoto/github-storage`ライブラリで GitHub リポジトリにメモをファイル保存
- リポジトリ: `koumatsumoto/memlog-storage`
- GitHub OAuth トークンを localStorage に保存して認証
- コミット作成、ファイル履歴、ファイル詳細取得をサポート

## コード品質

### リント・フォーマット

- Prettier 設定: 行幅 140 文字、末尾カンマあり
- ESLint: react-app、import/typescript、prettier を継承
- ESLint で import 順序をアルファベット順に強制
- Husky プリコミットフックでステージされたファイルを整形
- コミット前に`npm run lint`実行必須（git diff 清潔性を保証）

### TypeScript 設定

- ターゲット: esnext、strict モード有効
- JSX: react-jsx（React 17+変換）
- モジュール: esnext、Node.js 解決
- 全ソースファイルは`src/`ディレクトリ

## 開発メモ

### 認証フロー

1. アプリが localStorage の GitHub アクセストークンをチェック
2. トークンがなければ GitHub OAuth のログインフォーム表示
3. OAuth リダイレクトは`appOpenedBy: "OAuthRedirect"`状態で処理
4. トークンは AppStorage（localStorage ラッパー）に保存

### 状態管理パターン

- GitHub API 呼び出しに Recoil セレクター使用
- `useAppInitialState`フックでアプリ初期化管理
- ts-pattern で条件分岐レンダリング

### 重要ファイル

- `src/components/shared/AppStorage.ts` - localStorage 抽象化
- `src/components/hooks/useGitHub.ts` - GitHub API 連携
- `src/environments.ts` - 環境設定

## ドキュメント管理方針

- `docs/` フォルダでプロジェクトドキュメントを管理
- 新規ドキュメント作成時は `docs/index.md` にリンクを追加
- 開発により実装を変更したときはドキュメントを最新化

### 更新ルール

- 実装変更時はドキュメント内容を見直し更新する
- 実装とドキュメントの整合性を保つ

## Git 操作ルール

### Commit 方法

Conventional Commits の仕様に基づいて git commit する。

- 英語で記述する
- 一行目に `<type>: <description>` の形式で概要を書く
- 三行目に具体的な作業内容を書く

例:

```
feat: implement user authentication API

- Add JWT token generation and validation
- Create user login and registration endpoints
```
