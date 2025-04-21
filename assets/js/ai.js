document.querySelectorAll(".dropdown-content a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const url = this.getAttribute("data-url");
      document.getElementById("ai-frame").src = url;
      document.getElementById("ai-panel").style.display = "flex";
    });
  });
  
  document.getElementById("close-panel").addEventListener("click", () => {
    document.getElementById("ai-panel").style.display = "none";
    document.getElementById("ai-frame").src = "";
  });