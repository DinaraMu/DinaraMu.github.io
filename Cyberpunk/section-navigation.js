(() => {
  const sectionMap = [
    ["top", "00", "The Breach"],
    ["ch-00a", "00A", "What Happened"],
    ["ch-00b", "00B", "Memorable Bugs"],
    ["ch-01", "01", "The Promise"],
    ["ch-02", "02", "Production Reality"],
    ["ch-03", "03", "Weakest Platform"],
    ["ch-04", "04", "What QA Saw"],
    ["ch-05", "05", "Triage Machine"],
    ["ch-06", "06", "Decision Room"],
    ["ch-07", "07", "Certification"],
    ["ch-08", "08", "Public Reaction"],
    ["ch-09", "09", "Recovery"],
    ["ch-10", "10", "Retrospective"],
    ["ch-11", "11", "Release Board"],
    ["evidence-log", "LOG", "Evidence Log"],
  ];

  const ownerResponses = {
    Unassigned: {
      tone: "invalid",
      status: "NO ACCOUNTABLE OWNER",
      summary: "The risk can be discussed, but it cannot be formally escalated or accepted.",
      consequence: "Decision consequence: launch approval is invalid until one person owns the ship, delay, or platform removal decision.",
    },
    "QA Lead": {
      tone: "mismatch",
      status: "AUTHORITY MISMATCH",
      summary: "QA owns evidence, reproduction, and verification. QA does not control revenue, platform support, or the launch date.",
      consequence: "Decision consequence: assigning this to QA creates false accountability while leadership still makes the release decision.",
    },
    "Production Director": {
      tone: "partial",
      status: "MITIGATION OWNER",
      summary: "Production can coordinate fixes, schedule regression testing, and track thresholds, but may not have authority to accept company level launch risk.",
      consequence: "Decision consequence: appropriate for mitigation, but a red launch status still requires executive sign off.",
    },
    "Executive Release Owner": {
      tone: "valid",
      status: "CORRECT RELEASE OWNER",
      summary: "An executive release owner can accept the commercial and reputational consequences of shipping, delaying, or dropping a platform.",
      consequence: "Decision consequence: the choice becomes explicit, documented, and tied to a contingency plan.",
    },
  };

  let ownerObserver;

  const syncRiskOwner = () => {
    const riskTool = document.querySelector("#ch-11 .risk-tool");
    const select = riskTool?.querySelector("select");
    const riskScore = riskTool?.querySelector(".risk-score");

    if (!riskTool || !select || !riskScore) {
      window.requestAnimationFrame(syncRiskOwner);
      return;
    }

    const response = ownerResponses[select.value] || ownerResponses.Unassigned;
    riskScore.dataset.owner = response.tone;

    const existingFeedback = riskTool.querySelector(".owner-analysis");
    const feedback = existingFeedback || document.createElement("div");
    if (feedback.dataset.response !== select.value) {
      feedback.dataset.response = select.value;
      feedback.className = `owner-analysis ${response.tone}`;
      feedback.innerHTML = `
        <span>OWNER AUTHORITY CHECK</span>
        <b>${response.status}</b>
        <p>${response.summary}</p>
        <small>${response.consequence}</small>
      `;
    }

    if (!existingFeedback) {
      riskScore.insertAdjacentElement("afterend", feedback);
    }

    const scoreMessage = riskScore.querySelector("small");
    const ownerMessage = `OWNER STATUS // ${response.status}`;
    if (scoreMessage && scoreMessage.textContent !== ownerMessage) {
      scoreMessage.textContent = ownerMessage;
    }

    if (!ownerObserver) {
      ownerObserver = new MutationObserver(() => {
        window.requestAnimationFrame(syncRiskOwner);
      });
      ownerObserver.observe(riskTool, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  };

  const installNavigation = () => {
    const sections = document.querySelectorAll("main.site > section.chapter");

    if (sections.length < sectionMap.length) {
      window.requestAnimationFrame(installNavigation);
      return;
    }

    sections.forEach((section, index) => {
      const [id] = sectionMap[index];
      section.id = id;
      section.classList.add("section-with-next");

      if (section.querySelector(":scope > .section-next")) {
        return;
      }

      const next = sectionMap[index + 1];
      const link = document.createElement("a");
      link.className = "section-next";

      if (next) {
        link.href = `#${next[0]}`;
        link.innerHTML = `
          <span>CONTINUE INVESTIGATION</span>
          <b>NEXT // ${next[1]} ${next[2]}</b>
          <i aria-hidden="true">↓</i>
        `;
        link.setAttribute("aria-label", `Continue to section ${next[1]}: ${next[2]}`);
      } else {
        link.href = "#top";
        link.classList.add("section-next-top");
        link.innerHTML = `
          <span>CASE FILE COMPLETE</span>
          <b>RETURN TO THE BREACH</b>
          <i aria-hidden="true">↑</i>
        `;
        link.setAttribute("aria-label", "Return to the beginning");
      }

      link.addEventListener("click", () => {
        document.querySelector("main.site")?.classList.add("is-glitching");
        window.setTimeout(() => {
          document.querySelector("main.site")?.classList.remove("is-glitching");
        }, 260);
      });

      section.append(link);
    });

    syncRiskOwner();
  };

  document.addEventListener("change", (event) => {
    if (event.target.matches?.("#ch-11 .risk-tool select, #ch-11 .risk-tool input")) {
      window.setTimeout(syncRiskOwner, 0);
    }
  });

  installNavigation();
})();
