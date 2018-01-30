package data

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"path/filepath"
	"sync"

	"../config"
	"../util"
)

var m = newMutex()

func newMutex() *sync.Mutex {
	m := new(sync.Mutex)
	return m
}

func getJSONFilePath(filename string) (path string) {
	var conf config.Config
	err := config.GetConfig(&conf)
	if err != nil {
		util.Error(err.Error())
	}
	//util.Msg("Save File1: " + config.GetHomePath())
	programPath := filepath.Join(config.GetHomePath(), conf.FS.Programs)
	//	util.Msg("Save File2: " + programPath)
	path = filepath.Join(programPath, filename)
	//util.Msg("Save File3: " + path)
	return path
}

// SaveJSON is ...
func SaveJSON(filename string, v interface{}) {
	m.Lock()
	defer m.Unlock()
	filePath := getJSONFilePath(filename)
	outputJSON, err := json.MarshalIndent(v, "", "    ")
	util.Msg("Save File: " + filePath)
	file, err := os.Create(filePath)
	if err != nil {
		util.Error(err.Error())
	}
	file.Write(outputJSON)
}

// LoadJSON is ...
func LoadJSON(filename string, v interface{}) {
	m.Lock()
	defer m.Unlock()
	filePath := getJSONFilePath(filename)
	_, err := os.Stat(filePath)
	if err != nil {
		return
	}
	raw, err := ioutil.ReadFile(filePath)
	if err != nil {
		util.Error(err.Error())
	}

	err = json.Unmarshal(raw, v)
	util.Msg("Load File: " + filePath)
	if err != nil {
		util.Error(err.Error())
	}
}

// LoadAll is ...
func LoadAll() {
	//	LoadUserChannels()
	LoadTVChannels()
	//	LoadRecordedPrograms()
	LoadRecorderTimers()
	LoadTVPrograms()
	LoadTags()
}
