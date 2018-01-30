package controllers

import (
	"../data"
	"github.com/gin-gonic/gin"
	//	"encoding/json"
)

// GetTVChannels is ...
func GetTVChannels(c *gin.Context) {
	chs := data.GetTVChannels()
	c.JSON(200, chs)
}

// PatchTVChannels is ...
func PatchTVChannels(c *gin.Context) {
	ID := c.Param("ID")

	chs := &data.TVChannels{}
	c.BindJSON(chs)
	for _, ch := range chs.Channels {
		if ID != ch.ID {
			c.JSON(500, chs)
			return
		}
		data.ToggleVisibleTVChannel(ID, ch.Visible)
		data.SetTagsTVChannel(ID, ch.Tags)
	}

	data.SaveTVChannels()
	c.JSON(200, chs)

}
