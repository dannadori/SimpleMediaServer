package program

import (
	//	"strconv"
	"encoding/xml"
	"io/ioutil"
	"path/filepath"
	"strings"

	"../data"
	"../util"
)

// Channel is ...
type Channel struct {
	ID                string `xml:"id,attr"`
	Tp                string `xml:"tp,attr"`
	DisplayName       string `xml:"display-name"`
	TransportStreamID string `xml:"transport_stream_id"`
	OriginalNetworkID string `xml:"original_network_id"`
	ServiceID         string `xml:"service_id"`
}

// Program is ...
type Program struct {
	Start    string   `xml:"start,attr"`
	Stop     string   `xml:"stop,attr"`
	Channel  string   `xml:"channel,attr"`
	EventID  string   `xml:"event_id,attr"`
	Title    string   `xml:"title"`
	Desc     string   `xml:"desc"`
	Category []string `xml:"category"`
}

// Television is ...
type Television struct {
	Channel []Channel `xml:"channel"`
	Program []Program `xml:"programme"`
}

// ProgramData is ...
type ProgramData struct {
	Tv Television `xml:"tv"`
}

// ParseXML ...
func ParseXML(file string) {
	xmlData, _ := ioutil.ReadFile(file)
	result := Television{}
	//util.Logger("xmlParser file: "+file)

	err := xml.Unmarshal([]byte(xmlData), &result)
	if err != nil {
		util.Error(err.Error())
	}
	for _, program := range result.Program {
		p := data.Program{
			Channel:  program.Channel,
			Title:    program.Title,
			Desc:     program.Desc,
			Category: program.Category,
			Start:    strings.Split(program.Start, " ")[0],
			Stop:     strings.Split(program.Stop, " ")[0],
			EventID:  program.EventID,
			Key:      program.EventID + "_" + program.Channel,
		}
		data.AddTVProgram(&p)
	}

	for _, channel := range result.Channel {
		if channel.Tp == "A" {
			var offset = strings.LastIndex(file, "/")
			channel.Tp = file[offset+2 : offset+4]
		}
		c := data.Channel{
			ID:                channel.ID,
			Tp:                channel.Tp,
			DisplayName:       channel.DisplayName,
			TransportStreamID: channel.TransportStreamID,
			OriginalNetworkID: channel.OriginalNetworkID,
			ServiceID:         channel.ServiceID,
			Key:               channel.ID,
		}
		data.AddTVChannel(&c)
	}
}

// ParseXMLs is ...
func ParseXMLs(dir string) {
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		util.Error(err.Error())
	}
	for _, file := range files {
		//cm, pm := data.GetData()
		//util.Logger("xmlParser " + strconv.Itoa(len(cm)) + " " + strconv.Itoa(len(pm)) )
		if strings.HasSuffix(file.Name(), "xml") {
			path := filepath.Join(dir, file.Name())
			ParseXML(path)
		}
	}
}
