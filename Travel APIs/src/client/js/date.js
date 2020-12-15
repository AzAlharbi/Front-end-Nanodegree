function date(d, m, y) {
  var t = new Date();
  var dd = String(t.getDate());
  var mm = String(t.getMonth() + 1);
  var yyyy = t.getFullYear();

  if (d < dd && mm == m && yyyy == y) {
    return false;
  }
  if (yyyy > y) return false;
  else return true;
}

export { date };
