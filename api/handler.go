package handler

import (
	"net/http"
)

var redirects = map[string]string{
	"fa21-interest": "https://docs.google.com/forms/d/e/1FAIpQLSeRbPeglRvMHgLiTIh9mhWRe1NY2y4ki26BTTgsfrdY4UjqSw/viewform",
	"fa21-join":     "https://www.notion.so/h4iuiuc/Join-Hack4Impact-UIUC-2e875ce396b34e6ebb23c6dda57a89aa",
	"ly":            "https://www.notion.so/h4iuiuc/Join-Hack4Impact-UIUC-2e875ce396b34e6ebb23c6dda57a89aa",
	"fa21-external": "https://docs.google.com/forms/d/e/1FAIpQLSeb-5WluYBsjBeCI7AIFoWHhLbmvRibn9eGkiAZ4obFsHHzUw/viewform",
	"fa21-tech":     "https://docs.google.com/forms/d/e/1FAIpQLSeWADqb8Ge9jtQh-KSUax9MfBpZXepTSdwUijFMaocRhb3Sbw/viewform",
}

func Handler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	if redirect, ok := redirects[path[1:]]; ok {
		http.Redirect(w, r, redirect, http.StatusMovedPermanently)
	} else {
		http.NotFound(w, r)
	}
}
