import subprocess
result = subprocess.run(["gh", "auth", "status"], capture_output=True, text=True)
print(result.stdout)
print(result.stderr)
