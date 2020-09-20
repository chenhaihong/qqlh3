import Vue from "vue";

type Options = {
  showClose?: boolean;
  showCancelButton?: boolean;
  closeOnClickModal?: boolean;
}

export default function confirmLink(link: string, options: Options = {}): Promise<any> | void {
  const {
    showClose = true,
    showCancelButton = true,
    closeOnClickModal = true
  } = options;

  const title = "提示";
  const desc = `即将进入新页面，点击前往 <a class="leftMenu-comfirm-link" href='${link}' target="_blank">${link}</a>`;
  // 等待 element3 的发布
  // return Vue.prototype
  //   .$confirm(desc, title, {
  //     showClose,
  //     closeOnClickModal,
  //     showCancelButton,

  //     dangerouslyUseHTMLString: true,
  //     showConfirmButton: false,
  //     cancelButtonText: "取消",
  //     type: "warning"
  //   })
  //   .catch(() => { });
}
