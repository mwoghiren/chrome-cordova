#!/bin/bash

# Run from the repo root.
cd $(dirname "$0")

if ! which closure-compiler; then
  echo 'Please install Closure Compiler via:'
  echo '    brew install closure-compiler'
  exit 1
fi

OPTIONS=(
  --language_in=ECMASCRIPT5_STRICT
  --process_closure_primitives
  --formatting=PRETTY_PRINT
  #--compilation_level=ADVANCED_OPTIMIZATIONS
  --js_output_file=build/chromeapi.js
  --output_wrapper="(function(){%output%}).call(this)"
)

FILES=(
  api/chromeapi.js
  api/events.js
  api/mobile/impl/impl.js
  api/app/runtime/runtime.js
  api/app/window/window.js
  api/runtime/runtime.js
)

mkdir -p build
rm -f build/chromeapi.js
set -x
exec closure-compiler "${OPTIONS[@]}" "${FILES[@]}"
