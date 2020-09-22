const list = [
  {
    path: "/home",
    name: "Home",
    meta: { title: "首页", icon: "home" },
    children: [],
  },
  {
    path: "/doc",
    name: "Doc",
    meta: { title: "使用文档", icon: "doc", roles: [2] },
    children: [
      {
        path: "/doc",
        name: "DocIndex",
        meta: { title: "项目使用指南", roles: [2] },
      },
    ],
  },
];


function resolveMatchedNames(name, list) {
  const names = []
  const tree = { name: undefined, children: list }

  function findNode(node) {
    if (node.name === name) {
      names.push(name)
      return true
    }

    const children = node.children
    if (children && children.length) {
      for (const childNode of children) {
        const res = findNode(childNode);
        if (res) {
          names.push(node.name)
          return true;
        }
      }
    }
  }
  findNode(tree)
  return names
}

console.log(resolveMatchedNames('DocIndex', list))