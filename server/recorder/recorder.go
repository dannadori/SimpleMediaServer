package recorder

import (
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"../config"
	"../data"
	"../util"
)

func getVideoFilePath(filename string) (path string) {
	var conf config.Config
	err := config.GetConfig(&conf)
	if err != nil {
		util.Error(err.Error())
	}
	programPath := filepath.Join(config.GetHomePath(), conf.FS.Videos)
	path = filepath.Join(programPath, filename)
	return path
}

// Recorder is ...
func Recorder() {
	for {
		timer := data.GetRecorderTimers()
		for _, t := range timer.Programs {
			layout := "20060102150405"
			loc, _ := time.LoadLocation("Asia/Tokyo")
			start, _ := time.ParseInLocation(layout, t.Start, loc)
			stop, _ := time.ParseInLocation(layout, t.Stop, loc)
			now := time.Now()
			layout = "2006/01/02_15:04:05"
			during := (int)(stop.Sub(time.Now()).Seconds())
			util.Msg("Record Start[1]: " + t.FileName + " afterStart:" + strconv.FormatBool(now.After(start)) + " beforeEnd" + strconv.FormatBool(now.Before(stop)) + "")
			if now.After(start) && now.Before(stop) && t.FileName == "" {
				//if now.After(start) && now.Before(stop) && t.FileName == "" {
				filename := t.Start + "[" + t.Channel + "]_" + t.Title + ".ts"
				filename = strings.Replace(filename, " ", "_", -1)
				filename = strings.Replace(filename, "　", "_", -1)
				filename = strings.Replace(filename, "/", "_", -1)

				filePath := getVideoFilePath(filename)
				t.FileName = filename //ファイル名設定
				data.SaveRecorderTimers()
				util.Msg("Record Start: " + filePath)

				var conf config.Config
				err := config.GetConfig(&conf)
				if err != nil {
					util.Error(err.Error())
				}
				tp := data.GetTVChannel(t.Channel)
				arg := " --b25 --strip " + tp + " " + strconv.Itoa(during) + " " + filePath
				util.Msg("Record Start2: param:" + arg)
				args := strings.Fields(arg)
				cmd := exec.Command(conf.EXTPROGRAMS.Recpt1, args...)
				err = cmd.Start()
				go cmd.Wait()
				// if err != nil {
				// 	util.Error(err.Error())
				// }
			}

		}
		time.Sleep(15 * time.Second)
	}
}
