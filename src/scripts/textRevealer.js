const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const isTextNode = (node) => node.nodeType === 3;
const isElementNode = (node) => node.nodeType === 1;

class TextRevealer {
  revealSpeed = 100;
  constructor(revealSpeed = 100){
    this.revealSpeed = revealSpeed;
  }
  async revealText(selector){
    const elem = $(selector);
    const dest = $('<p>');
    this.processElement(elem, dest);
    const parent = elem.parent();
    elem.remove();
    parent.prepend(dest);

    await this.revealElement(dest);
  }
  processElement(elem, target){
    const nodes = elem.contents();
    for(let i = 0; i < nodes.length; i++){
      this.processNode(nodes[i], target);
    }
  }
  processNode(node, target){
    const t = $(target);
    if(isTextNode(node)){
      const text = $(node).text();
      const letters = text.split("").map(str => {
        return $(`<span>${str}</span>`).addClass("letter");
      })
      letters.forEach(l => {
        t.append(l);
      })
    } else if(isElementNode(node)) {
      const classes = $(node).attr("class");
      const tagName = $(node).prop("tagName");
      const parent = $(`<${tagName}>`).attr("class", classes);
      console.log(node);
      t.append(parent)
      const children = $(node).contents();
      for(let i = 0; i < children.length; i++){
        this.processNode(children[i], parent);
      }
      t.append($(parent));
    }
  }
  async revealElement(elem){
    const targetContents = $(elem).contents();
    for(let i = 0; i < targetContents.length; i++){
      await this.revealNode(targetContents[i]);
    }
  }
  async revealNode(node){
    const children = $(node).children();
    if(children.length > 0) {
      for(let i = 0; i < children.length; i++){
        this.revealNode(children[i]);
        await sleep(this.revealSpeed);
      }
    } else {
      $(node).addClass("reveal");
      await sleep(this.revealSpeed);
    }
  }
}

window.TextRevealer = TextRevealer;