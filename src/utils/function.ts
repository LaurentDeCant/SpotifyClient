const milliseconds = 500;

function debounce<T>(callback: (arg: T) => void) {
  let handle: number;
  return function(arg: T) {
    if (handle) {
      clearTimeout(handle);
    }
    handle = setTimeout(callback, milliseconds, arg);
  };
}

export default debounce;
