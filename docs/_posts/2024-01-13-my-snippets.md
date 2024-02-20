---
layout: post
page-category: note
title: 便利スニペット集
description: ""
preview: ""
category: 情報技術
tags:
  - excel
  - docker
  - git
  - laravel
  - linux
  - php
  - regexp
  - tips
date: 2024-01-13
lastmod: 2024-02-18
---

自分用便利スニペット集。

- 公私でよく使用するスニペットやコマンドをウェブから参照できるようにしたもの。
- 思いついたら適宜追加していく。
- 参考にする際は自己責任で！

<!-- omit in toc -->
## テンプレート

- タイトル

  ```c
  // コード
  ```

  - 参考文献・出典

<!-- omit in toc -->
## 目次

- [1. 記号](#1-記号)
- [2. 正規表現](#2-正規表現)
- [3. Linux コマンド](#3-linux-コマンド)
  - [3.1. alias](#31-alias)
  - [3.2. chown](#32-chown)
  - [3.3. grep](#33-grep)
  - [3.4. seq](#34-seq)
  - [3.5. ssh](#35-ssh)
- [4. Git](#4-git)
  - [4.1. Git の操作を取り消す](#41-git-の操作を取り消す)
  - [4.2. コミットを統合する](#42-コミットを統合する)
- [5. Docker](#5-docker)
  - [5.1. Container](#51-container)
  - [5.2. Image](#52-image)
  - [5.3. Compose](#53-compose)
  - [5.4. Volume](#54-volume)
- [6. Laravel](#6-laravel)
  - [6.1. Composer](#61-composer)
  - [6.2. Artisan](#62-artisan)
    - [6.2.1. key](#621-key)
    - [6.2.2. make](#622-make)
    - [6.2.3. db](#623-db)
    - [6.2.4. migrate](#624-migrate)
    - [6.2.5. tinker](#625-tinker)
    - [6.2.6. route](#626-route)
    - [6.2.7. serve](#627-serve)
- [7. Excel](#7-excel)
  - [7.1. 書式設定](#71-書式設定)
  - [7.2. 関数](#72-関数)
- [8. SQL](#8-sql)
- [9. Google 検索](#9-google-検索)

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

- 半角スペース OR 全角スペース OR タブ文字

  ```c
  ( |　|	)
  ```

- URL

  ```c
  // 完全一致 (行頭 ～ 行末)
  ^(http|https):\/\/[-\w\.]+(:\d+)?(\/[^\s]*)?$
  ```

  ```c
  // 部分一致
  (http|https):\/\/[-\w\.]+(:\d+)?(\/[^\s]*)?
  ```

  - [とほほの正規表現入門 - とほほのWWW入門](https://www.tohoho-web.com/ex/regexp.html)
  - [正規表現 - とほほのWWW入門](https://www.tohoho-web.com/perl/regexp.htm)

## 3. Linux コマンド

### 3.1. alias

- alias 一覧

  ```shell
  alias
  ```

  - [kenkenpa198/dotfiles > alias.zsh](https://github.com/kenkenpa198/dotfiles/blob/main/zsh/rc/alias.zsh)

### 3.2. chown

- 配下のファイルとディレクトリの所有者とグループをホストのユーザーへ変更する

  ```shell
  sudo chown -R $USER:$USER .
  ```

  - [man chown (1): ファイルの所有者とグループを変更する](https://ja.manpages.org/chown)
  - [WSL2でDockerを使用する際の権限問題を解決するシンプルな方法（docker-compose.yml使用） #Docker - Qiita](https://qiita.com/twu_go/items/a449e3006bd74fc7d10d)
  - [Linuxのユーザーとグループって何だろう？：“応用力”をつけるためのLinux再入門（10）（1/2 ページ） - ＠IT](https://atmarkit.itmedia.co.jp/ait/articles/1706/02/news014.html)

### 3.3. grep

- 指定ファイル内を検索する (行番号付き)

  ```shell
  grep -n {キーワード} {ファイル名}
  ```

- 指定ディレクトリ配下でヒットしたファイル名のリストを出力する

  ```shell
  grep -rl {キーワード} {起点となるディレクトリパス}
  ```

### 3.4. seq

- 指定範囲の数値をゼロ埋めで出力

  ```shell
  seq -w 1 100
  ```

- 桁数を指定する場合

  ```shell
  seq -f %04g 30
  ```

### 3.5. ssh

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

  - [5. rebase -i でコミットをまとめる｜サル先生のGit入門【プロジェクト管理ツールBacklog】](https://backlog.com/ja/git-tutorial/stepup/32/)

※ 実行しているコマンド `$ gll` は [git log のエイリアス](https://github.com/kenkenpa198/dotfiles/blob/fe695c145ec1c6b35849622cc3b26703d0ef5700/zsh/rc/alias.zsh#L100) 。

## 5. Docker

```shell
$ docker --version
Docker version 25.0.2, build 29cf629
```

- Docker へログインする

  ```shell
  docker login
  ```

- 指定した Docker イメージをプルする

  ```shell
  docker pull [OPTIONS] NAME[:TAG|@DIGEST]
  ```

### 5.1. Container

- Docker コンテナを一覧表示する

  ```shell
  docker container ls
  ```

  ```shell
  # ex.
  # docker ps と同義
  $ docker container ls
  CONTAINER ID   IMAGE                COMMAND                  CREATED      STATUS       PORTS                              NAMES
  4f869aa34b2e   docker-app           "docker-php-entrypoi…"   3 days ago   Up 2 hours   0.0.0.0:8000->8000/tcp, 9000/tcp   docker-app-1
  cbcb7cd20a54   postgres:11-alpine   "docker-entrypoint.s…"   3 days ago   Up 3 hours   0.0.0.0:5432->5432/tcp             docker-database-1
  ```

### 5.2. Image

- Docker イメージを一覧表示する

  ```shell
  docker image ls
  ```

  ```shell
  # ex.
  # docker images と同義
  $ docker image ls
  REPOSITORY   TAG         IMAGE ID       CREATED        SIZE
  docker-app   latest      25102b30807f   3 weeks ago    496MB
  postgres     11-alpine   10d7fb41183a   2 months ago   232MB
  ```

- `<none>` イメージを一括削除する

  ```shell
  docker image prune -f
  ```

  - [docker imagesに表示される＜none＞を消す。dangling \| codechord](https://codechord.com/2019/08/docker-images-none-dangling/)

### 5.3. Compose

- サービスをビルドする

  ```shell
  docker compose build [OPTIONS] [SERVICE...]
  ```

  ```shell
  # ex.
  # --no-cache: Do not use cache when building the image
  $ docker compose build --no-cache
  [+] Building 44.1s (6/9)
  ...
  [+] Building 62.5s (10/10) FINISHED
  ```

- コンテナを起動する

  ```shell
  docker compose up [OPTIONS] [SERVICE...]
  ```

  ```shell
  # ex.
  $ docker compose up
  [+] Running 9/9
  ...
  db-1    | The files belonging to this database system will be owned by user "postgres".
  ...
  main-1  | ====================================
  main-1  |            discordbot-mdn
  main-1  | ====================================
  ```

  ```shell
  # ex. バックグラウンドで起動する
  # -d, --detach: Detached mode: Run containers in the background
  $ docker compose up -d
  [+] Running 2/2
  ✔ Container discordbot-mdn-main-1  Started        0.0s
  ✔ Container discordbot-mdn-db-1    Started        0.0s
  ```

  ```shell
  # ex. イメージをビルドしてから起動する
  # --build: Build images before starting containers.
  $ docker compose up -d
  $ docker compose up -d --build
  [+] Building 1.5s (10/10) FINISHED                          docker:default
  => [main internal] load build definition from Dockerfile    0.0s
  [+] Running 2/0
  ✔ Container discordbot-mdn-db-1    Running                 0.0s
  ✔ Container discordbot-mdn-main-1  Running                 0.0s
  ```

- コンテナを停止する

  ```shell
  docker compose stop [OPTIONS] [SERVICE...]
  ```

  ```shell
  # ex.
  $ docker compose stop
  [+] Stopping 2/2
  ✔ Container discordbot-mdn-main-1  Stopped        10.3s
  ✔ Container discordbot-mdn-db-1    Stopped         0.3s
  ```

- コンテナのログを表示する

  ```shell
  docker compose logs [OPTIONS] [SERVICE...]
  ```

  ```shell
  # ex.
  # -f, --follow: Follow log output.
  $ docker compose logs -f
  main-1  | ====================================
  main-1  |            discordbot-mdn
  main-1  | ====================================
  main-1  | 2024-02-18 16:32:59.847807
  ...
  ```

- コンテナ内でアプリケーションを実行する

  ```shell
  docker compose exec [OPTIONS] SERVICE COMMAND [ARGS...]
  ```

  ```shell
  # ex. アプリ内で Bash を実行する
  # 1. Find SERVICE name
  $ cat docker-compose.yml
  version: "3.7"
  services:
    ...
    main:      # SERVICE name
      build: .
      ...

  # 2. exec with bash
  $ docker compose exec discordbot-mdn-main-1 bash
  service "discordbot-mdn-main-1" is not running
  ```

  ```shell
  # ex. Postgres DB へログインする
  # database   : Service name
  # -U         : Use username (postgres)
  $ docker compose exec database psql -U postgres
  psql (11.22)
  Type "help" for help.

  postgres=#
  ```

- コンテナを削除する

  ```shell
  docker compose down [OPTIONS] [SERVICES]
  ```

  ```shell
  # ex.
  $ docker compose down
  [+] Running 3/3
  ✔ Container discordbot-mdn-db-1    Removed         0.3s
  ✔ Container discordbot-mdn-main-1  Removed        10.4s
  ✔ Network discordbot-mdn_default   Removed         0.2s
  ```

  ```shell
  # ex. イメージもすべて削除する
  # --rmi string: Remove images used by services. "local" remove only images that don't have a custom tag ("local"|"all")
  $ docker-compose down --rmi all
  [+] Running 2/2
  ✔ Image postgres:14.5-alpine3.16    Removed        0.1s
  ✔ Image discordbot-mdn-main:latest  Removed        0.1s
  ```

  ```shell
  # ex. ボリュームも削除する
  # -v, --volumes: Remove named volumes declared in the "volumes" section of the Compose file and anonymous volumes attached to containers.
  $ docker-compose down --rmi all --volumes
  [+] Running 2/2
  ✔ Image postgres:14.5-alpine3.16    Removed        0.1s
  ✔ Image discordbot-mdn-main:latest  Removed        0.1s
  ```

### 5.4. Volume

- ボリューム一覧を表示する

  ```shell
  docker volume ls [OPTIONS]
  ```

  ```shell
  # ex.
  $ docker volume ls
  DRIVER    VOLUME NAME
  local     discordbot-mdn_db-volume
  ```

- ボリュームを削除する

  ```shell
  docker volume rm [OPTIONS] VOLUME [VOLUME...]
  ```

  ```shell
  $ docker volume rm discordbot-mdn_db-volume
  discordbot-mdn_db-volume

  $ docker volume ls
  DRIVER    VOLUME NAME
  ```

## 6. Laravel

```shell
$ php --version
PHP 7.3.33 (cli) (built: Mar 18 2022 03:18:11) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.3.33, Copyright (c) 1998-2018 Zend Technologies
$ php artisan --version
Laravel Framework 8.83.27
$ composer --version
Composer version 2.6.6 2023-12-08 18:32:26
```

### 6.1. Composer

- `composer.json` を使用してライブラリをインストールする

  ```shell
  composer install
  ```

  - [Command-line interface / Commands - Composer](https://getcomposer.org/doc/03-cli.md#install-i)

- オートローダーを更新する

  ```shell
  composer dump-autoload
  ```

  - [Command-line interface / Commands - Composer](https://getcomposer.org/doc/03-cli.md#dump-autoload-dumpautoload)

### 6.2. Artisan

#### 6.2.1. key

- アプリケーションの暗号化キーを設定する

  ```shell
  php artisan key:generate
  ```

  - [暗号化 10.x Laravel](https://readouble.com/laravel/10.x/ja/encryption.html)

#### 6.2.2. make

- コントローラークラスを作成する

  ```shell
  php artisan make:controller [options] [--] <name>
  ```

  ```shell
  # ex.
  $ php artisan make:controller TaskController
  INFO  Controller [app/Http/Controllers/TaskController.php] created successfully.
  ```

- マイグレーションファイルを作成する

  ```shell
  php artisan make:migration [options] [--] <name>
  ```

  ```shell
  # ex.
  $ php artisan make:migration create_folders_table --create=folders
  $ ls -la database/migrations/
  total 36
  drwxr-xr-x 2 1000 1000 4096 Feb 17 02:41 .
  drwxr-xr-x 5 1000 1000 4096 Jan 21 16:37 ..
  -rw-r--r-- 1 1000 1000  798 Jan 21 16:37 2014_10_12_000000_create_users_table.php
  ...
  -rw-r--r-- 1 1000 1000  770 Jan 21 16:37 2024_01_21_111050_create_folders_table.php # made
  ```

- モデルクラスを作成する

  ```shell
  php artisan make:model [options] [--] <name>
  ```

  ```shell
  # ex.
  $ php artisan make:model Folder

  $ ls -la app/Models/
  total 20
  drwxr-xr-x 2 1000 1000 4096 Jan 22 10:25 .
  drwxr-xr-x 7 1000 1000 4096 Jan 21 16:37 ..
  -rw-r--r-- 1 1000 1000  247 Jan 22 12:20 Folder.php # made
  -rw-r--r-- 1 1000 1000  913 Jan 21 16:37 User.php
  ```

- FormRequest クラスを作成する

  ```shell
  php artisan make:request <name>
  ```

  ```shell
  # ex.
  $ php artisan make:request CreateFolder

  $ ls -la app/Http/Requests/
  total 20
  drwxr-xr-x 2 1000 1000 4096 Feb 14 13:38 .
  drwxr-xr-x 5 1000 1000 4096 Jan 22 13:34 ..
  -rw-r--r-- 1 1000 1000  654 Jan 22 14:06 CreateFolder.php # made
  ```

- シーダークラスを作成する

  ```shell
  php artisan make:seeder <name>
  ```

  ```shell
  # ex.
  $ php artisan make:seeder FoldersTableSeeder

  $ ls -la database/seeders
  total 24
  drwxr-xr-x 2 1000 1000 4096 Feb 14 13:38 .
  drwxr-xr-x 5 1000 1000 4096 Jan 21 16:37 ..
  -rw-r--r-- 1 1000 1000  282 Jan 21 16:37 DatabaseSeeder.php
  -rw-r--r-- 1 1000 1000  846 Feb 14 13:38 FoldersTableSeeder.php # made
  ```

- テストクラスを作成する

  ```shell
  php artisan make:test [options] [--] <name>
  ```

  ```shell
  # ex.
  $ php artisan make:test TaskTest
  $ ls -la tests/Feature
  total 16
  drwxr-xr-x 2 1000 1000 4096 Feb 14 13:38 .
  drwxr-xr-x 4 1000 1000 4096 Jan 21 16:37 ..
  -rw-r--r-- 1 1000 1000  339 Jan 21 16:37 ExampleTest.php
  -rw-r--r-- 1 1000 1000 2509 Feb 14 13:38 TaskTest.php
  ```

#### 6.2.3. db

- シーダーを実行する

  ```shell
  php artisan db:seed [options] [--] [<class>]
  ```

  ```shell
  # ex.
  $ composer dump-autoload
  $ php artisan db:seed --class=FoldersTableSeeder
  Database seeding completed successfully.

  # Check Database
  $ exit
  $ docker compose exec database bash
  37ccc2e57c0a:/# psql -U postgres
  psql (11.22)
  Type "help" for help.

  postgres=# select * from folders;
   id |    title     |     created_at      |     updated_at
  ----+--------------+---------------------+---------------------
    1 | プライベート | 2024-01-21 12:24:51 | 2024-01-21 12:24:51
    2 | 仕事         | 2024-01-21 12:24:51 | 2024-01-21 12:24:51
    3 | 旅行         | 2024-01-21 12:24:51 | 2024-01-21 12:24:51
  (3 rows)
  ```

#### 6.2.4. migrate

- マイグレーションを実行する

  ```shell
  php artisan migrate
  ```

  ```shell
  # ex.
  $ php artisan migrate
  Migration table created successfully.
  Migrating: 2014_10_12_000000_create_users_table
  Migrated:  2014_10_12_000000_create_users_table (6.16ms)
  Migrating: 2014_10_12_100000_create_password_resets_table
  Migrated:  2014_10_12_100000_create_password_resets_table (2.87ms)
  ```

- テーブルをすべて削除してからマイグレーションを実行する

  ```shell
  $ php artisan migrate:fresh
  ```

  ```shell
  # ex.
  $ php artisan migrate:fresh
  Dropped all tables successfully.
  Migration table created successfully.
  Migrating: 2014_10_12_000000_create_users_table
  Migrated:  2014_10_12_000000_create_users_table (2.66ms)
  ...
  ```

#### 6.2.5. tinker

- メソッドを実行する

  ```shell
  tinker [options] [--] [<include>...]
  ```

  ```shell
  # ex. メソッドを実行する
  $ php artisan tinker
  Psy Shell v0.11.22 (PHP 7.3.33 — cli) by Justin Hileman
  > $folder = App\Models\Folder::find(1);
  = App\Models\Folder {#6516
      id: 1,
      title: "プライベート",
      created_at: "2024-01-22 10:39:42",
      updated_at: "2024-01-22 10:39:42",
    }
  ```

  ```shell
  # ex. 実行される SQL を確認する
  $ php artisan tinker
  Psy Shell v0.11.22 (PHP 7.3.33 — cli) by Justin Hileman
  > \App\Models\Task::where('folder_id', 1)->toSql();
  = "select * from "tasks" where "folder_id" = ?"
  ```

#### 6.2.6. route

- ルーティングの定義を一覧表示する

  ```shell
  route:list [options]
  ```

  ```shell
  # ex.
  $ php artisan route:list
  +--------+----------+-----------------------------------+------------------+------------------------------------------------------------------------+---------------------------------------------+
  | Domain | Method   | URI                               | Name             | Action                                                                 | Middleware                                  |
  +--------+----------+-----------------------------------+------------------+------------------------------------------------------------------------+---------------------------------------------+
  |        | GET|HEAD | /                                 | home             | App\Http\Controllers\HomeController@index                              | web                                         |
  |        | GET|HEAD | api/user                          |                  | Closure                                                                | api                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\Authenticate:sanctum    |
  |        | GET|HEAD | folders/create                    | folders.create   | App\Http\Controllers\FolderController@showCreateForm                   | web                                         |
  |        | POST     | folders/create                    |                  | App\Http\Controllers\FolderController@create                           | web                                         |
  |        | GET|HEAD | folders/{id}/tasks                | tasks.index      | App\Http\Controllers\TaskController@index                              | web                                         |
  |        | GET|HEAD | folders/{id}/tasks/create         | tasks.create     | App\Http\Controllers\TaskController@showCreateForm                     | web                                         |
  |        | POST     | folders/{id}/tasks/create         |                  | App\Http\Controllers\TaskController@create                             | web                                         |
  |        | GET|HEAD | folders/{id}/tasks/{task_id}/edit | tasks.edit       | App\Http\Controllers\TaskController@showEditForm                       | web                                         |
  |        | POST     | folders/{id}/tasks/{task_id}/edit |                  | App\Http\Controllers\TaskController@edit                               | web                                         |
  |        | GET|HEAD | home                              | home             | App\Http\Controllers\HomeController@index                              | web                                         |
  |        | POST     | login                             |                  | App\Http\Controllers\Auth\LoginController@login                        | web                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\RedirectIfAuthenticated |
  |        | GET|HEAD | login                             | login            | App\Http\Controllers\Auth\LoginController@showLoginForm                | web                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\RedirectIfAuthenticated |
  |        | POST     | logout                            | logout           | App\Http\Controllers\Auth\LoginController@logout                       | web                                         |
  |        | GET|HEAD | password/confirm                  | password.confirm | App\Http\Controllers\Auth\ConfirmPasswordController@showConfirmForm    | web                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\Authenticate            |
  |        | POST     | password/confirm                  |                  | App\Http\Controllers\Auth\ConfirmPasswordController@confirm            | web                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\Authenticate            |
  |        | POST     | password/email                    | password.email   | App\Http\Controllers\Auth\ForgotPasswordController@sendResetLinkEmail  | web                                         |
  |        | GET|HEAD | password/reset                    | password.request | App\Http\Controllers\Auth\ForgotPasswordController@showLinkRequestForm | web                                         |
  |        | POST     | password/reset                    | password.update  | App\Http\Controllers\Auth\ResetPasswordController@reset                | web                                         |
  |        | GET|HEAD | password/reset/{token}            | password.reset   | App\Http\Controllers\Auth\ResetPasswordController@showResetForm        | web                                         |
  |        | GET|HEAD | register                          | register         | App\Http\Controllers\Auth\RegisterController@showRegistrationForm      | web                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\RedirectIfAuthenticated |
  |        | POST     | register                          |                  | App\Http\Controllers\Auth\RegisterController@register                  | web                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\RedirectIfAuthenticated |
  |        | GET|HEAD | sanctum/csrf-cookie               |                  | Laravel\Sanctum\Http\Controllers\CsrfCookieController@show             | web                                         |
  +--------+----------+-----------------------------------+------------------+------------------------------------------------------------------------+---------------------------------------------+
  ```

#### 6.2.7. serve

- Web サーバーを起動する

  ```shell
  php artisan serve [options]
  ```

  ```shell
  # ex.
  # ローカルホストで起動する
  $ php artisan serve --host 0.0.0.0
  Starting Laravel development server: http://0.0.0.0:8000

  # Access to http://localhost:8000
  ```

## 7. Excel

### 7.1. 書式設定

- YYYY-MM-DD hh:mm:ss 形式 (ゼロ埋め) で表示

  ```c
  YYYY-MM-DD hh:mm:ss
  ```

### 7.2. 関数

- 縦に連番を振る

  ```c
  =IFERROR(MAX(INDIRECT(ADDRESS(1,COLUMN())):INDIRECT(ADDRESS(ROW()-1,COLUMN())))+1,1)
  ```

- 横に連番を振る

  ```c
  =IFERROR(MAX(INDIRECT(ADDRESS(ROW(),1)):INDIRECT(ADDRESS(ROW(),COLUMN()-1)))+1,1)
  ```

  - [Excel ドキュメントを書く時の定石集 - Neo's World](https://neos21.net/tech/business-communication/excel-best-practices.html)

## 8. SQL

- [標準 SQL 集]({% post_url 2022-11-24-sql-standard %})
- [自作 SQL 集]({% post_url 2022-11-24-sql-made-by-me %})

## 9. Google 検索

- サイト内検索

  ```shell
  # example.com ドメイン内で「つけ麺」を含むページを検索する
  site:example.com つけ麺

  # ディレクトリを指定するとその階層以下に限定できる
  site:https://www.example.com/ramen つけ麺
  ```

  - [検索演算子「site: 」の使い方 \| Google 検索セントラル  \|  ドキュメント  \|  Google for Developers](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site?hl=ja)
