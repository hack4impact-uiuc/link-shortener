package handler

import (
	"net/http"
)

var redirects = map[string]string{
	"website": "https://uiuc.hack4impact.org",
}

func Handler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	if redirect, ok := redirects[path[1:]]; ok {
		http.Redirect(w, r, redirect, http.StatusMovedPermanently)
	} else {
		http.NotFound(w, r)
	}
}
