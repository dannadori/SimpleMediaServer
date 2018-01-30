package main

import (
	"net/http"
	"strings"

	"./config"
	"./controllers"
	"./data"
	"./recorder"
	"./util"
	"github.com/elazarl/go-bindata-assetfs"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

type binaryFileSystem struct {
	fs http.FileSystem
}

func (b *binaryFileSystem) Open(name string) (http.File, error) {
	return b.fs.Open(name)
}

func (b *binaryFileSystem) Exists(prefix string, filepath string) bool {
	if p := strings.TrimPrefix(filepath, prefix); len(p) < len(filepath) {
		if _, err := b.fs.Open(p); err != nil {
			return false
		}
		return true
	}
	return false
}

// BinaryFileSystem is ...
func BinaryFileSystem(root string) *binaryFileSystem {
	fs := &assetfs.AssetFS{Asset, AssetDir, AssetInfo, root}
	return &binaryFileSystem{
		fs,
	}
}

func main() {
	util.Msg("Start SMS")

	var conf config.Config
	err := config.GetConfig(&conf)
	if err != nil {
		util.Error(err.Error())
	}

	r := gin.Default()
	r.Use(static.Serve("/", BinaryFileSystem("assets")))

	data.LoadAll()
	go recorder.Recorder()

	r.GET("/video/:FileName", controllers.GetVideo)

	r.GET("/api/tv-channels", controllers.GetTVChannels)
	r.PATCH("/api/tv-channels/:ID", controllers.PatchTVChannels)

	r.GET("/api/tv-programs/update", controllers.GetUpdateTVPrograms)
	r.POST("/api/tv-programs/update", controllers.PostUpdateTVPrograms)
	r.GET("/api/tv-programs", controllers.GetTVPrograms)
	r.DELETE("/api/tv-programs", controllers.DeleteTVPrograms)

	r.POST("/api/recorder-timers", controllers.PostRecorderTimers)
	r.GET("/api/recorder-timers", controllers.GetRecorderTimers)
	r.DELETE("/api/recorder-timers/:EventID", controllers.DeleteRecorderTimers)

	r.POST("/api/tags", controllers.PostTags)
	r.GET("/api/tags", controllers.GetTags)
	r.DELETE("/api/tags/:Category/:TagName", controllers.DeleteTags)

	r.Run(":" + conf.COMMON.Port)

}
