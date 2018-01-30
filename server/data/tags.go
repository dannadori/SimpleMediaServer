package data

import (
	"../util"
)

///////// Definition //////////

// Tags is ...
type Tags struct {
	Tags []*Tag `json:"Tags"`
}

// Tag is ...
type Tag struct {
	TagName  string `json:"TagName"`
	Category string `json:"Category"`
}

var tags = newTags()

func newTags() *Tags {
	tags := Tags{}
	return &tags
}

///////////// Utility Function /////////////////////////

func tagExists(tags *Tags, newTag *Tag) (b bool) {
	if len(tags.Tags) == 0 {
		return false
	}
	for _, t := range tags.Tags {
		if t == nil {
			continue
		}
		if t.TagName == newTag.TagName && t.Category == newTag.Category {
			return true
		}
	}
	return false
}

///////////// CRUD //////////////////////////////////

// AddTag is ...
func AddTag(tag *Tag) {
	m.Lock()
	defer m.Unlock()

	if tagExists(tags, tag) {
		util.Error("Already Tag Exist" + tag.TagName + "@" + tag.Category)
		return
	}
	tags.Tags = append(tags.Tags, tag)
}

// DeleteTag is ...
func DeleteTag(tag *Tag) {
	m.Lock()
	defer m.Unlock()
	res := []*Tag{}
	for _, t := range tags.Tags {
		if t.TagName == tag.TagName && t.Category == tag.Category {
		} else {
			res = append(res, t)
		}
	}
	tags.Tags = res
}

// GetTags is ...
func GetTags() (c *Tags) {
	return tags
}

////////// File Access /////////////

// SaveTags is ...
func SaveTags() {
	SaveJSON("tags.json", tags)
}

// LoadTags is ...
func LoadTags() {
	LoadJSON("tags.json", tags)
}

// // SaveTags2 is ...
// func SaveTags2() {
// 	m.Lock()
// 	defer m.Unlock()
// 	filename := getJSONFilePath("tags.json")
// 	outputJSON, err := json.MarshalIndent(tags, "", "    ")
// 	util.Msg("Save File: " + filename)
// 	file, err := os.Create(filename)
// 	if err != nil {
// 		util.Error(err.Error())
// 	}
// 	file.Write(outputJSON)
// }

// // LoadTags2 is ...
// func LoadTags2() {
// 	m.Lock()
// 	defer m.Unlock()
// 	filename := getJSONFilePath("tags.json")
// 	_, err := os.Stat(filename)
// 	if err != nil {
// 		return
// 	}
// 	raw, err := ioutil.ReadFile(filename)
// 	if err != nil {
// 		util.Error(err.Error())
// 	}

// 	err = json.Unmarshal(raw, tags)
// 	util.Msg("Load File: " + filename)
// 	if err != nil {
// 		util.Error(err.Error())
// 	}
// }
