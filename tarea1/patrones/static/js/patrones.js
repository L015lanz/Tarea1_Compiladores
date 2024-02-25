const getFile = () => {
    document.getElementById('upFile').click();
  }

  const sub = (obj, e) => {
    var file = obj.value;
    var fileName = file.split("\\");
    document.getElementById("uploadBtn").innerHTML = fileName[fileName.length - 1];
    document.getElementById('form').submit();
    e.preventDefault();
  }


function redirectHome() {
    window.location.href = "/";
}

function redirectBinario() {
    window.location.href = "binario";
}

function redirectDecimal() {
    window.location.href = "decimal";
}

function redirectHexadecimal() {
    window.location.href = "hexadecimal";
}

function redirectOctal() {
    window.location.href = "octal";
}