package controllers

import (
	"net/http"
	"path/filepath"

	"../config"
	"../util"
	"github.com/gin-gonic/gin"
)

func getVideoFilePath(filename string) (path string) {
	var conf config.Config
	err := config.GetConfig(&conf)
	if err != nil {
		util.Error(err.Error())
	}
	programPath := filepath.Join(config.GetHomePath(), conf.FS.Videos)
	path = filepath.Join(programPath, filename)
	return path
}

// GetVideo is ...
func GetVideo(c *gin.Context) {
	fileName := c.Param("FileName")
	filePath := getVideoFilePath(fileName)
	// for key, val := range c.Request.Header {
	// 	util.Error("Header Key:" + key)
	// 	for _, v := range val {
	// 		util.Error("Header VAl:" + v)
	// 	}
	// }
	c.Header("Content-Type", "video/mpeg")
	http.ServeFile(c.Writer, c.Request, filePath)
	//	c.Data()

}
