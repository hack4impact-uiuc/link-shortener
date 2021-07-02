package handler

import (
	"encoding/json"
	"net/http"
)

type Redirect struct {
	Name  string `json:"name"`
	Link  string `json:"link"`
	Order uint   `json:"order"`
}

var redirects = map[string]Redirect{
	"website":     {Name: "Our Website", Link: "https://uiuc.hack4impact.org/", Order: 0},
	"ly":          {Name: "Join Us", Link: "https://www.notion.so/h4iuiuc/Join-Hack4Impact-UIUC-2e875ce396b34e6ebb23c6dda57a89aa", Order: 1},
	"ly-interest": {Name: "Interest Form", Link: "https://docs.google.com/forms/d/e/1FAIpQLSeRbPeglRvMHgLiTIh9mhWRe1NY2y4ki26BTTgsfrdY4UjqSw/viewform", Order: 2},
	"instagram":   {Name: "Instagram", Link: "https://www.instagram.com/hack4impactuiuc/", Order: 3},
	"facebook":    {Name: "Facebook", Link: "https://www.facebook.com/h4iuiuc", Order: 4},
	"github":      {Name: "GitHub", Link: "https://github.com/hack4impact-uiuc", Order: 5},
	"medium":      {Name: "Medium", Link: "https://medium.com/hack4impact-uiuc", Order: 6},
	"youtube":     {Name: "YouTube", Link: " https://www.youtube.com/channel/UCmnm4j_IYDP5YCJ-msOZBwg", Order: 7},
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
