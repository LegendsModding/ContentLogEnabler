import frida
import os
import psutil

def start_game():
	os.system("start explorer shell:AppsFolder\\Microsoft.BadgerWin10_8wekyb3d8bbwe!Game")

def get_pid():
	while True:
		for proc in psutil.process_iter():
			try:
				pinfo = proc.as_dict(attrs=['pid', 'name'])
				if "MinecraftLegends.Windows.exe" in pinfo['name']:
					return pinfo['pid']
			except (psutil.NoSuchProcess, psutil.AccessDenied , psutil.ZombieProcess) :
				pass

def hook_frida(pid):
	session = frida.attach(int(pid))
	with open("script.js", "r") as f:
		script = session.create_script(f.read())
	script.on("message", message_handler)
	script.load()
	print("Script loaded!")

print("Starting game...")
start_game()
print("Waiting for game process to appear...")
pid = get_pid()
print("Game process found!")
hook_frida(pid)

#print("Press any key to exit.")
input()