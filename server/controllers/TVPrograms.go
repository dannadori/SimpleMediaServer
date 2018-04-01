package controllers

import (
	"strconv"
	"strings"

	"../config"
	"../data"
	"../program"
	"github.com/gin-gonic/gin"
)

// GetUpdateTVPrograms is ,,,
func GetUpdateTVPrograms(c *gin.Context) {
	var x config.Config
	err := config.GetConfig(&x)
	status, err := program.GetReceiveTVProgramsStatus()
	if err != nil {
		c.JSON(200, gin.H{
			"message": "" + err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": status})
}

// PostUpdateTVPrograms is ,,,
func PostUpdateTVPrograms(c *gin.Context) {
	var x config.Config
	err := config.GetConfig(&x)
	status, err := program.ReceiveTVPrograms()
	if err != nil {
		c.JSON(200, gin.H{
			"message": "" + err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": status})
}

// GetTVPrograms is ...
func GetTVPrograms(c *gin.Context) {
	prs := data.GetTVPrograms()
	channel := c.DefaultQuery("channel", "")
	begin := c.DefaultQuery("begin", "")
	end := c.DefaultQuery("end", "")
	word := c.DefaultQuery("word", "")

	res := data.TVPrograms{}
	for _, p := range prs.Programs {
		res.Programs = append(res.Programs, p)
	}

	if channel != "" {
		tmp := data.TVPrograms{}
		for _, p := range res.Programs {
			if p.Channel == channel {
				tmp.Programs = append(tmp.Programs, p)
			}
		}
		res.Programs = tmp.Programs
	}

	if word != "" {
		tmp := data.TVPrograms{}
		for _, p := range res.Programs {
			if strings.Contains(p.Title, word) || strings.Contains(p.Desc, word) {
				tmp.Programs = append(tmp.Programs, p)
			}
		}
		res.Programs = tmp.Programs
	}

	if begin != "" {
		tmp := data.TVPrograms{}
		begin, _ := strconv.Atoi(begin)
		for _, p := range res.Programs {
			start, _ := strconv.Atoi(p.Start)
			if start > begin {
				tmp.Programs = append(tmp.Programs, p)
			}
		}
		res.Programs = tmp.Programs
	}

	if end != "" {
		tmp := data.TVPrograms{}
		end, _ := strconv.Atoi(end)
		for _, p := range res.Programs {
			start, _ := strconv.Atoi(p.Start)
			if start < end {
				tmp.Programs = append(tmp.Programs, p)
			}
		}
		res.Programs = tmp.Programs
	}

	c.JSON(200, res)

}

// DeleteTVPrograms is ...
func DeleteTVPrograms(c *gin.Context) {
	data.DeleteTVProgramUntilYesterday()

}
