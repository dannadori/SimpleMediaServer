# SimpleMediaServer β

PT1/2/3を使った録画サーバです。
同種のものがすでに幾つか先人がおられますので、必要性は微妙ですが、
Golang+React+Reduxを使ったものはなさそうなので、作ってみました。

# 前提
- node
- npm
- recpt1


## developping
### 1st terminal
```
cd client; ../node_modules/.bin/webpack -w --progress --config ./webpack.config.js ; cd -
```

### 2nd terminal
```
fresh
```

### 3rd terminal

```
npm run bindata # invoke by each change

```


## TODO NEXT VERSIOM
- Channel Group

# 内部仕様 (サーバ)
## 起動時の処理
1. config.tomlの読み込み [*](#config)
1. staticファイルの設定。(client部分bindata)
1. データのロード [*](#load_data)
1. レコーダサービスの起動 [*](#invoke_recorder_service)
1. プログラム取得サービスの起動 (not yet) [*](#invoke_pull_program_service)
1. APIコントローラの設定 [*](#controller)
1. 本サービス起動 [*](#service)

### 環境変数 SMS_HOME
Video等データをおく場所。環境変数が設定されていない場合は実行時のカレントフォルダが使われる。

<a name="config"></a>

## config.tomlの仕様 

| #   | item             | json            | ex)                                                          |     |     |
| --- | ---------------- | --------------- | ------------------------------------------------------------ | --- | --- |
| 1   | Common           | Port            | サーバのポート                                                      |     |     |
| 1   |                  | PullProgramTime | 番組表の取得タイミング hhmmで記載                                   |     |     |
| 1   | ExternalPrograms | Recpt1          | recpt1のフルパス。"/usr/local/bin/recpt1"とか                       |     |     |
| 1   |                  | Epgdump         | epgdumpのフルパス。"/usr/local/bin/epgdump"とか                     |     |     |
| 1   | FolderStructure  | Programs        | プログラムの格納領域。環境変数"SMS_HOME"以下か、カレントフォルダ以下に追加。 |     |     |
| 1   |                  | Videos          | ビデオの格納領域。環境変数"SMS_HOME"以下か、カレントフォルダ以下に追加。   |     |     |
| 1   | Channel          | Name            | チャンネル名                                                      |     |     |
| 1   |                  | ID              | チャンネルID                                                      |     |     |

<a name="load_data"></a>

## データのロード
| #   | ファイル                 | 説明             | 詳細 |     |     |     |
| --- | -------------------- | ---------------- | ---- | --- | --- | --- |
| 1   | TV-channels.json     | チャンネル情報        |      |     |     |     |
| 1   | TV-programs.json     | 番組情報         |      |     |     |     |
| 1   | recorder-timers.json | 録画データ情報      |      |     |     |     |
| 1   | tags.json            | チャンネルにつけるタグの情報 |      |     |     |     |

### チャンネル情報 (TV-channels.json)
```
{  
   "Channels":[  
      {  
         "ID":"GR_23656",
         "Tp":"13",
         "DisplayName":"Ｊ：ＣＯＭテレビ",
         "TransportStreamID":"32397",
         "OriginalNetworkID":"32397",
         "ServiceID":"23656",
         "key":"GR_23656",
         "tags":[  
            "ｇ"
         ],
         "visible":false
      },
      {  
         "ID":"GR_23657",
         "Tp":"13",
         "DisplayName":"Ｊ：ＣＯＭテレビ",
         "TransportStreamID":"32397",
         "OriginalNetworkID":"32397",
         "ServiceID":"23657",
         "key":"GR_23657",
         "tags":null,
         "visible":false
      }
   ]
}
```

### 番組情報 (TV-programs.json)、録画データ情報 (recorder-timers.json)
```
{
    "Programs": [
        {
            "Channel": "GR_23656",
            "Title": "ダイレクトテレショップ",
            "Desc": "　",
            "Category": [
                "情報／ワイドショー",
                "information"
            ],
            "Start": "20180401020000",
            "Stop": "20180401030000",
            "EventID": "183",
            "FileName": "",
            "key": "183_GR_23656"
        },
        {
            "Channel": "GR_23656",
            "Title": "笑福亭鶴光のオールナイトニッポン．ＴＶ＠Ｊ：ＣＯＭ　＃２８",
            "Desc": "２０１７年１０月に５０周年を迎えたニッポン放送の「オールナイトニッポン」とコラボレーション！メインパーソナリティーに笑福亭鶴光を迎え、３１年ぶりに復活！！",
            "Category": [
                "バラエティ",
                "variety"
            ],
            "Start": "20180401030000",
            "Stop": "20180401050000",
            "EventID": "184",
            "FileName": "",
            "key": "184_GR_23656"
        }
    ]
}
```

### チャンネルにつけるタグの情報 (tags.json)
```
{
    "Tags": [
        {
            "TagName": "ｇ",
            "Category": "Tags For Channels"
        }
    ]
}
```


<a name="invoke_recorder_service"></a>

## レコーダサービスの起動

1. 15秒に一度録画情報を参照
1. 各録画情報について・・・
    1. 現在時間が、開始時刻と終了時刻に入るかを確認
        1. メッセージ出力 "<タイトル> <現在が開始時刻後か> <現在が終了時刻前>"
    1. 現在時間が、開始時刻と終了時刻に入り、ファイル名が入ってなければ(＝録画開始していなければ)
        1. ファイル名を作成　
        2. 録画情報にファイル名を設定→ ファイルに保存
        3. メッセージ出力 "Record Start: <ファイル名>"
        4. 録画コマンド実行
        5. goroutineで終了待ち


<a name="invoke_pull_program_service"></a>

## プログラム取得サービスの起動 (not yet)

24時間に一度。（時刻指定はまだ未実装。）APIで手動起動もできる。

1. lockを取得
1. 番組表更新中か確認。更新中ならステータスを返して終了。（deferでロック解除）
1. 更新中じゃなかったら、更新中フラグを立てる。
1. 非同期処理
	1. 指定されているチャンネル数分
		1. テンポラリのtsファイル名とxmlファイル名を作成
		1. 30秒録画してtsファイルに保存(recpt1)
		1. tsファイルを解析してxmlファイルを作成(epgdump)
		1. tsファイルを削除 (xmlファイルは残す。デバッグ用。いつか消すように変えます)
		1. 
	1. 生成したxmlを解析
	1. チャンネル情報と番組情報を解析
    1. ファイルに保存
	1. 古いデータを削除
	1. ステータスを更新
1. 更新開始を返して終了(deferでロック解除)



<a name="controller"></a>

## API APIコントローラの設定
| #   | method | path                          | controller                       | file               |     |     |
| --- | ------ | ----------------------------- | -------------------------------- | ------------------ | --- | --- |
| 1   | GET    | /video/:FileName              | controllers.GetVideo             | videos.go          |     |     |
| 1   | GET    | /api/tv-channels              | controllers.GetTVChannels        | TVChannels.go      |     |     |
| 1   | PATCH  | /api/tv-channels/:ID          | controllers.PatchTVChannels      |                    |     |     |
| 1   | GET    | /api/tv-programs/update       | controllers.GetUpdateTVPrograms  | TVPrograms.go      |     |     |
| 1   | POST   | /api/tv-programs/update       | controllers.PostUpdateTVPrograms |                    |     |     |
| 1   | GET    | /api/tv-programs              | controllers.GetTVPrograms        |                    |     |     |
| 1   | DELETE | /api/tv-programs              | controllers.DeleteTVPrograms     |                    |     |     |
| 1   | GET    | /api/recorder-timers          | controllers.GetRecorderTimers    | recorederTimers.go |     |     |
| 1   | POST   | "/api/recorder-timers         | controllers.PostRecorderTimers   |                    |     |     |
| 1   | DELETE | /api/recorder-timers/:key     | controllers.DeleteRecorderTimers |                    |     |     |
| 1   | GET    | /api/tags                     | controllers.GetTags              | tagos.go           |     |     |
| 1   | POST   | /api/tags                     | controllers.PostTags             |                    |     |     |
| 1   | DELETE | "/api/tags/:Category/:TagName | controllers.DeleteTags           |                    |     |     |

### ビデオファイル取得 

| #   | method | path             | controller           | file      |     |     |
| --- | ------ | ---------------- | -------------------- | --------- | --- | --- |
| 1   | GET    | /video/:FileName | controllers.GetVideo | videos.go |     |     |

FileNameで指定したファイルを取得。

ファイルが格納されいているフォルダは、
- 環境変数"SMS_HOME"が指定されている場合はこれをベースに、指定されていない場合は動作フォルダをベースに、
- config.tomlのFS.Videosに指定されたパスを足したフォルダできまる。

http.ServeFileでginのデフォルトの動作ファイルを返す。(c.Header("Content-Type", "video/mpeg")はする。)


### チャンネル情報取得

| #   | method | path             | controller                | file          |     |     |
| --- | ------ | ---------------- | ------------------------- | ------------- | --- | --- |
| 1   | GET    | /api/tv-channels | controllers.GetTVChannels | TVChannels.go |     |     |

チャンネル一覧を返す。
```
{  
    "Channels":[  
       {  
          "ID":"GR_23656",
          "Tp":"13",
          "DisplayName":"Ｊ：ＣＯＭテレビ",
          "TransportStreamID":"32397",
          "OriginalNetworkID":"32397",
          "ServiceID":"23656",
          "key":"GR_23656",
          "tags":[  
             "ｇ"
          ],
          "visible":false
       },
       {  
          "ID":"GR_23657",
          "Tp":"13",
          "DisplayName":"Ｊ：ＣＯＭテレビ",
          "TransportStreamID":"32397",
          "OriginalNetworkID":"32397",
          "ServiceID":"23657",
          "key":"GR_23657",
          "tags":null,
          "visible":false
       }
    ]
 }
```


### チャンネル情報設定

| #   | method | path                 | controller                  | file |     |     |
| --- | ------ | -------------------- | --------------------------- | ---- | --- | --- |
| 1   | PATCH  | /api/tv-channels/:ID | controllers.PatchTVChannels |      |     |     |

チャンネル情報を設定する。
設定する情報はタグと表示可否。
IDで指定されらたチャンネルを検索し、情報を上書きする。

```
{  
   "Channels":[  
      {  
         "ID":"GR_23657",
         "Tp":"13",
         "DisplayName":"Ｊ：ＣＯＭテレビ",
         "TransportStreamID":"32397",
         "OriginalNetworkID":"32397",
         "ServiceID":"23657",
         "key":"GR_23657",
         "tags":[   // タグ情報
            "ｇ" 
         ],
         "visible":false // 表示情報 
      }
   ]
}
```

### 番組表更新状況確認

| #   | method | path                    | controller                      | file          |     |     |
| --- | ------ | ----------------------- | ------------------------------- | ------------- | --- | --- |
| 1   | GET    | /api/tv-programs/update | controllers.GetUpdateTVPrograms | TVPrograms.go |     |     |

更新状況を取得する。
```
{"message":"NOT RUNNING"}
```

```
{"message":"receiving... (0/52)"}
```

### 番組表更新

| #   | method | path                    | controller                       | file |     |     |
| --- | ------ | ----------------------- | -------------------------------- | ---- | --- | --- |
| 1   | POST   | /api/tv-programs/update | controllers.PostUpdateTVPrograms |      |     |     |

番組表を更新する。
```
{"message":"Start!!"}
```

```
{"message":"receiving... (0/52)"}
```
### 番組表取得

| #   | method | path             | controller                | file |     |     |
| --- | ------ | ---------------- | ------------------------- | ---- | --- | --- |
| 1   | GET    | /api/tv-programs | controllers.GetTVPrograms |      |     |     |

番組表を取得する。
クエリは、channel、begin、end、wordが指定可能

```
{
    "Programs": [
        {
            "Channel": "GR_23656",
            "Title": "ダイレクトテレショップ",
            "Desc": "　",
            "Category": [
                "情報／ワイドショー",
                "information"
            ],
            "Start": "20180401020000",
            "Stop": "20180401030000",
            "EventID": "183",
            "FileName": "",
            "key": "183_GR_23656"
        },
        {
            "Channel": "GR_23656",
            "Title": "笑福亭鶴光のオールナイトニッポン．ＴＶ＠Ｊ：ＣＯＭ　＃２８",
            "Desc": "２０１７年１０月に５０周年を迎えたニッポン放送の「オールナイトニッポン」とコラボレーション！メインパーソナリティーに笑福亭鶴光を迎え、３１年ぶりに復活！！",
            "Category": [
                "バラエティ",
                "variety"
            ],
            "Start": "20180401030000",
            "Stop": "20180401050000",
            "EventID": "184",
            "FileName": "",
            "key": "184_GR_23656"
        },
    ]
}
```

### 番組表削除

| #   | method | path             | controller                   | file |     |     |
| --- | ------ | ---------------- | ---------------------------- | ---- | --- | --- |
| 1   | DELETE | /api/tv-programs | controllers.DeleteTVPrograms |      |     |     |

古い番組のデータを番組表から削除する。
現時点の実相では、実行時の1日前より古い番組情報は削除される。



### 録画情報取得

| #   | method | path                 | controller                    | file               |     |     |
| --- | ------ | -------------------- | ----------------------------- | ------------------ | --- | --- |
| 1   | GET    | /api/recorder-timers | controllers.GetRecorderTimers | recorederTimers.go |     |     |

録画情報を取得する。

```
{
    "Programs": [
        {
            "Channel": "A_103",
            "Title": "岩合光昭の世界ネコ歩きｍｉｎｉ「イヌとネコ」「ネコの歩き方」【字】",
            "Desc": "動物写真家・岩合光昭が世界各地で撮影するネコ、今回の冒頭は「イヌとネコ」、「猫識」は「ネコの歩き方」、名場面は珍種「スフィンクス」とチェコの古都のホテルのネコ。",
            "Category": [
                "その他",
                "etc"
            ],
            "Start": "20180326231000",
            "Stop": "20180326232500",
            "EventID": "13369",
            "FileName": "20180326231000[A_103]_岩合光昭の世界ネコ歩きｍｉｎｉ「イヌとネコ」「ネコの歩き方」【字】.ts",
            "key": "13369_A_103"
        }
    ]
}
```

### 録画情報設定

| #   | method | path                  | controller                     | file |     |     |
| --- | ------ | --------------------- | ------------------------------ | ---- | --- | --- |
| 1   | POST   | "/api/recorder-timers | controllers.PostRecorderTimers |      |     |     |

録画情報を設定する。

```
{  
   "Programs":[  
      {  
         "Channel":"GR_24632",
         "Title":"クルマでいこう！「ホンダ　シビック　ＴＹＰＥ　Ｒ」",
         "Desc":"ホンダ　シビック　ＴＹＰＥ　Ｒの実力を岡崎五朗・藤島知子が試乗やメーカー・インポーターとのインタビューを通して、分かりやすく立体的にチェックします。",
         "Category":[  
            "その他",
            "etc"
         ],
         "Start":"20180401220000",
         "Stop":"20180401223000",
         "EventID":"30859",
         "FileName":"",
         "key":"30859_GR_24632"
      }
   ]
}
```

### 録画情報削除

| #   | method | path                      | controller                       | file |     |     |
| --- | ------ | ------------------------- | -------------------------------- | ---- | --- | --- |
| 1   | DELETE | /api/recorder-timers/:key | controllers.DeleteRecorderTimers |      |     |     |

録画情報を削除する。
keyで指定された録画情報を削除する。
パラメータ"mode"でdeleteFileを指定するとファイルも消す。

### タグ取得

| #   | method | path      | controller          | file     |     |     |
| --- | ------ | --------- | ------------------- | -------- | --- | --- |
| 1   | GET    | /api/tags | controllers.GetTags | tagos.go |     |     |

タグ情報を取得する。
```
{
    "Tags": [
        {
            "TagName": "ｇ",
            "Category": "Tags For Channels"
        }
    ]
}
```

### タグ作成

| #   | method | path      | controller           | file |     |     |
| --- | ------ | --------- | -------------------- | ---- | --- | --- |
| 1   | POST   | /api/tags | controllers.PostTags |      |     |     |

タグを作成する
```
{  
   "Tags":[  
      {  
         "TagName":"test",
         "Category":"Tags For Channels"
      }
   ]
}
```

### タグ削除

| #   | method | path                          | controller             | file |     |     |
| --- | ------ | ----------------------------- | ---------------------- | ---- | --- | --- |
| 1   | DELETE | "/api/tags/:Category/:TagName | controllers.DeleteTags |      |     |     |

Category, TagNameが一致するタグを削除する。

<a name="service"></a>

## 本サービス起動



# Data Structure
## Server Module

### TV Cahhnel (TVChannels.go)
| #   | item              | json                     | ex)   |                       |     |
| --- | ----------------- | ------------------------ | ----- | --------------------- | --- |
| 1   | ID                | json:"ID"                | A_103 | primary key           |     |
| 1   | Tp                | json:"Tp"                |       | channel id for recpt1 |     |
| 1   | DisplayName       | json:"DisplayName"       |       |                       |     |
| 1   | TransportStreamID | json:"TransportStreamID" |       |                       |     |
| 1   | OriginalNetworkID | json:"OriginalNetworkID" |       |                       |     |
| 1   | ServiceID         | json:"ServiceID"         |       |                       |     |
| 1   | Key               | json:"key"               |       |                       |     |
| 1   | Tags              | json:"tags"              |       |                       |     |
| 1   | Visible           | json:"visible"           |       |                       |     |


### TV Program (TVPrograms.go, recorederTimers.go)
| #   | item     | json            | ex)   |     |     |
| --- | -------- | --------------- | ----- | --- | --- |
| 1   | Channel  | json:"Channel"  | A_103 |     |     |
| 1   | Title    | json:"Title"    |       |     |     |
| 1   | Desc     | json:"Desc"     |       |     |     |
| 1   | Category | json:"Category" |       |     |     |
| 1   | Start    | json:"Start"    |       |     |     |
| 1   | Stop     | json:"Stop"     |       |     |     |
| 1   | EventID  | json:"EventID"  |       |     |     |
| 1   | FileName | json:"FileName" |       |     |     |
| 1   | Key      | json:"key"      |       |     |     |

### Tags (tags.go)
| #   | item     | json            | ex) |     |     |
| --- | -------- | --------------- | --- | --- | --- |
| 1   | TagName  | json:"TagName"  |     |     |     |
| 1   | Category | json:"Category" |     |     |     |

