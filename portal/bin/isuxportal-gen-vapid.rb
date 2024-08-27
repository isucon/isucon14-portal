#!/usr/bin/env ruby
require_relative '../config/environment'
$stdout.sync = true

require 'web-push'
require 'json'

k = WebPush.generate_key
puts k.curve.to_pem.to_json
