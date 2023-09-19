$(async () => {
  const block = $("#block");
  const paragraphs = block.find("p");

  // Let's work through each node
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Hide step

  for(let i = 0; i < paragraphs.length; i++) {
    const fp = $(paragraphs[i]);
    const contents = fp.contents();
    fp.html("");
    for(let j = 0; j < contents.length; j++){
      const node = contents[j];
      if(node.nodeType === 3) {
        console.log("STRING");
        const text = $(node).text();
        console.log("TEXT", text);
        const words = text.split(" ").map(w => w.trim()).filter(w => w.length > 0);
        words.forEach(word => {
          const span = $(`<word>`).text(`${word} `);
          fp.append(span);
        });
      } else {
        $(node).addClass('hidden');
        $(node).addClass('non-word');
        fp.append(node);
      }
    }
  }

  // Reveal step
  for(let i = 0; i < paragraphs.length; i++) {
    const fp = $(paragraphs[i]);
    block.css("opacity", 1);
    fp.css("opacity", 1);

    const wordTime = 300//300;
    const periodTime = 1000//1000;
    const commaTime = 500//500;
    const wordEl = fp.find("word, .non-word");
    for(let i = 0; i < wordEl.length; i++) {
      const word = $(wordEl[i])
      if(word.hasClass("non-word")) {
        word.removeClass("hidden");
      } else {
        word.addClass("word");
      }
      let time = wordTime;
      const lastChar = word.text().trim().slice(-1);
      if(lastChar === ',') {
        time += commaTime;
      }
      if(lastChar === '.') {
        time += periodTime;
      }
      await sleep(time);
    }
  }
  await sleep(1000);
  // Actions reveal step
  {
    const actions = $("#actions");
    // Reveal all of the text at once and then put in the underlines
    actions.css('opacity', 1);
    const actionEls = actions.find("li");
    for(let i = 0; i < actionEls.length; i++){
      const action = $(actionEls[i]);
      action.animate({ opacity: 1 }, 500);
      await sleep(700);
    }
    await sleep(1000);
    console.log("starting");
    actions.find("a").addClass("selectable");
  }

});