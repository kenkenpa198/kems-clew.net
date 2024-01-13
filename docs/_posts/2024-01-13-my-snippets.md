---
layout: post
page-category: note
title: 便利スニペット集
description: ""
preview: ""
category: 情報技術
tags:
  - excel
  - git
  - linux
  - regexp
  - tips
date: 2024-01-13
lastmod: 2024-01-13
---

自分用便利スニペット集。

- 公私でよく使用するスニペットをウェブから参照できるようにしたもの。
- 思いついたら適宜追加していく。
- 参考にする際は自己責任で！

<!-- omit in toc -->
## テンプレート

- タイトル

  ```c
  // コード
  ```

<!-- omit in toc -->
## 目次

- [1. 記号](#1-記号)
- [2. 正規表現](#2-正規表現)
- [3. Linux コマンド](#3-linux-コマンド)
  - [3.1. alias](#31-alias)
  - [3.2. grep](#32-grep)
  - [3.3. seq](#33-seq)
  - [3.4. ssh](#34-ssh)
- [4. Git](#4-git)
  - [4.1. Git の操作を取り消す](#41-git-の操作を取り消す)
  - [4.2. コミットを統合する](#42-コミットを統合する)
- [5. Excel](#5-excel)
  - [5.1. 書式設定](#51-書式設定)
  - [5.2. 関数](#52-関数)
- [6. SQL](#6-sql)
- [7. Google 検索](#7-google-検索)

## 1. 記号

※ `[]` の中をコピペする。

- 全角スペース

  ```c
  [　]
  ```

- タブ文字

  ```c
  [	]
  ```

## 2. 正規表現

- 半角スペース または 全角スペース

  ```c
   |　
  ```

## 3. Linux コマンド

### 3.1. alias

- alias 一覧

  ```shell
  alias
  ```

  - 設定: [kenkenpa198/dotfiles > alias.zsh](https://github.com/kenkenpa198/dotfiles/blob/main/zsh/rc/alias.zsh)

### 3.2. grep

- 指定ファイル内を検索する (行番号付き)

  ```shell
  grep -n {キーワード} {ファイル名}
  ```

- 指定ディレクトリ配下でヒットしたファイル名のリストを出力する

  ```shell
  grep -rl {キーワード} {起点となるディレクトリパス}
  ```

### 3.3. seq

- 指定範囲の数値をゼロ埋めで出力

  ```shell
  seq -w 1 100
  ```

- 桁数を指定する場合

  ```shell
  seq -f %04g 30
  ```

### 3.4. ssh

- SSH 接続

  ```shell
  ssh {ユーザー名}@{接続先の IP アドレス} -p {ポート番号}
  ```

## 4. Git

### 4.1. Git の操作を取り消す

```shell
# 1. git reflog で操作履歴を出力する
$ git reflog
02f11b7 HEAD@{0}: reset: moving to 02f11b7                               # 現在のコミット (HEAD)
0488e28 HEAD@{1}: merge develop: Merge made by the 'recursive' strategy. # 1 つ前のコミット
...

# 2. 戻りたいコミットを指定して git reset する
# 「1 つ前」に戻す場合は「HEAD@{n}」へ 1 を指定する
# ディレクトリの内容が書き換わるので注意
$ git reset --hard HEAD@{1}

# コミットのハッシュを指定してもよい
$ git reset --hard 0488e28

# ステージング状態へ戻す場合は --soft を指定する
$ git reset --soft HEAD@{1}
```

参考)

  - [Git - リセットコマンド詳説](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%81%95%E3%81%BE%E3%81%96%E3%81%BE%E3%81%AA%E3%83%84%E3%83%BC%E3%83%AB-%E3%83%AA%E3%82%BB%E3%83%83%E3%83%88%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E8%A9%B3%E8%AA%AC)
  - [第6話 git reset 3種類をどこよりもわかりやすい図解で解説！【連載】マンガでわかるGit ～コマンド編～ - itstaffing エンジニアスタイル](https://www.r-staffing.co.jp/engineer/entry/20191129_1)
  - [第7話 間違えて reset しちゃった？git reflogで元どおり【連載】マンガでわかるGit ～コマンド編～ - itstaffing エンジニアスタイル](https://www.r-staffing.co.jp/engineer/entry/20191227_1)

### 4.2. コミットを統合する

(1) のコミットを (2) へ統合する場合の対応手順。

```shell
$ gll
* dc80a8f 2024-01-13 11:33:09 (HEAD -> main) wip by"kenkenpa198"                   # (1)
* 07e84cc 2024-01-13 11:27:11 [add]add note 2024-01-13-my-snippets by"kenkenpa198" # (2)
```

  ```shell
  # 1. リベースを開始する
  $ git rebase -i HEAD~~
  ```

  ```shell
  # 2. リベース指示書を編集する
  # 統合するコミットを f へ書き換えて保存する
  # f は統合を指示する指定
  pick 07e84cc [add]add note 2024-01-13-my-snippets
  f dc80a8f wip                                     # pick から f へ変更

  # Rebase d3937fb..dc80a8f onto d3937fb (2 commands)
  #
  # Commands:
  # p, pick <commit> = use commit
  # ...
  # f, fixup <commit> = like "squash", but discard this commit's log message
  # ...
  ```

  ```shell
  # 3. ファイルを保存後、Successfully ... と表示されたことを確認する
  $ git rebase -i HEAD~~                            # 1. で実行したコマンド
  Successfully rebased and updated refs/heads/main. # 返った結果

  # 4. コミットログとファイル内容を確認する
  $ gll
  * 8ed7b8a 2024-01-13 10:57:20 (HEAD -> main) [add]add note 2024-01-13-my-snippets by"kenkenpa198"
  ...
  ```

参考) [5. rebase -i でコミットをまとめる｜サル先生のGit入門【プロジェクト管理ツールBacklog】](https://backlog.com/ja/git-tutorial/stepup/32/)

※ 実行しているコマンド `$ gll` は [git log のエイリアス](https://github.com/kenkenpa198/dotfiles/blob/fe695c145ec1c6b35849622cc3b26703d0ef5700/zsh/rc/alias.zsh#L100) 。

## 5. Excel

### 5.1. 書式設定

- YYYY-MM-DD hh:mm:ss 形式 (ゼロ埋め) で表示

  ```c
  YYYY-MM-DD hh:mm:ss
  ```

### 5.2. 関数

- 縦に連番を振る

  ```c
  =IFERROR(MAX(INDIRECT(ADDRESS(1,COLUMN())):INDIRECT(ADDRESS(ROW()-1,COLUMN())))+1,1)
  ```

- 横に連番を振る

  ```c
  =IFERROR(MAX(INDIRECT(ADDRESS(ROW(),1)):INDIRECT(ADDRESS(ROW(),COLUMN()-1)))+1,1)
  ```

  参考) [Excel ドキュメントを書く時の定石集 - Neo's World](https://neos21.net/tech/business-communication/excel-best-practices.html)

## 6. SQL

- [標準 SQL 集]({% post_url 2022-11-24-sql-standard %})
- [自作 SQL 集]({% post_url 2022-11-24-sql-made-by-me %})

## 7. Google 検索

- サイト内検索

  ```shell
  # example.com ドメイン内で「つけ麺」を含むページを検索する
  site:example.com つけ麺

  # ディレクトリを指定するとその階層以下に限定できる
  site:https://www.example.com/ramen つけ麺
  ```

  参考) [検索演算子「site: 」の使い方 \| Google 検索セントラル  \|  ドキュメント  \|  Google for Developers](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site?hl=ja)
