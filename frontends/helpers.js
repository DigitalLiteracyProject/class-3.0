export function ajax(method, dest, type, success, error, data) {
  var req = new XMLHttpRequest();
  req.responseType = type;
  req.open(method, dest, true);
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200) {
        if (success) {
          success(req.response);
        }
      } else {
        if (error) {
          error(req);
        }
      }
    }
  }
  req.send(data);
}
