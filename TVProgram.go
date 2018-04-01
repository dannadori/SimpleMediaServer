package data

import (
	"strconv"
	"time"
)

///////// Definition //////////

// TVPrograms is ,,,
type TVPrograms struct {
	Programs []*Program `json:"Programs"`
}

// Program is ...
type Program struct {
	Channel  string   `json:"Channel"` // A_103 etc,
	Title    string   `json:"Title"`
	Desc     string   `json:"Desc"`
	Category []string `json:"Category"`
	Start    string   `json:"Start"`
	Stop     string   `json:"Stop"`
	EventID  string   `json:"EventID"`
	FileName string   `json:"FileName"`
	Key      string   `json:"key"`
}

var tvPrograms = newTVPrograms()

func newTVPrograms() *TVPrograms {
	p := TVPrograms{}
	return &p
}

///////////// Utility Function /////////////////////////

func programExists(programs *[]*Program, program *Program) (b bool) {
	for _, p := range *programs {
		if p.Channel == program.Channel && p.EventID == program.EventID {
			return true
		}
	}
	return false
}

///////////// CRUD //////////////////////////////////

// AddTVProgram is ...
func AddTVProgram(program *Program) {
	m.Lock()
	defer m.Unlock()
	if programExists(&tvPrograms.Programs, program) {
		// util.Error("Already TV Program Exist " +
		// 	program.Title + " " + program.Channel + " " + program.Start + " " + program.Stop)
		return
	}
	tvPrograms.Programs = append(tvPrograms.Programs, program)
}

// GetTVPrograms is ...
func GetTVPrograms() (p *TVPrograms) {
	return tvPrograms
}

// DeleteTVProgram is ...
func DeleteTVProgram(EventID string) {
	m.Lock()
	defer m.Unlock()
	res := []*Program{}
	for _, p := range tvPrograms.Programs {
		if p.EventID == EventID {
		} else {
			res = append(res, p)
		}
	}
	tvPrograms.Programs = res
}

// DeleteTVProgramBefore is ...
func DeleteTVProgramBefore(t *time.Time) {
	prs := GetTVPrograms()
	const layout = "20060102150405"
	lastday, _ := strconv.Atoi(t.Format(layout))
	for _, pr := range prs.Programs {
		stop, _ := strconv.Atoi(pr.Stop)
		if stop < lastday {
			DeleteTVProgram(pr.EventID)
		}
	}
	SaveTVPrograms()
}

// DeleteTVProgramUntilYesterday is ...
func DeleteTVProgramUntilYesterday() {
	t := time.Now()
	t.Add(-1 * time.Duration(24) * time.Hour)
	DeleteTVProgramBefore(&t)
}

////////// File Access /////////////

// SaveTVPrograms is ...
func SaveTVPrograms() {
	SaveJSON("TV-programs.json", tvPrograms)
}

// LoadTVPrograms is ...
func LoadTVPrograms() {
	LoadJSON("TV-programs.json", tvPrograms)
}
