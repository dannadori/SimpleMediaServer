package program

import (
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"

	"../config"
	"../data"
	"../util"
)

type singleMutex struct {
	m          sync.Mutex
	inProgress bool
	status     string
}

var sm = newSingleMutex()

const notRunning = "NOT RUNNING"

func newSingleMutex() *singleMutex {
	tsm := new(singleMutex)
	tsm.inProgress = false
	tsm.status = notRunning
	return tsm
}

func worker() <-chan string {
	receiver := make(chan string)
	go func() {
		defer func() { sm.inProgress = false }()

		var conf config.Config
		err := config.GetConfig(&conf)
		if err != nil {
			util.Error(err.Error())
		}

		var res string
		t := time.Now()
		const layout = "20060102150405"
		var dir = t.Format(layout)
		programPath := filepath.Join(config.GetHomePath(), conf.FS.Programs)
		currentPath := filepath.Join(programPath, dir)
		for i, c := range conf.CHANNEL {
			sm.status = "receiving... (" + strconv.Itoa(i) + "/" + strconv.Itoa(len(conf.CHANNEL)) + ")"
			videoFile := filepath.Join(currentPath, "["+c.ID+"]_test.ts")
			xmlFile := filepath.Join(currentPath, "["+c.ID+"]_test.xml")

			arg := " --b25 --strip " + c.ID + " 30 " + videoFile
			args := strings.Fields(arg)
			err := exec.Command(conf.EXTPROGRAMS.Recpt1, args...).Run()
			if err != nil {
				util.Error(err.Error())
				util.Error(conf.EXTPROGRAMS.Recpt1 + "  " + arg)
			}

			arg = " A " + videoFile + " " + xmlFile
			args = strings.Fields(arg)
			err = exec.Command(conf.EXTPROGRAMS.Epgdump, args...).Run()
			if err != nil {
				util.Error(err.Error())
				util.Error(conf.EXTPROGRAMS.Epgdump + "  " + arg)
			}

			err = os.Remove(videoFile)
			if err != nil {
				util.Error(err.Error())
			}

			//time.Sleep(1 * time.Second)
			res = res + arg
		}
		ParseXMLs(currentPath)
		data.SaveTVPrograms()
		data.SaveTVChannels()
		data.DeleteTVProgramUntilYesterday()
		sm.status = notRunning
	}()
	return receiver
}

// ReceiveTVPrograms is ...
func ReceiveTVPrograms() (status string, e error) {
	var inProgress bool

	sm.m.Lock()
	defer sm.m.Unlock()
	inProgress = sm.inProgress
	if inProgress == true {
		return sm.status, nil
	}

	sm.status = ""
	sm.inProgress = true

	worker()

	return "Start!!", nil
}

// GetReceiveTVProgramsStatus is ...
func GetReceiveTVProgramsStatus() (status string, e error) {
	return sm.status, nil
}

// RunReceiveTVProgramsService is ...
func RunReceiveTVProgramsService() {
	for {
		time.Sleep(24 * time.Hour)
		status, err := ReceiveTVPrograms()
		if err != nil {
			util.Error("ReceiveTVPrograms Error:" + err.Error())
		} else {
			util.Msg("ReceiveTVPrograms ok: " + status)
		}
	}
}
