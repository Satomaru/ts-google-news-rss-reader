ts-google-news-rss-reader
=========================

これは、play.jsの習作である `google-news-rss-reader` を、TypeScriptで書き直したものです。
play.js上でビルドおよび実行ができます。

play.jsでTypeScriptを用いる時の注意点
----------------------------------

play.jsでは、`npm run-script` において以下の問題が発生します。

- `node` の実行、および `node_modules/.bin` 配下のコマンドの実行以外のことができない。
- `&&` でコマンドを連結しても実行されない。
- `npm-run-all` が正常に動作しない。
- `pre` プレフィックスを付けたタスクが期待通りに呼び出されない。

よって、通常の方法では「TypeScriptのトランスパイル前に出力先ディレクトリを削除する」というタスクが実現できません。

そこでこのプロジェクトでは、ビルドを行うためのプログラム `build.js` を作成することで対応しました。
