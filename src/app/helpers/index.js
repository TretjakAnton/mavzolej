
export function addBodyClass(status, scrollTo) {
  let body = document.getElementsByTagName('body')[0];
  if (status) {
    body.className = 'opened-slider';
    if (document.body.scrollTop) document.body.scrollTop = 0;
    if (document.documentElement.scrollTop) document.documentElement.scrollTop = 0;
  } else {
    body.className = '';
    if (document.body.scrollTop) document.body.scrollTop = scrollTo;
    if (document.documentElement.scrollTop) document.documentElement.scrollTop = scrollTo;
  }
}
