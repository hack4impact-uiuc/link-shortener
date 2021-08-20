package handler

import (
	"encoding/json"
	"net/http"
)

type Redirect struct {
	Name  string `json:"name"`
	Link  string `json:"link"`
	Order int    `json:"order"`
}

type RedirectListItem struct {
	Alias string
	Name  string
	Link  string
}

func Handler(w http.ResponseWriter, r *http.Request) {
	redirectList := [...]RedirectListItem{
		{Alias: "website", Name: "Our Website", Link: "https://uiuc.hack4impact.org/"},
		{Alias: "ly", Name: "Student Application Info", Link: "https://www.notion.so/h4iuiuc/Join-Hack4Impact-UIUC-2e875ce396b34e6ebb23c6dda57a89aa"},
		{Alias: "ly-interest", Name: "Student Interest Form", Link: "https://docs.google.com/forms/d/e/1FAIpQLSeRbPeglRvMHgLiTIh9mhWRe1NY2y4ki26BTTgsfrdY4UjqSw/viewform"},
		{Alias: "instagram", Name: "Instagram", Link: "https://www.instagram.com/hack4impactuiuc/"},
		{Alias: "facebook", Name: "Facebook", Link: "https://www.facebook.com/h4iuiuc"},
		{Alias: "github", Name: "GitHub", Link: "https://github.com/hack4impact-uiuc"},
		{Alias: "medium", Name: "Medium", Link: "https://medium.com/hack4impact-uiuc"},
		{Alias: "youtube", Name: "YouTube", Link: " https://www.youtube.com/channel/UCmnm4j_IYDP5YCJ-msOZBwg"},
		{Alias: "info-session", Name: "Info Session", Link: "https://www.facebook.com/events/1907479396095709/?ref=newsfeed"}, 
		{Alias: "apply", Name: "Application", Link: "https://forms.gle/xh6kFu38PGFDcTZY9"}, 
	}

	redirects := make(map[string]Redirect)

	for i := 0; i < len(redirectList); i += 1 {
		redirect := redirectList[i]
		redirects[redirect.Alias] = Redirect{Name: redirect.Name, Link: redirect.Link, Order: i}
	}

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
