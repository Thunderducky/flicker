
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const isTextNode = (node) => node.nodeType === 3;
const isElementNode = (node) => node.nodeType === 1;

class TextRevealer {
  revealSpeed = 100;
  async processElement(elem){
    const nodes = elem.contents();
    for(let i = 0; i < nodes.length; i++){
      this.processNode(nodes[i], $("#copy"));
    }
  }
  async processNode(node, target){
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
      const parent = $('<span>').attr("class", classes);
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

$(async () => {
  const tr  = new TextRevealer();
  await tr.processElement($("#original"));
  await tr.revealElement($("#copy"));
  const original = $("#original");
  const nodes = original.contents();
});