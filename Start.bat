@echo off
title Question pour un Buisson

Set /a num=(%Random% %% 9) + 1

color %num%

echo " ________  ________  ___  ___  ________     "
echo "|\   __  \|\   __  \|\  \|\  \|\   __  \    "
echo "\ \  \|\  \ \  \|\  \ \  \\\  \ \  \|\ /_   "
echo " \ \  \\\  \ \   ____\ \  \\\  \ \   __  \  "
echo "  \ \  \\\  \ \  \___|\ \  \\\  \ \  \|\  \ "
echo "   \ \_____  \ \__\    \ \_______\ \_______\"
echo "    \|___| \__\|__|     \|_______|\|_______|"
echo "          \|__|                             "

start cmd /k "cd Pop && npm run dev"

cd API && nodemon server.js




