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

# 内部仕様
## 起動時の処理
1. config.tomlの読み込み [*](#config)
1. staticファイルの設定。(client部分bindata)
1. データのロード
1. APIコントローラの設定
1. サービス軌道

### 環境変数 SMS_HOME
Video等データをおく場所。環境変数が設定されていない場合は実行時のカレントフォルダが使われる。

## config.tomlの仕様 
<a name="config"></a>

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


## API
| #   | method | path                          | controller                       | file               |     |     |
| --- | ------ | ----------------------------- | -------------------------------- | ------------------ | --- | --- |
| 1   | GET    | /video/:FileName              | controllers.GetVideo             | videos.go          |     |     |
| 1   | GET    | /api/tv-channels              | controllers.GetTVChannels        | TVChannels.go      |     |     |
| 1   | PATCH  | /api/tv-channels/:ID          | controllers.PatchTVChannels      |                    |     |     |
| 1   | GET    | /api/tv-programs/update       | controllers.GetUpdateTVPrograms  | TVPrograms.go      |     |     |
| 1   | GET    | /api/tv-programs              | controllers.GetTVPrograms        |                    |     |     |
| 1   | POST   | /api/tv-programs/update       | controllers.PostUpdateTVPrograms |                    |     |     |
| 1   | DELETE | /api/tv-programs              | controllers.DeleteTVPrograms     |                    |     |     |
| 1   | GET    | /api/recorder-timers          | controllers.GetRecorderTimers    | recorederTimers.go |     |     |
| 1   | POST   | "/api/recorder-timers         | controllers.PostRecorderTimers   |                    |     |     |
| 1   | DELETE | /api/recorder-timers/:EventID | controllers.DeleteRecorderTimers |                    |     |     |
| 1   | GET    | /api/tags                     | controllers.GetTags              | tagos.go           |     |     |
| 1   | POST   | /api/tags                     | controllers.PostTags             |                    |     |     |
| 1   | DELETE | "/api/tags/:Category/:TagName | controllers.DeleteTags           |                    |     |     |

### Get Video File 

| #   | method | path             | controller           | file      |     |     |
| --- | ------ | ---------------- | -------------------- | --------- | --- | --- |
| 1   | GET    | /video/:FileName | controllers.GetVideo | videos.go |     |     |

FileNameで指定したファイルを取得。

ファイルが格納されいているフォルダは、
- 環境変数"SMS_HOME"が指定されている場合はこれをベースに、指定されていない場合は動作フォルダをベースに、
- config.tomlのFS.Videosに指定されたパスを足したフォルダできまる。

http.ServeFileでginのデフォルトの動作ファイルを返す。(c.Header("Content-Type", "video/mpeg")はする。)


### Get Video File (GET /api/tv-channels)

| #   | method | path             | controller                | file          |     |     |
| --- | ------ | ---------------- | ------------------------- | ------------- | --- | --- |
| 1   | GET    | /api/tv-channels | controllers.GetTVChannels | TVChannels.go |     |     |

チャンネル一覧を返す。
[例](json_example/get_tv-channels.json)


### Get Video File (GET /api/tv-channels/:ID)


| #   | method | path                          | controller                       | file               |     |     |
| --- | ------ | ----------------------------- | -------------------------------- | ------------------ | --- | --- |
| 1   | GET    | /video/:FileName              | controllers.GetVideo             | videos.go          |     |     |
| 1   | GET    | /api/tv-channels              | controllers.GetTVChannels        | TVChannels.go      |     |     |
| 1   | PATCH  | /api/tv-channels/:ID          | controllers.PatchTVChannels      |                    |     |     |
| 1   | GET    | /api/tv-programs/update       | controllers.GetUpdateTVPrograms  | TVPrograms.go      |     |     |
| 1   | GET    | /api/tv-programs              | controllers.GetTVPrograms        |                    |     |     |
| 1   | POST   | /api/tv-programs/update       | controllers.PostUpdateTVPrograms |                    |     |     |
| 1   | DELETE | /api/tv-programs              | controllers.DeleteTVPrograms     |                    |     |     |
| 1   | GET    | /api/recorder-timers          | controllers.GetRecorderTimers    | recorederTimers.go |     |     |
| 1   | POST   | "/api/recorder-timers         | controllers.PostRecorderTimers   |                    |     |     |
| 1   | DELETE | /api/recorder-timers/:EventID | controllers.DeleteRecorderTimers |                    |     |     |
| 1   | GET    | /api/tags                     | controllers.GetTags              | tagos.go           |     |     |
| 1   | POST   | /api/tags                     | controllers.PostTags             |                    |     |     |
| 1   | DELETE | "/api/tags/:Category/:TagName | controllers.DeleteTags           |                    |     |     |


## Data Structure
### Server Module

#### TV Cahhnel (TVChannels.go)
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


#### TV Program (TVPrograms.go, recorederTimers.go)
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

#### Tags (tags.go)
| #   | item     | json            | ex) |     |     |
| --- | -------- | --------------- | --- | --- | --- |
| 1   | TagName  | json:"TagName"  |     |     |     |
| 1   | Category | json:"Category" |     |     |     |

