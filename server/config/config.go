package config

import (
	"os"

	"path/filepath"

	"github.com/BurntSushi/toml"
)

// Config is ...
type Config struct {
	COMMON      Common
	EXTPROGRAMS ExternalPrograms
	FS          FolderStructure
	CHANNEL     []Channel
}

// Common is ...
type Common struct {
	Port            string
	PullProgramTime int
}

// ExternalPrograms is ...
type ExternalPrograms struct {
	Recpt1  string
	Epgdump string
}

// FolderStructure is ...
type FolderStructure struct {
	Programs string
	Videos   string
}

// Channel is ...
type Channel struct {
	Name string
	ID   string
}

// Conf is ...
var Conf Config

// GetConfig is ...
func GetConfig(c *Config) error {
	path := filepath.Join(GetHomePath(), "config.toml")
	_, err := toml.DecodeFile(path, c)
	if err != nil {
		return err
	}
	return nil
}

// GetHomePath is ...
func GetHomePath() (path string) {
	home := os.Getenv("SMS_HOME")
	if home == "" {
		home, _ = os.Getwd()
	}
	return home
}
