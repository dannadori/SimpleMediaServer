package util

import (
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"

	"../config"
)

func setProp() {
	logfile := filepath.Join(config.GetHomePath(), "log")
	file, err := os.OpenFile(logfile, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		exec.Command("logger", "SimpleMediaServer: Cannot Open Log File !!!! : "+logfile).Run()
	}

	log.SetOutput(file)
	log.SetFlags(log.Ldate | log.Ltime)
}

// Msg is ...
func Msg(msg string) {
	setProp()
	programCounter, sourceFileName, sourceFileLineNum, _ := runtime.Caller(1)
	fn := runtime.FuncForPC(programCounter)
	fnames := strings.Split(fn.Name(), "/")
	fname := fnames[len(fnames)-1]
	log.Printf("%s(%d)[%s]: %s", sourceFileName, sourceFileLineNum, fname, msg)
}

// Error is ...
func Error(msg string) {
	setProp()
	programCounter, sourceFileName, sourceFileLineNum, _ := runtime.Caller(1)
	fn := runtime.FuncForPC(programCounter)
	fnames := strings.Split(fn.Name(), "/")
	fname := fnames[len(fnames)-1]
	log.Printf("%s(%d)[%s]:ERROR!!! %s", sourceFileName, sourceFileLineNum, fname, msg)
}
