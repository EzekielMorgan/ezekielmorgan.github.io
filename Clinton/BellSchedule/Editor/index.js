import { BellScheduleService } from "../../../../Scripts/Clinton/BellSchedule.js";

// Instantiate service (implementation lives elsewhere).
// Keeping this here preserves side-effects if the service registers listeners.
const BellScheduleHandler = new BellScheduleService(false);

function setExpanded(entry, expanded) {
    entry.classList.toggle("expanded", expanded);
    const btn = entry.querySelector(".SE-Entry-Collapse");
    if (btn) btn.setAttribute("aria-expanded", String(expanded));
}

// Toggle ONLY when the collapse button is clicked. This prevents the editor
// from collapsing when a user clicks the text box to type a period name.
document.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest(".SE-Entry-Collapse");
    if (!toggleBtn) return;

    const entry = toggleBtn.closest(".SE-Entry");
    if (!entry) return;

    setExpanded(entry, !entry.classList.contains("expanded"));
});
