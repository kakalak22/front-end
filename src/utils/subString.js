export default function subString(str, n){
    if(str?.length)
        return (str?.length > n) ? str.slice(0, n-1) + '...' : str;
    return "";
  };