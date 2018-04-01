package data

import (
	"../util"
)

///////// Definition //////////

// RecorderTimers is ,,,
type RecorderTimers struct {
	Programs []*Program `json:"Programs"`
}

var recorderTimers = newRecorderTimers()

func newRecorderTimers() *RecorderTimers {
	p := RecorderTimers{}
	return &p
}

///////////// CRUD //////////////////////////////////

// AddRecorderTimer is ...
func AddRecorderTimer(program *Program) {
	m.Lock()
	defer m.Unlock()
	if programExists(&recorderTimers.Programs, program) {
		util.Error("Already Recoder Timer Exist " +
			program.Title + " " + program.Channel + " " + program.Start + " " + program.Stop)
		return
	}
	recorderTimers.Programs = append(recorderTimers.Programs, program)
}

// DeleteRecorderTimer is ...
func DeleteRecorderTimer(key string) {
	m.Lock()
	defer m.Unlock()
	res := []*Program{}
	for _, p := range recorderTimers.Programs {
		if p.Key == key {
		} else {
			res = append(res, p)
		}
	}
	recorderTimers.Programs = res
}

// GetRecorderTimers is ...
func GetRecorderTimers() (p *RecorderTimers) {
	return recorderTimers
}

// GetRecorderTimer is ...
func GetRecorderTimer(EventID string) (p *Program) {
	m.Lock()
	defer m.Unlock()
	util.Msg("Matching start: " + EventID)
	if recorderTimers == nil {
		util.Msg("Matching start: nilnil")
	}
	for _, p := range recorderTimers.Programs {
		util.Msg("Matching??" + p.EventID + "  " + EventID)
		if p.EventID == EventID {
			util.Msg("Matching?? YES")
			return p
		}
	}
	util.Msg("Matching end: " + EventID)
	return nil
}

////////// File Access /////////////

// SaveRecorderTimers is ...
func SaveRecorderTimers() {
	SaveJSON("recorder-timers.json", recorderTimers)
}

// LoadRecorderTimers is ...
func LoadRecorderTimers() {
	LoadJSON("recorder-timers.json", recorderTimers)
}
