package controllers

import (
	"../data"
	"github.com/gin-gonic/gin"
)

// PostTags is ...
func PostTags(c *gin.Context) {
	inputTags := &data.Tags{}
	c.BindJSON(inputTags)
	for _, t := range inputTags.Tags {
		data.AddTag(t)
	}
	data.SaveTags()
	c.JSON(200, inputTags)
}

// GetTags is ...
func GetTags(c *gin.Context) {
	tags := data.GetTags()
	c.JSON(200, tags)
}

// DeleteTags is ...
func DeleteTags(c *gin.Context) {
	Category := c.Param("Category")
	TagName := c.Param("TagName")
	data.DeleteTag(&data.Tag{Category: Category, TagName: TagName})
	data.SaveTags()
}
