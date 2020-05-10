#!/bin/bash

# Environment
export BANGS="$(dirname "$(readlink -f "$0")")"
export NPM="$(which npm)"

# Check for npm
if [ -z "$NPM" ]; then
  printf '%s\n' 'Cannot find npm' >&2
  exit 1
fi

# Check for envsubst
if [ -z "$(which envsubst)" ]; then
  printf '%s\n' 'Cannot find envsubst' >&2
  exit 1
fi

# Check that we correctly located the service unit
if [ ! -f "$BANGS"/bangs.service ]; then
  printf '%s\n' 'Cannot locate bangs.service unit file' >&2
  exit 1
fi

# Check for systemd
if [ -z "$(which systemctl)" ]; then
  printf '%s\n' 'This install script only supports systemd.' >&2
  exit 1
fi

# Make sure the systemd user unit location exists
mkdir -p "$HOME"/.config/systemd/user

# Copy the systemd unit
envsubst < "$BANGS/bangs.service" > "$HOME"/.config/systemd/user/bangs.service

# Enable and start bangs
systemctl --user daemon-reload
systemctl --user enable bangs
systemctl --user start bangs

