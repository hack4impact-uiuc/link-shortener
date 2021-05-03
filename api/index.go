package main

import (
	"fmt"
	"net/http"
	"os"
)

var redirects = map[string]string{
	"website": "https://uiuc.hack4impact.org",
}

func Handler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	if path == "/" {
		http.ServeFile(w, r, "./static/index.html")
	} else if redirect, ok := redirects[path[1:]]; ok {
		http.Redirect(w, r, redirect, http.StatusMovedPermanently)
	} else {
		http.ServeFile(w, r, "./static/404.html")
	}
}

func main() {
	fmt.Fprintf(os.Stdout, "Web Server started. Listening on 0.0.0.0:8080\n")
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	http.HandleFunc("/", Handler)
	http.ListenAndServe(":8080", nil)
}
