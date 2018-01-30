package controllers

import (
	"fmt"
	"os"

	"../data"
	"../util"
	"github.com/gin-gonic/gin"
)

// PostRecorderTimers is ...
func PostRecorderTimers(c *gin.Context) {
	prs := &data.RecorderTimers{}
	c.BindJSON(prs)
	for _, p := range prs.Programs {
		data.AddRecorderTimer(p)
	}
	data.SaveRecorderTimers()
	c.JSON(200, prs)
}

// GetRecorderTimers is ...
func GetRecorderTimers(c *gin.Context) {
	prs := data.GetRecorderTimers()
	c.JSON(200, prs)
}

// DeleteRecorderTimers is ...
func DeleteRecorderTimers(c *gin.Context) {

	mode := c.DefaultQuery("mode", "")

	EventID := c.Param("EventID")

	if mode == "deleteFile" {
		program := data.GetRecorderTimer(EventID)
		if program == nil {
			util.Error("programs is nil")
		} else {
			filePath := getVideoFilePath(program.FileName)
			if err := os.Remove(filePath); err != nil {
				fmt.Println(err)
			}
		}
	}

	data.DeleteRecorderTimer(EventID)
	data.SaveRecorderTimers()
}
