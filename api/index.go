package index

import (
	"fmt"
	"net/http"
	"os"
	"strings"
)

var redirects = map[string]string{
	"website": "https://uiuc.hack4impact.org",
}

func Handler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	if path == "/" {
		http.ServeFile(w, r, "./static/index.html")
	} else if strings.HasPrefix(path, "/static") {
		file_path := "." + path

		if _, err := os.Stat(file_path); err == nil {
			fmt.Print("here")
			http.ServeFile(w, r, file_path)
		} else {
			http.ServeFile(w, r, "./static/404.html")
			fmt.Print("not here")
		}
	} else if redirect, ok := redirects[path[1:]]; ok {
		http.Redirect(w, r, redirect, http.StatusMovedPermanently)
	} else {
		http.ServeFile(w, r, "./static/404.html")
	}
}
