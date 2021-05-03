package main

import (
	"fmt"
	"net/http"
	"os"
)

var redirects = map[string]string{
	"foo": "bar",
}

func Handler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	if path == "/" {
		fmt.Fprintf(w, "index")
	} else if redirect, ok := redirects[path[1:]]; ok {
		fmt.Fprint(w, redirect)
	} else {
		fmt.Fprintf(w, "not found")

	}
}

func main() {
	fmt.Fprintf(os.Stdout, "Web Server started. Listening on 0.0.0.0:80\n")
	http.HandleFunc("/", Handler)
	http.ListenAndServe(":8080", nil)
}
