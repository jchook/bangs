# Better DuckDuckGo Bangs

[Bangs](https://duckduckgo.com/bangs) let you search websites (like Wikipedia)
directly from your searchbar.

This app improves DuckDuckGo bangs in two critical ways:

- Normal (no bang) search defaults to Google
- `!` (bare bang) defaults to I'm Feeling Lucky on Google instead of DDG, except
  it prefetches the result to avoid the "Redirect Notice" page when you have
  JavaScript disabled.

# Try It Out

1. Make sure you have Node JS installed
2. `npm start`
3. In your browser, set your default search engine to
   `http://localhost:3344/?q=%s`
4. Profit!

# Install locally

To install, simply make sure that your system runs `npm start` when you boot or log-in to your system.

If you use `systemd` (e.g. Ubuntu or Debian), then you can do that easily with a
systemd unit.

```sh
mkdir -p ~/.config/systemd/user
cp ~/path/to/bangs.service ~/.config/systemd/user
systemctl --user enable bangs
systemctl --user start bangs
```

If you don't use systemd, feel free to contribute to this README.

# Rationale

Google provides FAR better search results than DuckDuckGo.

For many of my Google searches, I know Google will nail it, so the "I'm Feeling
Lucky" function rocks. However, since I disabled JavaScript on all Google
domains (and you should too), this presents a problem. Google's "I'm Feeling
Lucky" search lands me on a "Redirect Notice" that never redirects. Bleh.

This software fixes my search flow by allowing me to use bangs without having
DuckDuckGo as my default search engine. It also fixes the stupid "Redirect
Notice" by prefetching the 302 in Node, then redirecting to the eventual
location Google magically figured out.

# License

MIT.
