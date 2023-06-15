import React, { useEffect } from "react";

function Support() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      var onWebChat={ar:[], set: function(a,b){if (typeof onWebChat_==='undefined'){this.ar.
      push([a,b]);}else{onWebChat_.set(a,b);}},get:function(a){return(onWebChat_.get(a));},
      w:(function(){ var ga=document.createElement('script'); ga.type = 'text/javascript';
      ga.async=1;ga.src=('https:'==document.location.protocol?'https:':'http:') + 
      '//www.onwebchat.com/clientchat/ef8a329d1b1f39024b206206ce879823';var s=
      document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s);})()}
    `;
    document.body.appendChild(script);
  }, []);

  return null; // Возвращаем null, поскольку компонент не отображает никакой интерфейс
}

export default Support;