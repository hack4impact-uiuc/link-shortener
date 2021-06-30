package handler

import (
	"encoding/json"
	"net/http"
)

type Redirect struct {
	Name string `json:"name"`
	Link string `json:"link"`
}

var redirects = map[string]Redirect{
	"ly":          {Name: "Join us", Link: "https://www.notion.so/h4iuiuc/Join-Hack4Impact-UIUC-2e875ce396b34e6ebb23c6dda57a89aa"},
	"ly-interest": {Name: "Interest form", Link: "https://docs.google.com/forms/d/e/1FAIpQLSeRbPeglRvMHgLiTIh9mhWRe1NY2y4ki26BTTgsfrdY4UjqSw/viewform"},
}

func Handler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	if path == "/redirects" {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(redirects)
	} else if redirect, ok := redirects[path[1:]]; ok {
		http.Redirect(w, r, redirect.Link, http.StatusMovedPermanently)
	} else {
		http.NotFound(w, r)
	}
}
