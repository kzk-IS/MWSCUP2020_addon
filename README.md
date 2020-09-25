# MADMAX 

MADMAX：MAchine learning-baseD MAlicious domain eXhauster はユーザにとって快適な処理時間で自動的に悪性ドメイン判定を行うプラットフォームである。ユーザはFirefox-ADDONS をインストールするだけで手軽に利用することができる。

## 機能

ユーザがサイトにアクセスする際に、URL中に含まれるドメインが悪性か良性であるかを高速予測が可能な機械学習モデルELM（Extreme Learning Machine）を用いて判定を行う。
悪性ドメインであると判定された場合は警告画面を表示してユーザに対して注意喚起を行う。

機械学習を利用することにより、Denyリストを用いた検知手法では対応できない未知の脅威からユーザを守ることが可能である。

予測モデルは開発者が構築したサーバ内で動作しており、ユーザはアドオンをインストールすれば意識することなくこの高精度・高速な悪性ドメイン予測のサービスを受けることができるため、普及も期待することが可能であり、セキュアな世の中の実現の第一歩となる。

## プラットフォーム全体図

MADMAXの構成要素としては大きく分けて、ユーザ側のFirefox-ADDONSとサーバ側の予測モデルの2つである。

![][fig_system]

[fig_system]:https://github.com/kzk-IS/MWS2020_adon/blob/master/fig_system.jpg

ユーザがブラウザ上でサイトにアクセスしようとした際、アドオンが自動で悪性サイト検知処理を行う。アドオン上のアルゴリズムとしては単純で、サイトのURLから切り出したドメインを予測サーバに入力クエリとして送信し、その予測結果を元に悪性であれば警告画面を表示し注意喚起を促す。（以前に悪性の疑いがあると判定されたとしても、アクセスが許可されているサイトはユーザホワイトリストとして保持しておき、サーバを介せずにアクセスする。） 

まず、ユーザ側の処理ではFirefox-ADDONSが自動的に悪性ドメイン検知を行うサーバに対しドメインを送信する。ユーザがブラウザでとあるサイトにアクセスしようとした際、アドオンがサイトのURLから抽出したドメインをサーバに送信する。サーバでは、ドメインを元に文献[11] に準じた特徴量抽出を行い、ELMモデルで予測を行う。予測結果を受信したアドオンは、悪性サイトであると判定された場合にはユーザに対して警告画面を表示する。

サーバの中では高速な機械学習アルゴリズムELM（Extreme Learning Machine）が動作している。文献[11] によると悪性ドメイン検知においてELM[12] を用いることで予測時間および精度はそれぞれ十分に出ていることは示されている。今回文献[11] に従ってプラットフォーム化を行うことにより，高速および高精度の悪性ドメイン検知システムが期待される。

最新の予測モデルに更新することも簡単であり開発者が更新した機械学習モデルのパラメータのみをjson形式でアップデートすることが可能であり, モデル自体を更新することも可能である.



## ELM Blocker の使い方

ここでは主にユーザ側の使い方について説明する. サーバ側の設定に関してはサーバの章をご覧いただきたい。

1. githubからアドオンをダウンロードする. 保存したいディレクトリで以下のコマンドを実行する.

`$ git clone https://github.com/kzk-IS/MWS2020_addon.git`

1. Firefoxを開き， URLバーに以下を入力

`about:debugging#/runtime/this-firefox`

1. `一時的なアドオン読み込み中...`(for English ver. `Load Temporary Add-on...`)ボタンを押し，先ほどcloneしたディレクトリの`manifest.json`を選択して，開く．

1. `ELM Blocker`というアドオンが追加されていれば，インストール成功．


## サーバ側の設定について
https://github.com/kzk-IS/MWSCUP2020_server

Deny リストでは対処しきれない未知の悪性ドメインを検知するため, 機械学習アルゴリズムを用いた.

サーバサイドのjavascriptであるNode.jsで実装している. これによって機械学習モデルへの入力として必要な複数の特徴量を非同期処理で並列化することができる.

また, 機械学習モデル本体には, tensorflowjsを用いることで高速予測を実現している（もっと詳しいモデルの実装方法も？）

（ここからELMの説明）

速度は1アクセスあたりXXX秒, 精度はXXX% である.

## 実行のデモ

実行環境(2020/09/25現在)
- Firefox(77.0.1)

## ライセンス

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## 製作者

- [kzk-IS](https://github.com/kzk-IS)
- [akazs](https://github.com/akazs)
- [nanana710](https://github.com/nanana710)
- [han9umeda](https://github.com/han9umeda)
- [takemr](https://github.com/takemr)
- [flabrei926](https://github.com/flabrei926)

### アドバイザー

[矢内直人(大阪大学 大学院情報科学研究科 セキュリティ工学講座(藤原研究室) 助教)](http://www-infosec.ist.osaka-u.ac.jp/~yanai/)
