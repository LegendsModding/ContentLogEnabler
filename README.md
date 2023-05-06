Requirements: 
  - Python 3.7+ installed
  - [Frida](https://frida.re) installed (`pip install frida-tools`)
  - `pip install psutil`

Usage:
  - For anyone running the Game Pass / Xbox App / Launcher version: Run `launch_store.py`
  - For anyone running Steam or unregistered store version: `frida <path to MinecraftLegends.Windows.exe> -l script.js`
