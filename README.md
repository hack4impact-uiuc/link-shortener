# link-shortener

A simple link shortener for Hack4Impact UIUC links. Both applications in this repository (`app` and `admin`) are server-side rendered Next.js apps, and have example `.env` files in the `.env.example` files in their respective directory roots.

## App

This is the user-facing part of the link shortener ([h4i.app](https://h4i.app)). The homepage will display all public aliased links, while the link aliases themselves will redirect to their associated destinations.

## Admin

This is the internal admin portal to manage the link shortener ([admin.h4i.app](https://admin.h4i.app)). This uses [`next-auth`](https://next-auth.js.org/) to integrate with Google OAuth for authentication.
