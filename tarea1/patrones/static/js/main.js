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