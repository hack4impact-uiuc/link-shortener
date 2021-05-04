package handler

import (
	"encoding/json"
	"net/http"
)

var redirects = map[string]string{
	"ly":          "https://www.notion.so/h4iuiuc/Join-Hack4Impact-UIUC-2e875ce396b34e6ebb23c6dda57a89aa",
	"ly-interest": "https://docs.google.com/forms/d/e/1FAIpQLSeRbPeglRvMHgLiTIh9mhWRe1NY2y4ki26BTTgsfrdY4UjqSw/viewform",
	"ly-external": "https://docs.google.com/forms/d/e/1FAIpQLSeb-5WluYBsjBeCI7AIFoWHhLbmvRibn9eGkiAZ4obFsHHzUw/viewform",
	"ly-tech":     "https://docs.google.com/forms/d/e/1FAIpQLSeWADqb8Ge9jtQh-KSUax9MfBpZXepTSdwUijFMaocRhb3Sbw/viewform",
	"product-take-home": "https://forms.gle/koqmC5d1GEcoaVc96",
	"interview": "https://doodle.com/poll/acf5x3nuid35v429",
	// "ly-join":     "https://www.notion.so/h4iuiuc/Join-Hack4Impact-UIUC-2e875ce396b34e6ebb23c6dda57a89aa", // same as h4i.app/ly
}

func Handler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	if path == "/redirects" {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(redirects)
	} else if redirect, ok := redirects[path[1:]]; ok {
		http.Redirect(w, r, redirect, http.StatusMovedPermanently)
	} else {
		http.NotFound(w, r)
	}
}
