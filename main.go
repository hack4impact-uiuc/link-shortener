package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/hack4impact-uiuc/link-shortener/handler"
)

func main() {
	fmt.Fprintf(os.Stdout, "Web Server started. Listening on 0.0.0.0:8080\n")
	http.HandleFunc("/", handler.Handler)
	http.ListenAndServe(":8080", nil)
}
