package data

///////// Definition //////////

// TVChannels is ...
type TVChannels struct {
	Channels []*Channel `json:"Channels"`
}

// Channel is ...
type Channel struct {
	ID                string   `json:"ID"` // A_103 etc, primary key
	Tp                string   `json:"Tp"` // channel id for recpt1
	DisplayName       string   `json:"DisplayName"`
	TransportStreamID string   `json:"TransportStreamID"`
	OriginalNetworkID string   `json:"OriginalNetworkID"`
	ServiceID         string   `json:"ServiceID"`
	Key               string   `json:"key"`
	Tags              []string `json:"tags"`
	Visible           bool     `json:"visible"`
}

var tvChannels = newTVChannels()

func newTVChannels() *TVChannels {
	c := TVChannels{}
	return &c
}

///////////// Utility Function /////////////////////////

func channelExists(channels *[]*Channel, channel *Channel) (b bool) {
	for _, c := range *channels {
		if c.ID == channel.ID {
			return true
		}
	}
	return false
}

func findChannel(channels *[]*Channel, channel *Channel) (c *Channel) {
	for _, c := range *channels {
		if c.ID == channel.ID {
			return c
		}
	}
	return nil
}

///////////// CRUD //////////////////////////////////

// AddTVChannel is ...
func AddTVChannel(channel *Channel) {
	m.Lock()
	defer m.Unlock()
	//util.Error("TV Channel " + channel.ID + " Key:" + channel.Key)
	if channelExists(&tvChannels.Channels, channel) {
		//util.Error("Already TV Channel Exist " + channel.ID + " Key:" + channel.Key)
		return
	}
	tvChannels.Channels = append(tvChannels.Channels, channel)
}

// ToggleVisibleTVChannel is ...
func ToggleVisibleTVChannel(id string, visible bool) {
	for _, ch := range tvChannels.Channels {
		if ch.ID == id {
			ch.Visible = visible
		}
	}
}

// SetTagsTVChannel is ...
func SetTagsTVChannel(id string, tags []string) {
	for _, ch := range tvChannels.Channels {
		if ch.ID == id {
			ch.Tags = tags
		}
	}
}

// GetTVChannels is ...
func GetTVChannels() (p *TVChannels) {
	return tvChannels
}

// GetTVChannel is ...
func GetTVChannel(sub string) (p string) {
	for _, c := range tvChannels.Channels {
		if c.ID == sub {
			return c.Tp
		}
	}
	return ""
}

////////// File Access /////////////

// SaveTVChannels is ...
func SaveTVChannels() {
	SaveJSON("TV-channels.json", tvChannels)
}

// LoadTVChannels is ...
func LoadTVChannels() {
	LoadJSON("TV-channels.json", tvChannels)
}

// // SaveTVChannels2 is ...
// func SaveTVChannels2() {
// 	m.Lock()
// 	defer m.Unlock()
// 	filename := getJSONFilePath("TV-channels.json")
// 	outputJSON, err := json.MarshalIndent(tvChannels, "", "    ")
// 	util.Msg("Save File: " + filename)
// 	file, err := os.Create(filename)
// 	if err != nil {
// 		util.Error(err.Error())
// 	}
// 	file.Write(outputJSON)
// }

// // LoadTVChannels2 is ...
// func LoadTVChannels2() {

// 	m.Lock()
// 	defer m.Unlock()
// 	filename := getJSONFilePath("TV-channels.json")
// 	_, err := os.Stat(filename)
// 	if err != nil {
// 		return
// 	}
// 	raw, err := ioutil.ReadFile(filename)
// 	if err != nil {
// 		util.Error(err.Error())
// 	}

// 	err = json.Unmarshal(raw, tvChannels)
// 	util.Msg("Load File: " + filename)
// 	if err != nil {
// 		util.Error(err.Error())
// 	}
// }
