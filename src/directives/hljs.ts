import { App } from "vue";
import mitt from "@/helpers/mitt";

const bus = mitt();

let styleStatus = 0;
let jsStatus = 0;

function render(el: any) {
  if (el.__hljsDOM__) {
    el.__hljsDOM__.remove();
    el.__hljsDOM__ = null;
  }

  el.style.display = "none";
  const copy = el.cloneNode(true);
  if (el.nextSibling) {
    el.parentNode.insertBefore(copy, el.nextSibling);
  } else {
    el.parentNode.appendChild(copy);
  }

  copy.style.display = "";
  el.__hljsDOM__ = copy;
  (window as any).hljs.highlightBlock(copy);
}

function loadStyle() {
  return new Promise((res, rej) => {
    const link = document.createElement("link");
    link.href =
      "https://cdn.staticfile.org/highlight.js/10.2.0/styles/vs2015.min.css";
    link.rel = "stylesheet";
    link.addEventListener("load", res);
    link.addEventListener("error", rej);
    document.head.appendChild(link);
  });
}

function loadJs() {
  return new Promise((res, rej) => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.staticfile.org/highlight.js/10.2.0/highlight.min.js";
    script.addEventListener("load", res);
    script.addEventListener("error", rej);
    document.body.appendChild(script);
  });
}

// 注册一个全局自定义指令 `v-hljs`
const install = (app: App) => {
  app.directive("hljs", {
    beforeMount() {
      if (styleStatus <= 0) {
        loadStyle().then(
          () => {
            styleStatus = 1;
            if (jsStatus === 1) bus.emit("ready");
          },
          // eslint-disable-next-line
          () => {}
        );
      }
      if (jsStatus <= 0) {
        loadJs().then(
          () => {
            jsStatus = 1;
            if (styleStatus === 1) bus.emit("ready");
          },
          // eslint-disable-next-line
          () => {}
        );
      }
    },
    mounted(el: HTMLElement) {
      if (styleStatus === 1 && jsStatus === 1) {
        render(el);
      } else {
        bus.once("ready", () => {
          render(el);
        });
      }
    },
    updated(el: HTMLElement) {
      if (styleStatus === 1 && jsStatus === 1) {
        render(el);
      } else {
        bus.once("ready", () => {
          render(el);
        });
      }
    },
  });
};

export { install };
